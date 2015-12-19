const React = require('react');
const Spinner = require('../components/spinner.jsx');

var Home = React.createClass({
  getInitialState(){
    return{
    };
  },
  render(){
    return (
      <div>
          <h1>
            <Spinner />
          </h1>
      </div>
    );
  }
});

module.exports = Home;
