// Libs
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import update from 'immutability-helper';
// import axios from 'axios';

// import classnames from 'classnames/bind';

// Components
import Sidebar from '../../components/Sidebar';
import FormFilter from '../../components/FormFilter';
import CardList from '../../components/CardList';

// Styles
// import styles from './style.scss';
// let cx = classnames.bind(styles);

const SpotipposAdsContainer = React.createClass({
  displayName: 'SpotipposAdsContainer',
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      data: {
        properties: [{
          id:           0,
          baths:        0,
          beds:         0,
          cardID:       0,
          description:  '',
          price:        0,
          squareMeters: 0,
          title:        ''
        }]
      },
      loading: true,
      timer: null,
      itemsQuery: {}
    };
  },

  componentDidMount(){
    const timer = setTimeout( ()=> {
      this.dataFetch('/mocks/properties.json');
    }, 2000 );

    this.setTimer(timer);
  },

  componentWillUnmount(){
    clearTimeout(this.state.timer);
  },

  dataFetch(url) {
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      this.setState({
        data: response,
        loading: false,
      });
    }.bind(this))
    .catch(function(error) {
      console.error(error);
    });
  },

  setTimer(timer) {
    this.setState({timer});
  },

  setItemsFiltered(data) {
    let items = update(this.state.itemsQuery, { $merge: {data} });
    this.setState({
      itemsQuery: items
    });
  },

  doFilter(filteredItems) {
    let query = filteredItems.data;
    let properties = this.state.data.properties;

    let typeFilters = {

      getEquals: function(obj1, obj2, key){
        return obj1[key] === obj2[key];
      }
      
    };

    function filteringCore(item){
      let result = true;

      for(var key in query) {
        switch (key) {
        case 'id':
          result = typeFilters.getEquals(item, query, 'id');
          break;
        case 'squareMeters':
          result = typeFilters.getEquals(item, query, 'squareMeters');
          break;
        case 'beds':
          result = typeFilters.getEquals(item, query, 'beds');
          break;
        case 'baths':
          result = typeFilters.getEquals(item, query, 'baths');
          break;
        case 'priceMin':
          result = (parseInt(query[key], 10) <= parseInt(item.price, 10));
          break;
        case 'priceMax':
          result = (parseInt(query[key], 10) >= parseInt(item.price, 10));
          break;
        default:
          result = true;
          break;
        }
      }

      return result;
    }

    let casas = properties.filter(filteringCore);

    return casas;
  },


  render() {
    let filteredCards = this.doFilter(this.state.itemsQuery);
    return (
      <section>
        <Sidebar />
        <FormFilter setItemsFiltered={ this.setItemsFiltered } />
        <CardList data={ filteredCards } loading={ this.state.loading } />
      </section>
    );
  }
});


export default SpotipposAdsContainer;
