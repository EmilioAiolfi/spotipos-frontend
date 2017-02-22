// Libs
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames/bind';

// Styles
import styles from './style.scss';
let cx = classnames.bind(styles);

const CardLoader = React.createClass({
  displayName: 'CardLoader',

  propTypes: {
    qtdItems: PropTypes.number.isRequired,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      qtdItems: 3,
    };
  },

  renderItem(index) {
    return (
      <div className={ cx(['loader-item']) } key={index}>
        <div className={ cx(['animated-background']) }>
          <div className={ cx(['background-masker'], ['header-top']) }></div>
          <div className={ cx(['background-masker'], ['header-left']) }></div>
          <div className={ cx(['background-masker'], ['header-right']) }></div>
          <div className={ cx(['background-masker'], ['header-bottom']) }></div>
          <div className={ cx(['background-masker'], ['subheader-left']) }></div>
          <div className={ cx(['background-masker'], ['subheader-right']) }></div>
          <div className={ cx(['background-masker'], ['subheader-bottom']) }></div>
          <div className={ cx(['background-masker'], ['content-top']) }></div>
          <div className={ cx(['background-masker'], ['content-first-end']) }></div>
          <div className={ cx(['background-masker'], ['content-second-line']) }></div>
          <div className={ cx(['background-masker'], ['content-second-end']) }></div>
          <div className={ cx(['background-masker'], ['content-third-line']) }></div>
          <div className={ cx(['background-masker'], ['content-third-end']) }></div>
        </div>
      </div>
    );
  },

  render() {
    const times = Array.from(Array(3), (_, index) => index + 1);

    return (
      <div className={ cx(['loader-list']) }>
        {
          times.map(index => {
            return this.renderItem(index);
          })
        }
      </div>
    );
  }

});

export default CardLoader;
