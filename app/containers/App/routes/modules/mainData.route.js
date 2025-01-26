import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const Gender = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Gender'),
  {
    fallback: <Loading />,
  }
);
const BusinessUnit = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/BusinessUnit'),
  {
    fallback: <Loading />,
  }
);

const Jobs = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Job'),
  {
    fallback: <Loading />,
  }
);

const CreateJob = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/JobCreate'),
  {
    fallback: <Loading />,
  }
);

const EditJob = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/JobCreate'),
  {
    fallback: <Loading />,
  }
);

const Bank = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Bank'),
  {
    fallback: <Loading />,
  }
);
const Company = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Company'),
  {
    fallback: <Loading />,
  }
);
const ContractType = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/ContractType'),
  {
    fallback: <Loading />,
  }
);
const City = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/City'),
  {
    fallback: <Loading />,
  }
);
const Currency = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Currency'),
  {
    fallback: <Loading />,
  }
);

const IdentityType = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/IdentityType'),
  {
    fallback: <Loading />,
  }
);

const Government = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Government'),
  {
    fallback: <Loading />,
  }
);

const CompanyDocument = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/CompanyDocument'),
  {
    fallback: <Loading />,
  }
);

const CompanyDocumentCreate = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/CompanyDocumentCreate'),
  {
    fallback: <Loading />,
  }
);

const CurrencyRate = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/CurrencyRate'),
  {
    fallback: <Loading />,
  }
);
const Documents = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Documents'),
  {
    fallback: <Loading />,
  }
);

const CompanyChart = loadable(
  () => import('../../../Pages/Payroll/MainData/Transaction/CompanyChart'),
  {
    fallback: <Loading />,
  }
);
const EmployeeChart = loadable(
  () => import('../../../Pages/Payroll/MainData/Transaction/EmployeeChart'),
  {
    fallback: <Loading />,
  }
);
const Organization = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Organization'),
  {
    fallback: <Loading />,
  }
);

const CreateOrganization = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/OrganizationCreate'),
  {
    fallback: <Loading />,
  }
);

const EditOrganization = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/OrganizationCreate'),
  {
    fallback: <Loading />,
  }
);

const UploadEmployeeData = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/UploadEmployeeData'),
  {
    fallback: <Loading />,
  }
);

const Guarantor = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/Guarantor'),
  {
    fallback: <Loading />,
  }
);

const CreatGuarantor = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/GuarantorCreate'),
  {
    fallback: <Loading />,
  }
);

const EditGuarantor = loadable(
  () => import('../../../Pages/Payroll/MainData/Code/GuarantorCreate'),
  {
    fallback: <Loading />,
  }
);

const mainData = {
  Gender,
  BusinessUnit,
  Jobs,
  CreateJob,
  EditJob,
  Bank,
  Company,
  ContractType,
  City,
  Currency,
  IdentityType,
  Government,
  CompanyDocument,
  CompanyDocumentCreate,
  CurrencyRate,
  Documents,
  CompanyChart,
  EmployeeChart,
  Organization,
  CreateOrganization,
  EditOrganization,
  UploadEmployeeData,
  Guarantor,
  CreatGuarantor,
  EditGuarantor,
};

export default mainData;
