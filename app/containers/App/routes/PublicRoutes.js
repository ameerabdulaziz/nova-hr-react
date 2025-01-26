import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PAGES from './pageListAsync';

function PublicRoutes() {
  return (
    <Switch>
      <Switch>
        <Route
          path='/public/ApplicationUnderReviewing/'
          exact
          component={PAGES.cvApplications.ApplicationUnderReviewing}
        />
        <Route
          path='/public/JobAdvertisement/'
          exact
          component={PAGES.cvApplications.JobAdvertisementList}
        />
        <Route
          path='/public/JobAdvertisement/Application/:jobApplicarionId/:JobId'
          exact
          component={PAGES.cvApplications.JobAdvertisementApplication}
        />
      </Switch>

      <Route component={PAGES.global.NotFound} />
    </Switch>
  );
}

export default PublicRoutes;
