'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var PageView = React.createClass({
  displayName: 'PageView',

  render: function render() {
    console.log(this.props);
    if (this.props.selected) {
      var cssClass = this.props.activeClass || 'selected';
    }
    return React.createElement(
      'li',
      { className: cssClass },
      React.createElement(
        Link,
        _extends({}, this.props, {
          to: this.props.location,
          query: { page: this.props.page } }),
        this.props.page
      )
    );
  }
});

module.exports = PageView;