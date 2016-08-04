const React          = require('react');
const GroupActions   = require('../actions/session_actions');
const GroupStore     = require('../stores/session_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;
const GroupIndex     = require('./group_index');

const GroupIndexItem = React.createClass({
  _goToGroup(e) {
    e.preventDefault();
    hashHistory.push(`/groups/${this.props.group.id}`);
  },
  render() {
    return(
      <div className="group">
        <div className="group-title">
          <h2>{ this.props.group.title }</h2>
          <p>We are { this.props.group.members } Members</p>
        </div>
        <div className="group-link" onClick={this._goToGroup}>clicky click</div>
      </div>
    );
  }
});

module.exports = GroupIndexItem;
