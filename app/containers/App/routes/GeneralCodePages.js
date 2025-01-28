import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../utils/loadable';

const MainDataGeneralCode = loadable(
  () => import('../../Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);

const Grade = (props) => (
  <MainDataGeneralCode text='Grade' table='MdGrade' {...props} />
);

const JobLevel = (props) => (
  <MainDataGeneralCode text='Job Level' table='MdJobLevel' {...props} />
);

const Month = (props) => (
  <MainDataGeneralCode text='Month' table='MdMonth' {...props} />
);

const Year = (props) => (
  <MainDataGeneralCode text='Year' table='MdYear' {...props} />
);

const Nationalities = (props) => (
  <MainDataGeneralCode
    text='Nationalities'
    table='MdNationalities'
    {...props}
  />
);

const Qualifications = (props) => (
  <MainDataGeneralCode
    text='Qualifications'
    table='MdQualifications'
    {...props}
  />
);

const Languages = (props) => (
  <MainDataGeneralCode
    text='Language'
    table='MdLanguage'
    {...props}
  />
);

const Religions = (props) => (
  <MainDataGeneralCode text='Religions' table='MdReligions' {...props} />
);

const Salute = (props) => (
  <MainDataGeneralCode text='Salute' table='MdSalute' {...props} />
);

const LicenseGrade = (props) => (
  <MainDataGeneralCode text='License Grade' table='MdLicenseGrade' {...props} />
);

const KinshipLink = (props) => (
  <MainDataGeneralCode text='Kinship Link' table='MdKinshipLink' {...props} />
);

const MilitaryStatus = (props) => (
  <MainDataGeneralCode
    text='Military Status'
    table='MdMilitaryStatus'
    {...props}
  />
);

// const ResignReason = (props) => (
//   <MainDataGeneralCode text='ResignReason' table='HrResignReason' {...props} />
// );

const JobTypes = (props) => (
  <MainDataGeneralCode text='Job Types' table='MdJobsTypes' {...props} />
);

const JobNatures = (props) => (
  <MainDataGeneralCode text='Job Natures' table='MdJobNatures' {...props} />
);

const SocialStatus = (props) => (
  <MainDataGeneralCode text='Social Status' table='MdSocialStatus' {...props} />
);

const InsuranceRegion = (props) => (
  <MainDataGeneralCode
    text='Insurance Region'
    table='SinsuranceRegion'
    {...props}
  />
);

const MinsuranceItem = (props) => (
  <MainDataGeneralCode
    text='Insurance Item'
    table='MinsuranceItem'
    {...props}
  />
);

const RecHiringSource = (props) => (
  <MainDataGeneralCode
    text='Recruitment Hiring Source'
    table='RecHiringSource'
    {...props}
  />
);

const RecJobGrade = (props) => (
  <MainDataGeneralCode
    text='Recruitment Job Grade'
    table='RecJobGrade'
    {...props}
  />
);

const AsCategory = (props) => (
  <MainDataGeneralCode
    text='Assessment Category'
    table='AsCategory'
    {...props}
  />
);

const MdDocumentCategory = (props) => (
  <MainDataGeneralCode
    text='Document Category'
    table='MdDocumentCategory'
    {...props}
  />
);

const CourseType = (props) => (
  <MainDataGeneralCode text='Course Type' table='HrCourseType' {...props} />
);

// Survey
const SurveyQuestionGroup = (props) => (
  <MainDataGeneralCode
    text='Survey Question Group'
    table='SurveyQuestionGroup'
    {...props}
  />
);

const GeneralCodePages = {
  AsCategory,
  CourseType,
  Grade,
  InsuranceRegion,
  JobLevel,
  JobNatures,
  JobTypes,
  KinshipLink,
  LicenseGrade,
  MdDocumentCategory,
  MilitaryStatus,
  MinsuranceItem,
  Month,
  Nationalities,
  Qualifications,
  Languages,
  RecHiringSource,
  RecJobGrade,
  Religions,
  // ResignReason,
  Salute,
  SocialStatus,
  SurveyQuestionGroup,
  Year,
};

export default GeneralCodePages;
