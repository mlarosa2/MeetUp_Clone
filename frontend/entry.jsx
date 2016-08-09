const React            = require('react');
const ReactDOM         = require('react-dom');
const ReactRouter      = require('react-router');
const LoginForm        = require('./components/login_form');
const SignupForm       = require('./components/signup_form');
const Header           = require('./components/header');
const GroupIndex       = require('./components/group_index');
const GroupDetail      = require('./components/group_detail');
const SessionStore     = require('./stores/session_store');
const SessionActions   = require('./actions/session_actions');
const CreateGroup      = require('./components/create_group_form');
const EditGroup        = require('./components/edit_group_form');
const GroupDescription = require('./components/group_description');
const GroupMembership  = require('./components/group_membership');
const CreateEventForm  = require('./components/create_event_form');
const EventIndex       = require('./components/event_index');
const hashHistory      = ReactRouter.hashHistory;
const IndexRoute       = ReactRouter.IndexRoute;
const Router           = ReactRouter.Router;
const Route            = ReactRouter.Route;

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
    <IndexRoute component={GroupIndex} />
    <Route path="login" component={LoginForm} />
    <Route path="signup" component={SignupForm} />
    <Route path="groups" component={GroupIndex} />
    <Route path="(groups)/new" component={CreateGroup} onEnter={_ensureSignIn} />
    <Route path="(groups)/edit/:groupId" component={EditGroup} />
    <Route path="(groups/):groupId" component={GroupDetail} onEnter={_ensureSignIn}>
      <IndexRoute component={GroupDescription} />
      <Route path="members" component={GroupMembership} />
      <Route path="new-event" component={CreateEventForm} />
    </Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  SessionActions.receiveCurrentUser(window.currentUser);
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById("root")
  );
});
