const React = require('react');

var Page = React.createClass({
  getInitialState(){
    return{

    };
  },
  handleChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  },
  render(){
    return (
      <div>
        <h1> Create Page </h1>
        <hr/>
        <form className="form-horizontal">
          <div className="form-group">
            <label
              className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}/>
            </div>
          </div>
          <div className="form-group">
            <label
              className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="check"
                    value={this.state.check}
                    onChange={this.handleChange}/> Remember me
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default">
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  });

  module.exports = Page;
