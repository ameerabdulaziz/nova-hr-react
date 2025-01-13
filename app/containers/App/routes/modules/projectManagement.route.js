import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const Customer = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/Customer'),
  {
    fallback: <Loading />,
  }
);

const CustomerCreate = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/CustomerCreate'),
  {
    fallback: <Loading />,
  }
);

const CustomerEdit = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/CustomerCreate'),
  {
    fallback: <Loading />,
  }
);

const Contract = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/Contract'),
  {
    fallback: <Loading />,
  }
);

const ContractCreate = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/ContractCreate'),
  {
    fallback: <Loading />,
  }
);

const ContractEdit = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/ContractCreate'),
  {
    fallback: <Loading />,
  }
);

const Stage = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/Stage'),
  {
    fallback: <Loading />,
  }
);

const StageCreate = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/StageCreate'),
  {
    fallback: <Loading />,
  }
);

const StageEdit = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/StageCreate'),
  {
    fallback: <Loading />,
  }
);

const TimeSheet = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/TimeSheet'),
  {
    fallback: <Loading />,
  }
);

const TimeSheetCreate = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/TimeSheetCreate'),
  {
    fallback: <Loading />,
  }
);

const TimeSheetEdit = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/TimeSheetCreate'),
  {
    fallback: <Loading />,
  }
);

const Project = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/Project'),
  {
    fallback: <Loading />,
  }
);

const ProjectCreate = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/ProjectCreate'),
  {
    fallback: <Loading />,
  }
);

const ProjectEdit = loadable(
  () => import('../../../Pages/Payroll/ProjectManagment/code/ProjectCreate'),
  {
    fallback: <Loading />,
  }
);

const projectManagement = {
  Contract,
  ContractCreate,
  ContractEdit,
  Customer,
  CustomerCreate,
  CustomerEdit,
  Project,
  ProjectCreate,
  ProjectEdit,
  Stage,
  StageCreate,
  StageEdit,
  TimeSheet,
  TimeSheetCreate,
  TimeSheetEdit,
};

export default projectManagement;
