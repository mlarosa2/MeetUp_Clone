const React          = require('react');
const GroupActions   = require('../actions/group_actions');
const GroupStore     = require('../stores/group_store');
const GroupIndexItem = require('./group_index_item');
const SearchBar      = require('./search_bar');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;
const SessionStore   = require('../stores/session_store');

const GroupIndex = React.createClass({
  getInitialState() {
    return({
      groups   : [],
      loggedIn : SessionStore.isUserLoggedIn()
    });
  },
  componentDidMount() {
    this.listener = GroupStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onSessionChange);
    GroupActions.fetchAllGroups();
  },
  componentWillUnmount() {
    this.listener.remove();
    this.sessionListener.remove();
  },
  _onChange() {
    this.setState({ groups: GroupStore.all() });
  },
  _goToSignUp() {
    hashHistory.replace('/signup');
  },
  _onSessionChange() {
    this.setState({
      loggedIn: SessionStore.isUserLoggedIn()
    });
  },
  render() {
    let hero = "";
    if (!SessionStore.isUserLoggedIn()) {
      hero = (
        <div className="group-hero-guest">
          <h1>Meetups are</h1>
          <h2>neighbors getting together to learn something, <br /> do something, share something...</h2>
          <button onClick={this._goToSignUp}>Sign me up!</button>
        </div>
      );
    } else {
      hero = (
        <div className="group-hero-user">
          <h1>Find a Meetup</h1>
        </div>
      );
    }
    return(
      <div>
        <section className="groupsContainer clearfix">
          { hero }
          <div className="groups clearfix">
            <SearchBar />
            {
              this.state.groups.map(function(group) {
                return <div className="group-wrap" key={group.group.id}><GroupIndexItem group={group.group} /></div>;
              })
            }
          </div>
        </section>
      </div>
    );
  }
});

module.exports = GroupIndex;
