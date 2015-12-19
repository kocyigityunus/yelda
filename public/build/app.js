(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerStyle = {
  //maxWidth : '750px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '20px'
};

var activeStyle = {
  color: "#fff",
  backgroundColor: "#337ab7"
};

var App = _react2.default.createClass({
  displayName: 'App',
  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { style: containerStyle },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-sm-3' },
          _react2.default.createElement(
            'ul',
            { className: 'nav nav-pills nav-stacked' },
            _react2.default.createElement(
              'li',
              { role: 'presentation' },
              _react2.default.createElement(
                _reactRouter.IndexLink,
                { to: '', activeStyle: activeStyle },
                'Home'
              )
            ),
            _react2.default.createElement(
              'li',
              { role: 'presentation' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/pages', activeStyle: activeStyle },
                'Pages'
              )
            ),
            _react2.default.createElement(
              'li',
              { role: 'presentation' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/blogposts', activeStyle: activeStyle },
                'Blog Posts'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-sm-9' },
          this.props.children
        )
      )
    );
  }
});

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { onUpdate: function onUpdate() {
      return window.scrollTo(0, 0);
    } },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: App },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: require('./pages/home.jsx') }),
    _react2.default.createElement(
      _reactRouter.Route,
      { path: 'pages' },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: require('./pages/page_pages.jsx') }),
      _react2.default.createElement(_reactRouter.Route, { path: 'create', component: require('./pages/page_pages_create.jsx') }),
      _react2.default.createElement(_reactRouter.Route, { path: ':pageId', component: require('./pages/page_pages_create.jsx') })
    ),
    _react2.default.createElement(_reactRouter.Route, { path: 'blogposts', component: require('./pages/page_blogposts.jsx') }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: require('./pages/home.jsx') })
  )
), document.getElementById('container'));

},{"./pages/home.jsx":3,"./pages/page_blogposts.jsx":4,"./pages/page_pages.jsx":5,"./pages/page_pages_create.jsx":6,"react":undefined,"react-dom":undefined,"react-router":undefined}],2:[function(require,module,exports){
"use strict";

var React = require('react');

var Spinner = React.createClass({
  displayName: "Spinner",
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "sk-cube-grid" },
        React.createElement("div", { className: "sk-cube sk-cube1" }),
        React.createElement("div", { className: "sk-cube sk-cube2" }),
        React.createElement("div", { className: "sk-cube sk-cube3" }),
        React.createElement("div", { className: "sk-cube sk-cube4" }),
        React.createElement("div", { className: "sk-cube sk-cube5" }),
        React.createElement("div", { className: "sk-cube sk-cube6" }),
        React.createElement("div", { className: "sk-cube sk-cube7" }),
        React.createElement("div", { className: "sk-cube sk-cube8" }),
        React.createElement("div", { className: "sk-cube sk-cube9" })
      )
    );
  }
});

module.exports = Spinner;

},{"react":undefined}],3:[function(require,module,exports){
'use strict';

var React = require('react');
var Spinner = require('../components/spinner.jsx');

var Home = React.createClass({
  displayName: 'Home',
  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        React.createElement(Spinner, null)
      )
    );
  }
});

module.exports = Home;

},{"../components/spinner.jsx":2,"react":undefined}],4:[function(require,module,exports){
'use strict';

var React = require('react');

var Page = React.createClass({
  displayName: 'Page',
  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        ' Page  - Blog Posts '
      )
    );
  }
});

