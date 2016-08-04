const React          = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore   = require('../stores/session_store');
const ErrorStore     = require('../stores/error_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;
const ErrorActions   = require('../actions/error_actions');

const SessionApiUtil = require('../util/session_api_util');

let emailErrors = "";
let emailErrorClass = "";
let passwordErrors = "";
let passwordErrorClass = "";
let userNameErrors = "";
let userNameErrorClass = "";

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
  _submit(e, handleErr) {
    e.preventDefault();
    let user = {
      user: {
        email    : this.state.email,
        username : this.state.username,
        password : this.state.password
      }
    };

    SessionActions.signup(user);
    emailErrors        = "";
    emailErrorClass    = "";
    passwordErrors     = "";
    passwordErrorClass = "";
    userNameErrors     = "";
    userNameErrorClass = "";

    if (this.state.email === "") {
      emailErrors = "Please enter your email address.";
      emailErrorClass = "error-input";
    }
    if (this.state.password === "") {
      passwordErrors = "Please enter your password";
      passwordErrorClass = "error-input";
    } else if (this.state.password.length < 6) {
      passwordErrors = "Password must be at least 6 characters.";
      passwordErrorClass = "error-input";
    }
    if (this.state.username === "") {
      userNameErrors = "Please enter your name";
      userNameErrorClass = "error-input";
    }
  },

  _onChange() {
    hashHistory.push("/");
  },
  _onErrorChange() {
    this.setState({ errors: ErrorStore.errors("Signup")});
  },
  componentDidMount() {
    this.listener = SessionStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this._onErrorChange);
  },
  componentWillMount() {
    jQuery('body').addClass('white-background');
  },
  componentWillUnmount() {
    this.listener.remove();
    this.errorListener.remove();
    jQuery('body').removeClass('white-background');
  },
  render() {
    for (let i = 0; i < this.state.errors.length; i++) {
      if (this.state.errors[i] === "Email has already been taken") {
        emailErrors = "Email has already been taken.";
        emailErrorClass = "error-input";
      }
    }
    return(
      <div className="form form-signup">
        <form>
          <label><p>Your name (this is public)</p>
            <input className={userNameErrorClass} type="text" defaultValue={this.state.username} onChange={this._usernameChange} />
            <p className="error">{ userNameErrors }</p>
          </label>
          <label><p>Email address</p>
            <input className={emailErrorClass} type="text" defaultValue={this.state.email} onChange={this._emailChange}/>
            <p className="error">{ emailErrors }</p>
          </label>
          <label><p>Password</p>
            <input className={passwordErrorClass} type="password" defaultValue={this.state.password} onChange={this._passwordChange} />
            <p className="error">{ passwordErrors }</p>
          </label>
          <button className="full" onClick={this._submit}>Sign up</button>
        </form>
        <div className="form-footer">
          <p>By clicking "Sign up", you confirm that you accept our Terms of Service and Privacy Policy</p>
          <div>
            <p>Already a member? <Link to="/login">Log in.</Link></p>
          </div>
      </div>
    </div>
    );
  }
});

module.exports = SignupForm;
