import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Outer from '../Templates/Outer';
import PAGES from './routes/pageListAsync';
import SITEMAP from './routes/sitemap';

function Auth() {
  return (
    <Outer>
      <Switch>
        <Route path={SITEMAP.auth.Login.route} component={PAGES.global.Login} />

        <Route
          path={SITEMAP.auth.Register.route}
          component={PAGES.global.Register}
        />

        <Route
          path={SITEMAP.auth.ResetPassword.route}
          component={PAGES.global.ResetPassword}
        />

        <Route
          path={SITEMAP.auth.ForgotPassword.route}
          component={PAGES.global.ForgotPassword}
        />

        <Route
          path={SITEMAP.auth.LoginFullstack.route}
          component={PAGES.global.LoginFullstack}
        />

        <Route
          path={SITEMAP.auth.RegisterFullstack.route}
          component={PAGES.global.RegisterFullstack}
        />

        <Route
          path={SITEMAP.auth.ResetPasswordFullstack.route}
          component={PAGES.global.ResetPasswordFullstack}
        />

        <Route
          path={SITEMAP.auth.LockScreen.route}
          component={PAGES.global.LockScreen}
        />

        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
