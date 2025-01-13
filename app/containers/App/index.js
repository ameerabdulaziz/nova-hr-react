import PropTypes from 'prop-types';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import NotFound from '../Pages/Standalone/NotFoundDedicated';
import Application from './routes/Application';
import PublicRoutes from './routes/PublicRoutes';
import ThemeWrapper from './ThemeWrapper';
import Auth from './Auth';
import { DOMAIN_NAME } from './routes/sitemap';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App(props) {
  const { history } = props;

  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          {/* <Route path="/" exact component={LandingCorporate} /> */}
          <Route path={`${DOMAIN_NAME}/public`} component={PublicRoutes} />
          <Route path={`${DOMAIN_NAME}/auth`} component={Auth} />
          <Route path='/' component={Application} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeWrapper>
  );
}

App.propTypes = { history: PropTypes.object.isRequired };

export default App;
