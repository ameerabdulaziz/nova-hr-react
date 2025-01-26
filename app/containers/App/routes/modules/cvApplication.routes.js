import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const JobAdvertisementList = loadable(
  () => import('../../../Pages/Payroll/cv-application/JobAdvertisement'),
  {
    fallback: <Loading />,
  }
);

const JobAdvertisementApplication = loadable(
  () => import('../../../Pages/Payroll/cv-application/JobAdvertisementApplication'),
  {
    fallback: <Loading />,
  }
);

const ApplicationUnderReviewing = loadable(
  () => import('../../../Pages/Payroll/cv-application/ApplicationUnderReviewing'),
  {
    fallback: <Loading />,
  }
);

const cvApplications = {
  JobAdvertisementList,
  JobAdvertisementApplication,
  ApplicationUnderReviewing,
};

export default cvApplications;
