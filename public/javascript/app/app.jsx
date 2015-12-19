import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, IndexLink, IndexRoute } from'react-router';

var containerStyle = {
  //maxWidth : '750px',
  marginLeft : 'auto',
  marginRight : 'auto',
  marginTop : '20px',
};

var activeStyle = {
  color : "#fff",
  backgroundColor: "#337ab7"
};

var App = React.createClass({
  getInitialState(){
    return{
    };
  },
  render(){
    return (
      <div style={containerStyle}>
        <div className="row">
          <div className="col-sm-3">
            <ul className="nav nav-pills nav-stacked">
              <li role="presentation" >
                <IndexLink to="" activeStyle={activeStyle}>Home</IndexLink>
              </li>
              <li role="presentation">
                <Link to="/pages" activeStyle={activeStyle}>Pages</Link>
              </li>
              <li role="presentation">
                <Link to="/blogposts" activeStyle={activeStyle}>Blog Posts</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-9">
              {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

ReactDom.render(
  <Router onUpdate={ () => window.scrollTo(0,0) }>
    <Route path="/" component={App}>
      <IndexRoute component={ require('./pages/home.jsx') } />
      <Route path="pages" >
          <IndexRoute component={require('./pages/page_pages.jsx')} />
          <Route path="create" component={ require('./pages/page_pages_create.jsx') }/>
          <Route path=":pageId" component={ require('./pages/page_pages_create.jsx') }/>
      </Route>
      <Route path="blogposts" component={require('./pages/page_blogposts.jsx')} />
      <Route path="*" component={require('./pages/home.jsx')} />
    </Route>
  </Router>,
  document.getElementById('container')
);
