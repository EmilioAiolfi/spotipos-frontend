// Libs
import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames/bind';

// Styles
import styles from './style.scss';
let cx = classnames.bind(styles);


const Badge = React.createClass({
  displayName: 'Badge',

  propTypes: {
    children: PropTypes.node,
    color : PropTypes.string.isRequired,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      color: ''
    };
  },

  render() {
    const { color, ...props} = this.props;

    const iconClass = cx('badge', {
      [color]: color
    });

    return (

      <span className={ iconClass }>
        { props.children }
      </span>

    );
  }

});


export default Badge;
