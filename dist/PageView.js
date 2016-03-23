'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var PageView = React.createClass({
  displayName: 'PageView',

  render: function render() {
    if (this.props.selected) {
      var cssClass = this.props.activeClass || 'selected';
    }

    var query = {
      page: this.props.page,
      limit: this.props.limit
    };

    return React.createElement(
      'li',
      { className: cssClass },
      React.createElement(
        Link,
        _extends({}, this.props, {
          to: { pathname: this.props.location, query: query } }),
        this.props.page
      )
    );
  }
});

module.exports = PageView;