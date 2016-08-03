const React          = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore   = require('../stores/session_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;

const Header = React.createClass({
  getInitialState() {
    return({
      currentUser: SessionStore.currentUser()
    });
  },
  _signOut() {
    SessionActions.logout(this.state.currentUser);
    this.setState({currentUser: SessionStore.currentUser()});
  },
  _signUp(e) {
    e.preventDefault();
    hashHistory.push("/signup");
  },
  _onChange() {
    this.setState({currentUser: SessionStore.currentUser()});
  },
  componentDidMount() {
    this.listener = SessionStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  render() {
    const navLeft = (
      <nav className="nav-left">
        <img src="" />
        <ul>
          <li><Link to="/groups"><span>Find</span> a Meetup Group</Link></li>
          <li><Link to="/groups/new"><span>Start</span> a Meetup Group</Link></li>
        </ul>
      </nav>
    );

    const loggedOutNavRight = (
      <nav className="nav-right">
        <ul>
          <li><Link to="/login">Log in</Link></li>
          <li><button onClick={this._signUp}>Sign up</button></li>
        </ul>
      </nav>
    );

    const loggedInNavRight = (
      <nav className="nav-right">
        <div className="user-avatar"></div>
        <div className="user-menu">
          <ul className="user-groups"></ul>
          <ul>
            <li><Link to="/user/{currentUser.id}"> Profile </Link></li>
            <li onClick={this._signOut}>Log out</li>
          </ul>
        </div>
      </nav>
    );
    return(
      <header>
        { navLeft }
        { SessionStore.isUserLoggedIn() ? loggedInNavRight : loggedOutNavRight }
      </header>
    );
  }
});

module.exports = Header;
