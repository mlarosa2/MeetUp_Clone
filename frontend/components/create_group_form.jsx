const React          = require('react');
const GroupActions   = require('../actions/group_actions');
const GroupStore     = require('../stores/group_store');
const SessionStore   = require('../stores/session_store');
const ErrorStore     = require('../stores/error_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;

let cityError             = "";
let cityErrorClass        = "";
let stateError            = "";
let titleError            = "";
let titleErrorClass       = "";
let descriptionError      = "";
let descriptionErrorClass = "";

const CreateGroup = React.createClass({
  getInitialState() {
    return({
      city         : "",
      state        : "",
      title        : "",
      description  : "",
      moderator_id : SessionStore.currentUser().id,
      errors       : []
    });
  },
  componentDidMount() {
    this.listener = ErrorStore.addListener(this._onErrorChange);
    this.groupListener = GroupStore.addListener(this._onGroupChange);
  },
  componentWillUnmount() {
    this.listener.remove();
    this.groupListener.remove();
  },
  _onErrorChange() {
    this.setState({errors: ErrorStore.errors("CreateGroup")});
  },
  _onGroupChange() {
    let group = GroupStore.all();
    group = GroupStore.all()[group.length - 1];
    hashHistory.replace(`groups/${group.group.id}`);
  },
  _showStepTwo(e) {
    e.preventDefault();
    jQuery(e.target).addClass('hide');
    jQuery('.form-create-group-two').removeClass('hide');
  },
  _showStepThree(e) {
    e.preventDefault();
    jQuery(e.target).addClass('hide');
    jQuery('.form-create-group-three').removeClass('hide');
  },
  _createGroup(e) {
    e.preventDefault();
    const group = {
      city         : this.state.city,
      state        : this.state.state,
      title        : this.state.title,
      description  : this.state.description,
      moderator_id : this.state.moderator_id
    };

    GroupActions.createGroup(group);

    let totalErrors       = 0;
    cityError             = "";
    cityErrorClass        = "";
    stateError            = "";
    titleError            = "";
    titleErrorClass       = "";
    descriptionError      = "";
    descriptionErrorClass = "";

    if (this.state.city === "") {
      cityError      = "Please provide a city.";
      cityErrorClass = "error-input";
      totalErrors++;
    }
    if (this.state.state === "" || this.state.state === "--Select--") {
      stateError = "Please select a state";
      totalErrors++;
    }
    if (this.state.title === "") {
      titleError      = "Please give your Meetup a name";
      titleErrorClass = "error-input";
      totalErrors++;
    }
    if (this.state.description === "") {
      descriptionError      = "Please provide a description of your Meetup.";
      descriptionErrorClass = "error-input";
      totalErrors++;
    }
  },
  _updateCity(e) {
    this.setState({ city: e.target.value });
  },
  _updateState(e) {
    this.setState({ state: e.target.value });
  },
  _updateTitle(e) {
    this.setState({ title: e.target.value });
  },
  _updateDescription(e) {
    this.setState({ description: e.target.value });
  },
  render(e) {
    return(
      <form className="form form-create-group">
        <div className="form-create-group-one">
          <label>
            <p>Step 1 of 3</p>
            <h2>What&#39;s your new Meetup Group&#39;s hometown?</h2>
            <input type="text" name="city" defaultValue="" placeholder="City" onChange={this._updateCity} className={cityErrorClass}/>
            <p className="error">{cityError}</p>
            <select name="state" defaultValue="--State--" onChange={this._updateState}>
              <option disabled>--State--</option>
            	<option defaultValue="AL">AL</option>
            	<option defaultValue="AK">AK</option>
            	<option defaultValue="AZ">AZ</option>
            	<option defaultValue="AR">AR</option>
            	<option defaultValue="CA">CA</option>
            	<option defaultValue="CO">CO</option>
            	<option defaultValue="CT">CT</option>
            	<option defaultValue="DE">DE</option>
            	<option defaultValue="DC">DC</option>
            	<option defaultValue="FL">FL</option>
            	<option defaultValue="GA">GA</option>
            	<option defaultValue="HI">HI</option>
            	<option defaultValue="ID">ID</option>
            	<option defaultValue="IL">IL</option>
            	<option defaultValue="IN">IN</option>
            	<option defaultValue="IA">IA</option>
            	<option defaultValue="KS">KS</option>
            	<option defaultValue="KY">KY</option>
            	<option defaultValue="LA">LA</option>
            	<option defaultValue="ME">ME</option>
            	<option defaultValue="MD">MD</option>
            	<option defaultValue="MA">MA</option>
            	<option defaultValue="MI">MI</option>
            	<option defaultValue="MN">MN</option>
            	<option defaultValue="MS">MS</option>
            	<option defaultValue="MO">MO</option>
            	<option defaultValue="MT">MT</option>
            	<option defaultValue="NE">NE</option>
            	<option defaultValue="NV">NV</option>
            	<option defaultValue="NH">NH</option>
            	<option defaultValue="NJ">NJ</option>
            	<option defaultValue="NM">NM</option>
            	<option defaultValue="NY">NY</option>
            	<option defaultValue="NC">NC</option>
            	<option defaultValue="ND">ND</option>
            	<option defaultValue="OH">OH</option>
            	<option defaultValue="OK">OK</option>
            	<option defaultValue="OR">OR</option>
            	<option defaultValue="PA">PA</option>
            	<option defaultValue="RI">RI</option>
            	<option defaultValue="SC">SC</option>
            	<option defaultValue="SD">SD</option>
            	<option defaultValue="TN">TN</option>
            	<option defaultValue="TX">TX</option>
            	<option defaultValue="UT">UT</option>
            	<option defaultValue="VT">VT</option>
            	<option defaultValue="VA">VA</option>
            	<option defaultValue="WA">WA</option>
            	<option defaultValue="WV">WV</option>
            	<option defaultValue="WI">WI</option>
            	<option defaultValue="WY">WY</option>
            </select>
          </label>
          <button onClick={this._showStepTwo}>Next</button>
        </div>
        <div className="form-create-group-two hide">
          <label>
            <p>Step 2 of 3</p>
            <h2>What will your Meetup&#39;s name be?</h2>
            <input type="text" name="title" defaultValue="" onChange={this._updateTitle} className={titleErrorClass}/>
            <p className="error">{titleError}</p>
            <h2>Describe who should join, and what your Meetup will do.</h2>
            <textarea name="description" onChange={this._updateDescription} className={descriptionErrorClass}></textarea>
            <p className="error">{descriptionError}</p>
          </label>
          <button onClick={this._showStepThree}>Next</button>
        </div>
        <div className="form-create-group-three hide">
          <p>Step 3 of 3</p>
          <h2>What it means to be a Meetup</h2>
          <ul>
            <li>Real, in-person conversations</li>
            <li>Open and honest intentions</li>
            <li>Always safe and respectful</li>
            <li>Put your members first</li>
          </ul>
          <button onClick={this._createGroup}>Agree &amp; Continue</button>
        </div>
      </form>
    );
  }
});

module.exports = CreateGroup;
