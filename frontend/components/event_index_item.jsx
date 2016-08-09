const React          = require('react');
const EventActions   = require('../actions/event_actions');
const EventStore     = require('../stores/event_store');

const EventIndexItem = React.createClass({
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
      time  = time.join(":");
      time += " AM";
    }
    let admin = "hide";
    if (currentUser.user.id === this.props.admin) {
      admin = "admin-options";
    }

    return (
      <div>
        <div className={admin}>
          <i className="fa fa-pencil"></i>
          <div className="admin-edit">
            <div>
              <i className="fa fa-pencil"></i>
              <span onClick={this._goToEdit}>Edit</span>
            </div>
            <div>
              <i className="fa fa-trash-o"></i>
              <span>Delete</span>
            </div>
          </div>
        </div>
        <h2>{this.props.event.title}</h2>
        <div className="event-body">
          <p>{this.props.event.description}</p>
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
