import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const EmployeeList = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeList'),
  {
    fallback: <Loading />,
  }
);
const AdEmployeeImport = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/AdEmployeeImport'),
  {
    fallback: <Loading />,
  }
);

const EmployeeData = loadable(
  () => import('../../../Pages/Payroll/Employee/component/EmployeeData'),
  {
    fallback: <Loading />,
  }
);
const Personal = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/Personal'),
  {
    fallback: <Loading />,
  }
);
const EmployeeAddress = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeAddress'),
  {
    fallback: <Loading />,
  }
);

const EmployeeCourse = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeCourse'),
  {
    fallback: <Loading />,
  }
);

const EmployeeExperince = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeExperince'),
  {
    fallback: <Loading />,
  }
);
const EmployeeInsurance = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeInsurance'),
  {
    fallback: <Loading />,
  }
);
const EmployeeBank = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeBank'),
  {
    fallback: <Loading />,
  }
);
const EmployeeQualification = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeQualification'),
  {
    fallback: <Loading />,
  }
);

const EmployeeCar = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeCar'),
  {
    fallback: <Loading />,
  }
);
const EmployeeContactInfo = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeContactInfo'),
  {
    fallback: <Loading />,
  }
);

const EmployeeSalary = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeSalary'),
  {
    fallback: <Loading />,
  }
);
const EmployeeContract = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeContract'),
  {
    fallback: <Loading />,
  }
);

const EmployeeContractKSA = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeContractKSA'),
  {
    fallback: <Loading />,
  }
);

const EmployeeDocuments = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeDocuments'),
  {
    fallback: <Loading />,
  }
);

const CreateEmployeeDocuments = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeDocumentsCreate'),
  {
    fallback: <Loading />,
  }
);

const EditEmployeeDocuments = loadable(
  () => import('../../../Pages/Payroll/Employee/Code/EmployeeDocumentsCreate'),
  {
    fallback: <Loading />,
  }
);

const NewEmployeeReport = loadable(
  () => import('../../../Pages/Payroll/Employee/reports/NewEmployeeReport'),
  {
    fallback: <Loading />,
  }
);

const EmployeeStatusReport = loadable(
  () => import('../../../Pages/Payroll/Employee/reports/EmployeeStatusReport'),
  {
    fallback: <Loading />,
  }
);

const EmployeeDataReport = loadable(
  () => import('../../../Pages/Payroll/Employee/reports/EmployeeDataReport'),
  {
    fallback: <Loading />,
  }
);

const followStaffContracts = loadable(
  () => import('../../../Pages/Payroll/Employee/reports/followStaffContracts'),
  {
    fallback: <Loading />,
  }
);

const EmploymentDocsDetails = loadable(
  () => import('../../../Pages/Payroll/Employee/reports/EmploymentDocsDetails'),
  {
    fallback: <Loading />,
  }
);

const EmploymentDocs = loadable(
  () => import('../../../Pages/Payroll/Employee/reports/EmploymentDocs'),
  {
    fallback: <Loading />,
  }
);

const ImportEmployeeData = loadable(
  () => import('../../../Pages/Payroll/Employee/reports/ImportEmployeeData'),
  {
    fallback: <Loading />,
  }
);

const LocationLog = loadable(
  () => import('../../../Pages/Payroll/Employee/reports/LocationLog'),
  {
    fallback: <Loading />,
  }
);

const employee = {
  EmployeeList,
  AdEmployeeImport,
  EmployeeData,
  Personal,
  EmployeeAddress,
  EmployeeCourse,
  EmployeeExperince,
  EmployeeInsurance,
  EmployeeBank,
  EmployeeQualification,
  EmployeeCar,
  EmployeeContactInfo,
  EmployeeSalary,
  EmployeeContract,
  EmployeeContractKSA,
  EmployeeDocuments,
  CreateEmployeeDocuments,
  EditEmployeeDocuments,
  NewEmployeeReport,
  EmployeeStatusReport,
  EmployeeDataReport,
  followStaffContracts,
  EmploymentDocsDetails,
  EmploymentDocs,
  ImportEmployeeData,
  LocationLog,
};

export default employee;
