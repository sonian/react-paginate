'use strict';

var React  = require('react');
var Router = require('react-router');

var Link = Router.Link

var PageView = React.createClass({
  render: function() {
    if (this.props.selected) {
      var cssClass = this.props.activeClass || 'selected';
    }

    var query = {
      page: this.props.page,
      limit: this.props.limit
    }

    return (
      <li className={cssClass}>
        <Link {...this.props}
              to={{ pathname: this.props.location, query }}>
          {this.props.page}
        </Link>
      </li>
    );
  }
});

module.exports = PageView;
