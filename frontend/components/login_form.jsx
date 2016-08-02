const React          = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore   = require('../stores/session_store');
const ErrorStore     = require('../stores/error_store');
const ErrorActions   = require('../actions/error_actions');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;

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
    return(
      <div className="form">
        <div className="errors">
          { this.state.errors.map( err => {
            return err;
            })
          }
        </div>
        <h2>Log in</h2>
        <p>Not registered with us yet? <Link to="/signup">Sign up</Link></p>
        <form>
          <label><p>Email address:</p>
            <input type="text" defaultValue={this.state.email} onChange={this._emailChange}/>
          </label>
          <label><p>Password:</p>
            <input type="password" defaultValue={this.state.password} onChange={this._passwordChange} />
          </label>
          <button onClick={this._submit}>Log in</button>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
