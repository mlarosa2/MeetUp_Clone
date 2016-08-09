const React          = require('react');
const EventActions   = require('../actions/event_actions');
const EventStore     = require('../stores/event_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;

const EventIndexItem = React.createClass({
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
    if (currentUser.user.id === this.props.admin) {
      admin = "admin-options";
    }

    return (
      <div className="event-index-item clearfix">
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
        </div>
      </div>
    );
  }
});

module.exports = EventIndexItem;
