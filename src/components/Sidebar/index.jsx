// Libs
import React, { PropTypes } from 'react';

// Style
import style from './style.scss';

const Sidebar = React.createClass({
  displayName: 'Sidebar',

  propTypes: {
    children: PropTypes.node
  },

  render() {
    return (
      <aside className={ style.sidebar }>
        <div className="main-content">
          { this.props.children }
        </div>
      </aside>
    );
  }
});

export default Sidebar;
