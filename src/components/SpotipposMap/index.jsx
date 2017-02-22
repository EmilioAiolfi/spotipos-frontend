// Libs
import React from 'react';

// Styles
import styles from './style.scss';

const SpotipposMap = React.createClass({
  displayName: 'SpotipposMap',

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  render() {
    let obj = this.props.data;

    let province = [];
    let i = 0;
    let colors = ['#FFC273', '#F19290', '#AAEC80', '#88E0EB', '#D9ACE1', '#FDDC8C'];

    for (let prop in obj) {
      let name = prop;
      let upperLeft = obj[prop].boundaries.upperLeft;
      let bottomRight = obj[prop].boundaries.bottomRight;

      province.push(
        <Province
          bottomRight={ bottomRight }
          color={ colors[i] }
          key={ i }
          name={ name }
          upperLeft={ upperLeft } />
      );
      i++;
    }

    return (
      <div className={ styles.map }>
        {province}
      </div>
    );
  }
});

const Province = React.createClass({
  displayName: 'Province',

  propTypes: {
    bottomRight: React.PropTypes.object.isRequired,
    color: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    upperLeft: React.PropTypes.object.isRequired
  },

  render() {
    let width = this.props.bottomRight.x - this.props.upperLeft.x;
    let height = this.props.upperLeft.y - this.props.bottomRight.y;
    let left = this.props.upperLeft.x;
    let top = 1000 - this.props.upperLeft.y;
    let color = this.props.color;

    let styleProps = {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
      opacity: '.7',
      background: color
    };

    return(
      <div className={ styles.province } style={ styleProps }>
        <p className={ styles['province-name'] }>{ this.props.name }</p>
      </div>
    );
  }
});


export default SpotipposMap;
