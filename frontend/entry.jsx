const React          = require('react');
const ReactDOM       = require('react-dom');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const IndexRoute     = ReactRouter.IndexRoute;
const Router         = ReactRouter.Router;
const Route          = ReactRouter.Route;
const LoginForm      = require('./components/login_form');
const SignupForm     = require('./components/signup_form');
const Header         = require('./components/header');
const GroupActions   = require('./actions/group_actions');

const App = React.createClass({
  render() {
    return(
      <div>
        <Header />
        <div className="main-content">
          { this.props.children }
        </div>
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <Route path="/login" component={LoginForm} />
    <Route path="/signup" component={SignupForm} />
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById("root")
  );
});
