'use strict';

var _ = require('underscore');
var React = require('react');
var classNames = require('classnames');
var Router = require('react-router');
var Link = Router.Link;
var createFragment = require('react-addons-create-fragment');

var PageView = require('./PageView');

var PaginationListView = React.createClass({
  displayName: 'PaginationListView',

  handlePreviousPage: function handlePreviousPage(event) {
    event.preventDefault();
    if (this.state.selected > 0) {
      this.handlePageSelected(this.state.selected - 1, event);
    }
  },

  handleNextPage: function handleNextPage(event) {
    event.preventDefault();
    if (this.state.selected < this.props.pageNum - 1) {
      this.handlePageSelected(this.state.selected + 1, event);
    }
  },
  prevButton: function prevButton() {
    var previousClasses = classNames({
      'previous': true,
      'disabled': this.state.selected === 0
    });
    var previousQuery = {
      page: this.state.selected,
      limit: this.props.limit
    };

    if (this.state.selected === 0) {
      return React.createElement(
        'li',
        { className: previousClasses },
        this.props.previousLabel
      );
    }
    return React.createElement(
      'li',
      { onClick: this.handlePreviousPage, className: previousClasses },
      React.createElement(
        Link,
        { to: { pathname: location.pathname, query: previousQuery } },
        this.props.previousLabel
      )
    );
  },

  nextButton: function nextButton() {
    var nextClasses = classNames({
      'next': true,
      'disabled': this.state.selected === this.props.pageNum - 1
    });
    var nextQuery = {
      page: this.state.selected + 2,
      limit: this.props.limit
    };

    if (this.state.selected === this.props.pageNum - 1) {
      return React.createElement(
        'li',
        { className: nextClasses },
        this.props.nextLabel
      );
    }
    return React.createElement(
      'li',
      { onClick: this.handleNextPage, className: nextClasses },
      React.createElement(
        Link,
        { to: { pathname: location.pathname, query: nextQuery } },
        this.props.nextLabel
      )
    );
  },
  render: function render() {
    var items = {};

    if (this.props.pageNum <= this.props.pageRangeDisplayed) {

      var pageViews = _.range(0, this.props.pageNum).map((function (page) {
        return React.createElement(PageView, {
          onClick: this.props.onPageSelected.bind(null, page),
          selected: this.props.selected === page,
          activeClass: this.props.activeClass,
          page: page + 1,
          location: this.props.location,
          limit: this.props.limit });
      }).bind(this));

      pageViews.forEach(function (pageView, index) {
        items['key' + index] = pageView;
      });
    } else {

      var leftSide = this.props.pageRangeDisplayed / 2;
      var rightSide = this.props.pageRangeDisplayed - leftSide;

      if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
        rightSide = this.props.pageNum - this.props.selected;
        leftSide = this.props.pageRangeDisplayed - rightSide;
      } else if (this.props.selected < this.props.pageRangeDisplayed / 2) {
        leftSide = this.props.selected;
        rightSide = this.props.pageRangeDisplayed - leftSide;
      }

      var index;
      var page;

      for (index = 0; index < this.props.pageNum; index++) {

        page = index + 1;

        var pageView = React.createElement(PageView, {
          onClick: this.props.onPageSelected.bind(null, index),
          selected: this.props.selected === index,
          activeClass: this.props.activeClass,
          page: index + 1,
          location: this.props.location,
          limit: this.props.limit });

        if (page <= this.props.marginPagesDisplayed) {
          items['key' + index] = pageView;
          continue;
        }

        if (page > this.props.pageNum - this.props.marginPagesDisplayed) {
          items['key' + index] = pageView;
          continue;
        }

        if (index >= this.props.selected - leftSide && index <= this.props.selected + rightSide) {
          items['key' + index] = pageView;
          continue;
        }

        var keys = Object.keys(items);
        var breakLabelKey = keys[keys.length - 1];
        var breakLabelValue = items[breakLabelKey];

        if (breakLabelValue !== this.props.breakLabel) {
          items['key' + index] = this.props.breakLabel;
        }
      }
    }

    return React.createElement(
      'ul',
      { className: this.props.subContainerClassName },
      this.prevButton(),
      createFragment(items),
      this.nextButton()
    );
  }
});

module.exports = PaginationListView;