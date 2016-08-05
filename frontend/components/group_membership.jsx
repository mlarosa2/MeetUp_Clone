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
      <ul className="members">
        <li>
          {
            this.state.memberships.map(membership => {
              return membership.user.username;
            })
          }
        </li>
      </ul>
    );
  }
});

module.exports = GroupMembership;
