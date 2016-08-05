const React             = require('react');
const GroupActions      = require('../actions/group_actions');
const GroupStore        = require('../stores/group_store');
const ReactRouter       = require('react-router');
const hashHistory       = ReactRouter.hashHistory;
const GroupApiUtil      = require('../util/group_api_util');
const SessionStore      = require('../stores/session_store');
const MembershipStore   = require('../stores/membership_store');
const GroupDescription  = require('./group_description');
const MembershipActions = require('../actions/membership_actions');

const GroupDetail = React.createClass({
  getInitialState() {
    return({
      group : GroupStore.find(parseInt(this.props.params.groupId)),
      user  : SessionStore.currentUser(),
      member: false
    });
  },
  componentDidMount() {
    this.listener           = GroupStore.addListener(this._onChange);
    this.sessionListener    = SessionStore.addListener(this._onSessionChange);
    this.membershipListener = MembershipStore.addListener(this._onMembershipChange);
    GroupActions.fetchSingleGroup(this.props.params.groupId);
    MembershipActions.fetchAllMemberships(this.props.params.groupId);

  },
  componentWillUnmount() {
    this.listener.remove();
    this.sessionListener.remove();
    this.membershipListener.remove();
  },
  _onSessionChange() {
    this.setState({ user: SessionStore.currentUser() });
  },
  _onMembershipChange() {
    this.setState({ member: MembershipStore.isMember(this.state.user.user.id) });
    GroupActions.fetchSingleGroup(this.props.params.groupId);
  },
  _onChange() {
    this.setState({ group: GroupStore.find(parseInt(this.props.params.groupId)) });
  },
  _editGroup() {
    hashHistory.replace(`groups/edit/${this.props.params.groupId}`);
  },
  _destroyGroup() {
    GroupActions.deleteGroup(this.props.params.groupId);
    hashHistory.replace('/');
  },
  _joinGroup() {
    const data = {
      membership: {
        group_id  : this.props.params.groupId,
        member_id : this.state.user.user.id
      }
    };

    MembershipActions.joinGroup(data);
  },
  _leaveGroup() {
    let membershipId = MembershipStore.findMembershipId(this.state.user.user.id);
    MembershipActions.leaveGroup(membershipId);
  },
  _goToMembers() {
    hashHistory.push(`${this.props.params.groupId}/members`);
  },
  _goHome() {
    hashHistory.push(this.props.params.groupId);
  },
  render() {
    if (typeof this.state.group === "undefined") {
      return (<div>loading</div>);
    }
    let joinLeaveAdmin = "";

    if (this.state.group.group.moderator_id === this.state.user) {
      joinLeaveAdmin = (
        <ul>
          <li><button onClick={this._editGroup}>Edit Group</button></li>
          <li><button onClick={this._destroyGroup}>Delete Group</button></li>
        </ul>
      );
    }

    if (this.state.member) {
      joinLeaveAdmin = <ul><li><button onClick={this._leaveGroup}>Leave Group</button></li></ul>;
    } else {
      joinLeaveAdmin = <ul><li><button onClick={this._joinGroup}>Join Group</button></li></ul>;
    }
    return(
      <article className="group-detail">
        <header>
          <h1>{this.state.group.group.title}</h1>
          <nav>
            <ul>
              <li onClick={this._goHome}>Home</li>
              <li onClick={this._goToMembers}>Members</li>
              <li>Events</li>
              <li>Calendar</li>
            </ul>
            { joinLeaveAdmin }
          </nav>
        </header>
        <aside>
          <div></div>
          <ul>
            <li>{this.state.group.group.city}, {this.state.group.group.state}</li>
            <li>Founded {this.state.group.group.created}</li>
            <li>Members <span className="group-detail-stats">{this.state.group.group.members}</span></li>
            <li>Calendar<span className="group-detail-stats"></span><i className="fa fa-calendar"></i></li>
          </ul>
        </aside>
        <section>
          { this.props.children }
        </section>
      </article>
    );
  }
});

module.exports = GroupDetail;
