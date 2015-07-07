'use strict';

var React  = require('react');
var Router = require('react-router');

var Link = Router.Link

var PageView = React.createClass({
  render: function() {
    if (this.props.selected) {
      var cssClass = this.props.activeClass || 'selected';
    }
    return (
      <li className={cssClass}>
        <Link {...this.props}
              to={this.props.location}
              query={{page: this.props.page}}>
          {this.props.page}
        </Link>
      </li>
    );
  }
});

module.exports = PageView;
