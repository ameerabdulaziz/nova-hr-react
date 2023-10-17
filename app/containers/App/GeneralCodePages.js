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

export const Government = (props) => (
  <MainDataGeneralCode text='Government' table='MdGovernment' {...props} />
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

export const Courses = (props) => (
  <MainDataGeneralCode text='Courses' table='HrCourses' {...props} />
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

export const IdentityType = (props) => (
  <MainDataGeneralCode text='Identity Type' table='MdIdentityType' {...props} />
);

export const InsuranceRegion = (props) => (
  <MainDataGeneralCode
    text='Insurance Region'
    table='SinsuranceRegion'
    {...props}
  />
);
