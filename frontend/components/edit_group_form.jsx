const React          = require('react');
const GroupActions   = require('../actions/group_actions');
const GroupStore     = require('../stores/group_store');
const SessionStore   = require('../stores/session_store');
const ErrorStore     = require('../stores/error_store');
const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
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
      id           : this.props.params.groupId,
      city         : "",
      state        : "",
      title        : "",
      description  : "",
      moderator_id : "",
      errors       : []
    });
  },
  componentDidMount() {
    this.listener      = ErrorStore.addListener(this._onErrorChange);
    this.groupListener = GroupStore.addListener(this._onGroupChange);
  },
  componentWillUnmount() {
    this.listener.remove();
    this.groupListener.remove();
  },
  componentWillMount() {
    GroupActions.fetchAllGroups();
    if(SessionStore.currentUser().id !== GroupStore.find(this.props.params.groupId).group.moderator_id) {
      hashHistory.replace('/');
    }
  },
  _onGroupChange() {
    this.setState({
      city         : GroupStore.find(this.props.params.groupId).group.city,
      state        : GroupStore.find(this.props.params.groupId).group.state,
      title        : GroupStore.find(this.props.params.groupId).group.title,
      description  : GroupStore.find(this.props.params.groupId).group.description,
      moderator_id : GroupStore.find(this.props.params.groupId).group.moderator_id
    });
  },
  _onErrorChange() {
    this.setState({errors: ErrorStore.errors("CreateGroup")});
  },
  _editGroup(e) {
    e.preventDefault();
    const group = {
      id           : this.state.id,
      city         : this.state.city,
      state        : this.state.state,
      title        : this.state.title,
      description  : this.state.description,
      moderator_id : this.state.moderator_id
    };

    GroupActions.editGroup(group);
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
    if (totalErrors === 0) {
      hashHistory.replace(`/groups/${this.state.id}`);
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
  render() {
    return(
      <form className="form form-create-group">
        <div className="form-create-group-one">
          <label>
            <p>Step 1 of 3</p>
            <h2>What&#39;s your new Meetup Group&#39;s hometown?</h2>
            <input type="text" name="city" value={this.state.city} onChange={this._updateCity} className={cityErrorClass}/>
            <p className="error">{cityError}</p>
            <select name="state" value={this.state.state} onChange={this._updateState}>
              <option disabled>--State--</option>
            	<option value="AL">AL</option>
            	<option value="AK">AK</option>
            	<option value="AZ">AZ</option>
            	<option value="AR">AR</option>
            	<option value="CA">CA</option>
            	<option value="CO">CO</option>
            	<option value="CT">CT</option>
            	<option value="DE">DE</option>
            	<option value="DC">DC</option>
            	<option value="FL">FL</option>
            	<option value="GA">GA</option>
            	<option value="HI">HI</option>
            	<option value="ID">ID</option>
            	<option value="IL">IL</option>
            	<option value="IN">IN</option>
            	<option value="IA">IA</option>
            	<option value="KS">KS</option>
            	<option value="KY">KY</option>
            	<option value="LA">LA</option>
            	<option value="ME">ME</option>
            	<option value="MD">MD</option>
            	<option value="MA">MA</option>
            	<option value="MI">MI</option>
            	<option value="MN">MN</option>
            	<option value="MS">MS</option>
            	<option value="MO">MO</option>
            	<option value="MT">MT</option>
            	<option value="NE">NE</option>
            	<option value="NV">NV</option>
            	<option value="NH">NH</option>
            	<option value="NJ">NJ</option>
            	<option value="NM">NM</option>
            	<option value="NY">NY</option>
            	<option value="NC">NC</option>
            	<option value="ND">ND</option>
            	<option value="OH">OH</option>
            	<option value="OK">OK</option>
            	<option value="OR">OR</option>
            	<option value="PA">PA</option>
            	<option value="RI">RI</option>
            	<option value="SC">SC</option>
            	<option value="SD">SD</option>
            	<option value="TN">TN</option>
            	<option value="TX">TX</option>
            	<option value="UT">UT</option>
            	<option value="VT">VT</option>
            	<option value="VA">VA</option>
            	<option value="WA">WA</option>
            	<option value="WV">WV</option>
            	<option value="WI">WI</option>
            	<option value="WY">WY</option>
            </select>
          </label>
        </div>
        <div className="form-create-group-two">
          <label>
            <p>Step 2 of 3</p>
            <h2>What will your Meetup&#39;s name be?</h2>
            <input type="text" name="title" value={this.state.title} onChange={this._updateTitle} className={titleErrorClass}/>
            <p className="error">{titleError}</p>
            <h2>Describe who should join, and what your Meetup will do.</h2>
            <textarea name="description" value={this.state.description} onChange={this._updateDescription} className={descriptionErrorClass} />
            <p className="error">{descriptionError}</p>
          </label>
        </div>
        <div className="form-create-group-three">
          <p>Step 3 of 3</p>
          <h2>What it means to be a Meetup</h2>
          <ul>
            <li>Real, in-person conversations</li>
            <li>Open and honest intentions</li>
            <li>Always safe and respectful</li>
            <li>Put your members first</li>
          </ul>
          <button onClick={this._editGroup}>Agree &amp; Continue</button>
        </div>
      </form>
    );
  }
});

module.exports = CreateGroup;
