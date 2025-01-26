import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const JobAdvertisement = loadable(
  () => import('../../../Pages/Payroll/Recruitment/code/JobAdvertisement'),
  {
    fallback: <Loading />,
  }
);

const JobAdvertisementCreate = loadable(
  () => import('../../../Pages/Payroll/Recruitment/code/JobAdvertisementCreate'),
  {
    fallback: <Loading />,
  }
);

const JobApplicationPreview = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/JobApplicationPreview'
  ),
  {
    fallback: <Loading />,
  }
);

const JobRequirements = loadable(
  () => import('../../../Pages/Payroll/Recruitment/code/JobRequirements'),
  {
    fallback: <Loading />,
  }
);

const RecHrTest = loadable(
  () => import('../../../Pages/Payroll/Recruitment/code/RecHrTest'),
  {
    fallback: <Loading />,
  }
);

const RecHrTestCreate = loadable(
  () => import('../../../Pages/Payroll/Recruitment/code/RecHrTestCreate'),
  {
    fallback: <Loading />,
  }
);

const RecEvaluation = loadable(
  () => import('../../../Pages/Payroll/Recruitment/code/RecEvaluation'),
  {
    fallback: <Loading />,
  }
);

const RecEvaluationCreate = loadable(
  () => import('../../../Pages/Payroll/Recruitment/code/RecEvaluationCreate'),
  {
    fallback: <Loading />,
  }
);

const HRApplicationEvaluation = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/HRApplicationEvaluation'
  ),
  {
    fallback: <Loading />,
  }
);

const HRInterviewEvaluation = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/HRInterviewEvaluation'
  ),
  {
    fallback: <Loading />,
  }
);

const HRInterviewEvaluationEdit = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/HRInterviewEvaluationEdit'
  ),
  {
    fallback: <Loading />,
  }
);

const ManagerInterviewEvaluation = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/ManagerInterviewEvaluation'
  ),
  {
    fallback: <Loading />,
  }
);

const ManagerInterviewEvaluationEdit = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/ManagerInterviewEvaluationEdit'
  ),
  {
    fallback: <Loading />,
  }
);

const HiringRequest = loadable(
  () => import('../../../Pages/Payroll/Recruitment/Transaction/HiringRequest'),
  {
    fallback: <Loading />,
  }
);

const HiringRequestCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/HiringRequestCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const JobOffer = loadable(
  () => import('../../../Pages/Payroll/Recruitment/Transaction/JobOffer'),
  {
    fallback: <Loading />,
  }
);

const Employment = loadable(
  () => import('../../../Pages/Payroll/Recruitment/Transaction/Employment'),
  {
    fallback: <Loading />,
  }
);

const JobDataBank = loadable(
  () => import('../../../Pages/Payroll/Recruitment/Transaction/JobDataBank'),
  {
    fallback: <Loading />,
  }
);

const JobApplicationStatus = loadable(
  () => import('../../../Pages/Payroll/Recruitment/reports/JobApplicationStatus'),
  {
    fallback: <Loading />,
  }
);

const JobOfferStatus = loadable(
  () => import('../../../Pages/Payroll/Recruitment/Transaction/JobOfferStatus'),
  {
    fallback: <Loading />,
  }
);

const JobOfferCreate = loadable(
  () => import('../../../Pages/Payroll/Recruitment/Transaction/JobOfferCreate'),
  {
    fallback: <Loading />,
  }
);

const EmploymentRequest = loadable(
  () => import('../../../Pages/Payroll/Recruitment/Transaction/EmploymentRequest'),
  {
    fallback: <Loading />,
  }
);

const EmploymentRequestCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/EmploymentRequestCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const ReviewEmploymentRequest = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/ReviewEmploymentRequest'
  ),
  {
    fallback: <Loading />,
  }
);

const ReviewEmploymentRequestCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/ReviewEmploymentRequestCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const HiringRequestEvaluation = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/HiringRequestEvaluation'
  ),
  {
    fallback: <Loading />,
  }
);

const HiringRequestEvaluationEdit = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/HiringRequestEvaluationEdit'
  ),
  {
    fallback: <Loading />,
  }
);

const TechApplicationReview = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/TechApplicationReview'
  ),
  {
    fallback: <Loading />,
  }
);

const SecApplicationReview = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/SecApplicationReview'
  ),
  {
    fallback: <Loading />,
  }
);

const ApplicationCallStatus = loadable(
  () => import(
    '../../../Pages/Payroll/Recruitment/Transaction/ApplicationCallStatus'
  ),
  {
    fallback: <Loading />,
  }
);

const recruitment = {
  JobAdvertisement,
  JobAdvertisementCreate,
  JobApplicationPreview,
  JobRequirements,
  RecHrTest,
  RecHrTestCreate,
  RecEvaluation,
  RecEvaluationCreate,
  HRApplicationEvaluation,
  HRInterviewEvaluation,
  HRInterviewEvaluationEdit,
  ManagerInterviewEvaluation,
  ManagerInterviewEvaluationEdit,
  HiringRequest,
  HiringRequestCreate,
  JobOffer,
  Employment,
  JobDataBank,
  JobApplicationStatus,
  JobOfferStatus,
  JobOfferCreate,
  EmploymentRequest,
  EmploymentRequestCreate,
  ReviewEmploymentRequest,
  ReviewEmploymentRequestCreate,
  HiringRequestEvaluation,
  HiringRequestEvaluationEdit,
  TechApplicationReview,
  SecApplicationReview,
  ApplicationCallStatus,
};

export default recruitment;
