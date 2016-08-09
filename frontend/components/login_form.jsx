const React          = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore   = require('../stores/session_store');
const ErrorStore     = require('../stores/error_store');
const ErrorActions   = require('../actions/error_actions');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;

let emailErrors = "";
let passwordErrors = "";
let invalidErrors = "";

const LoginForm = React.createClass({
  getInitialState() {
    return {
      email    : "",
      password : "",
      errors   : [],
    };
  },
  _emailChange(e) {
    this.setState({ email: e.target.value });
  },
  _passwordChange(e) {
    this.setState({ password: e.target.value });
  },
  _submit(e) {
    e.preventDefault();
    let user = {
      user: {
        email    : this.state.email,
        password : this.state.password
      }
    };

    emailErrors = "";
    passwordErrors = "";
    invalidErrors = "";

    if (this.state.email === "") {
      emailErrors = "Please enter your email address.";
    }
    if (this.state.password === "") {
      passwordErrors = "Please enter your password";
    } else if (this.state.password.length < 6) {
      passwordErrors = "Password must be at least 6 characters.";
    } else if (this.state.password.length > 0 && this.state.email.length > 0) {
      invalidErrors = "Either username or password was invalid.";
    }
    SessionActions.login(user);
  },
  _onChange() {
    if (SessionStore.isUserLoggedIn()) {
      hashHistory.push("/");
    }
  },
  _onErrorChange() {
    this.setState({errors: ErrorStore.errors("Login")});
  },
  componentDidMount() {
    this.listener = SessionStore.addListener(this._onChange);
    this.errListener = ErrorStore.addListener(this._onErrorChange);
  },
  componentWillUnmount() {
    this.listener.remove();
    this.errListener.remove();
  },
  render() {
    let ErrorBlock;
    if (this.state.errors && this.state.errors.length > 0) {
      ErrorBlock = (
        <div className="errors">
          <h2>Sorry, there was a problem </h2>
          <p>You&#8217;ll find more details highlighted below</p>
        </div>
      );
    } else {
      ErrorBlock = (
        <div className="errors hide">
          <h2>Sorry, there was a problem </h2>
          <p>You&#8217;ll find more details highlighted below</p>
        </div>
      );
    }
    return(
      <div>
        {
          ErrorBlock
        }
        <div className="form-header">
          <h1>Log in</h1>
          <p>Not registered with us yet? <Link to="/signup">Sign up</Link></p>
        </div>
        <form className="form">
          <label><p>Email address:</p>
            <input type="text" defaultValue={this.state.email} onChange={this._emailChange}/>
            <p className="error">{emailErrors}</p>
          </label>
          <label><p>Password:</p>
            <input type="password" defaultValue={this.state.password} onChange={this._passwordChange} />
            <p className="error">{passwordErrors}</p>
          </label>
          <p className="error">{invalidErrors}</p>
          <button onClick={this._submit}>Log in</button>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
