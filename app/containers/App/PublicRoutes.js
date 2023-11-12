import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import LayoutJobVacation from '../Pages/Payroll/cv-application/layouts/Layout.cv';
import {
  JobVacation,
  JobVacationApplication,
  NotFound,
} from '../pageListAsync';
import { ThemeContext } from './ThemeWrapper';

function PublicRoutes() {
  const changeMode = useContext(ThemeContext);

  return (
    <Switch>
      <LayoutJobVacation changeMode={changeMode} >
        <Switch>
          <Route path='/public/JobVacation/' exact component={JobVacation} />
          <Route
            path='/public/JobVacation/Application/'
            exact
            component={JobVacationApplication}
          />
        </Switch>
      </LayoutJobVacation>

      <Route component={NotFound} />
    </Switch>
  );
}

export default PublicRoutes;
