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
const GroupIndex     = require('./components/group_index');
const GroupDetail    = require('./components/group_detail');
const SessionStore   = require('./stores/session_store');

function _ensureSignIn(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/login');
  }
}

const App = React.createClass({
  render() {
    return(
      <div>
        <Header />
        <div className="main-content clearfix">
          { this.props.children }
        </div>
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={GroupIndex} onEnter={_ensureSignIn} />
    <Route path="/login" component={LoginForm} />
    <Route path="/signup" component={SignupForm} />
    <Route path="/groups/:groupId" component={GroupDetail} />
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById("root")
  );
});
