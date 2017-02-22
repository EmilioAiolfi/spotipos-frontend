// Libs
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames/bind';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// Styles
import styles from './style.scss';
let cx = classnames.bind(styles);


// import IconRemove from './icons/remove.svg'
//
// const RemoveButton = () => (
//   <button>
//     <IconRemove />
//     <span>Remove</span>
//   </button>
// )


const Button = React.createClass({
  displayName: 'Button',

  propTypes: {
    children : PropTypes.node,
    className : PropTypes.string.isRequired,
    faIcon : PropTypes.string,
    iconBefore : PropTypes.bool,
    materialIcon : PropTypes.string,
    onClick : PropTypes.func,
    ripple : PropTypes.bool,
    rippleDuration : PropTypes.number,
    type : PropTypes.oneOf(['button', 'submit', 'reset']),
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      className: '',
      iconBefore: false,
      type: 'button',
      onClick: () => {},
      ripple: true,
      rippleDuration: 300,
    };
  },

  componentDidMount() {
    if(this.props.ripple) {
      this.ripple = this.initRipple(ReactDOM.findDOMNode(this));
    }
  },

  componentWillUnmount() {
    if(this.rippleTimeout) {
      clearTimeout(this.rippleTimeout);
    }
  },

  handleClick(event) {
    this.props.onClick(event);
    if(!this.props.ripple) {
      return;
    }

    this.rippleTimeout = this.animateRipple(event, ReactDOM.findDOMNode(this), this.ripple, this.rippleTimeout, this.props.rippleDuration);
  },

  /**
   * Initializes a ripple effect for a button
   *
   * @param button a dom element to insert the ripple into as html
   * @param effectName the ripple effect's name. Defaults to 'ripple-effect'
   * @return the ripple DOM element
   */
  initRipple(button, effectName = styles['ripple-effect']) {
    const size = Math.max(button.offsetHeight, button.offsetWidth) + 'px';

    const ripple = document.createElement('span');
    ripple.classList.add(effectName);
    ripple.style.height = size;
    ripple.style.width = size;

    button.insertBefore(ripple, button.firstChild);

    return ripple;
  },

  /**
   * Animates the ripple effect by taking the click event, the button, and the ripple.
   *
   * @param e the click event
   * @param button the button that was clicked
   * @param ripple the ripple element
   * @param rippleTimeout the timeout used for the click event
   * @param rippleDuration? the duration of the ripple effect. Defaults to 300
   * @return the updated rippleTimeout
   */
  animateRipple(e, button, ripple, rippleTimeout, rippleDuration = 300) {

    if(rippleTimeout) {
      ripple.classList.remove(styles.active);
    }

    let buttonPos = button.getBoundingClientRect();
    const x = e.pageX - buttonPos.left - ripple.offsetWidth / 2;
    const y = e.pageY - buttonPos.top - ripple.offsetHeight / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.add(styles.active);
    rippleTimeout = setTimeout(() => {
      ripple.classList.remove(styles.active);
      rippleTimeout = null;
    }, rippleDuration);

    return rippleTimeout;
  },


  render() {
    // TODO: WHY Warning - https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    const divProps = Object.assign({}, this.props);
    delete divProps.rippleDuration;

    const { iconBefore, faIcon, materialIcon, ripple, className, ...props } = divProps;
    let icon = null;

    const iconClass = cx({
      ['icon']: faIcon,
      ['fa']: faIcon,
      [`btn-${faIcon}`]: faIcon,
      ['material-icons']: materialIcon
    });
    icon = icon ? <i className={ iconClass } /> : '';

    const btnClass = className.split(' ');
    const cn = cx(btnClass, {
      ['icon-text-btn']: faIcon,
      ['ripple-btn']: ripple,
    });

    return (
      <button { ...props } className={ cn } onClick={ this.handleClick }>
        { iconBefore && icon }
        { this.props.children }
        { !iconBefore && icon }
      </button>
    );

  }
});

const FlatButton = React.createClass({
  displayName: 'FlatButton',

  propTypes: {
    active: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      className: '',
      color: 'default',
      active: false,
    };
  },

  render() {
    const { className, color, active, ...props } = this.props;
    const btnClass = className.split(' ');
    const fullClassName = cx(btnClass, 'flat-btn', `flat-btn-${color}`, {
      'active': active,
    });

    return <Button { ...props } className={ fullClassName } />;
  }
});


export {
  Button,
  FlatButton,
};
