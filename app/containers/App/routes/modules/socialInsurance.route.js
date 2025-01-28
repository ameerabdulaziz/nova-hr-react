import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const InsuranceOffices = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/Code/InsuranceOffices'),
  {
    fallback: <Loading />,
  }
);

const SInsuranceJob = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/Code/SInsuranceJob'),
  {
    fallback: <Loading />,
  }
);

const SinsuranceCalculationTemplate = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/Code/SinsuranceCalculationTemplate'
  ),
  {
    fallback: <Loading />,
  }
);

const SInsuranceOrgnization = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/Code/SInsuranceOrgnization'),
  {
    fallback: <Loading />,
  }
);

const SInsuranceOrgnizationCreate = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/Code/SInsuranceOrgnizationCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const StopInsurance = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/Transaction/StopInsurance'),
  {
    fallback: <Loading />,
  }
);

const StopInsuranceCreate = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/Transaction/StopInsuranceCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const SocialInsuranceData = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/Transaction/SocialInsuranceData'
  ),
  {
    fallback: <Loading />,
  }
);

const UpdateInsuranceSalary = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/Transaction/UpdateInsuranceSalary'
  ),
  {
    fallback: <Loading />,
  }
);

const StopInsuranceReport = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/reports/StopInsuranceReport'
  ),
  {
    fallback: <Loading />,
  }
);

const InsuranceFollow = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/reports/InsuranceFollow'),
  {
    fallback: <Loading />,
  }
);

const Form2Insurance = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/reports/Form2Insurance'),
  {
    fallback: <Loading />,
  }
);

const Form6Insurance = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/reports/Form6Insurance'),
  {
    fallback: <Loading />,
  }
);

const Form6InsuranceReview = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/reports/Form6InsuranceReview'),
  {
    fallback: <Loading />,
  }
);

const Form1Insurance = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/reports/Form1Insurance'),
  {
    fallback: <Loading />,
  }
);

const Form1InsuranceReview = loadable(
  () => import('../../../Pages/Payroll/SocialInsurance/reports/Form1InsuranceReview'),
  {
    fallback: <Loading />,
  }
);

const EmergencyBenefitList = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/reports/EmergencyBenefitList'
  ),
  {
    fallback: <Loading />,
  }
);

const InsuranceFormStatus = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/reports/InsuranceFormStatus'
  ),
  {
    fallback: <Loading />,
  }
);

const PositionOfGuaranteesAndContradictions = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/reports/PositionOfGuaranteesAndContradictions'
  ),
  {
    fallback: <Loading />,
  }
);

const SocialInsuranceReport = loadable(
  () => import(
    '../../../Pages/Payroll/SocialInsurance/reports/SocialInsuranceReports'
  ),
  {
    fallback: <Loading />,
  }
);

const socialInsurance = {
  InsuranceOffices,
  SInsuranceJob,
  SinsuranceCalculationTemplate,
  SInsuranceOrgnization,
  SInsuranceOrgnizationCreate,
  StopInsurance,
  StopInsuranceCreate,
  SocialInsuranceData,
  UpdateInsuranceSalary,
  StopInsuranceReport,
  InsuranceFollow,
  Form2Insurance,
  Form6Insurance,
  Form6InsuranceReview,
  Form1Insurance,
  Form1InsuranceReview,
  EmergencyBenefitList,
  InsuranceFormStatus,
  PositionOfGuaranteesAndContradictions,
  SocialInsuranceReport,
};

export default socialInsurance;
