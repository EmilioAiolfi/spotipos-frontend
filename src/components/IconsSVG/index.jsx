// Libs
import React, {PropTypes} from 'react';
import classnames from 'classnames/bind';

// Styles
import styles from './style.scss';
let cx = classnames.bind(styles);

const svgIcons = require.context('../../images/svg', false, /.*\.svg$/);
function requireAll (requireContext) {
  return requireContext.keys().map(requireContext);
}

const icons = requireAll(svgIcons)
              .reduce((state, icon) => ({
                ...state,
                [icon.slice(1)]: icon
              }),
            {});

const Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    glyph : PropTypes.string.isRequired,
    height : PropTypes.number,
    width : PropTypes.number,
  },

  getDefaultProps() {
    return {
      width: 20,
      height: 20
    };
  },

  render() {
    let className = 'icon';
    const { glyph, width, height } = this.props;

    return (
      <svg className={ cx(className) } width={width} height={height}>
        <use xlinkHref={icons[glyph]} />
      </svg>
    );
  }

});


export default Icon;
