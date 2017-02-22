// Libs
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
// import classNames from 'classnames/bind';

// Styles
import styles from './style.scss';
// let cx = classNames.bind(styles);


// Components
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const App = React.createClass({
  displayName: 'App',

  propTypes: {
    children: PropTypes.node
  },

  render() {

    // let className = cx( 'app','opa' );

    return (
      <div className={ styles['app'] }>

        <div className={ styles['app-header'] }>
          <div className={ styles['app-header-wrapper'] }>

            <Header pageTitle={'App Name'} />

          </div>
        </div>

        <div className={ styles['app-content'] }>
          <div className={ styles['app-content-wrapper'] }>
            <div className={ styles['app-content-sidebar'] }>
              <Sidebar>
                <li>
                  <Link to="/">{'Home'}</Link>
                </li>
                <li>
                  <Link to="/about">{'About'}</Link>
                </li>
                <li>
                  <Link to="/map">{'Map'}</Link>
                </li>
                <li>
                  <Link to="/ads">{'Ads'}</Link>
                </li>
                <li>
                  <Link to="/ui-components">{'UI Components'}</Link>
                </li>
              </Sidebar>
            </div>


            <main className={ styles.main }>
              {this.props.children}
            </main>
          </div>

        </div>
      </div>
    );
  }
});

// export default App;
export default App;
