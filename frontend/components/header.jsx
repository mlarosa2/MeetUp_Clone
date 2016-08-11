const React          = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore   = require('../stores/session_store');
const GroupActions   = require('../actions/group_actions');
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
    jQuery('.user-menu').addClass('hide');
    this.setState({currentUser: SessionStore.currentUser()});
    hashHistory.replace("/");
  },
  _signUp(e) {
    e.preventDefault();
    hashHistory.push("/signup");
  },
  _onChange() {
    this.setState({currentUser: SessionStore.currentUser()});
  },
  _goHome(e) {
    e.preventDefault();
    GroupActions.fetchAllGroups();
    jQuery('.meetup-search').val("");
    hashHistory.push("/");
  },
  _toggleMenu(e) {
    e.preventDefault();
    jQuery('.user-menu').toggleClass('hide');
  },
  _goToGroup(id, e) {
    e.preventDefault();
    jQuery('.user-menu').addClass('hide');
    hashHistory.replace(`/${id}`);
    GroupActions.fetchSingleGroup(id);
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
        <ul className="clearfix">
          <li className="nav-logo" onClick={this._goHome}>logo</li>
          <li><Link className="nav-link" to="/groups"><span>Find</span> a Meetup Group</Link></li>
          <li><Link className="nav-link" to="/groups/new"><span>Start</span> a Meetup Group</Link></li>
        </ul>
      </nav>
    );

    let imgUrl = "";
    let groups = [];
    if (SessionStore.isUserLoggedIn()) {
      imgUrl = this.state.currentUser.user.image_url;
      groups = this.state.currentUser.user.groups;
    }

    const loggedOutNavRight = (
      <nav className="nav-right">
        <ul className="clearfix">
          <li><Link to="/login">Log in</Link></li>
          <li><button onClick={this._signUp}>Sign up</button></li>
        </ul>
      </nav>
    );

    const loggedInNavRight = (
      <nav className="nav-right">
        <div className="user-avatar clearfix" onClick={this._toggleMenu}>
          <img src={imgUrl} />
        </div>
        <div className="user-menu hide">
          <ul className="user-groups">
            {
              groups.map( group => {
                let bindId = this._goToGroup.bind(this, group.id);
                return <li key={group.id} onClick={bindId}>{group.title}</li>;
              })
            }
          </ul>
          <ul className="logout">
            <li onClick={this._signOut}>Log out</li>
          </ul>
        </div>
      </nav>
    );
    jQuery(document).on('click', function(e) {
      if (jQuery(e.target).is('.user-menu') === false) {
        jQuery('.user-menu').addClass('hide');
      }
    });
    return(
      <header className="clearfix">
        { navLeft }
        { SessionStore.isUserLoggedIn() ? loggedInNavRight : loggedOutNavRight }
      </header>
    );
  }
});

module.exports = Header;
