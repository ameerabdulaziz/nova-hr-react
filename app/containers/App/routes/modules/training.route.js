import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const TrFunctionsList = loadable(
  () => import('../../../Pages/Payroll/Training/Code/TrFunctionsList'),
  {
    fallback: <Loading />,
  }
);

const TrFunctionsListCreate = loadable(
  () => import('../../../Pages/Payroll/Training/Code/TrFunctionsListCreate'),
  {
    fallback: <Loading />,
  }
);

const FunctionsData = loadable(
  () => import('../../../Pages/Payroll/Training/Code/FunctionsData'),
  {
    fallback: <Loading />,
  }
);

const EmployeeFunctions = loadable(
  () => import('../../../Pages/Payroll/Training/Code/EmployeeFunctions'),
  {
    fallback: <Loading />,
  }
);

const FunctionsRequest = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/FunctionsRequest'),
  {
    fallback: <Loading />,
  }
);

const QualificationCheck = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/QualificationCheck'),
  {
    fallback: <Loading />,
  }
);

const TrTrainingTrxList = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/TrTrainingTrxList'),
  {
    fallback: <Loading />,
  }
);

const TrTrainingTrxListCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Training/Transaction/TrTrainingTrxListCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const TrainingRequestList = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/TrainingRequestList'),
  {
    fallback: <Loading />,
  }
);

const TrainingRequestListCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Training/Transaction/TrainingRequestListCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const TrainingEmployeeAttendance = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/EmployeeAttendance'),
  {
    fallback: <Loading />,
  }
);

const EvaluateEmployee = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/EvaluateEmployee'),
  {
    fallback: <Loading />,
  }
);
const EvaluateTraining = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/EvaluateTraining'),
  {
    fallback: <Loading />,
  }
);

const TestTemplate = loadable(
  () => import('../../../Pages/Payroll/Training/Code/TestTemplate'),
  {
    fallback: <Loading />,
  }
);

const TestTemplateCreate = loadable(
  () => import('../../../Pages/Payroll/Training/Code/TestTemplateCreate'),
  {
    fallback: <Loading />,
  }
);

const TrainingCalender = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/TrainingCalender'),
  {
    fallback: <Loading />,
  }
);

const TrainingTest = loadable(
  () => import('../../../Pages/Payroll/Training/Code/Test'),
  {
    fallback: <Loading />,
  }
);

const ReviewTest = loadable(
  () => import('../../../Pages/Payroll/Training/Transaction/ReviewTest'),
  {
    fallback: <Loading />,
  }
);

const EmployeeTrainingReport = loadable(
  () => import('../../../Pages/Payroll/Training/reports/EmployeeTrainingReport'),
  {
    fallback: <Loading />,
  }
);

const TrainingAttendance = loadable(
  () => import('../../../Pages/Payroll/Training/reports/TrainingAttendance'),
  {
    fallback: <Loading />,
  }
);

const training = {
  EmployeeFunctions,
  EmployeeTrainingReport,
  EvaluateEmployee,
  EvaluateTraining,
  FunctionsData,
  FunctionsRequest,
  QualificationCheck,
  ReviewTest,
  TestTemplate,
  TestTemplateCreate,
  TrainingAttendance,
  TrainingCalender,
  TrainingEmployeeAttendance,
  TrainingRequestList,
  TrainingRequestListCreate,
  TrainingTest,
  TrFunctionsList,
  TrFunctionsListCreate,
  TrTrainingTrxList,
  TrTrainingTrxListCreate,
};

export default training;
