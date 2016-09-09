const React        = require('react');
const EventStore   = require('../stores/event_store');
const EventActions = require('../actions/event_actions');

const _months = {
  0 : "January", 1 : "February", 2 : "March", 3 : "April", 4 : "May", 5 : "June",
  6 : "July", 7 : "August", 8 : "September", 9 : "October", 10 : "November", 11 : "December"
};

const _days = {
  0 : "Sun", 1 : "Mon", 2 : "Tue", 3 : "Wed", 4 : "Thur",
  5 : "Fri", 6 : "Sat"
};

const Calendar = React.createClass({
  getInitialState() {
    this.current = new Date();
    return({
      year      : this.current.getFullYear(),
      month     : _months[this.current.getMonth()],
      day       : _days[this.current.getDay()],
      first_day : new Date(this.current.getFullYear(), this.current.getMonth(), 1).getDay(),
      last_day  : new Date(this.current.getFullYear(), this.current.getMonth() + 1, 0).getDate(),
      events    : [],
    });
  },
  componentDidMount() {
    this.listener = EventStore.addListener(this._onChange);
    EventActions.fetchAllEvents(this.props.params.groupId);
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  _onChange() {
    this.setState({ events : EventStore.all() });
  },
  _nextMonth(e) {
    e.preventDefault();
    if (this.current.getMonth() === 11) {
      this.current = new Date(this.current.getFullYear() + 1, 0);
    } else {
      this.current = new Date(this.current.getFullYear(), this.current.getMonth() + 1);
    }
    this.setState({
      year      : this.current.getFullYear(),
      month     : _months[this.current.getMonth()],
      day       : _days[this.current.getDay()],
      first_day : new Date(this.current.getFullYear(), this.current.getMonth(), 1).getDay(),
      last_day  : new Date(this.current.getFullYear(), this.current.getMonth() + 1, 0).getDate(),
    });
    EventActions.fetchAllEvents(this.props.params.groupId);
  },
  _prevMonth(e) {
    e.preventDefault();
    if (jQuery(e.currentTarget).hasClass('disabled')) {
      return;
    } else if (this.current.getMonth === 0) {
      this.current = new Date(this.current.getFullYear() - 1, 11);
    } else {
      this.current = new Date(this.current.getFullYear(), this.current.getMonth() - 1);
    }
    this.setState({
      year      : this.current.getFullYear(),
      month     : _months[this.current.getMonth()],
      day       : _days[this.current.getDay()],
      first_day : new Date(this.current.getFullYear(), this.current.getMonth(), 1).getDay(),
      last_day  : new Date(this.current.getFullYear(), this.current.getMonth() + 1, 0).getDate(),
    });

    EventActions.fetchAllEvents(this.props.params.groupId);
  },
  render() {
    let _calendarDays    = [];
    let eventsWithDays   = {};
    let dayCount         = 0;

    for (let i = 0; i < this.state.events.length; i++) {
      if (parseInt(this.state.events[i].event.start_time.split("-")[1] - 1) === this.current.getMonth()) {
        eventsWithDays[parseInt(this.state.events[i].event.start_time.split("-")[2].split("T")[0])] = this.state.events[i];
      }
    }

    buildCalendar(eventsWithDays, _calendarDays);

    let disabled = "";
    if (this.current.getMonth() === new Date().getMonth()) disabled = "hide";
    
    return(
      <div className="calendar">
        <div className="calendar-header clearfix">
          <img src={window.MeetupCloneAssets.leftCalendarArrow} className={disabled} onClick={this._prevMonth} />
          <h1>{this.state.month} {this.state.year}</h1>
          <img src={window.MeetupCloneAssets.rightCalendarArrow} onClick={this._nextMonth} />
        </div>
        <h2>
          {
            Object.keys(_days).map( day => {
              return <span className="day-name" key={day}>{_days[day]} </span>;
            })
          }
        </h2>
        <div className="days">
          {
            _calendarDays.map( day => {
              return day;
            })
          }
        </div>
      </div>
    );
  }
});

module.exports = Calendar;

function parseTime(time) {
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

  return time;
}

function buildCalendarBlock(hide, endHide, noRightBorder, j, dayCount, eventTime, eventTitle) {
  return (
    <div className={hide + " calendar-block " + endHide + " " + noRightBorder} key={j}>
    <span className="day-number">{dayCount}</span>
    { eventTime }
    { eventTitle }
    </div>
  );
}

function parseDateString(date) {
  date          = date.toDateString().split(" ").slice(0, 3);
  date[2]       = parseInt(date[2]);
  date          = date.join(" ");

  return date;
}

function buildCalendar(eventsWithDays, calendarDays) {
  for (let j = 0; j < 43; j++) {
    let eventTitle = "";
    let eventTime  = "";

    if (eventsWithDays[j]) {
      let startTime = eventsWithDays[j].event.start_time;
      let date      = new Date(startTime.split("T")[0]);
      date          = parseDateString(date);
      let time      = startTime.split("T")[1].slice(0, startTime.split("T")[1].indexOf("."));

      time = parseTime(time);

      eventTime        = <p className="calendar-event-time">{time}</p>;
      eventTitle       = <p className="calendar-event-title">{eventsWithDays[j].event.title}</p>;
    }

    let hide         = this.state.first_day > j ? "calendar-hide" : "";
    let endHide      = j > (this.state.last_day + (this.state.first_day - 1)) ? "hide" : "";
    let noRightBorder = (j + 1) % 7 === 0 ? "no-right-border" : "";
    if (hide === "" && endHide === "") dayCount++;
    if (hide !== "" || endHide !== "") dayCount = "";

    let fullBlock = buildCalendarBlock(hide, endHide, noRightBorder, j, dayCount, eventTime, eventTitle);

    _calendarDays.push(fullBlock);
  }
}
