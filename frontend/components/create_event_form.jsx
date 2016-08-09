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
    this.errListener = ErrorStore.addListener(this._onErrorChange);
  },
  componentWillUnmount() {
    this.errListener.remove();
  },
  _onErrorChange() {
    this.setState({errors: ErrorStore.errors("CreateEvent")});
  },
  _createEvent(e) {
    e.preventDefault();
    let timeZone = (function () {
      //retrieve Ruby friendly timezone from JavaScript Date Object.
      let getTimeZone    = new Date().toString().split(" ");
      getTimeZone        = getTimeZone[getTimeZone.length - 2];
      getTimeZone        = getTimeZone.split("-");

      if (getTimeZone.length === 1) {
        getTimeZone    = getTimeZone.split("+");
        getTimeZone[0] = "+";
        getTimeZone    = getTimeZone.join("");
      } else {
        getTimeZone[0] = "-";
        getTimeZone    = getTimeZone.join("");
      }

      return getTimeZone;
    })();

    let splitStart = this.state.start_time.split("T");
    splitStart.push(timeZone);
    let startTimeForRuby = splitStart.join(" ");

    let splitEnd = this.state.end_time.split("T");
    splitEnd.push(timeZone);
    let endtimeForRuby = splitEnd.join(" ");
    debugger
    const event = {
      title       : this.state.title,
      description : this.state.description,
      start_time  : startTimeForRuby,
      end_time    : endtimeForRuby,
      group_id    : this.state.group_id
    };

    EventActions.createEvent(event);

    titleError       = "";
    descriptionError = "";
    startTimeError   = "";
    endTimeError     = "";

    if (this.state.title === "") {
      titleError = "Please give your event a name.";
    }
    if (this.state.description === "") {
      descriptionError = "Please describe your event.";
    }
    if (this.state.start_time === "") {
      startTimeError = "Please provide a starting time and date.";
    }
    if (this.state.end_time === "") {
      endTimeError = "Please provide an ending time and date.";
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
      <form className="form">
        <label>Start Time/Date
          <input type="datetime-local" defaultValue={this.state.start_time} onChange={this._updateStartTime} />
          <p className="error">{startTimeError}</p>
        </label>
        <label>End Time/Date
          <input type="datetime-local" defaultValue={this.state.end_time} onChange={this._updateEndTime} />
          <p className="error">{endTimeError}</p>
        </label>
        <label>What is the name of your event?
          <input type="text" defaultValue={this.state.title} onChange={this._updateTitle} />
          <p className="error">{titleError}</p>
        </label>
        <label>Describe your event
          <textarea defaultValue={this.state.description} onChange={this._updateDescription} />
          <p className="error">{descriptionError}</p>
        </label>

        <button onClick={this._createEvent}>Create Event</button>
      </form>
    );
  }
});

module.exports = CreateEvent;
