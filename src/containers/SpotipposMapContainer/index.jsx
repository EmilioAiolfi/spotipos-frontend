// Libs
import React from 'react';

// Components
import SpotipposMap from '../../components/SpotipposMap';

const SpotipposMapContainer = React.createClass({
  displayName: 'SpotipposMapContainer',

  getInitialState() {
    return {
      data: {}
    };
  },

  componentDidMount(){
    this._dataFetch('/mocks/provinces.json');
  },

  _dataFetch(url) {
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      this.setState({
        data: response
      });
    }.bind(this))
    .catch(function(error) {
      console.error(error);
    });
  },

  render() {
    return (
      <div className="main-content">
        <SpotipposMap data={ this.state.data } />
      </div>
    );
  }
});


export default SpotipposMapContainer;
