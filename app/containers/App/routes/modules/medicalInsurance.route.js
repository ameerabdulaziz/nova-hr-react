import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const MedicalInsuranceData = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Transaction/MedicalInsuranceData'
  ),
  {
    fallback: <Loading />,
  }
);

const InsuranceCompanies = loadable(
  () => import('../../../Pages/Payroll/MedicalInsurance/code/InsuranceCompanies'),
  {
    fallback: <Loading />,
  }
);

const MinsuranceCategory = loadable(
  () => import('../../../Pages/Payroll/MedicalInsurance/code/MinsuranceCategory'),
  {
    fallback: <Loading />,
  }
);

const MinsuranceCenters = loadable(
  () => import('../../../Pages/Payroll/MedicalInsurance/code/MinsuranceCenters'),
  {
    fallback: <Loading />,
  }
);

const staffMedicalInsuranceReport = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Reports/staffMedicalInsuranceReport'
  ),
  {
    fallback: <Loading />,
  }
);

const MedicalInsuranceReport = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Reports/MedicalInsuranceReport'
  ),
  {
    fallback: <Loading />,
  }
);

const MedicalInsuranceSubscription = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Transaction/MedicalInsuranceSubscription'
  ),
  {
    fallback: <Loading />,
  }
);

const MedicalInsuranceSubscriptionCreate = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Transaction/MedicalInsuranceSubscriptionCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const medicalInsSubscriptionReport = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Reports/medicalInsSubscriptionReport'
  ),
  {
    fallback: <Loading />,
  }
);

const medicalInsuranceListReport = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Reports/medicalInsuranceListReport'
  ),
  {
    fallback: <Loading />,
  }
);

const EmployeeMedicalBenefitsCreate = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Transaction/EmployeeMedicalBenefitsCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const EmployeeMedicalBenefits = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Transaction/EmployeeMedicalBenefits'
  ),
  {
    fallback: <Loading />,
  }
);

const StopMedicalInsurance = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Transaction/StopMedicalInsurance'
  ),
  {
    fallback: <Loading />,
  }
);

const StopMedicalInsuranceCreate = loadable(
  () => import(
    '../../../Pages/Payroll/MedicalInsurance/Transaction/StopMedicalInsuranceCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const medicalInsurance = {
  MedicalInsuranceData,
  InsuranceCompanies,
  MinsuranceCategory,
  MinsuranceCenters,
  staffMedicalInsuranceReport,
  MedicalInsuranceReport,
  MedicalInsuranceSubscription,
  MedicalInsuranceSubscriptionCreate,
  medicalInsSubscriptionReport,
  medicalInsuranceListReport,
  EmployeeMedicalBenefitsCreate,
  EmployeeMedicalBenefits,
  StopMedicalInsurance,
  StopMedicalInsuranceCreate,
};

export default medicalInsurance;
