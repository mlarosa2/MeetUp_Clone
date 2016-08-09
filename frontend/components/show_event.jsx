const React          = require('react');
const EventActions   = require('../actions/event_actions');
const EventStore     = require('../stores/event_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;

const ShowEvent = React.createClass({
  getInitialState() {
    return({
      id          : this.props.params.eventId,
      title       : "",
      description : "",
      start_time  : "",
      end_time    : "",
    });
  },
  _goToEvent() {
    hashHistory.push(this.props.event.group_id + "/show-event/" + this.props.event.id);
  },
  componentDidMount() {
    this.listener = EventStore.addListener(this._onChange);
    EventActions.fetchSingleEvent(this.state.id);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  _onChange() {
    this.setState({
      title       : EventStore.find(this.state.id).event.title,
      description : EventStore.find(this.state.id).event.description,
      start_time  : EventStore.find(this.state.id).event.start_time,
      end_time    : EventStore.find(this.state.id).event.end_time,
    });
  },
  render() {
    let date = "";
    let time = "";
    if (this.state.start_time !== "") {
      let startTime = this.state.start_time;
      date          = new Date(startTime.split("T")[0]);
      date          = date.toDateString().split(" ").slice(0, 3);
      date[2]       = parseInt(date[2]);
      date          = date.join(" ");
      time          = startTime.split("T")[1].slice(0, startTime.split("T")[1].indexOf("."));
      time          = time.split(":");
      time          = time.slice(0, 2);

      if (parseInt(time[0]) > 12) {
        time[0] = parseInt(time[0]) - 12;
        time    = time.join(":");
        time   += " PM";
      } else if (parseInt(time[0]) === 0) {
        time[0] = 12;
        time    = time.join(":");
        time   += " AM";
      } else {
        time[0] = parseInt(time[0]);
        time    = time.join(":");
        time   += " AM";
      }
    }
    return (
      <div className="group-detail-section">
        <div className="event-index-item clearfix">
          <div className="event-header clearfix">
            <h2 onClick={this._goToEvent}>{this.state.title}</h2>
          </div>
          <div className="event-body">
            <p>{this.state.description}</p>
          </div>
          <div className="event-time">
            <h3>{date}</h3>
            <h4>{time}</h4>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ShowEvent;
