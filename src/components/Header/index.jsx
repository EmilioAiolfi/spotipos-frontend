// Libs
import React, { PropTypes } from 'react';
/* import Icon from '../IconsSVG'; */

// Style
import styles from './style.scss';

const Header = React.createClass({
  displayName: 'Header',

  propTypes: {
    brandName : PropTypes.string.isRequired,
    children: PropTypes.node,
    pageTitle : PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      brandName : '',
      pageTitle : ''
    };
  },

  render() {
    return (
      <header className={ styles['header'] }>

        <div className={ styles['brand'] }>
          <div className={ styles['menu-button-nav'] }>
            {'menu'}
          </div>
          <h1>
            <a className={ styles['logo'] }>
              {/*
              <Icon glyph="vivareal" width={48} height={38} /> -->
              */}
              <span className={ styles['text'] }>{ this.props.brandName }</span>
            </a>
          </h1>
        </div>

        <div className={ styles['page-details'] }>
          <h2 className={ styles['page-title'] }>{ this.props.pageTitle }</h2>
        </div>

        <div className={ styles['settings'] }>
          <div className={ styles['menu-button-filter'] }>
            {'Filter'}
          </div>
        </div>
      </header>
    );
  }
});

export default Header;
