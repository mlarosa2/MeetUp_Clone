const React          = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore   = require('../stores/session_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;

const LoginForm = React.createClass({
  getInitialState() {
    return {
      email    : "",
      password : ""
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
  componentDidMount() {
    this.listener = SessionStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  render() {
    return(
      <div className="form">
        <h2>Log in</h2>
        <p>Not registered with us yet? <a href="/signup">Sign up</a></p>
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
