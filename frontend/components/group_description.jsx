const React           = require('react');
const GroupActions    = require('../actions/group_actions');
const GroupStore      = require('../stores/group_store');
const ReactRouter     = require('react-router');
const EventIndex      = require('./event_index');

const GroupDescription = React.createClass({
  getInitialState() {
    return({ group: GroupStore.find(parseInt(this.props.params.groupId)) });
  },
  componentDidMount() {
    this.listener = GroupStore.addListener(this._onChange);
    GroupActions.fetchSingleGroup(this.props.params.groupId);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  _onChange() {
    this.setState({ group: GroupStore.find(parseInt(this.props.params.groupId)) });
  },
  render() {
    return(
      <div>
        <div>{this.state.group.group.description}</div>
        <EventIndex groupId={this.props.params.groupId} admin={this.props.params.moderator_id} />
      </div>
    );
  }
});

module.exports = GroupDescription;