module.exports = Page;

},{"react":undefined}],5:[function(require,module,exports){
'use strict';

var _reactRouter = require('react-router');

var React = require('react');

var $ = require('jquery');

var Page = React.createClass({
  displayName: 'Page',
  getInitialState: function getInitialState() {
    return {
      data: []
    };
  },
  componentDidMount: function componentDidMount() {
    $.ajax({
      url: "/api/page",
      dataType: 'json',
      cache: false,
      success: (function (data) {
        this.setState({ data: data.data });
        console.log("data came !", data);
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  render: function render() {

    var lines = this.state.data.map(function (item, index) {
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          '1'
        ),
        React.createElement(
          'td',
          null,
          'item.title'
        ),
        React.createElement(
          'td',
          null,
          'item.updatedAt'
        ),
        React.createElement(
          'td',
          null,
          '1'
        )
      );
    });

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h2',
        null,
        ' Pages',
        React.createElement(
          _reactRouter.Link,
          { className: 'btn btn-default pull-right', to: 'pages/create', role: 'button' },
          'Create New'
        )
      ),
      React.createElement('hr', null),
      React.createElement(
        'table',
        { className: 'table table-striped' },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              null,
              '#'
            ),
            React.createElement(
              'td',
              null,
              'Title'
            ),
            React.createElement(
              'td',
              null,
              'Created'
            ),
            React.createElement(
              'td',
              null,
              'Online'
            )
          )
        ),
        React.createElement('tbody', null)
      )
    );
  }
});

module.exports = Page;

},{"jquery":undefined,"react":undefined,"react-router":undefined}],6:[function(require,module,exports){
"use strict";

var React = require('react');

var Page = React.createClass({
  displayName: "Page",
  getInitialState: function getInitialState() {
    return {};
  },
  handleChange: function handleChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        " Create Page "
      ),
      React.createElement("hr", null),
      React.createElement(
        "form",
        { className: "form-horizontal" },
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            {
              className: "col-sm-2 control-label" },
            "Email"
          ),
          React.createElement(
            "div",
            { className: "col-sm-10" },
            React.createElement("input", {
              type: "email",
              className: "form-control",
              placeholder: "Email",
              name: "email",
              value: this.state.email,
              onChange: this.handleChange })
          )
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            {
              className: "col-sm-2 control-label" },
            "Password"
          ),
          React.createElement(
            "div",
            { className: "col-sm-10" },
            React.createElement("input", {
              type: "password",
              className: "form-control",
              placeholder: "Password",
              name: "password",
              value: this.state.password,
              onChange: this.handleChange })
          )
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "div",
            { className: "col-sm-offset-2 col-sm-10" },
            React.createElement(
              "div",
              { className: "checkbox" },
              React.createElement(
                "label",
                null,
                React.createElement("input", {
                  type: "checkbox",
                  name: "check",
                  value: this.state.check,
                  onChange: this.handleChange }),
                " Remember me"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "div",
            { className: "col-sm-offset-2 col-sm-10" },
            React.createElement(
              "button",
              { type: "submit", className: "btn btn-default" },
              "Sign in"
            )
          )
        )
      )
    );
  }
});

