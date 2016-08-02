const React          = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore   = require('../stores/session_store');
const ErrorStore     = require('../stores/error_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;

const SessionApiUtil = require('../util/session_api_util');

const SignupForm = React.createClass({
  getInitialState() {
    return {
      email    : "",
      username : "",
      password : "",
      errors   : []
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
    if (SessionActions.signup(user)) {
      SessionActions.login(user);
    }
  },
  _onErrorChange() {
    this.setState({errors: ErrorStore.errors("Signup")});
  },
  componentDidMount() {
    this.listener = SessionStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this._onErrorChange);
  },
  componentWillUnmount() {
    this.listener.remove();
    this.errorListener.remove();
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
        <h2>Sign up</h2>
        <form>
          <label><p>Your name (this is public)</p>
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
        <p>Already a member? <Link to="/login">Log in.</Link></p>
      </div>
    );
  }
});

module.exports = SignupForm;
