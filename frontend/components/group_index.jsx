const React          = require('react');
const GroupActions   = require('../actions/group_actions');
const GroupStore     = require('../stores/group_store');
const GroupIndexItem = require('./group_index_item');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;

const GroupIndex = React.createClass({
  getInitialState() {
    return({
      groups: GroupStore.all()
    });
  },
  componentWillMount() {
    GroupActions.fetchAllGroups();
    this.listener = GroupStore.addListener(this._onChange);
  },
  _onChange() {
    this.setState({groups: GroupStore.all()});
  },
  render() {
    return(
      <section className="groups">
        {
          this.state.groups
        }
      </section>
    );
  }
});

module.exports = GroupIndex;
