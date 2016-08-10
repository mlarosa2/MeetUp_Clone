const React        = require('react');
const ReactRouter  = require('react-router');
const Modal        = require('react-modal');
const hashHistory  = ReactRouter.hashHistory;
const SessionStore = require('../stores/session_store');
const ErrorStore   = require('../stores/error_store');
const RsvpStore    = require('../stores/rsvp_store');
const ErrorActions = require('../actions/error_actions');
const RsvpActions  = require('../actions/rsvp_actions');

let attendanceError = "";

const CreateRsvp = React.createClass({
  getInitialState() {
    return({
      attending : "",
      errors    : [],
      modalOpen : true
    });
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
  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this._onErrorChange);
    this.rsvpListener  = RsvpStore.addListener(this._onRsvpChange);
  },
  componentWillUnmount() {
    this.errorListener.remove();
    this.rsvpListener.remove();
  },
  _confirmation(e) {
    e.preventDefault();
    let rsvp = {
        event_id: this.props.event,
        user_id:  SessionStore.currentUser().user.id,
        attending: this.state.attending
    };

    attendanceError = "";

    if (this.state.attending === "") {
      attendanceError = "Please confirm whether you are attending or not.";
    }

    RsvpActions.createRsvp(rsvp);
  },
  render() {
    return(
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
    );
  }
});

module.exports = CreateRsvp;
