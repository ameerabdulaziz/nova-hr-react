import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const Section = loadable(
  () => import('../../../Pages/Payroll/Section/SectionList'),
  {
    fallback: <Loading />,
  }
);

const NotFound = loadable(() => import('../../../NotFound/NotFound'), {
  fallback: <Loading />,
});

const Error = loadable(() => import('../../../Pages/Error'), {
  fallback: <Loading />,
});

const HomePage = loadable(() => import('../../../LandingPage/HomePage'), {
  fallback: <Loading />,
});

const AdminDashboard = loadable(
  () => import('../../../Pages/Payroll/Dashboard/AdminDashboard'),
  {
    fallback: <Loading />,
  }
);

const NewsDetails = loadable(
  () => import('../../../Pages/Payroll/News/NewsDetails'),
  {
    fallback: <Loading />,
  }
);

const ManagementDashboard = loadable(
  () => import('../../../Pages/Payroll/Dashboard/ManagementDashboard'),
  {
    fallback: <Loading />,
  }
);

const EmployeeDashboard = loadable(
  () => import('../../../Pages/Payroll/Dashboard/SuperDashboard'),
  {
    fallback: <Loading />,
  }
);

const Login = loadable(() => import('../../../Pages/Users/Login'), {
  fallback: <Loading />,
});

const Register = loadable(() => import('../../../Pages/Users/Register'), {
  fallback: <Loading />,
});

const ResetPassword = loadable(
  () => import('../../../Pages/Users/ResetPassword'),
  {
    fallback: <Loading />,
  }
);

const ForgotPassword = loadable(
  () => import('../../../Pages/Users/ForgotPassword'),
  {
    fallback: <Loading />,
  }
);

const LockScreen = loadable(() => import('../../../Pages/Users/LockScreen'), {
  fallback: <Loading />,
});

const Profile = loadable(
  () => import('../../../Pages/Payroll/Profile/Profile'),
  {
    fallback: <Loading />,
  }
);

const LoginFullstack = loadable(
  () => import('../../../Pages/UsersFullstack/Login'),
  {
    fallback: <Loading />,
  }
);

const RegisterFullstack = loadable(
  () => import('../../../Pages/UsersFullstack/Register'),
  {
    fallback: <Loading />,
  }
);

const ResetPasswordFullstack = loadable(
  () => import('../../../Pages/UsersFullstack/ResetPassword'),
  {
    fallback: <Loading />,
  }
);

const global = {
  Section,
  NotFound,
  Error,
  HomePage,
  AdminDashboard,
  NewsDetails,
  ManagementDashboard,
  EmployeeDashboard,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  LockScreen,
  LoginFullstack,
  RegisterFullstack,
  ResetPasswordFullstack,
  Profile,
};

export default global;
