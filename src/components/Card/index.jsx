// Libs
import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames/bind';

import Badge from '../Badges';
import { FlatButton } from '../Buttons';
import Icon from '../IconsSVG';


// Styles
import styles from './style.scss';
let cx = classnames.bind(styles);

const Card = React.createClass({
  displayName: 'Card',

  propTypes: {
    baths:        PropTypes.number.isRequired,
    beds:         PropTypes.number.isRequired,
    buttonTitle:  PropTypes.string.isRequired,
    cardID:       PropTypes.number.isRequired,
    currency:     PropTypes.string.isRequired,
    description:  PropTypes.string.isRequired,
    price:        PropTypes.number.isRequired,
    squareMeters: PropTypes.number.isRequired,
    title:        PropTypes.string.isRequired,
  },

  mixins: [PureRenderMixin],

  renderCardContainer() {
    const activeFloating = true;

    return (
      <div className={ cx('card-container') }>

        <CardHighlight link={'#'}>
          <CardImage dataImages={ 'http://placehold.it/297x224' } />
          <CardPrice
            currency={ this.props.currency }
            price={ this.props.price }
            floating={ activeFloating }
            left={ 10 }
            bottom={ 10 }
            />
        </CardHighlight>

        <div className={ cx('card-content') }>
          <CardHeader cardID={ this.props.cardID } title={ this.props.title } />
          <CardBody description={ this.props.description } />
          <CardFooter
            baths={ this.props.baths }
            beds={ this.props.beds }
            buttonTitle={ this.props.buttonTitle }
            squareMeters={ this.props.squareMeters }
          />
        </div>
      </div>
    );
  },


  render() {
    return (
      <article className={ cx('card') }>
        { this.renderCardContainer() }
      </article>
    );
  }
});


const CardHighlight = React.createClass({
  displayName: 'CardHighlight',

  propTypes: {
    children: PropTypes.node,
    link:     PropTypes.string.isRequired,
  },

  mixins: [PureRenderMixin],

  render() {
    return (
      <a href={ this.props.link } className={ cx('card-highlight') }>
        { this.props.children }
      </a>
    );
  }
});


const CardImage = React.createClass({
  displayName: 'CardImage',

  propTypes: {
    dataImages: PropTypes.string.isRequired,
  },

  mixins: [PureRenderMixin],

  render() {
    const { dataImages } = this.props;

    return (
      <img src={ dataImages } />
    );
  }
});


const CardPrice = React.createClass({
  displayName: 'CardPrice',

  propTypes: {
    bottom:   PropTypes.number,
    currency: PropTypes.string.isRequired,
    floating: PropTypes.bool,
    left:     PropTypes.number,
    price:    PropTypes.number.isRequired,
    right:    PropTypes.number,
    top:      PropTypes.number,
  },

  mixins: [PureRenderMixin],

  render() {
    const style = {
      top:    this.props.top,
      bottom: this.props.bottom,
      left:   this.props.left,
      right:  this.props.right,
    };

    const classCardPrice = cx('card-price', {
      'active-floating': this.props.floating,
    });

    const nf = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return (
      <div className={ classCardPrice } style={style}>
        <span className={ cx('card-price-value') }>{ `${this.props.currency } ${ nf.format(this.props.price) }` }</span>
      </div>
    );
  }
});



const CardHeader = React.createClass({
  displayName: 'CardHeader',

  propTypes: {
    cardID: PropTypes.number.isRequired,
    title:  PropTypes.string.isRequired,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      cardID : 0,
      title : '',
    };
  },

  render() {
    const { cardID, title } = this.props;

    return (
      <header className={ cx('card-header') }>
        <Badge>{`ID. ${cardID}`}</Badge>
        <h2 className={ cx('card-title') }>
          <a className={ cx('card-link') } href="#">
            { title }
          </a>
        </h2>
      </header>
    );
  }
});



const CardBody = React.createClass({
  displayName: 'CardBody',

  propTypes: {
    description: PropTypes.string.isRequired,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      description : '',
    };
  },

  render() {
    const { description } = this.props;

    return (
      <div className={ cx('card-body') }>
        <p className={ cx('card-description') }>
          { description }
        </p>
      </div>
    );
  }
});



const CardFooter = React.createClass({
  displayName: 'CardFooter',

  propTypes: {
    baths:        PropTypes.number.isRequired,
    beds:         PropTypes.number.isRequired,
    buttonTitle:  PropTypes.string.isRequired,
    squareMeters: PropTypes.number.isRequired,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      squareMeters : 0,
      beds : 0,
      baths : 0,
      buttonTitle : '',
      currency : '',
    };
  },

  render() {
    let rippleOn = true;
    const { squareMeters, beds, baths, buttonTitle } = this.props;

    return (
      <div className={ cx('card-footer') }>
        <div className={ cx('card-details') }>
          <span className={ cx('card-details-item') }>
            <Icon glyph="area" />
            <span className={ cx('card-details-item-name') }>
              { `${squareMeters} M²` }
            </span>
          </span>
          <span className={ cx('card-details-item') }>
            <Icon glyph="bed" />
            <span className={ cx('card-details-item-name') }>
              { `${beds} Quartos` }
            </span>
          </span>
          <span className={ cx('card-details-item') }>
            <Icon glyph="bath" />
            <span className={ cx('card-details-item-name') }>
              { `${baths} Banheiros` }
            </span>
          </span>
        </div>
        <div className={ cx('card-actions') }>
          <FlatButton color="default" ripple={ rippleOn } title={ buttonTitle }>{ buttonTitle }</FlatButton>
        </div>
      </div>
    );
  }
});

export default Card;
