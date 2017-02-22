// Libs
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames/bind';

import Card from '../Card';
import CardLoader from '../CardLoader';


// Styles
import styles from './style.scss';
let cx = classnames.bind(styles);


const CardList = React.createClass({
  displayName: 'CardList',

  propTypes: {
    data:     PropTypes.array,
    loading:  PropTypes.bool,
  },

  mixins: [PureRenderMixin],


  getDefaultProps() {
    return {
      data: [{}],
      loading: true,
    };
  },

  render() {
    let properties = this.props.data.map(function(item, index) {
      return (
        <Card
          key={ index }
          cardID={ item.id }
          title={ item.title }
          description={ item.description }
          squareMeters={ item.squareMeters }
          beds={ item.beds }
          baths={ item.baths }
          currency={ 'R$' }
          price={ item.price }
          buttonTitle={ 'Visualizar Anúncio'} />
      );
    });

    let component;
    const transitionAppear = true;

    if (this.props.loading) {
      component = <CardLoader key={1} />;
    } else {
      component = properties;
    }

    return (
      <ReactCSSTransitionGroup
        className={ cx('card-list') }
        transitionName='crossfade'
        transitionAppear={ transitionAppear }
        transitionLeave={ transitionAppear }
        transitionEnterTimeout={ 200 }
        transitionAppearTimeout={ 600 }
        transitionLeaveTimeout={ 200 }
        component='div'
        aria-busy={ this.props.loading }>
        { component }
      </ReactCSSTransitionGroup>

    );
  }

});


export default CardList;
