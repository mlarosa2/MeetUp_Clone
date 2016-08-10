const React             = require('react');
const MembershipStore   = require('../stores/membership_store');
const MembershipActions = require('../actions/membership_actions');
const ReactRouter       = require('react-router');


const GroupMembership = React.createClass({
  getInitialState() {
    return ({
      memberships: MembershipStore.all()
    });
  },
  componentDidMount() {
    this.listener = MembershipStore.addListener(this._onChange);
    MembershipActions.fetchAllMemberships(this.props.params.groupId);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  _onChange() {
    this.setState({ memberships: MembershipStore.all() });
  },
  render () {
    return(
      <div className="members group-detail-section">
        <div className="group-sub-title">
          <h2>Members</h2>
        </div>
        <ul className="members-list">
            {
              this.state.memberships.map(membership => {
                return (
                  <li key={membership.user.id} className="member">
                    <p>
                      <img className="avatar" src={membership.user.image_url} />
                      <span className="name">{membership.user.username}</span>
                      <br /> Joined: {membership.user.joined}
                    </p>
                  </li>
                );
              })
            }
        </ul>
      </div>
    );
  }
});

module.exports = GroupMembership;
