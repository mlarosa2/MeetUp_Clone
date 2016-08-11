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
  5 : "Friday", 6 : "Saturday", 7 : "Sunday"
};

const Calendar   = React.createClass({
  getInitialState() {
    const current = new Date();
    return({
      year  : current.getFullYear(),
      month : _months[current.getMonth()],
      day   : _days[current.getDay()]
    });
  },
  componentDidMount() {},
  render() {
    return(
      <div className="calendar">
        here it is :)
      </div>
    );
  }
});

module.exports = Calendar;
