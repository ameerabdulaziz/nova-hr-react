import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../utils/loadable';

export const MainDataGeneralCode = loadable(
  () => import('../Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);

export const Grade = (props) => (
  <MainDataGeneralCode text='Grade' table='MdGrade' {...props} />
);

export const JobLevel = (props) => (
  <MainDataGeneralCode text='Job Level' table='MdJobLevel' {...props} />
);

export const Month = (props) => (
  <MainDataGeneralCode text='Month' table='MdMonth' {...props} />
);

export const Year = (props) => (
  <MainDataGeneralCode text='Year' table='MdYear' {...props} />
);

export const Nationalities = (props) => (
  <MainDataGeneralCode
    text='Nationalities'
    table='MdNationalities'
    {...props}
  />
);

export const Qualifications = (props) => (
  <MainDataGeneralCode
    text='Qualifications'
    table='MdQualifications'
    {...props}
  />
);

export const Religions = (props) => (
  <MainDataGeneralCode text='Religions' table='MdReligions' {...props} />
);

export const Salute = (props) => (
  <MainDataGeneralCode text='Salute' table='MdSalute' {...props} />
);

export const LicenseGrade = (props) => (
  <MainDataGeneralCode text='License Grade' table='MdLicenseGrade' {...props} />
);

export const KinshipLink = (props) => (
  <MainDataGeneralCode text='Kinship Link' table='MdKinshipLink' {...props} />
);

export const MilitaryStatus = (props) => (
  <MainDataGeneralCode
    text='Military Status'
    table='MdMilitaryStatus'
    {...props}
  />
);

export const ResignReason = (props) => (
  <MainDataGeneralCode text='ResignReason' table='HrResignReason' {...props} />
);

export const JobTypes = (props) => (
  <MainDataGeneralCode text='Job Types' table='MdJobsTypes' {...props} />
);

export const JobNatures = (props) => (
  <MainDataGeneralCode text='Job Natures' table='MdJobNatures' {...props} />
);

export const SocialStatus = (props) => (
  <MainDataGeneralCode text='Social Status' table='MdSocialStatus' {...props} />
);

export const InsuranceRegion = (props) => (
  <MainDataGeneralCode
    text='Insurance Region'
    table='SinsuranceRegion'
    {...props}
  />
);

export const MinsuranceItem = (props) => (
  <MainDataGeneralCode
    text='Insurance Item'
    table='MinsuranceItem'
    {...props}
  />
);

export const RecHiringSource = (props) => (
  <MainDataGeneralCode
    text='Recruitment Hiring Source'
    table='RecHiringSource'
    {...props}
  />
);

export const RecJobGrade = (props) => (
  <MainDataGeneralCode
    text='Recruitment Job Grade'
    table='RecJobGrade'
    {...props}
  />
);

export const AsCategory = (props) => (
  <MainDataGeneralCode
    text='Assessment Category'
    table='AsCategory'
    {...props}
  />
);

export const MdDocumentCategory = (props) => (
  <MainDataGeneralCode
    text='Document Category'
    table='MdDocumentCategory'
    {...props}
  />
);

export const CourseType = (props) => (
  <MainDataGeneralCode
    text='Course Type'
    table='HrCourseType'
    {...props}
  />
);

// Survey
export const SurveyQuestionGroup = (props) => (
  <MainDataGeneralCode
    text='Survey Question Group'
    table='SurveyQuestionGroup'
    {...props}
  />
);
