const React          = require('react');
const EventActions   = require('../actions/event_actions');
const RsvpActions    = require('../actions/rsvp_actions');
const SessionStore   = require('../stores/session_store');
const EventStore     = require('../stores/event_store');
const ErrorStore     = require('../stores/error_store');
const RsvpStore      = require('../stores/rsvp_store');
const ReactRouter    = require('react-router');
const Modal          = require('react-modal');
const hashHistory    = ReactRouter.hashHistory;

let attendanceError = "";

const ShowEvent = React.createClass({
  getInitialState() {
    return({
      id          : this.props.params.eventId,
      title       : "",
      description : "",
      start_time  : "",
      end_time    : "",
      errors      : [],
      attending   : "",
      modalOpen   : false
    });
  },
  _goToEvent() {
    hashHistory.push(this.props.event.group_id + "/show-event/" + this.props.event.id);
  },
  componentDidMount() {
    this.listener      = EventStore.addListener(this._onChange);
    this.rsvpListener  = RsvpStore.addListener(this._onRsvpChange);
    this.errorListener = ErrorStore.addListener(this._onErrorChange);
    EventActions.fetchSingleEvent(this.state.id);
  },
  componentWillUnmount() {
    this.listener.remove();
    this.rsvpListener.remove();
    this.errorListener.remove();
  },
  _onChange() {
    this.setState({
      title       : EventStore.find(this.state.id).event.title,
      description : EventStore.find(this.state.id).event.description,
      start_time  : EventStore.find(this.state.id).event.start_time,
      end_time    : EventStore.find(this.state.id).event.end_time,
    });
  },
  _onRsvpChange() {
    this.setState({ modalOpen : false });
  },
  _confirmation(e) {
    e.preventDefault();
    let rsvp = {
        event_id: this.state.id,
        user_id:  SessionStore.currentUser().user.id,
        attending: this.state.attending
    };

    attendanceError = "";

    if (this.state.attending === "") {
      attendanceError = "Please confirm whether you are attending or not.";
    }

    RsvpActions.createRsvp(rsvp);
  },
  _attending() {
    this.setState({ attending : true });
  },
  _notAttending() {
    this.setState({ attending : false });
  },
  _onErrorChange() {
    this.setState({ errors : ErrorStore.errors("Rsvp") });
  },
  _openModal() {
    this.setState({ modalOpen : true });
    jQuery('body').addClass('stop-scrolling');
  },
  _closeModal() {
    this.setState({ modalOpen : false });
    jQuery('body').removeClass("stop-scrolling");
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

    let modalStyle = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(0, 0, 0, 0.75)'
      },
      content : {
        position        : 'fixed',
        top             : '100px',
        left            : '50%',
        transform       : 'translateX(-50%)',
        width           : '537px',
        bottom          : '100px',
        border          : '1px solid #ccc',
        padding         : '20px',
      }
    };

    return (
      <div className="group-detail-section">
        <div className="event-index-item clearfix">
          <Modal style={modalStyle} isOpen={this.state.modalOpen} onRequestClose={this.closeModal}>
            <i className="fa fa-times-circle-o" onClick={this._closeModal}></i>
            <h1>Will you be attending {this.state.title}?</h1>
              <form>
                <label>
                  Yes
                  <input type="radio" value={true} onClick={this._attending} />
                </label>
                <label>
                  No
                  <input type="radio" value={false} onClick={this._notAttending} />
                </label>
                <p className="error">{attendanceError}</p>
                <button onClick={this._confirmation}>Confirm</button>
              </form>
          </Modal>
          <div className="event-header clearfix">
            <h2 onClick={this._goToEvent}>{this.state.title}</h2>
          </div>
          <div className="event-body">
            <p>{this.state.description}</p>
          </div>
          <div className="event-time">
            <h3>{date}</h3>
            <h4>{time}</h4>
            <h4 className="rsvp" onClick={this._openModal}>RSVP</h4>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ShowEvent;
