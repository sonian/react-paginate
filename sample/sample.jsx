'use strict';

var React         = require('react');
var ReactPaginate = require('./../react_components/react-paginate');
var $             = require('jquery');
var Router        = require('react-router');
var Route         = Router.Route

window.React = React;

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        <div key={index}>{comment.comment}</div>
      );
    });
    return (
      <div id="project-comments" className="commentList">
        <ul>
          {commentNodes}
        </ul>
      </div>
    );
  }
});

var App = React.createClass({

  loadCommentsFromServer: function() {
    $.ajax({
      url      : 'http://localhost:3000/comments',
      data     : {limit: 10, offset: this.state.offset},
      dataType : 'json',
      type     : 'GET',

      success: function(data) {
        this.setState({data: data.comments, pageNum: Math.ceil(data.meta.total_count / data.meta.limit)});
      }.bind(this),

      error: function(xhr, status, err) {
        console.error('http://localhost:3000/comments', status, err.toString());
      }.bind(this)
    });
  },

  handlePageClick: function(data) {
    var selected = data.selected;
    var offset = Math.ceil(selected * 10);

    this.setState({offset: offset}, function() {
      this.loadCommentsFromServer();
    }.bind(this));

    this.loadCommentsFromServer();
  },

  getInitialState: function() {
    return {data: [], offset: 0};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
  },

  render: function () {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClass={"active"}
                       location={location.pathname}
                       limit={20} />
      </div>
    );
  }
});

var routes = (
  <Route handler={AppContainer}>
    <Route path="/" handler={App}/>
  </Route>
);

var AppContainer = React.createClass({
  render () {
    return (
      <div>
        <RouteHandler />
      </div>
    );
  }
});

Router.run(routes, function (Root) {
  React.render(<Root />, document.getElementById('react-paginate'));
});
