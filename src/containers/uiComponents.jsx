// Libs
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Button, FlatButton } from '../components/Buttons';

const rippleOn = true;

const FLAT_BTN_PROPS = [
  { color: 'default' },
  { color: 'primary', faIcon: 'optin-monster', iconBefore: true },
  { color: 'error', materialIcon: 'favorite_border' },
];

const ICON_BTN_PROPS = [
  { label: 'Change to material icon', faIcon: 'beer' },
  { label: 'Change help position to left', materialIcon: 'face' },
  { label: 'Change help position to left', materialIcon: 'feedback' },
];

const uiComponents = React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      isHamburgerActive: { 0: false, 1: false, 2: false, 3: false },
      floatingBtnPropsIndex: 0,
      flatBtnPropsIndex: 0,
      iconBtnPropsIndex: 0,
    };
  },

  _next(i, list, key) {
    let index = i + 1;
    if(index === list.length) {
      index = 0;
    }

    const state = {};
    state[`${key}BtnPropsIndex`] = index;
    this.setState(state);
  },

  nextFlatBtn() {
    this._next(this.state.flatBtnPropsIndex, FLAT_BTN_PROPS, 'flat');
  },

  nextIconBtn() {
    this._next(this.state.iconBtnPropsIndex, ICON_BTN_PROPS, 'icon');
  },

  render() {

    return (
      <div className="container">
        <header><h2>{'React Buttons'}</h2></header>
        <main>
          <div className="buttons-container">
            <Button faIcon="users">{ 'Hello, World!' }</Button>
            <a href="#" className="icon-text-btn"><i className="icon fa fa-users" />{ 'Hello, world!' }</a>
            <FlatButton { ...FLAT_BTN_PROPS[this.state.flatBtnPropsIndex] } onClick={ this.nextFlatBtn }>{ 'Click for other props' }</FlatButton>
            <FlatButton color="primary" ripple={ rippleOn }>{ 'Click for a ripple effect' }</FlatButton>
          </div>
        </main>
      </div>
    );
  }

});

export default uiComponents;
