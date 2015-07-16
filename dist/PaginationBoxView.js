'use strict';

var React = require('react');
var Router = require('react-router');
var classNames = require('classnames');
var PaginationListView = require('./PaginationListView');

var Link = Router.Link;

var PaginationBoxView = React.createClass({
  displayName: 'PaginationBoxView',

  propTypes: {
    pageNum: React.PropTypes.number.isRequired,
    pageRangeDisplayed: React.PropTypes.number.isRequired,
    marginPagesDisplayed: React.PropTypes.number.isRequired,
    previousLabel: React.PropTypes.node,
    nextLabel: React.PropTypes.node,
    breakLabel: React.PropTypes.node,
    clickCallback: React.PropTypes.func,
    initialSelected: React.PropTypes.number,
    forceSelected: React.PropTypes.number,
    containerClassName: React.PropTypes.string,
    subContainerClassName: React.PropTypes.string,
    activeClass: React.PropTypes.string,
    location: React.PropTypes.string,
    limit: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      pageNum: 10,
      pageRangeDisplayed: 2,
      marginPagesDisplayed: 3,
      previousLabel: 'Previous',
      nextLabel: 'Next',
      breakLabel: '...'
    };
  },

  getInitialState: function getInitialState() {
    return {
      selected: this.props.initialSelected ? this.props.initialSelected : 0
    };
  },

  handlePageSelected: function handlePageSelected(selected, event) {
    // event.preventDefault();

    if (this.state.selected === selected) return;

    this.setState({ selected: selected });

    if (typeof this.props.clickCallback !== 'undefined' && typeof this.props.clickCallback === 'function') {
      this.props.clickCallback({ selected: selected });
    }
  },

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

  render: function render() {
    var previousClasses = classNames({
      'previous': true,
      'disabled': this.state.selected === 0
    });

    var nextClasses = classNames({
      'next': true,
      'disabled': this.state.selected === this.props.pageNum - 1
    });

    var previousQuery = {
      page: this.state.selected,
      limit: this.props.limit
    };

    var nextQuery = {
      page: this.state.selected + 2,
      limit: this.props.limit
    };

    return React.createElement(
      'ul',
      { className: this.props.containerClassName },
      React.createElement(PaginationListView, {
        onPageSelected: this.handlePageSelected,
        selected: this.state.selected,
        pageNum: this.props.pageNum,
        pageRangeDisplayed: this.props.pageRangeDisplayed,
        marginPagesDisplayed: this.props.marginPagesDisplayed,
        breakLabel: this.props.breakLabel,
        subContainerClassName: this.props.subContainerClassName,
        activeClass: this.props.activeClass,
        location: this.props.location,
        limit: this.props.limit }),
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          { onClick: this.handlePreviousPage, className: previousClasses },
          React.createElement(
            Link,
            { query: previousQuery, to: location.pathname },
            this.props.previousLabel
          )
        ),
        React.createElement(
          'li',
          { onClick: this.handleNextPage, className: nextClasses },
          React.createElement(
            Link,
            { query: nextQuery, to: location.pathname },
            this.props.nextLabel
          )
        )
      )
    );
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (typeof nextProps.forceSelected !== 'undefined' && nextProps.forceSelected !== this.state.selected) {
      this.setState({ selected: nextProps.forceSelected });
    }
    if (typeof nextProps.initialSelected !== 'undefined' && nextProps.initialSelected !== null && nextProps.initialSelected !== this.state.selected) {
      this.setState({ selected: nextProps.initialSelected });
    }
  }
});

module.exports = PaginationBoxView;