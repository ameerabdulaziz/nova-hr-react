import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const EmployeeObjective = loadable(
  () => import(
    '../../../Pages/Payroll/SmartObjective/transaction/EmployeeObjective'
  ),
  {
    fallback: <Loading />,
  }
);

const EmployeeObjectiveCreate = loadable(
  () => import(
    '../../../Pages/Payroll/SmartObjective/transaction/EmployeeObjectiveCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const ObjectiveReport = loadable(
  () => import('../../../Pages/Payroll/SmartObjective/reports/ObjectiveReport'),
  {
    fallback: <Loading />,
  }
);

const smartObjective = {
  EmployeeObjective,
  EmployeeObjectiveCreate,
  ObjectiveReport,
};

export default smartObjective;
