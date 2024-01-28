import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  JobAdvertisementList,
  JobAdvertisementApplication,
  ApplicationUnderReviewing,
  NotFound,
} from '../pageListAsync';

function PublicRoutes() {
  return (
    <Switch>
      <Switch>
        <Route path='/public/ApplicationUnderReviewing/' exact component={ApplicationUnderReviewing} />
        <Route path='/public/JobAdvertisement/' exact component={JobAdvertisementList} />
        <Route
          path='/public/JobAdvertisement/Application/:jobApplicarionId/:JobId'
          exact
          component={JobAdvertisementApplication}
        />
      </Switch>

      <Route component={NotFound} />
    </Switch>
  );
}

export default PublicRoutes;
