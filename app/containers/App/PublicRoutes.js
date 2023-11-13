import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  JobVacation,
  JobVacationApplication,
  NotFound,
} from '../pageListAsync';

function PublicRoutes() {
  return (
    <Switch>
      <Switch>
        <Route path='/public/JobVacation/' exact component={JobVacation} />
        <Route
          path='/public/JobVacation/Application/:jobApplicarionId/:JobId'
          exact
          component={JobVacationApplication}
        />
      </Switch>

      <Route component={NotFound} />
    </Switch>
  );
}

export default PublicRoutes;
