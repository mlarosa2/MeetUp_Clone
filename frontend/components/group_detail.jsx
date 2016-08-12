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
      group     : GroupStore.find(parseInt(this.props.params.groupId)),
      user      : SessionStore.currentUser(),
      member    : false
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
  _goToCalendar() {
    hashHistory.push(`${this.props.params.groupId}/calendar`);
  },
  _createNewEvent() {
    hashHistory.push(this.props.params.groupId + '/new-event');
  },
  render() {
    if (typeof this.state.group === "undefined") {
      return (<div>loading</div>);
    }
    let joinLeaveAdmin = "";

    if (this.state.group.group.moderator_id === this.state.user.user.id) {
      joinLeaveAdmin = (
        <ul className="right-nav">
          <li><button onClick={this._editGroup}>Edit Group</button></li>
          <li><button onClick={this._destroyGroup}>Delete Group</button></li>
        </ul>
      );
    } else if (this.state.member) {
      joinLeaveAdmin = <ul className="right-nav"><li><button onClick={this._leaveGroup}>Leave Group</button></li></ul>;
    } else {
      joinLeaveAdmin = <ul className="right-nav"><li><button onClick={this._joinGroup}>Join Us!</button></li></ul>;
    }
    let homeSelected     = "";
    let membersSelected  = "";
    let calendarSelected = "";
    let newEventSelected   = "";

    if (this.props.location.pathname.indexOf("members") !== -1) {
      membersSelected = "selected";
        jQuery('.sidebar').removeClass('hide');
        jQuery('.group-section').removeClass('full');
    } else if (this.props.location.pathname.indexOf("new-event") !== -1) {
      newEventSelected = "selected";
        jQuery('.sidebar').removeClass('hide');
        jQuery('.group-section').removeClass('full');
    } else if (this.props.location.pathname.indexOf("show-event") !== -1 || this.props.location.pathname.indexOf("edit-event") !== -1) {
      homeSelected     = "";
      membersSelected  = "";
      calendarSelected = "";
      newEventSelected = "";
        jQuery('.sidebar').removeClass('hide');
        jQuery('.group-section').removeClass('full');
    } else if (this.props.location.pathname.indexOf("calendar") !== -1) {
      calendarSelected = "selected";
      jQuery('.sidebar').addClass('hide');
      jQuery('.group-section').addClass('full');
    }  else {
      homeSelected = "selected";
        jQuery('.sidebar').removeClass('hide');
        jQuery('.group-section').removeClass('full');
    }

    let admin = MembershipStore.findMemberById(this.state.group.group.moderator_id);
    let adminBlock = "";
    if (admin !== undefined) {
      let mailto = "mailto:" + admin.user.email;
      adminBlock = (
        <div className="group-detail-moderator">
          <h3>Organizer:</h3>
          <p>{admin.user.username}</p>
          <button><a href={mailto}><i className="fa fa-envelope"></i>Contact</a></button>
        </div>
      );
    }
    return(
      <article className="group-detail">
        <header className="clearfix">
          <h1>{this.state.group.group.title}</h1>
          <nav className="clearfix">
            <ul className="left-nav">
              <li className={homeSelected} onClick={this._goHome}><button>Home</button></li>
              <li className={newEventSelected} onClick={this._createNewEvent}><button>New Event</button></li>
              <li className={membersSelected} onClick={this._goToMembers}><button>Members</button></li>
              <li className={calendarSelected}><button onClick={this._goToCalendar}>Calendar</button></li>
            </ul>
            { joinLeaveAdmin }
          </nav>
        </header>
        <aside className="sidebar">
          <div className="group-detail-image"></div>
          <ul>
            <li><span className="location">{this.state.group.group.city}, {this.state.group.group.state}</span>
            <br />Founded {this.state.group.group.created}</li>
            <li className="clickable" onClick={this._goToMembers}>Members <span className="group-detail-stats">{this.state.group.group.members}</span></li>
            <li className="clickable" onClick={this._goToCalendar}>Calendar<span className="group-detail-stats"><i className="fa fa-calendar"></i></span></li>
          </ul>
          { adminBlock }
        </aside>
        <section className="clearfix group-section">
          { this.props.children }
        </section>
      </article>
    );
  }
});

module.exports = GroupDetail;
