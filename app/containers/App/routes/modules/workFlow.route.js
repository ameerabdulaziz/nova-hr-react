import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const WorkFlowList = loadable(
  () => import('../../../Pages/Payroll/WorkFlow/WorkFlowList'),
  {
    fallback: <Loading />,
  }
);
const WorkFlowCreate = loadable(
  () => import('../../../Pages/Payroll/WorkFlow/WorkFlowCreate'),
  {
    fallback: <Loading />,
  }
);
const RequestsList = loadable(
  () => import('../../../Pages/Payroll/WorkFlow/RequestsList'),
  {
    fallback: <Loading />,
  }
);

const workFlow = {
  WorkFlowList,
  WorkFlowCreate,
  RequestsList,
};

export default workFlow;
