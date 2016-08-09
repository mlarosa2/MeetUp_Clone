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
    EventActions.fetchAllEvents(this.props.groupId);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  _onChange() {
    this.setState({ events: EventStore.all() });
  },
  render() {
    if (this.props.admin !== undefined) {
      let admin = this.props.admin;
       for (let i = 0; i < this.state.events.length; i++) {
         this.state.events[i].event.admin = admin;
       }
    }
    //  debugger
    return(
      <div className="event-wrap">
        <div className="event-index">
          {
            this.state.events.map( event => {
              return <EventIndexItem event={event.event} key={event.event.id} admin={event.event.admin}/>;
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = EventIndex;