module.exports = Page;

},{"react":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvamF2YXNjcmlwdC9hcHAvYXBwLmpzeCIsInB1YmxpYy9qYXZhc2NyaXB0L2FwcC9jb21wb25lbnRzL3NwaW5uZXIuanN4IiwicHVibGljL2phdmFzY3JpcHQvYXBwL3BhZ2VzL2hvbWUuanN4IiwicHVibGljL2phdmFzY3JpcHQvYXBwL3BhZ2VzL3BhZ2VfYmxvZ3Bvc3RzLmpzeCIsInB1YmxpYy9qYXZhc2NyaXB0L2FwcC9wYWdlcy9wYWdlX3BhZ2VzLmpzeCIsInB1YmxpYy9qYXZhc2NyaXB0L2FwcC9wYWdlcy9wYWdlX3BhZ2VzX2NyZWF0ZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0lBLElBQUksY0FBYyxHQUFHOztBQUVuQixZQUFVLEVBQUcsTUFBTTtBQUNuQixhQUFXLEVBQUcsTUFBTTtBQUNwQixXQUFTLEVBQUcsTUFBTTtDQUNuQixDQUFDOztBQUVGLElBQUksV0FBVyxHQUFHO0FBQ2hCLE9BQUssRUFBRyxNQUFNO0FBQ2QsaUJBQWUsRUFBRSxTQUFTO0NBQzNCLENBQUM7O0FBRUYsSUFBSSxHQUFHLEdBQUcsZ0JBQU0sV0FBVyxDQUFDOztBQUMxQixpQkFBZSw2QkFBRTtBQUNmLFdBQU0sRUFDTCxDQUFDO0dBQ0g7QUFDRCxRQUFNLG9CQUFFO0FBQ04sV0FDRTs7UUFBSyxLQUFLLEVBQUUsY0FBYyxBQUFDO01BQ3pCOztVQUFLLFNBQVMsRUFBQyxLQUFLO1FBQ2xCOztZQUFLLFNBQVMsRUFBQyxVQUFVO1VBQ3ZCOztjQUFJLFNBQVMsRUFBQywyQkFBMkI7WUFDdkM7O2dCQUFJLElBQUksRUFBQyxjQUFjO2NBQ3JCOzZCQTFCYyxTQUFTO2tCQTBCWixFQUFFLEVBQUMsRUFBRSxFQUFDLFdBQVcsRUFBRSxXQUFXLEFBQUM7O2VBQWlCO2FBQ3hEO1lBQ0w7O2dCQUFJLElB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QUFLLEFBQUM7QUFDeEIsMEJBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxBQUFDLEdBQUU7O2VBQ3hCO2FBQ0o7V0FDRjtTQUNGO1FBQ047O1lBQUssU0FBUyxFQUFDLFlBQVk7VUFDekI7O2NBQUssU0FBUyxFQUFDLDJCQUEyQjtZQUN4Qzs7Z0JBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsaUJBQWlCOzthQUV4QztXQUNMO1NBQ0Y7T0FDRDtLQUNILENBQ047R0FDSDtDQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RG9tIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBMaW5rLCBJbmRleExpbmssIEluZGV4Um91dGUgfSBmcm9tJ3JlYWN0LXJvdXRlcic7XG5cbnZhciBjb250YWluZXJTdHlsZSA9IHtcbiAgLy9tYXhXaWR0aCA6ICc3NTBweCcsXG4gIG1hcmdpbkxlZnQgOiAnYXV0bycsXG4gIG1hcmdpblJpZ2h0IDogJ2F1dG8nLFxuICBtYXJnaW5Ub3AgOiAnMjBweCcsXG59O1xuXG52YXIgYWN0aXZlU3R5bGUgPSB7XG4gIGNvbG9yIDogXCIjZmZmXCIsXG4gIGJhY2tncm91bmRDb2xvcjogXCIjMzM3YWI3XCJcbn07XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSgpe1xuICAgIHJldHVybntcbiAgICB9O1xuICB9LFxuICByZW5kZXIoKXtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17Y29udGFpbmVyU3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTNcIj5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXBpbGxzIG5hdi1zdGFja2VkXCI+XG4gICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgPlxuICAgICAgICAgICAgICAgIDxJbmRleExpbmsgdG89XCJcIiBhY3RpdmVTdHlsZT17YWN0aXZlU3R5bGV9PkhvbWU8L0luZGV4TGluaz5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cbiAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9wYWdlc1wiIGFjdGl2ZVN0eWxlPXthY3RpdmVTdHlsZX0+UGFnZXM8L0xpbms+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgPExpbmsgdG89XCIvYmxvZ3Bvc3RzXCIgYWN0aXZlU3R5bGU9e2FjdGl2ZVN0eWxlfT5CbG9nIFBvc3RzPC9MaW5rPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS05XCI+XG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5SZWFjdERvbS5yZW5kZXIoXG4gIDxSb3V0ZXIgb25VcGRhdGU9eyAoKSA9PiB3aW5kb3cuc2Nyb2xsVG8oMCwwKSB9PlxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfT5cbiAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17IHJlcXVpcmUoJy4vcGFnZXMvaG9tZS5qc3gnKSB9IC8+XG4gICAgICA8Um91dGUgcGF0aD1cInBhZ2VzXCIgPlxuICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17cmVxdWlyZSgnLi9wYWdlcy9wYWdlX3BhZ2VzLmpzeCcpfSAvPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiY3JlYXRlXCIgY29tcG9uZW50PXsgcmVxdWlyZSgnLi9wYWdlcy9wYWdlX3BhZ2VzX2NyZWF0ZS5qc3gnKSB9Lz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIjpwYWdlSWRcIiBjb21wb25lbnQ9eyByZXF1aXJlKCcuL3BhZ2VzL3BhZ2VfcGFnZXNfY3JlYXRlLmpzeCcpIH0vPlxuICAgICAgPC9Sb3V0ZT5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiYmxvZ3Bvc3RzXCIgY29tcG9uZW50PXtyZXF1aXJlKCcuL3BhZ2VzL3BhZ2VfYmxvZ3Bvc3RzLmpzeCcpfSAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCIqXCIgY29tcG9uZW50PXtyZXF1aXJlKCcuL3BhZ2VzL2hvbWUuanN4Jyl9IC8+XG4gICAgPC9Sb3V0ZT5cbiAgPC9Sb3V0ZXI+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbik7XG4iLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBTcGlubmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKXtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzay1jdWJlLWdyaWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZTFcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZTJcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZTNcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZTRcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZTVcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZTZcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZTdcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZThcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNrLWN1YmUgc2stY3ViZTlcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcGlubmVyO1xuIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuY29uc3QgU3Bpbm5lciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc3Bpbm5lci5qc3gnKTtcblxudmFyIEhvbWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSgpe1xuICAgIHJldHVybntcbiAgICB9O1xuICB9LFxuICByZW5kZXIoKXtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgICA8aDE+XG4gICAgICAgICAgICA8U3Bpbm5lciAvPlxuICAgICAgICAgIDwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lO1xuIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgUGFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlKCl7XG4gICAgcmV0dXJue1xuICAgIH07XG4gIH0sXG4gIHJlbmRlcigpe1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT4gUGFnZSAgLSBCbG9nIFBvc3RzIDwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlO1xuIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuaW1wb3J0IHsgTGluayB9IGZyb20ncmVhY3Qtcm91dGVyJztcbmNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxudmFyIFBhZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSgpe1xuICAgIHJldHVybntcbiAgICAgIGRhdGEgOiBbXVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogXCIvYXBpL3BhZ2VcIixcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IGRhdGEuZGF0YX0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImRhdGEgY2FtZSAhXCIsIGRhdGEpO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyKCl7XG5cbiAgICB2YXIgbGluZXMgPSB0aGlzLnN0YXRlLmRhdGEubWFwKGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xuICAgICAgcmV0dXJuICggPHRyPlxuICAgICAgICA8dGQ+MTwvdGQ+XG4gICAgICAgIDx0ZD5pdGVtLnRpdGxlPC90ZD5cbiAgICAgICAgPHRkPml0ZW0udXBkYXRlZEF0PC90ZD5cbiAgICAgICAgPHRkPjE8L3RkPlxuICAgICAgPC90cj4gKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgyPiBQYWdlc1xuICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodFwiIHRvPVwicGFnZXMvY3JlYXRlXCIgcm9sZT1cImJ1dHRvblwiPkNyZWF0ZSBOZXc8L0xpbms+XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDxoci8+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRkPiM8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPlRpdGxlPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD5DcmVhdGVkPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD5PbmxpbmU8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlO1xuIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgUGFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlKCl7XG4gICAgcmV0dXJue1xuXG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlQ2hhbmdlKGUpIHtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG4gICAgbmV4dFN0YXRlW2UudGFyZ2V0Lm5hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXh0U3RhdGUpO1xuICB9LFxuICByZW5kZXIoKXtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPiBDcmVhdGUgUGFnZSA8L2gxPlxuICAgICAgICA8aHIvPlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWhvcml6b250YWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjb2wtc20tMiBjb250cm9sLWxhYmVsXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTBcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZW1haWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjb2wtc20tMiBjb250cm9sLWxhYmVsXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTBcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLW9mZnNldC0yIGNvbC1zbS0xMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJjaGVja1wiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmNoZWNrfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9Lz4gUmVtZW1iZXIgbWVcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICBTaWduIGluXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFBhZ2U7XG4iXX0=
