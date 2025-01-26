import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const UserMenu = loadable(
  () => import('../../../Pages/Payroll/Setting/UserMenu'),
  {
    fallback: <Loading />,
  }
);
const MailSetting = loadable(
  () => import('../../../Pages/Payroll/Setting/MailSetting'),
  {
    fallback: <Loading />,
  }
);
const SMSSetting = loadable(
  () => import('../../../Pages/Payroll/Setting/SMSSetting'),
  {
    fallback: <Loading />,
  }
);
const SettingResetPassword = loadable(
  () => import('../../../Pages/Payroll/Setting/ResetPassword'),
  {
    fallback: <Loading />,
  }
);

const ChangePassword = loadable(
  () => import('../../../Pages/Payroll/Setting/ChangePassword'),
  {
    fallback: <Loading />,
  }
);

const SettingMailSmsForm = loadable(
  () => import('../../../Pages/Payroll/Setting/SettingMailSmsForm'),
  {
    fallback: <Loading />,
  }
);

const SettingMailSmsFormCreate = loadable(
  () => import('../../../Pages/Payroll/Setting/SettingMailSmsFormCreate'),
  {
    fallback: <Loading />,
  }
);

const CertificateSetting = loadable(
  () => import('../../../Pages/Payroll/Setting/CertificateSetting'),
  {
    fallback: <Loading />,
  }
);

const PrintForm = loadable(
  () => import('../../../Pages/Payroll/Setting/PrintForm'),
  {
    fallback: <Loading />,
  }
);

const HrPermission = loadable(
  () => import('../../../Pages/Payroll/Setting/HrPermission'),
  {
    fallback: <Loading />,
  }
);

const OpenCloseMonth = loadable(
  () => import('../../../Pages/Payroll/Setting/OpenCloseMonth'),
  {
    fallback: <Loading />,
  }
);

const LogReport = loadable(
  () => import('../../../Pages/Payroll/Setting/LogReport'),
  {
    fallback: <Loading />,
  }
);

const MenuTemplate = loadable(
  () => import('../../../Pages/Payroll/Setting/MenuTemplate'),
  {
    fallback: <Loading />,
  }
);

const setting = {
  UserMenu,
  MailSetting,
  SMSSetting,
  SettingResetPassword,
  ChangePassword,
  SettingMailSmsForm,
  SettingMailSmsFormCreate,
  CertificateSetting,
  PrintForm,
  HrPermission,
  OpenCloseMonth,
  LogReport,
  MenuTemplate,
};

export default setting;
