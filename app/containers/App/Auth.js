import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Outer from '../Templates/Outer';
import {
  Login,Register,
  LoginFullstack, RegisterFullstack,
  ResetPassword, ResetPasswordFullstack,
  LockScreen,
  ForgotPassword
} from '../pageListAsync';

function Auth() {
  return (
    <Outer>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/login-firebase" component={LoginFullstack} />
        <Route path="/register-firebase" component={RegisterFullstack} />
        <Route path="/reset-firebase" component={ResetPasswordFullstack} />
        <Route path="/lock-screen" component={LockScreen} />
        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
