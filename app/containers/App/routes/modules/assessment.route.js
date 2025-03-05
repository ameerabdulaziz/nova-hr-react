import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';



const EmployeeAssessment = loadable(
  () => import('../../../Pages/Payroll/Assessment/Transactions/EmployeeAssessment'),
  {
    fallback: <Loading />,
  }
);

const AsCategory = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/AsCategory'),
  {
    fallback: <Loading />,
  }
);

const AsCategoryCreate = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/AsCategoryCreate'),
  {
    fallback: <Loading />,
  }
);




const AsChoice = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/AsChoice'),
  {
    fallback: <Loading />,
  }
);

const AsTemplate = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/AsTemplate'),
  {
    fallback: <Loading />,
  }
);

const AsTemplateCreate = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/AsTemplateCreate'),
  {
    fallback: <Loading />,
  }
);

const Competencies = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/Competencies'),
  {
    fallback: <Loading />,
  }
);

const CompetenciesCreate = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/CompetenciesCreate'),
  {
    fallback: <Loading />,
  }
);

const AllJobKpi = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/AllJobKpi'),
  {
    fallback: <Loading />,
  }
);

const StaffJobKPI = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/StaffJobKPI'),
  {
    fallback: <Loading />,
  }
);

const JobDescriptions = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/JobDescriptions'),
  {
    fallback: <Loading />,
  }
);

const IndividualDevelopmentPlan = loadable(
  () => import(
    '../../../Pages/Payroll/Assessment/Transactions/IndividualDevelopmentPlan'
  ),
  {
    fallback: <Loading />,
  }
);

const IndividualDevelopmentPlanCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Assessment/Transactions/IndividualDevelopmentPlanCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const CareerDevPlan = loadable(
  () => import('../../../Pages/Payroll/Assessment/Transactions/CareerDevPlan'),
  {
    fallback: <Loading />,
  }
);

const CareerDevPlanCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Assessment/Transactions/CareerDevPlanCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const UploadAssessmentGuidelines = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/UploadAssessmentGuidelines'),
  {
    fallback: <Loading />,
  }
);

const AssessmentGuidelines = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/AssessmentGuidelines'),
  {
    fallback: <Loading />,
  }
);

const MonthOpenCloseAss = loadable(
  () => import('../../../Pages/Payroll/Assessment/Transactions/MonthOpenCloseAss'),
  {
    fallback: <Loading />,
  }
);

const AssessmentReview = loadable(
  () => import('../../../Pages/Payroll/Assessment/Transactions/AssessmentReview'),
  {
    fallback: <Loading />,
  }
);

const AssessmentReviewEdit = loadable(
  () => import(
    '../../../Pages/Payroll/Assessment/Transactions/AssessmentReviewEdit'
  ),
  {
    fallback: <Loading />,
  }
);

const AssessmentReport = loadable(
  () => import('../../../Pages/Payroll/Assessment/Reports/AssessmentReport'),
  {
    fallback: <Loading />,
  }
);

const PeerAppraisalSetting = loadable(
  () => import('../../../Pages/Payroll/Assessment/code/PeerAppraisalSetting'),
  {
    fallback: <Loading />,
  }
);

const PeerAppraisalList = loadable(
  () => import('../../../Pages/Payroll/Assessment/Transactions/PeerAppraisalList'),
  {
    fallback: <Loading />,
  }
);

const EmployeePeerAppraisal = loadable(
  () => import(
    '../../../Pages/Payroll/Assessment/Transactions/EmployeePeerAppraisal'
  ),
  {
    fallback: <Loading />,
  }
);

const PeerAppraisalReport = loadable(
  () => import('../../../Pages/Payroll/Assessment/Reports/PeerAppraisalReport'),
  {
    fallback: <Loading />,
  }
);

const assessment = {
  AllJobKpi,
  AsChoice,
  AssessmentGuidelines,
  AssessmentReport,
  AssessmentReview,
  AssessmentReviewEdit,
  AsTemplate,
  AsTemplateCreate,
  CareerDevPlan,
  CareerDevPlanCreate,
  Competencies,
  CompetenciesCreate,
  EmployeeAssessment,
  EmployeePeerAppraisal,
  IndividualDevelopmentPlan,
  IndividualDevelopmentPlanCreate,
  JobDescriptions,
  MonthOpenCloseAss,
  PeerAppraisalList,
  PeerAppraisalReport,
  PeerAppraisalSetting,
  StaffJobKPI,
  UploadAssessmentGuidelines,
  AsCategory,
  AsCategoryCreate,
};

export default assessment;
