const React        = require('react');
const EventActions = require('../actions/event_actions');
const EventStore   = require('../stores/event_store');
const ErrorStore   = require('../stores/error_store');
const ReactRouter  = require('react-router');
const hashHistory  = ReactRouter.hashHistory;

let titleError       = "";
let descriptionError = "";
let startTimeError   = "";
let endTimeError     = "";

const CreateEvent = React.createClass({
  getInitialState() {
    return({
      title       : "",
      description : "",
      start_time  : "",
      end_time    : "",
      group_id    : this.props.params.groupId,
      errors      : []
    });
  },
  componentDidMount() {
    this.listener    = EventStore.addListener(this._onChange);
    this.errListener = ErrorStore.addListener(this._onErrorChange);
    EventActions.fetchSingleEvent(this.props.params.eventId);
  },
  componentWillUnmount() {
    this.errListener.remove();
    this.listener.remove();
  },
  _onChange() {
    this.setState({
      title       : EventStore.find(this.props.params.eventId).event.title,
      description : EventStore.find(this.props.params.eventId).event.description,
      start_time  : EventStore.find(this.props.params.eventId).event.start_time.slice(0,EventStore.find(this.props.params.eventId).event.start_time.indexOf(".")),
      end_time    : EventStore.find(this.props.params.eventId).event.end_time.slice(0,EventStore.find(this.props.params.eventId).event.end_time.indexOf(".")),
    });
  },
  _onErrorChange() {
    this.setState({errors: ErrorStore.errors("EditEvent")});
  },
  _editEvent(e) {
    e.preventDefault();

    let splitStart = this.state.start_time.split("T");
    let startTimeForRuby = splitStart.join(" ");

    let splitEnd = this.state.end_time.split("T");
    let endtimeForRuby = splitEnd.join(" ");

    const event = {
      id          : this.props.params.eventId,
      title       : this.state.title,
      description : this.state.description,
      start_time  : startTimeForRuby,
      end_time    : endtimeForRuby,
      group_id    : this.state.group_id
    };

    EventActions.editEvent(event);

    let totalErrors  = 0;
    titleError       = "";
    descriptionError = "";
    startTimeError   = "";
    endTimeError     = "";

    if (this.state.title === "") {
      titleError = "Please give your event a name.";
      totalErrors++;
    }
    if (this.state.description === "") {
      descriptionError = "Please describe your event.";
      totalErrors++;
    }
    if (this.state.start_time === "") {
      startTimeError = "Please provide a starting time and date.";
      totalErrors++;
    }
    if (this.state.end_time === "") {
      endTimeError = "Please provide an ending time and date.";
      totalErrors++;
    }

    if (totalErrors === 0) {
      hashHistory.replace(`/${this.state.group_id}`);
    }
  },
  _updateStartTime(e) {
    this.setState({ start_time : e.target.value });
  },
  _updateEndTime(e) {
    this.setState({ end_time : e.target.value });
  },
  _updateTitle(e) {
    this.setState({ title : e.target.value });
  },
  _updateDescription (e) {
    this.setState({ description : e.target.value });
  },
  render() {
    return(
      <form className="form event-form">
        <h1 className="edit-event-title">Edit Event</h1>
        <label>Start Time/Date
          <input type="datetime-local" value={this.state.start_time} onChange={this._updateStartTime} />
          <p className="error">{startTimeError}</p>
        </label>
        <label>End Time/Date
          <input type="datetime-local" value={this.state.end_time} onChange={this._updateEndTime} />
          <p className="error">{endTimeError}</p>
        </label>
        <label>What is the name of your event?
          <input type="text" value={this.state.title} onChange={this._updateTitle} />
          <p className="error">{titleError}</p>
        </label>
        <label>Describe your event
          <textarea value={this.state.description} onChange={this._updateDescription} />
          <p className="error">{descriptionError}</p>
        </label>

        <button onClick={this._editEvent}>Edit Event</button>
      </form>
    );
  }
});

module.exports = CreateEvent;
