const React          = require('react');
const EventActions   = require('../actions/event_actions');
const EventStore     = require('../stores/event_store');
const ModalStore     = require('../stores/modal_store');
const SessionStore   = require('../stores/session_store');
const CreateRsvp     = require('./create_rsvp_form');
const ReactRouter    = require('react-router');
const Modal          = require('react-modal');
const hashHistory    = ReactRouter.hashHistory;

const EventIndexItem = React.createClass({
  getInitialState () {
    return({
      modalOpen: false
    });
  },
  componentDidMount() {
    this.modalListener = ModalStore.addListener(this._onModalClose);
  },
  componentWillUnmount() {
    this.modalListener.remove();
  },
  _onModalClose() {
    this.setState({ modalOpen: false });
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
    return (
      <div className="event-index-item clearfix">
        <Modal style={modalStyle} isOpen={this.state.modalOpen} onRequestClose={this.closeModal}>
          <i className="fa fa-times-circle-o" onClick={this._closeModal}></i>
          <h1>Will you be attending {this.props.event.title}?</h1>
          <CreateRsvp event={this.props.event.id} group={this.props.event.group_id} />
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
          <p>{this.props.event.description.slice(0,341)}...<span onClick={this._goToEvent} className="learn">Learn More</span></p>
        </div>
        <div className="event-time">
          <h3>{date}</h3>
          <h4>{time}</h4>
          <h4 className="rsvp" onClick={this._openModal}>RSVP</h4>
        </div>
      </div>

    );
  }
});

module.exports = EventIndexItem;
