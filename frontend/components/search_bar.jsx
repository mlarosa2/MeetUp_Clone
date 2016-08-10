const React          = require('react');
const GroupActions   = require('../actions/group_actions');
const GroupStore     = require('../stores/group_store');

//https://maps.googleapis.com/maps/api/geocode/json?address=Toledo&region=es&key=AIzaSyC7mHejYETsrCCXPm_ncRFkfAVxuAOS7yM SEARCH BY CITY

const SearchBar = React.createClass({
  getInitialState() {
    return({
      distance : 5,
      location : ""
    });
  },

  componentDidMount() {
    this.getLocation();
  },
  getLocation() {
    let sendString = (string) => {
      this.setState({ location : string });
    };
    navigator.geolocation.getCurrentPosition( position => {
      let locationString = "";
      let lat        = position.coords.latitude;
      let lng        = position.coords.longitude;
      $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC7mHejYETsrCCXPm_ncRFkfAVxuAOS7yM`,
        method : "GET",
        success(dat) {
          locationString += dat.results[0].address_components[3].long_name;
          locationString += ", ";
          locationString += dat.results[0].address_components[5].long_name;
          console.log(dat);
          sendString(locationString);
        }
      });
    });
  },
  render() {
    let load = "";
    if (this.state.location === "") {
      load = (<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>);
    }
    return(
      <div className="search-bar">
        <i className="fa fa-search"></i>
        <input placeholder="All Meetups"/> within <span>{this.state.distance} miles</span> of {load}<span>{this.state.location}</span>
        <div className="choose miles">
          <ul>
            <li>2 miles</li>
            <li>5 miles</li>
            <li>10 miles</li>
            <li>25 miles</li>
            <li>50 miles</li>
            <li>100 miles</li>
            <li>any distance</li>
          </ul>
        </div>
        <div className="choose location">
        </div>
      </div>
    );
  }
});

module.exports = SearchBar;
