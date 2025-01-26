import PropTypes from 'prop-types';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import NotFound from '../Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './routes/Application';
import PublicRoutes from './routes/PublicRoutes';
import SITEMAP from './routes/sitemap';
import ThemeWrapper from './ThemeWrapper';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App(props) {
  const { history } = props;

  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          <Route path='/public' component={PublicRoutes} />
          <Route
            path={Object.values(SITEMAP.auth).map((page) => page.route)}
            exact
            component={Auth}
          />
          <Route path='/' component={Application} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeWrapper>
  );
}

App.propTypes = { history: PropTypes.object.isRequired };

export default App;
