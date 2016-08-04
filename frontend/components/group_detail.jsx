const React          = require('react');
const GroupActions   = require('../actions/group_actions');
const GroupStore     = require('../stores/group_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const GroupApiUtil   = require('../util/group_api_util');

const GroupDetail = React.createClass({
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
    if (typeof this.state.group === "undefined") {
      return (<div>loading</div>);
    }
    return(
      <article className="group-detail">
        <header>
          <h1>{this.state.group.group.title}</h1>
          <nav>
            <ul>
              <li>Home</li>
              <li>Members</li>
              <li>Events</li>
              <li>Calendar</li>
            </ul>
            <button>Join</button>
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
          { this.state.group.group.description }
        </section>
      </article>
    );
  }
});

module.exports = GroupDetail;
