const React        = require('react');
const EventStore   = require('../stores/event_store');
const EventActions = require('../actions/event_actions');

function daysInMonth(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}
const _months = {
  0 : "January", 1 : "February", 2 : "March", 3 : "April", 4 : "May", 5 : "June",
  6 : "July", 7 : "August", 8 : "September", 9 : "October", 10 : "November", 11 : "December"
};

const _days = {
  0 : "Sunday", 1 : "Monday", 2 : "Tuesday", 3 : "Wednesday", 4 : "Thursday",
  5 : "Friday", 6 : "Saturday"
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
    let dayCount = 0;

    for (let i = 0; i < this.state.events.length; i++) {
      if (parseInt(this.state.events[i].event.start_time.split("-")[1] - 1) === this.current.getMonth()) {
        eventsWithDays[parseInt(this.state.events[i].event.start_time.split("-")[2].split("T")[0])] = this.state.events[i];
      }
    }


    for (let j = 0; j < 43; j++) {

      let hide     = this.state.first_day > j ? "calendar-hide" : "";
      let endHide  = j > (this.state.last_day + (this.state.first_day - 1)) ? "hide" : "";

      if (hide === "" && endHide === "") dayCount++;

      let eventTitle       = "";
      let eventDescription = "";
      if (eventsWithDays[j]) {
        eventTitle       = <span className="calendar-event-title">{eventsWithDays[j].event.title}</span>;
        eventDescription = <span className="calendar-event-description">{eventsWithDays[j].event.description.slice(0, 50) + "..."}</span>;
      }

      let fullBlock = (
        <div className={hide + " calendar-block " + endHide} key={j}>
        <span className="day-number">{dayCount}</span>
        { eventTitle }
        { eventDescription }
        </div>
      );

      _calendarDays.push(fullBlock);
    }

    let disabled = "";
    if (this.current.getMonth() === new Date().getMonth()) disabled = "disabled"
    return(
      <div className="calendar">
        <div className="calendar-header">
          <h1>{this.state.month} {this.state.year}</h1>
          <button onClick={this._nextMonth}>Next Month</button>
          <button className={disabled} onClick={this._prevMonth}>Previous Month</button>
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
