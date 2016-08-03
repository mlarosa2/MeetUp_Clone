const React          = require('react');
const GroupActions   = require('../actions/session_actions');
const GroupStore     = require('../stores/session_store');
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
  render() {
    return(
      <section className="groups">
        {
          this.state.groups.map(function(group){
            return <GroupIndexItem group={group} key={group.id} />;
          })
        }
      </section>
    );
  }
});

module.exports = GroupIndex;
