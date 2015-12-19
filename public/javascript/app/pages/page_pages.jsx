const React = require('react');
import { Link } from'react-router';
const $ = require('jquery');

var Page = React.createClass({
  getInitialState(){
    return{
      data : []
    };
  },
  componentDidMount(){
    $.ajax({
      url: "/api/page",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.data});
        console.log("data came !", data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render(){

    var lines = this.state.data.map(function(item,index){
      return ( <tr>
        <td>1</td>
        <td>item.title</td>
        <td>item.updatedAt</td>
        <td>1</td>
      </tr> );
    });

    return (
      <div>
            <h2> Pages
              <Link className="btn btn-default pull-right" to="pages/create" role="button">Create New</Link>
            </h2>
          <hr/>
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Title</td>
                  <td>Created</td>
                  <td>Online</td>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
      </div>
    );
  }
});

module.exports = Page;
