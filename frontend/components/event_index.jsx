const React          = require('react');
const EventActions   = require('../actions/event_actions');
const EventStore     = require('../stores/event_store');
const EventIndexItem = require('./event_index_item');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;

const EventIndex = React.createClass({
  getInitialState() {
    return({
      events : []
    });
  },
  componentDidMount() {
    this.listener = EventStore.addListener(this._onChange);
    EventActions.fetchAllEvents();
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  _onChange() {
    this.setState({ events: EventStore.all() });
  },
  render() {
    return(
      <div className="event-wrap">
        <div className="event-index">
          {
            this.state.events.map(function(event) {
              return <EventIndexItem event={event.event} key={event.event.id} />;
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = EventIndex;
