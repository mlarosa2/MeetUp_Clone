const React          = require('react');
const GroupActions   = require('../actions/group_actions');
const GroupStore     = require('../stores/group_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;

const GroupDetail = React.createClass({
  getInitialState() {
    return({ group: GroupStore.find(this.props.params.groupId) });
  },
  componentDidMount() {
    this.listener = GroupStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  _onChange() {
    this.setState({ group: GroupStore.find(this.props.params.groupId) });
  },
  render() {
    return(
      <article>
        <header>
          <h1>{this.state.group.group.title}</h1>
          <nav>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <button></button>
          </nav>
        </header>
        <aside>

        </aside>
        <section>

        </section>
      </article>
    );
  }
});

module.exports = GroupDetail;
