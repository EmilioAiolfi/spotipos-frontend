// Libs
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

// Style
require('./style/global.scss');

// Components
import App from './containers/App';
import Home from './containers/home';
import About from './containers/about';
import UIComponents from './containers/uiComponents';
import SpotipposMapContainer from './containers/SpotipposMapContainer';
import SpotipposAdsContainer from './containers/SpotipposAdsContainer';

render((
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRedirect to="/" />
      <IndexRoute component={ Home } />
      <Route path="/about" component={ About } />
      <Route path="/map" component={ SpotipposMapContainer } />
      <Route path="/ads" component={ SpotipposAdsContainer } />
      <Route path="/ui-components" component={ UIComponents } />
    </Route>
  </Router>

), document.getElementById('root'));
