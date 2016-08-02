const React          = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore   = require('../stores/session_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;

const SignupForm = React.createClass({
  getInitialState() {
    return {
      email    : "",
      username : "",
      password : ""
    };
  },
  _usernameChange(e) {
    this.setState({ username: e.target.value });
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
        username : this.state.username,
        password : this.state.password
      }
    };
    SessionActions.signup(user);
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
        <h2>Sign up</h2>
        <form>
          <label><p>Your name(this is public)</p>
            <input type="text" defaultValue={this.state.username} onChange={this._usernameChange} />
          </label>
          <label><p>Email address:</p>
            <input type="text" defaultValue={this.state.email} onChange={this._emailChange}/>
          </label>
          <label><p>Password:</p>
            <input type="password" defaultValue={this.state.password} onChange={this._passwordChange} />
          </label>
          <button onClick={this._submit}>Sign up</button>
        </form>
        <p>By clicking "Sign up", you confirm that you accept our Terms of Service and Privacy Policy</p>
        <hr />
        <p>Already a member? <a href="/login">Log in.</a></p>
      </div>
    );
  }
});

module.exports = SignupForm;
