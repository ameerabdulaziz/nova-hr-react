import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Corporate from '../../Templates/Corporate';
import PAGES from './pageListAsync';

function Landing() {
  return (
    <Corporate>
      <Switch>
        <Route exact path='/' component={PAGES.global.HomePage} />
        <Route component={PAGES.global.NotFound} />
      </Switch>
    </Corporate>
  );
}

export default Landing;
