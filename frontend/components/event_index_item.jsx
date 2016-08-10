const React          = require('react');
const EventActions   = require('../actions/event_actions');
const RsvpActions    = require('../actions/rsvp_actions');
const EventStore     = require('../stores/event_store');
const SessionStore   = require('../stores/session_store');
const ErrorStore     = require('../stores/error_store');
const RsvpStore      = require('../stores/rsvp_store');
const ReactRouter    = require('react-router');
const Modal          = require('react-modal');
const hashHistory    = ReactRouter.hashHistory;

let attendanceError = "";

const EventIndexItem = React.createClass({
  getInitialState () {
    return({
      modalOpen : false,
      errors    : [],
      rsvps     : []
    });
  },
  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this._onErrorChange);
    this.rsvpListener  = RsvpStore.addListener(this._onRsvpChange);
    RsvpActions.fetchAllRsvps(this.props.event.id);
  },
  componentWillUnmount() {
    this.errorListener.remove();
    this.rsvpListener.remove();
  },
  _onRsvpChange() {
    this.setState({
      modalOpen : false,
      rsvps     : RsvpStore.all()
    });
  },
  _confirmation(e) {
    e.preventDefault();
    let rsvp = {
        event_id: this.props.event.id,
        user_id:  SessionStore.currentUser().user.id,
        attending: this.state.attending
    };

    attendanceError = "";

    if (this.state.attending === "") {
      attendanceError = "Please confirm whether you are attending or not.";
    }

    RsvpActions.createRsvp(rsvp);
    RsvpActions.fetchAllRsvps(this.props.event.id);
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
  _revealAdminOpts(e) {
    e.preventDefault();
    jQuery(e.currentTarget).addClass('hide');
    let height = (jQuery(e.currentTarget).parents('.event-index-item').height()) + 33;
    jQuery(e.currentTarget).siblings().css('height', height);
    jQuery(e.currentTarget).siblings().removeClass('hide');
  },
  _hideAdminOpts(e) {
    e.preventDefault();
    jQuery(e.currentTarget).parent().addClass('hide');
    jQuery(e.currentTarget).parent().siblings().removeClass('hide');
  },
  _goToEvent() {
    hashHistory.push(this.props.event.group_id + "/show-event/" + this.props.event.id);
  },
  _goToEdit() {
    hashHistory.push( this.props.event.group_id + '/edit-event/' + this.props.event.id);
  },
  _delete(e) {
    e.preventDefault();
    jQuery(e.currentTarget).parent().siblings().removeClass('hide');
    EventActions.deleteEvent(this.props.event.id);
  },
  _openModal() {
    this.setState({ modalOpen : true });
    jQuery('body').addClass('stop-scrolling');
  },
  _closeModal() {
    this.setState({ modalOpen : false });
    jQuery('body').removeClass("stop-scrolling");
  },
  _destroyRsvp() {
    let rsvp = RsvpStore.findByUser(SessionStore.currentUser().user.id);
    RsvpActions.deleteRsvp(rsvp.rsvp.id);
    RsvpActions.fetchAllRsvps(this.props.event.id);
  },
  render() {
    let startTime = this.props.event.start_time;
    let date      = new Date(startTime.split("T")[0]);
    date          = date.toDateString().split(" ").slice(0, 3);
    date[2]       = parseInt(date[2]);
    date          = date.join(" ");
    let time      = startTime.split("T")[1].slice(0, startTime.split("T")[1].indexOf("."));
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
    let admin = "hide";
    if (SessionStore.currentUser().user.id === this.props.admin) {
      admin = "admin-options";
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
    const attendeesForDisplay = [];
    let hideForCurrentUser = "";
    if (this.state.rsvps !== []) {
        for (let i = 0; i < 10; i++) {
          if (this.state.rsvps[i] !== undefined) {
            attendeesForDisplay.push(this.state.rsvps[i]);
          }
        }
    }
    return (
      <div className="event-index-item clearfix">
        <Modal style={modalStyle} isOpen={this.state.modalOpen} onRequestClose={this.closeModal}>
          <i className="fa fa-times-circle-o" onClick={this._closeModal}></i>
          <h1>Will you be attending {this.props.event.title}?</h1>
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
          <h2 onClick={this._goToEvent}>{this.props.event.title}</h2>
            <div className={admin}>
              <i className="fa fa-pencil top-pencil" onClick={this._revealAdminOpts}></i>
              <div className="admin-edit hide">
                <i className="fa fa-times-circle-o" onClick={this._hideAdminOpts}></i>
                <div className="options" onClick={this._goToEdit}>
                  <i className="fa fa-pencil"></i><br />
                  <span>Edit</span>
                </div>
                <div className="options" onClick={this._delete}>
                  <i className="fa fa-trash-o"></i><br />
                  <span>Delete</span>
                </div>
              </div>
            </div>
        </div>
        <div className="event-body">
          <div className="attendees">
            {
              attendeesForDisplay.map( (rsvp, index) => {
                if (rsvp.rsvp.user_id === SessionStore.currentUser().user.id) {
                  hideForCurrentUser = "hide";
                  return (
                    <div key={rsvp.rsvp.id}>
                      <img src={rsvp.rsvp.image_url} className="current-user-rsvp"/>
                      <div className="tooltip">
                        <p>Will you still be attending?</p>
                        <span onClick={this._destroyRsvp}>No</span>
                      </div>
                    </div>
                );
                } else {
                  return <img src={rsvp.rsvp.image_url} key={rsvp.rsvp.id} />;
                }
              })
            }
          </div>
          <p>{this.props.event.description.slice(0,341)}...<span onClick={this._goToEvent} className="learn">Learn More</span></p>
        </div>
        <div className="event-time">
          <h3>{date}</h3>
          <h4>{time}</h4>
          <h4 className={"rsvp " + hideForCurrentUser} onClick={this._openModal}>RSVP</h4>
          <h4><span className="bold">{this.state.rsvps.length}</span> going</h4>
        </div>
      </div>

    );
  }
});

module.exports = EventIndexItem;
