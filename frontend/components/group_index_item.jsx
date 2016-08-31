const React          = require('react');
const GroupActions   = require('../actions/session_actions');
const GroupStore     = require('../stores/session_store');
const ReactRouter    = require('react-router');
const hashHistory    = ReactRouter.hashHistory;
const Link           = ReactRouter.Link;

const GroupIndexItem = React.createClass({
  _goToGroup(e) {
    e.preventDefault();
    hashHistory.push(`/${this.props.group.id}`);
  },
  render() {
    const image_url = this.props.group.image_url;
    const divStyle = { backgroundImage: 'url(' + image_url + ')' };
    return(
      <div className="group" onClick={this._goToGroup} style={divStyle}>
        <div className="group-title">
          <h3>{ this.props.group.title }</h3>
          <p>We are { this.props.group.members } Members</p>
        </div>
        <div className="group-link">
          <span className="fa-stack">
            <i className="fa fa-circle-thin fa-stack-2x"></i>
            <i className="fa fa-plus fa-stack-1x"></i>
          </span>
        </div>
      </div>
    );
  }
});

module.exports = GroupIndexItem;
