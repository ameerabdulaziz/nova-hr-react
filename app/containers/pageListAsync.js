import React from 'react';
import Loading from 'enl-components/Loading';
import loadable from '../utils/loadable';

// Landing Page
export const HomePage = loadable(() => import('./LandingPage/HomePage'), {
  fallback: <Loading />,
});


export const AdminDashboard = loadable(
  () => import('./Pages/Payroll/Dashboard/AdminDashboard'),
  {
    fallback: <Loading />,
  }
);

export const NewsDetails = loadable(
  () => import('./Pages/Payroll/News/NewsDetails'),
  {
    fallback: <Loading />,
  }
);


export const ManagementDashboard = loadable(
  () => import('./Pages/Payroll/Dashboard/ManagementDashboard'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeDashboard = loadable(
  () => import('./Pages/Payroll/Dashboard/SuperDashboard'),
  {
    fallback: <Loading />,
  }
);

// Tables
export const SimpleTable = loadable(() => import('./Tables/BasicTable'), {
  fallback: <Loading />,
});
export const AdvancedTable = loadable(() => import('./Tables/AdvancedTable'), {
  fallback: <Loading />,
});
export const EditableCell = loadable(() => import('./Tables/EditableCell'), {
  fallback: <Loading />,
});
export const TreeTable = loadable(() => import('./Tables/TreeTable'), {
  fallback: <Loading />,
});
export const TablePlayground = loadable(
  () => import('./Tables/TablePlayground'),
  {
    fallback: <Loading />,
  }
);

// Forms
export const ReduxForm = loadable(() => import('./Forms/ReduxForm'), {
  fallback: <Loading />,
});
export const DateTimePicker = loadable(() => import('./Forms/DateTimePicker'), {
  fallback: <Loading />,
});
export const CheckboxRadio = loadable(() => import('./Forms/CheckboxRadio'), {
  fallback: <Loading />,
});
export const Switches = loadable(() => import('./Forms/Switches'), {
  fallback: <Loading />,
});
export const Selectbox = loadable(() => import('./Forms/Selectbox'), {
  fallback: <Loading />,
});
export const SliderRange = loadable(() => import('./Forms/SliderRange'), {
  fallback: <Loading />,
});
export const Buttons = loadable(() => import('./Forms/Buttons'), {
  fallback: <Loading />,
});
export const ToggleButton = loadable(() => import('./Forms/ToggleButton'), {
  fallback: <Loading />,
});
export const Textbox = loadable(() => import('./Forms/Textbox'), {
  fallback: <Loading />,
});
export const Autocomplete = loadable(() => import('./Forms/Autocomplete'), {
  fallback: <Loading />,
});
export const TextEditor = loadable(() => import('./Forms/TextEditor'), {
  fallback: <Loading />,
});
export const Upload = loadable(() => import('./Forms/Upload'), {
  fallback: <Loading />,
});
export const DialButton = loadable(() => import('./Forms/DialButton'), {
  fallback: <Loading />,
});
// Pages
export const LoginFullstack = loadable(
  () => import('./Pages/UsersFullstack/Login'),
  {
    fallback: <Loading />,
  }
);
export const RegisterFullstack = loadable(
  () => import('./Pages/UsersFullstack/Register'),
  {
    fallback: <Loading />,
  }
);
export const ResetPasswordFullstack = loadable(
  () => import('./Pages/UsersFullstack/ResetPassword'),
  {
    fallback: <Loading />,
  }
);
export const Login = loadable(() => import('./Pages/Users/Login'), {
  fallback: <Loading />,
});
export const Register = loadable(() => import('./Pages/Users/Register'), {
  fallback: <Loading />,
});
export const ResetPassword = loadable(
  () => import('./Pages/Users/ResetPassword'),
  {
    fallback: <Loading />,
  }
);
export const ForgotPassword = loadable(
  () => import('./Pages/Users/ForgotPassword'),
  {
    fallback: <Loading />,
  }
);

export const LockScreen = loadable(() => import('./Pages/Users/LockScreen'), {
  fallback: <Loading />,
});
export const Profile = loadable(() => import('./Pages/Payroll/Profile/Profile'), {
  fallback: <Loading />,
});

// Other
export const NotFound = loadable(() => import('./NotFound/NotFound'), {
  fallback: <Loading />,
});
export const Error = loadable(() => import('./Pages/Error'), {
  fallback: <Loading />,
});
// MainData /////////////////////////////////////////////////////////////////////////////////
export const Section = loadable(
  () => import('./Pages/Payroll/Section/SectionList'),
  {
    fallback: <Loading />,
  }
);
export const Gender = loadable(
  () => import('./Pages/Payroll/MainData/Code/Gender'),
  {
    fallback: <Loading />,
  }
);
export const BusinessUnit = loadable(
  () => import('./Pages/Payroll/MainData/Code/BusinessUnit'),
  {
    fallback: <Loading />,
  }
);


export const Jobs = loadable(
  () => import('./Pages/Payroll/MainData/Code/Job'),
  {
    fallback: <Loading />,
  }
);

export const CreateJob = loadable(
  () => import('./Pages/Payroll/MainData/Code/JobCreate'),
  {
    fallback: <Loading />,
  }
);

export const EditJob = loadable(
  () => import('./Pages/Payroll/MainData/Code/JobCreate'),
  {
    fallback: <Loading />,
  }
);

export const Bank = loadable(
  () => import('./Pages/Payroll/MainData/Code/Bank'),
  {
    fallback: <Loading />,
  }
);
export const Company = loadable(
  () => import('./Pages/Payroll/MainData/Code/Company'),
  {
    fallback: <Loading />,
  }
);
export const ContractType = loadable(
  () => import('./Pages/Payroll/MainData/Code/ContractType'),
  {
    fallback: <Loading />,
  }
);
export const City = loadable(
  () => import('./Pages/Payroll/MainData/Code/City'),
  {
    fallback: <Loading />,
  }
);
export const Currency = loadable(
  () => import('./Pages/Payroll/MainData/Code/Currency'),
  {
    fallback: <Loading />,
  }
);

export const IdentityType = loadable(
  () => import('./Pages/Payroll/MainData/Code/IdentityType'),
  {
    fallback: <Loading />,
  }
);

export const Government = loadable(
  () => import('./Pages/Payroll/MainData/Code/Government'),
  {
    fallback: <Loading />,
  }
);

export const CompanyDocument = loadable(
  () => import('./Pages/Payroll/MainData/Code/CompanyDocument'),
  {
    fallback: <Loading />,
  }
);

export const CompanyDocumentCreate = loadable(
  () => import('./Pages/Payroll/MainData/Code/CompanyDocumentCreate'),
  {
    fallback: <Loading />,
  }
);

export const CurrencyRate = loadable(
  () => import('./Pages/Payroll/MainData/Code/CurrencyRate'),
  {
    fallback: <Loading />,
  }
);
export const Documents = loadable(
  () => import('./Pages/Payroll/MainData/Code/Documents'),
  {
    fallback: <Loading />,
  }
);

export const CompanyChart = loadable(
  () => import('./Pages/Payroll/MainData/Transaction/CompanyChart'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeChart = loadable(
  () => import('./Pages/Payroll/MainData/Transaction/EmployeeChart'),
  {
    fallback: <Loading />,
  }
);
export const Organization = loadable(
  () => import('./Pages/Payroll/MainData/Code/Organization'),
  {
    fallback: <Loading />,
  }
);

export const CreateOrganization = loadable(
  () => import('./Pages/Payroll/MainData/Code/OrganizationCreate'),
  {
    fallback: <Loading />,
  }
);

export const EditOrganization = loadable(
  () => import('./Pages/Payroll/MainData/Code/OrganizationCreate'),
  {
    fallback: <Loading />,
  }
);

export const UploadEmployeeData = loadable(
  () => import('./Pages/Payroll/MainData/Code/UploadEmployeeData'),
  {
    fallback: <Loading />,
  }
);

export const Guarantor = loadable(
  () => import('./Pages/Payroll/MainData/Code/Guarantor'),
  {
    fallback: <Loading />,
  }
);

export const CreatGuarantor = loadable(
  () => import('./Pages/Payroll/MainData/Code/GuarantorCreate'),
  {
    fallback: <Loading />,
  }
);

export const EditGuarantor = loadable(
  () => import('./Pages/Payroll/MainData/Code/GuarantorCreate'),
  {
    fallback: <Loading />,
  }
);

// Setting /////////////////////////////////////////////////////////////////////////////////
export const UserMenu = loadable(
  () => import('./Pages/Payroll/Setting/UserMenu'),
  {
    fallback: <Loading />,
  }
);

export const menuTemplate = loadable(
  () => import('./Pages/Payroll/Setting/MenuTemplate'),
  {
    fallback: <Loading />,
  }
);

export const MailSetting = loadable(
  () => import('./Pages/Payroll/Setting/MailSetting'),
  {
    fallback: <Loading />,
  }
);
export const SMSSetting = loadable(
  () => import('./Pages/Payroll/Setting/SMSSetting'),
  {
    fallback: <Loading />,
  }
);
export const SettingResetPassword = loadable(
  () => import('./Pages/Payroll/Setting/ResetPassword'),
  {
    fallback: <Loading />,
  }
);

export const ChangePassword = loadable(
  () => import('./Pages/Payroll/Setting/ChangePassword'),
  {
    fallback: <Loading />,
  }
);

export const SettingMailSmsForm = loadable(
  () => import('./Pages/Payroll/Setting/SettingMailSmsForm'),
  {
    fallback: <Loading />,
  }
);

export const SettingMailSmsFormCreate = loadable(
  () => import('./Pages/Payroll/Setting/SettingMailSmsFormCreate'),
  {
    fallback: <Loading />,
  }
);

export const CertificateSetting = loadable(
  () => import('./Pages/Payroll/Setting/CertificateSetting'),
  {
    fallback: <Loading />,
  }
);

export const PrintForm = loadable(
  () => import('./Pages/Payroll/Setting/PrintForm'),
  {
    fallback: <Loading />,
  }
);

export const HrPermission = loadable(
  () => import('./Pages/Payroll/Setting/HrPermission'),
  {
    fallback: <Loading />,
  }
);

export const OpenCloseMonth = loadable(
  () => import('./Pages/Payroll/Setting/OpenCloseMonth'),
  {
    fallback: <Loading />,
  }
);

export const LogReport = loadable(
  () => import('./Pages/Payroll/Setting/LogReport'),
  {
    fallback: <Loading />,
  }
);

// HR////////////////////////////////////////////////////////////////////////////////////////

export const Courses = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/Courses'),
  {
    fallback: <Loading />,
  }
);

export const CoursesCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/CoursesCreate'),
  {
    fallback: <Loading />,
  }
);

export const TrainingCenter = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/TrainingCenter'),
  {
    fallback: <Loading />,
  }
);

export const TrainingCenterCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/TrainingCenterCreate'),
  {
    fallback: <Loading />,
  }
);

export const Rewards = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/Rewards'),
  {
    fallback: <Loading />,
  }
);
export const Penalty = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/Penalty/PenaltyList'),
  {
    fallback: <Loading />,
  }
);
export const PenaltyCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/Penalty/PenaltyCreate'),
  {
    fallback: <Loading />,
  }
);

export const RewardTransList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Reward/RewardTransList'),
  {
    fallback: <Loading />,
  }
);
export const RewardTransCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Reward/RewardTransCreate'),
  {
    fallback: <Loading />,
  }
);

export const PenaltyTransList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Penalty/PenaltyTransList'),
  {
    fallback: <Loading />,
  }
);
export const PenaltyTransCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Penalty/PenaltyTransCreate'),
  {
    fallback: <Loading />,
  }
);

export const AttentionList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Attention/AttentionList'),
  {
    fallback: <Loading />,
  }
);
export const AttentionCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Attention/AttentionCreate'),
  {
    fallback: <Loading />,
  }
);

export const LayOffNoticeList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/LayOffNotice/LayOffNoticeList'),
  {
    fallback: <Loading />,
  }
);
export const LayOffNoticeCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/LayOffNotice/LayOffNoticeCreate'),
  {
    fallback: <Loading />,
  }
);

export const PromotionsList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Promotions/PromotionsList'),
  {
    fallback: <Loading />,
  }
);
export const PromotionsCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Promotions/PromotionsCreate'),
  {
    fallback: <Loading />,
  }
);
export const ExplanationList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Explanation/ExplanationList'),
  {
    fallback: <Loading />,
  }
);
export const ExplanationEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Explanation/ExplanationEdit'),
  {
    fallback: <Loading />,
  }
);

export const OrganizationManger = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/OrganizationManager'),
  {
    fallback: <Loading />,
  }
);
export const NewsList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/News/NewsList'),
  {
    fallback: <Loading />,
  }
);
export const NewsCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/News/NewsCreate'),
  {
    fallback: <Loading />,
  }
);

export const ResignationReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/ResignationReport'),
  {
    fallback: <Loading />,
  }
);

export const ExplanationReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/ExplanationReport'),
  {
    fallback: <Loading />,
  }
);
export const Complaint = loadable(
  () => import('./Pages/Payroll/Explanation/Complaint'),
  {
    fallback: <Loading />,
  }
);
export const HrLetter = loadable(
  () => import('./Pages/Payroll/Explanation/HrLetter'),
  {
    fallback: <Loading />,
  }
);
export const NewIdea = loadable(
  () => import('./Pages/Payroll/Explanation/NewIdea'),
  {
    fallback: <Loading />,
  }
);

export const PromotionsReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/PromotionsReport'),
  {
    fallback: <Loading />,
  }
);

export const DirectManager = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/DirectManager'),
  {
    fallback: <Loading />,
  }
);

export const Custody = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/Custody'),
  {
    fallback: <Loading />,
  }
);
export const CustodyCategory = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/CustodyCategory'),
  {
    fallback: <Loading />,
  }
);

export const CustodyDeliveryReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/CustodyDeliveryReport'),
  {
    fallback: <Loading />,
  }
);
export const CustodyDeliveryList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/CustodyDelivery/CustodyDeliveryList'),
  {
    fallback: <Loading />,
  }
);
export const CustodyDeliveryCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/CustodyDelivery/CustodyDeliveryCreate'),
  {
    fallback: <Loading />,
  }
);

export const CustodyReceiveReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/CustodyReceiveReport'),
  {
    fallback: <Loading />,
  }
);
export const CustodyReceiveList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/CustodyReceive/CustodyReceiveList'),
  {
    fallback: <Loading />,
  }
);
export const CustodyReceiveCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/CustodyReceive/CustodyReceiveCreate'),
  {
    fallback: <Loading />,
  }
);

export const Uniform = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/Uniform'),
  {
    fallback: <Loading />,
  }
);

export const UniformDeliveryReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/UniformDeliveryReport'),
  {
    fallback: <Loading />,
  }
);
export const UniformDeliveryList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/UniformDelivery/UniformDeliveryList'),
  {
    fallback: <Loading />,
  }
);
export const UniformDeliveryCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/UniformDelivery/UniformDeliveryCreate'),
  {
    fallback: <Loading />,
  }
);

export const UniformReceiveReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/UniformReceiveReport'),
  {
    fallback: <Loading />,
  }
);
export const UniformReceiveList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/UniformReceive/UniformReceiveList'),
  {
    fallback: <Loading />,
  }
);
export const UniformReceiveCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/UniformReceive/UniformReceiveCreate'),
  {
    fallback: <Loading />,
  }
);
export const ResignTrxList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Resign/ResignTrxList'),
  {
    fallback: <Loading />,
  }
);
export const ResignTrxCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Resign/ResignTrxCreate'),
  {
    fallback: <Loading />,
  }
);
export const ResignTrxReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/ResignTrxReport'),
  {
    fallback: <Loading />,
  }
);
export const ManPowerSetting = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/ManPowerSetting'),
  {
    fallback: <Loading />,
  }
);
export const ResignTrxImport = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/Resign/ResignTrxImport'),
  {
    fallback: <Loading />,
  }
);
export const EmpCourseList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/EmpCourse/EmpCourseList'),
  {
    fallback: <Loading />,
  }
);
export const EmpCourseCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/EmpCourse/EmpCourseCreate'),
  {
    fallback: <Loading />,
  }
);
export const LayOffNoticeReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/LayOffNoticeReport'),
  {
    fallback: <Loading />,
  }
);
export const Items = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/Items'),
  {
    fallback: <Loading />,
  }
);
export const AttentionReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/AttentionReport'),
  {
    fallback: <Loading />,
  }
);
export const PenaltyTransReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/PenaltyTransReport'),
  {
    fallback: <Loading />,
  }
);
export const RewardTransReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/RewardTransReport'),
  {
    fallback: <Loading />,
  }
);
export const EmpCourseReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/EmpCourseReport'),
  {
    fallback: <Loading />,
  }
);

export const ResignReqTrxCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/ResignReqTrx/ResignReqTrxCreate'),
  {
    fallback: <Loading />,
  }
);

export const ResignReqTrxEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/ResignReqTrx/ResignReqTrxCreate'),
  {
    fallback: <Loading />,
  }
);

export const ResignReqTrxList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/ResignReqTrx/ResignReqTrx'),
  {
    fallback: <Loading />,
  }
);

export const HrEmployeeDocumentTrxCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/HrEmployeeDocumentTrxCreate'),
  {
    fallback: <Loading />,
  }
);

export const HrEmployeeDocumentTrxEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/HrEmployeeDocumentTrxCreate'),
  {
    fallback: <Loading />,
  }
);

export const HrEmployeeDocumentTrxList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/HrEmployeeDocumentTrx'),
  {
    fallback: <Loading />,
  }
);

export const ManPowerReport = loadable(
  () => import('./Pages/Payroll/HumanResources/Reports/ManPowerReport'),
  {
    fallback: <Loading />,
  }
);

export const EmpInvestigation = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/EmployeeInvestigation/EmployeeInvestigation'),
  {
    fallback: <Loading />,
  }
);


export const EmpInvestigationCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/EmployeeInvestigation/EmployeeInvestigationCreate'),
  {
    fallback: <Loading />,
  }
);

export const EmpInvestigationEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/EmployeeInvestigation/EmployeeInvestigationCreate'),
  {
    fallback: <Loading />,
  }
);

export const TransferRequest = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/TransferRequest/TransferRequest'),
  {
    fallback: <Loading />,
  }
);

export const TransferRequestCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/TransferRequest/TransferRequestCreate'),
  {
    fallback: <Loading />,
  }
);

export const TransferRequestEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/TransferRequest/TransferRequestCreate'),
  {
    fallback: <Loading />,
  }
);

// Attendance /////////////////////////////////////////////////////////////////////////////////

export const PermissionTrxList = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Permission/PermissionTrxList'),
  {
    fallback: <Loading />,
  }
);
export const PermissionTrxCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Permission/PermissionTrxCreate'),
  {
    fallback: <Loading />,
  }
);
export const PermissionTrxReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/PermissionTrxReport'),
  {
    fallback: <Loading />,
  }
);

export const MissionTransportaion = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Mission/MissionTransportaion'),
  {
    fallback: <Loading />,
  }
);

export const PermissionList = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Permission/PermissionList'),
  {
    fallback: <Loading />,
  }
);
export const PermissionCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Permission/PermissionCreate'),
  {
    fallback: <Loading />,
  }
);

export const PermissionTrxImport = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Permission/PermissionTrxImport'),
  {
    fallback: <Loading />,
  }
);
export const CollectedPermission = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Permission/CollectedPermission'),
  {
    fallback: <Loading />,
  }
);
export const MissionType = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Mission/MissionType'),
  {
    fallback: <Loading />,
  }
);

export const MissionTypeCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Mission/MissionTypeCreate'),
  {
    fallback: <Loading />,
  }
);

export const MissionTypeEdit = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Mission/MissionTypeCreate'),
  {
    fallback: <Loading />,
  }
);

export const ShiftList = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftList'),
  {
    fallback: <Loading />,
  }
);
export const ShiftManPower = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftManPower'),
  {
    fallback: <Loading />,
  }
);

export const ShiftCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftCreate'),
  {
    fallback: <Loading />,
  }
);

export const ShiftEmployeeList = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftEmployeeList'),
  {
    fallback: <Loading />,
  }
);
export const ShiftEmployeeCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftEmployeeCreate'),
  {
    fallback: <Loading />,
  }
);

export const ShiftOrgnization = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftOrgnization'),
  {
    fallback: <Loading />,
  }
);
export const ShiftTransfere = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftTransfere'),
  {
    fallback: <Loading />,
  }
);
export const ShiftReview = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftReview'),
  {
    fallback: <Loading />,
  }
);
export const ShiftImport = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftImport'),
  {
    fallback: <Loading />,
  }
);

export const MissionTrxList = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Mission/MissionTrxList'),
  {
    fallback: <Loading />,
  }
);
export const MissionTrxCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Mission/MissionTrxCreate'),
  {
    fallback: <Loading />,
  }
);

export const SwapShiftTrx = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/SwapShiftTrx'),
  {
    fallback: <Loading />,
  }
);
export const SwapShiftTrxCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/SwapShiftTrxCreate'),
  {
    fallback: <Loading />,
  }
);

export const CalculateAttendance = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/CalculateAttendance'),
  {
    fallback: <Loading />,
  }
);

export const MissionTrxReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/MissionTrxReport'),
  {
    fallback: <Loading />,
  }
);
export const MissionTrxImport = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Mission/MissionTrxImport'),
  {
    fallback: <Loading />,
  }
);
export const CollectedMission = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Mission/CollectedMission'),
  {
    fallback: <Loading />,
  }
);

export const RulesList = loadable(
  () => import('./Pages/Payroll/Attendance/Code/AttRules/AttRulesList'),
  {
    fallback: <Loading />,
  }
);
export const RulesCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Code/AttRules/AttRulesCreate'),
  {
    fallback: <Loading />,
  }
);
export const DeviceList = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Device/DeviceList'),
  {
    fallback: <Loading />,
  }
);
export const DeviceCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Device/DeviceCreate'),
  {
    fallback: <Loading />,
  }
);
export const MissionReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/MissionReport'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeShiftReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/EmployeeShiftReport'),
  {
    fallback: <Loading />,
  }

);

export const DetailedReportAbsences = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/DetailedReportAbsences'),
  {
    fallback: <Loading />,
  }

);

export const EmployeesWithoutShiftsReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/EmployeesWithoutShiftsReport'),
  {
    fallback: <Loading />,
  }
  
);

export const OverTimeDetailsReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/OverTimeDetailsReport'),
  {
    fallback: <Loading />,
  }
  
);

export const AbsenceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/AbsenceReport'),
  {
    fallback: <Loading />,
  }
  
);

export const EarlyAttendanceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/EarlyAttendanceReport'),
  {
    fallback: <Loading />,
  }
  
);

export const EarlyLeavingReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/EarlyLeavingReport'),
  {
    fallback: <Loading />,
  }
  
);


export const OvertimeHoursRequest = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Overtime/OvertimeHoursRequest'),
  {
    fallback: <Loading />,
  }
);

export const OvertimeHoursRequestCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Overtime/OvertimeHoursRequestCreate'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeLessTimeReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/EmployeeLessTimeReport'),
  {
    fallback: <Loading />,
  }
);

export const ReviewOvertime = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/Overtime/ReviewOvertime'),
  {
    fallback: <Loading />,
  }
);
export const RemoveEmployeeSign = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/RemoveEmployeeSign'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeAttendance = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/EmployeeAttendance'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeLocation = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/EmployeeLocation'),
  {
    fallback: <Loading />,
  }
);
export const DataFromAllDevices = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/DataFromAllDevices'),
  {
    fallback: <Loading />,
  }
);
export const GetAttLog = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/GetAttLog'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeAttendanceTemplateReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/EmployeeAttendanceTemplateReport'),
  {
    fallback: <Loading />,
  }
);

export const ManHoursReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/ManHoursReport'),
  {
    fallback: <Loading />,
  }
);

export const AttendanceRatioReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/AttendanceRatioReport'),
  {
    fallback: <Loading />,
  }
);

export const MonthlyAttendanceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/MonthlyAttendanceReport'),
  {
    fallback: <Loading />,
  }
);

export const AttendanceDeviceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/AttendanceDeviceReport'),
  {
    fallback: <Loading />,
  }
);

export const ContinuousAbsenceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/ContinuousAbsenceReport'),
  {
    fallback: <Loading />,
  }
);

export const RegisterInAndOutReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/RegisterInAndOutReport'),
  {
    fallback: <Loading />,
  }
);

export const ManualAttendanceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/ManualAttendanceReport'),
  {
    fallback: <Loading />,
  }
);

export const BreakTimeReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/BreakTimeReport'),
  {
    fallback: <Loading />,
  }
);

export const StatisticalReport2 = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/StatisticalReport2'),
  {
    fallback: <Loading />,
  }
);

export const WorkinHoursByTimeReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/WorkinHoursByTimeReport'),
  {
    fallback: <Loading />,
  }
);

export const OverTimeReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/OverTimeReport'),
  {
    fallback: <Loading />,
  }
);

export const WorkinLeavesDetailsReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/WorkinLeavesDetailsReport'),
  {
    fallback: <Loading />,
  }
);

export const OverTimeDayNightReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/OverTimeDayNightReport'),
  {
    fallback: <Loading />,
  }
);

export const WorkinLeavesReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/WorkinLeavesReport'),
  {
    fallback: <Loading />,
  }
);

export const LateAttendanceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/LateAttendanceReport'),
  {
    fallback: <Loading />,
  }
);


export const DetailedAttendanceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/DetailedAttendanceReport'),
  {
    fallback: <Loading />,
  }
);

export const DetailedAttendanceReview = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/DetailedAttendanceReview'),
  {
    fallback: <Loading />,
  }
);


export const MonthlyAttendanceSummaryReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/MonthlyAttendanceSummaryReport'),
  {
    fallback: <Loading />,
  }
);

export const MonthlyStatisticsReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/MonthlyStatisticsReport'),
  {
    fallback: <Loading />,
  }
);

export const DeviceLogReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/DeviceLogReport'),
  {
    fallback: <Loading />,
  }
);


export const AttendanceRatiosStatementsReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/AttendanceRatiosStatementsReport'),
  {
    fallback: <Loading />,
  }
);


export const RegisterLocationCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Registerlocation/RegisterLocationCreate'),
  {
    fallback: <Loading />,
  }
);

export const RegisterLocationEdit = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Registerlocation/RegisterLocationCreate'),
  {
    fallback: <Loading />,
  }
);

export const RegisterLocation = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Registerlocation/RegisterLocation'),
  {
    fallback: <Loading />,
  }
);

export const ShiftManPowerReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/ShiftManPowerReport'),
  {
    fallback: <Loading />,
  }
);

export const GPSAttendance = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/GPS-Attendance'),
  {
    fallback: <Loading />,
  }
);

export const LocationAttendanceReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/LocationAttendanceReport'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeLocationReport = loadable(
  () => import('./Pages/Payroll/Attendance/Reports/EmployeeLocationReport'),
  {
    fallback: <Loading />,
  }
);

export const ForgotFingerprintRequest = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/ForgotFingerprintRequest/ForgotFingerprintRequest'),
  {
    fallback: <Loading />,
  }
);

export const ForgotFingerprintRequestCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/ForgotFingerprintRequest/ForgotFingerprintRequestCreate'),
  {
    fallback: <Loading />,
  }
);

export const ForgotFingerprintRequestEdit = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/ForgotFingerprintRequest/ForgotFingerprintRequestCreate'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeSchedule = loadable(
  () => import('./Pages/Payroll/Attendance/Code/EmployeeSchedule/EmployeeSchedule'),
  {
    fallback: <Loading />,
  }
);


// Payroll /////////////////////////////////////////////////////////////////////////////////
export const LoanSetting = loadable(
  () => import('./Pages/Payroll/Payroll/Code/LoanSetting'),
  {
    fallback: <Loading />,
  }
);
export const PayTemplateList = loadable(
  () => import('./Pages/Payroll/Payroll/Code/PayTemplate/PayTemplateList'),
  {
    fallback: <Loading />,
  }
);
export const PayTemplateCreate = loadable(
  () => import('./Pages/Payroll/Payroll/Code/PayTemplate/PayTemplateCreate'),
  {
    fallback: <Loading />,
  }
);

export const ElementValList = loadable(
  () => import('./Pages/Payroll/Payroll/Transaction/ElementVal/ElementValList'),
  {
    fallback: <Loading />,
  }
);
export const ElementValHistory = loadable(
  () => import('./Pages/Payroll/Payroll/Transaction/ElementVal/ElementValHistory'),
  {
    fallback: <Loading />,
  }
);

export const ElementValCreate = loadable(
  () => import('./Pages/Payroll/Payroll/Transaction/ElementVal/ElementValCreate'),
  {
    fallback: <Loading />,
  }
);
export const ElementVlaImport = loadable(
  () => import('./Pages/Payroll/Payroll/Transaction/ElementVal/ElementVlaImport'),
  {
    fallback: <Loading />,
  }
);

export const ElementTaxIns = loadable(
  () => import('./Pages/Payroll/Payroll/Code/ElementTaxIns'),
  {
    fallback: <Loading />,
  }
);
export const SalaryStructureList = loadable(
  () => import('./Pages/Payroll/Payroll/Code/SalaryStructure/SalaryStructureList'),
  {
    fallback: <Loading />,
  }
);
export const SalaryStructureCreate = loadable(
  () => import('./Pages/Payroll/Payroll/Code/SalaryStructure/SalaryStructureCreate'),
  {
    fallback: <Loading />,
  }
);
export const ElementsList = loadable(
  () => import('./Pages/Payroll/Payroll/Code/Elements/ElementsList'),
  {
    fallback: <Loading />,
  }
);
export const ElementsCreate = loadable(
  () => import('./Pages/Payroll/Payroll/Code/Elements/ElementsCreate'),
  {
    fallback: <Loading />,
  }
);


export const BranchSalarySetting = loadable(
  () => import('./Pages/Payroll/Payroll/Code/BranchSalarySetting'),
  {
    fallback: <Loading />,
  }
);

export const PaymentSlip = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/PaymentSlip'),
  {
    fallback: <Loading />,
  }
);

export const PaymentSlipReview = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/PaymentSlipReview'),
  {
    fallback: <Loading />,
  }
);

export const PaymentSlipTotal = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/PaymentSlipTotal'),
  {
    fallback: <Loading />,
  }
);

export const PaymentSlipTotalReview = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/PaymentSlipTotalReview'),
  {
    fallback: <Loading />,
  }
);

export const SalaryReport = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/SalaryReport'),
  {
    fallback: <Loading />,
  }
);

export const MonthlyVariablesReport = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/MonthlyVariablesReport'),
  {
    fallback: <Loading />,
  }
);

export const DetailedPayrollReport = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/DetailedPayrollReport'),
  {
    fallback: <Loading />,
  }
);

export const AnnualTaxReport = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/AnnualTaxReport'),
  {
    fallback: <Loading />,
  }
);

export const BankList = loadable(
  () => import('./Pages/Payroll/Payroll/Reports/BankList'),
  {
    fallback: <Loading />,
  }
);

export const LoanTrxList = loadable(
  () => import('./Pages/Payroll/Payroll/Transaction/Loan/LoanTrxList'),
  {
    fallback: <Loading />,
  }
);
export const LoanTrxCreate = loadable(
  () => import('./Pages/Payroll/Payroll/Transaction/Loan/LoanTrxCreate'),
  {
    fallback: <Loading />,
  }
);

export const LoanReqList = loadable(
  () => import('./Pages/Payroll/Payroll/Transaction/Loan/LoanReqList'),
  {
    fallback: <Loading />,
  }
);
export const LoanReqCreate = loadable(
  () => import('./Pages/Payroll/Payroll/Transaction/Loan/LoanReqCreate'),
  {
    fallback: <Loading />,
  });

  export const LoanPostpone = loadable(
    () => import('./Pages/Payroll/Payroll/Transaction/Loan/LoanPostpone'),
    {
      fallback: <Loading />,
    });

    export const PurchaseTrxList = loadable(
      () => import('./Pages/Payroll/Payroll/Transaction/Purchase/PurchaseTrxList'),
      {
        fallback: <Loading />,
      }
    );
    export const PurchaseTrxCreate = loadable(
      () => import('./Pages/Payroll/Payroll/Transaction/Purchase/PurchaseTrxCreate'),
      {
        fallback: <Loading />,
      }
    );
    export const SalaryCalculation = loadable(
      () => import('./Pages/Payroll/Payroll/Transaction/Calculation/SalaryCalculation'),
      {
        fallback: <Loading />,
      });

    export const SummaryPayslip = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/SummaryPayslip'),
      {
        fallback: <Loading />,
      }
    );

    export const ElementReviewReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/ElementReview'),
      {
        fallback: <Loading />,
      });

    export const SalaryComparisonReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/SalaryComparisonReport'),
      {
        fallback: <Loading />,
      });

    export const FollowEmployeeReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/FollowEmployee'),
      {
        fallback: <Loading />,
      });

    export const TaxReportReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/TaxReportReport'),
      {
        fallback: <Loading />,
      });
      
    export const TotalDeptSalaryReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/TotalDeptSalaryReport'),
      {
        fallback: <Loading />,
      });

    export const SalaryYearReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/SalaryYearReport'),
      {
        fallback: <Loading />,
      });


    export const SalarySigningListReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/SalarySigningListReport'),
      {
        fallback: <Loading />,
      });

    export const LoanReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/LoanReport'),
      {
        fallback: <Loading />,
      });

    export const WBS = loadable(
      () => import('./Pages/Payroll/Payroll/Transaction/WBS'),
      {
        fallback: <Loading />,
      });

    export const WBSReport = loadable(
      () => import('./Pages/Payroll/Payroll/Reports/WBSReport'),
      {
        fallback: <Loading />,
      });

// Workflow /////////////////////////////////////////////////////////////////////////////////
export const WorkFlowList = loadable(
  () => import('./Pages/Payroll/WorkFlow/WorkFlowList'),
  {
    fallback: <Loading />,
  }
);
export const WorkFlowCreate = loadable(
  () => import('./Pages/Payroll/WorkFlow/WorkFlowCreate'),
  {
    fallback: <Loading />,
  }
);
export const RequestsList = loadable(
  () => import('./Pages/Payroll/WorkFlow/RequestsList'),
  {
    fallback: <Loading />,
  }
);

// Employee /////////////////////////////////////////////////////////////////////////////////

export const EmployeeList = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeList'),
  {
    fallback: <Loading />,
  }
);
export const AdEmployeeImport = loadable(
  () => import('./Pages/Payroll/Employee/Code/AdEmployeeImport'),
  {
    fallback: <Loading />,
  }
);


export const EmployeeData = loadable(
  () => import('./Pages/Payroll/Employee/component/EmployeeData'),
  {
    fallback: <Loading />,
  }
);
export const Personal = loadable(
  () => import('./Pages/Payroll/Employee/Code/Personal'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeAddress = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeAddress'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeCourse = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeCourse'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeExperince = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeExperince'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeInsurance = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeInsurance'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeBank = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeBank'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeQualification = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeQualification'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeCar = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeCar'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeContactInfo = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeContactInfo'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeSalary = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeSalary'),
  {
    fallback: <Loading />,
  }
);
export const EmployeeContract = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeContract'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeContractKSA = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeContractKSA'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeDocuments = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeDocuments'),
  {
    fallback: <Loading />,
  }
);

export const CreateEmployeeDocuments = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeDocumentsCreate'),
  {
    fallback: <Loading />,
  }
);

export const EditEmployeeDocuments = loadable(
  () => import('./Pages/Payroll/Employee/Code/EmployeeDocumentsCreate'),
  {
    fallback: <Loading />,
  }
);

export const NewEmployeeReport = loadable(
  () => import('./Pages/Payroll/Employee/reports/NewEmployeeReport'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeStatusReport = loadable(
  () => import('./Pages/Payroll/Employee/reports/EmployeeStatusReport'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeDataReport = loadable(
  () => import('./Pages/Payroll/Employee/reports/EmployeeDataReport'),
  {
    fallback: <Loading />,
  }
);

export const followStaffContracts = loadable(
  () => import('./Pages/Payroll/Employee/reports/followStaffContracts'),
  {
    fallback: <Loading />,
  }
);

export const EmploymentDocsDetails = loadable(
  () => import('./Pages/Payroll/Employee/reports/EmploymentDocsDetails'),
  {
    fallback: <Loading />,
  }
);

export const EmploymentDocs = loadable(
  () => import('./Pages/Payroll/Employee/reports/EmploymentDocs'),
  {
    fallback: <Loading />,
  }
);

export const ImportEmployeeData = loadable(
  () => import('./Pages/Payroll/Employee/reports/ImportEmployeeData'),
  {
    fallback: <Loading />,
  }
);

export const LocationLog = loadable(
  () => import('./Pages/Payroll/Employee/reports/LocationLog'),
  {
    fallback: <Loading />,
  }
);

/// ///////////////////////////////////////////////////////////////////////////////////////
export const Parent = loadable(() => import('./Parent'), {
  fallback: <Loading />,
});

/// Vac ///////////////////////

export const CreateVacationType = loadable(
  () => import('./Pages/Payroll/Vacation/Code/VacationTypeCreate'),
  {
    fallback: <Loading />,
  }
);

export const EditVacationType = loadable(
  () => import('./Pages/Payroll/Vacation/Code/VacationTypeCreate'),
  {
    fallback: <Loading />,
  }
);

export const ExceptionVacDays = loadable(
  () => import('./Pages/Payroll/Vacation/Code/ExceptionVacDays'),
  {
    fallback: <Loading />,
  }
);

export const VacationsTypes = loadable(
  () => import('./Pages/Payroll/Vacation/Code/VacationsTypes'),
  {
    fallback: <Loading />,
  }
);

export const CreateOfficialVacation = loadable(
  () => import('./Pages/Payroll/Vacation/Code/OfficialVacationCreate'),
  {
    fallback: <Loading />,
  }
);

export const EditOfficialVacation = loadable(
  () => import('./Pages/Payroll/Vacation/Code/OfficialVacationCreate'),
  {
    fallback: <Loading />,
  }
);

export const OfficialVacations = loadable(
  () => import('./Pages/Payroll/Vacation/Code/OfficialVacations'),
  {
    fallback: <Loading />,
  }
);

export const LeaveTrxReport = loadable(
  () => import('./Pages/Payroll/Vacation/Reports/LeaveTrxReport'),
  {
    fallback: <Loading />,
  }
);

export const OpeningLeaveBalancesReport = loadable(
  () => import('./Pages/Payroll/Vacation/Reports/OpeningLeaveBalancesReport'),
  {
    fallback: <Loading />,
  }
);

export const LeaveReport = loadable(
  () => import('./Pages/Payroll/Vacation/Reports/LeaveReport'),
  {
    fallback: <Loading />,
  }
);

export const BalanceUpdateLog = loadable(
  () => import('./Pages/Payroll/Vacation/Reports/BalanceUpdateLog'),
  {
    fallback: <Loading />,
  }
);

export const LeaveTrx = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/LeaveTrx'),
  {
    fallback: <Loading />,
  }
);

export const GovernmentSickLeave = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/GovernmentSickLeave'),
  {
    fallback: <Loading />,
  }
);

export const GovernmentSickLeaveCreate = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/GovernmentSickLeaveCreate'),
  {
    fallback: <Loading />,
  }
);

export const LeaveTrxCreate = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/LeaveTrxCreate'),
  {
    fallback: <Loading />,
  }
);

export const GovernmentSickLeaveSetting = loadable(
  () => import('./Pages/Payroll/Vacation/Code/GovernmentSickLeaveSetting'),
  {
    fallback: <Loading />,
  }
);

export const LeaveOpenBalance = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/LeaveOpenBalance'),
  {
    fallback: <Loading />,
  }
);

export const CreateReplaceAnnualLeaveBalance = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/ReplaceAnnualLeaveBalanceCreate'),
  {
    fallback: <Loading />,
  }
);

export const EditReplaceAnnualLeaveBalance = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/ReplaceAnnualLeaveBalanceCreate'),
  {
    fallback: <Loading />,
  }
);

export const ReplaceAnnualLeaveBalance = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/ReplaceAnnualLeaveBalance'),
  {
    fallback: <Loading />,
  }
);

export const OpeningClosingTheYearForLeaves = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/OpeningClosingTheYearForLeaves'),
  {
    fallback: <Loading />,
  }
);

export const LeavesBalance = loadable(
  () => import('./Pages/Payroll/Vacation/Reports/LeavesBalance'),
  {
    fallback: <Loading />,
  }
);

export const ImportVacations = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/ImportVacations'),
  {
    fallback: <Loading />,
  }
);

export const GroupLeaves = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/GroupLeaves'),
  {
    fallback: <Loading />,
  }
);

export const ImportLeaveBalance = loadable(
  () => import('./Pages/Payroll/Vacation/Transaction/ImportLeaveBalance'),
  {
    fallback: <Loading />,
  }
);

export const VacationBalanceCostReport = loadable(
  () => import('./Pages/Payroll/Vacation/Reports/VacationBalanceCostReport'),
  {
    fallback: <Loading />,
  }
);

// Social Insurance

export const InsuranceOffices = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Code/InsuranceOffices'),
  {
    fallback: <Loading />,
  }
);

export const SInsuranceJob = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Code/SInsuranceJob'),
  {
    fallback: <Loading />,
  }
);

export const SinsuranceCalculationTemplate = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Code/SinsuranceCalculationTemplate'),
  {
    fallback: <Loading />,
  }
);

export const SInsuranceOrgnization = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Code/SInsuranceOrgnization'),
  {
    fallback: <Loading />,
  }
);

export const SInsuranceOrgnizationCreate = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Code/SInsuranceOrgnizationCreate'),
  {
    fallback: <Loading />,
  }
);

export const StopInsurance = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Transaction/StopInsurance'),
  {
    fallback: <Loading />,
  }
);

export const StopInsuranceCreate = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Transaction/StopInsuranceCreate'),
  {
    fallback: <Loading />,
  }
);

export const SocialInsuranceData = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Transaction/SocialInsuranceData'),
  {
    fallback: <Loading />,
  }
);

export const UpdateInsuranceSalary = loadable(
  () => import('./Pages/Payroll/SocialInsurance/Transaction/UpdateInsuranceSalary'),
  {
    fallback: <Loading />,
  }
);

export const StopInsuranceReport = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/StopInsuranceReport'),
  {
    fallback: <Loading />,
  }
);

export const InsuranceFollow = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/InsuranceFollow'),
  {
    fallback: <Loading />,
  }
);

export const Form2Insurance = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/Form2Insurance'),
  {
    fallback: <Loading />,
  }
);

export const Form6Insurance = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/Form6Insurance'),
  {
    fallback: <Loading />,
  }
);


export const Form1Insurance = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/Form1Insurance'),
  {
    fallback: <Loading />,
  }
);

export const Form1InsuranceReview = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/Form1InsuranceReview'),
  {
    fallback: <Loading />,
  }
);

export const EmergencyBenefitList = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/EmergencyBenefitList'),
  {
    fallback: <Loading />,
  }
);

export const InsuranceFormStatus = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/InsuranceFormStatus'),
  {
    fallback: <Loading />,
  }
);

export const PositionOfGuaranteesAndContradictions = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/PositionOfGuaranteesAndContradictions'),
  {
    fallback: <Loading />,
  }
);

export const SocialInsuranceReport = loadable(
  () => import('./Pages/Payroll/SocialInsurance/reports/SocialInsuranceReports'),
  {
    fallback: <Loading />,
  }
);

// Medical Insurance
export const MedicalInsuranceData = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Transaction/MedicalInsuranceData'),
  {
    fallback: <Loading />,
  }
);

export const InsuranceCompanies = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/code/InsuranceCompanies'),
  {
    fallback: <Loading />,
  }
);

export const MinsuranceCategory = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/code/MinsuranceCategory'),
  {
    fallback: <Loading />,
  }
);

export const MinsuranceCenters = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/code/MinsuranceCenters'),
  {
    fallback: <Loading />,
  }
);

export const staffMedicalInsuranceReport = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Reports/staffMedicalInsuranceReport'),
  {
    fallback: <Loading />,
  }
);

export const MedicalInsuranceReport = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Reports/MedicalInsuranceReport'),
  {
    fallback: <Loading />,
  }
);

export const MedicalInsuranceSubscription = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Transaction/MedicalInsuranceSubscription'),
  {
    fallback: <Loading />,
  }
);

export const MedicalInsuranceSubscriptionCreate = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Transaction/MedicalInsuranceSubscriptionCreate'),
  {
    fallback: <Loading />,
  }
);

export const medicalInsSubscriptionReport = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Reports/medicalInsSubscriptionReport'),
  {
    fallback: <Loading />,
  }
);

export const medicalInsuranceListReport = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Reports/medicalInsuranceListReport'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeMedicalBenefitsCreate = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Transaction/EmployeeMedicalBenefitsCreate'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeMedicalBenefits = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Transaction/EmployeeMedicalBenefits'),
  {
    fallback: <Loading />,
  }
);

export const StopMedicalInsurance = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Transaction/StopMedicalInsurance'),
  {
    fallback: <Loading />,
  }
);

export const StopMedicalInsuranceCreate = loadable(
  () => import('./Pages/Payroll/MedicalInsurance/Transaction/StopMedicalInsuranceCreate'),
  {
    fallback: <Loading />,
  }
);

// Recruitment
export const JobAdvertisement = loadable(
  () => import('./Pages/Payroll/Recruitment/code/JobAdvertisement'),
  {
    fallback: <Loading />,
  }
);

export const JobAdvertisementCreate = loadable(
  () => import('./Pages/Payroll/Recruitment/code/JobAdvertisementCreate'),
  {
    fallback: <Loading />,
  }
);

export const JobApplicationPreview = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/JobApplicationPreview'),
  {
    fallback: <Loading />,
  }
);

export const JobRequirements = loadable(
  () => import('./Pages/Payroll/Recruitment/code/JobRequirements'),
  {
    fallback: <Loading />,
  }
);

export const RecHrTest = loadable(
  () => import('./Pages/Payroll/Recruitment/code/RecHrTest'),
  {
    fallback: <Loading />,
  }
);

export const RecHrTestCreate = loadable(
  () => import('./Pages/Payroll/Recruitment/code/RecHrTestCreate'),
  {
    fallback: <Loading />,
  }
);

export const RecEvaluation = loadable(
  () => import('./Pages/Payroll/Recruitment/code/RecEvaluation'),
  {
    fallback: <Loading />,
  }
);

export const RecEvaluationCreate = loadable(
  () => import('./Pages/Payroll/Recruitment/code/RecEvaluationCreate'),
  {
    fallback: <Loading />,
  }
);

export const HRApplicationEvaluation = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/HRApplicationEvaluation'),
  {
    fallback: <Loading />,
  }
);

export const HRInterviewEvaluation = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/HRInterviewEvaluation'),
  {
    fallback: <Loading />,
  }
);

export const HRInterviewEvaluationEdit = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/HRInterviewEvaluationEdit'),
  {
    fallback: <Loading />,
  }
);

export const ManagerInterviewEvaluation = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/ManagerInterviewEvaluation'),
  {
    fallback: <Loading />,
  }
);

export const ManagerInterviewEvaluationEdit = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/ManagerInterviewEvaluationEdit'),
  {
    fallback: <Loading />,
  }
);

export const HiringRequest = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/HiringRequest'),
  {
    fallback: <Loading />,
  }
);

export const HiringRequestCreate = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/HiringRequestCreate'),
  {
    fallback: <Loading />,
  }
);

export const JobOffer = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/JobOffer'),
  {
    fallback: <Loading />,
  }
);

export const Employment = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/Employment'),
  {
    fallback: <Loading />,
  }
);

export const JobDataBank = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/JobDataBank'),
  {
    fallback: <Loading />,
  }
);

export const JobApplicationStatus = loadable(
  () => import('./Pages/Payroll/Recruitment/reports/JobApplicationStatus'),
  {
    fallback: <Loading />,
  }
);

export const JobOfferStatus = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/JobOfferStatus'),
  {
    fallback: <Loading />,
  }
);

export const JobOfferCreate = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/JobOfferCreate'),
  {
    fallback: <Loading />,
  }
);

export const EmploymentRequest = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/EmploymentRequest'),
  {
    fallback: <Loading />,
  }
);

export const EmploymentRequestCreate = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/EmploymentRequestCreate'),
  {
    fallback: <Loading />,
  }
);

export const ReviewEmploymentRequest = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/ReviewEmploymentRequest'),
  {
    fallback: <Loading />,
  }
);

export const ReviewEmploymentRequestCreate = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/ReviewEmploymentRequestCreate'),
  {
    fallback: <Loading />,
  }
);

export const HiringRequestEvaluation = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/HiringRequestEvaluation'),
  {
    fallback: <Loading />,
  }
);

export const HiringRequestEvaluationEdit = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/HiringRequestEvaluationEdit'),
  {
    fallback: <Loading />,
  }
);

export const TechApplicationReview = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/TechApplicationReview'),
  {
    fallback: <Loading />,
  }
);

export const SecApplicationReview = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/SecApplicationReview'),
  {
    fallback: <Loading />,
  }
);

export const ApplicationCallStatus = loadable(
  () => import('./Pages/Payroll/Recruitment/Transaction/ApplicationCallStatus'),
  {
    fallback: <Loading />,
  }
);

export const JobAdvertisementList = loadable(
  () => import('./Pages/Payroll/cv-application/JobAdvertisement'),
  {
    fallback: <Loading />,
  }
);

export const JobAdvertisementApplication = loadable(
  () => import('./Pages/Payroll/cv-application/JobAdvertisementApplication'),
  {
    fallback: <Loading />,
  }
);

export const ApplicationUnderReviewing = loadable(
  () => import('./Pages/Payroll/cv-application/ApplicationUnderReviewing'),
  {
    fallback: <Loading />,
  }
);

/// Assessment ///////////////////////

export const EmployeeAssessment = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/EmployeeAssessment'),
  {
    fallback: <Loading />,
  }
);

export const AsChoice = loadable(
  () => import('./Pages/Payroll/Assessment/code/AsChoice'),
  {
    fallback: <Loading />,
  }
);

export const AsTemplate = loadable(
  () => import('./Pages/Payroll/Assessment/code/AsTemplate'),
  {
    fallback: <Loading />,
  }
);

export const AsTemplateCreate = loadable(
  () => import('./Pages/Payroll/Assessment/code/AsTemplateCreate'),
  {
    fallback: <Loading />,
  }
);

export const Competencies = loadable(
  () => import('./Pages/Payroll/Assessment/code/Competencies'),
  {
    fallback: <Loading />,
  }
);

export const CompetenciesCreate = loadable(
  () => import('./Pages/Payroll/Assessment/code/CompetenciesCreate'),
  {
    fallback: <Loading />,
  }
);

export const AllJobKpi = loadable(
  () => import('./Pages/Payroll/Assessment/code/AllJobKpi'),
  {
    fallback: <Loading />,
  }
);

export const StaffJobKPI = loadable(
  () => import('./Pages/Payroll/Assessment/code/StaffJobKPI'),
  {
    fallback: <Loading />,
  }
);

export const JobDescriptions = loadable(
  () => import('./Pages/Payroll/Assessment/code/JobDescriptions'),
  {
    fallback: <Loading />,
  }
);

export const IndividualDevelopmentPlan = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/IndividualDevelopmentPlan'),
  {
    fallback: <Loading />,
  }
);

export const IndividualDevelopmentPlanCreate = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/IndividualDevelopmentPlanCreate'),
  {
    fallback: <Loading />,
  }
);

export const CareerDevPlan = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/CareerDevPlan'),
  {
    fallback: <Loading />,
  }
);

export const CareerDevPlanCreate = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/CareerDevPlanCreate'),
  {
    fallback: <Loading />,
  }
);

export const UploadAssessmentGuidelines = loadable(
  () => import('./Pages/Payroll/Assessment/code/UploadAssessmentGuidelines'),
  {
    fallback: <Loading />,
  }
);

export const AssessmentGuidelines = loadable(
  () => import('./Pages/Payroll/Assessment/code/AssessmentGuidelines'),
  {
    fallback: <Loading />,
  }
);

export const MonthOpenCloseAss = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/MonthOpenCloseAss'),
  {
    fallback: <Loading />,
  }
);


export const AssessmentReview = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/AssessmentReview'),
  {
    fallback: <Loading />,
  }
);

export const AssessmentReviewEdit = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/AssessmentReviewEdit'),
  {
    fallback: <Loading />,
  }
);


export const AssessmentReport = loadable(
  () => import('./Pages/Payroll/Assessment/Reports/AssessmentReport'),
  {
    fallback: <Loading />,
  }
);

export const PeerAppraisalSetting = loadable(
  () => import('./Pages/Payroll/Assessment/code/PeerAppraisalSetting'),
  {
    fallback: <Loading />,
  }
);

export const PeerAppraisalList = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/PeerAppraisalList'),
  {
    fallback: <Loading />,
  }
);

export const EmployeePeerAppraisal = loadable(
  () => import('./Pages/Payroll/Assessment/Transactions/EmployeePeerAppraisal'),
  {
    fallback: <Loading />,
  }
);

export const PeerAppraisalReport = loadable(
  () => import('./Pages/Payroll/Assessment/Reports/PeerAppraisalReport'),
  {
    fallback: <Loading />,
  }
);

// Smart Objective
export const EmployeeObjective = loadable(
  () => import('./Pages/Payroll/SmartObjective/transaction/EmployeeObjective'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeObjectiveCreate = loadable(
  () => import('./Pages/Payroll/SmartObjective/transaction/EmployeeObjectiveCreate'),
  {
    fallback: <Loading />,
  }
);

export const ObjectiveReport = loadable(
  () => import('./Pages/Payroll/SmartObjective/reports/ObjectiveReport'),
  {
    fallback: <Loading />,
  }
);


/// KPI ///////////////////////

export const UploadFileWithKPI = loadable(
  () => import('./Pages/Payroll/KPI/UploadFileWithKPI'),
  {
    fallback: <Loading />,
  }
);

export const KpiData = loadable(
  () => import('./Pages/Payroll/KPI/KpiData'),
  {
    fallback: <Loading />,
  }
);

export const KPI_LOB_Report = loadable(
  () => import('./Pages/Payroll/KPI/Reports/KPI_LOB_Report'),
  {
    fallback: <Loading />,
  }
);

export const KPI_SupervisorReport = loadable(
  () => import('./Pages/Payroll/KPI/Reports/KPI_SupervisorReport'),
  {
    fallback: <Loading />,
  }
);

// Survey
export const SurveyChoiceGroup = loadable(
  () => import('./Pages/Payroll/Survey/Code/SurveyChoiceGroup'),
  {
    fallback: <Loading />,
  }
);

export const SurveyChoiceGroupCreate = loadable(
  () => import('./Pages/Payroll/Survey/Code/SurveyChoiceGroupCreate'),
  {
    fallback: <Loading />,
  }
);

export const SurveyTemplate = loadable(
  () => import('./Pages/Payroll/Survey/Code/SurveyTemplate'),
  {
    fallback: <Loading />,
  }
);

export const SurveyTemplateCreate = loadable(
  () => import('./Pages/Payroll/Survey/Code/SurveyTemplateCreate'),
  {
    fallback: <Loading />,
  }
);

export const Survey = loadable(
  () => import('./Pages/Payroll/Survey/Code/Survey'),
  {
    fallback: <Loading />,
  }
);

export const SurveyHistoryReport = loadable(
  () => import('./Pages/Payroll/Survey/Report/SurveyHistoryReport'),
  {
    fallback: <Loading />,
  }
);

export const surveyFollowReport = loadable(
  () => import('./Pages/Payroll/Survey/Report/SurveyFollowReport'),
  {
    fallback: <Loading />,
  }
);

// Training
export const TrFunctionsList = loadable(
  () => import('./Pages/Payroll/Training/Code/TrFunctionsList'),
  {
    fallback: <Loading />,
  }
);

export const TrFunctionsListCreate = loadable(
  () => import('./Pages/Payroll/Training/Code/TrFunctionsListCreate'),
  {
    fallback: <Loading />,
  }
);

export const FunctionsData = loadable(
  () => import('./Pages/Payroll/Training/Code/FunctionsData'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeFunctions = loadable(
  () => import('./Pages/Payroll/Training/Code/EmployeeFunctions'),
  {
    fallback: <Loading />,
  }
);

export const FunctionsRequest = loadable(
  () => import('./Pages/Payroll/Training/Transaction/FunctionsRequest'),
  {
    fallback: <Loading />,
  }
);

export const QualificationCheck = loadable(
  () => import('./Pages/Payroll/Training/Transaction/QualificationCheck'),
  {
    fallback: <Loading />,
  }
);

export const TrTrainingTrxList = loadable(
  () => import('./Pages/Payroll/Training/Transaction/TrTrainingTrxList'),
  {
    fallback: <Loading />,
  }
);

export const TrTrainingTrxListCreate = loadable(
  () => import('./Pages/Payroll/Training/Transaction/TrTrainingTrxListCreate'),
  {
    fallback: <Loading />,
  }
);

export const TrainingRequestList = loadable(
  () => import('./Pages/Payroll/Training/Transaction/TrainingRequestList'),
  {
    fallback: <Loading />,
  }
);

export const TrainingRequestListCreate = loadable(
  () => import('./Pages/Payroll/Training/Transaction/TrainingRequestListCreate'),
  {
    fallback: <Loading />,
  }
);

export const TrainingEmployeeAttendance = loadable(
  () => import('./Pages/Payroll/Training/Transaction/EmployeeAttendance'),
  {
    fallback: <Loading />,
  }
);

export const EvaluateEmployee = loadable(
  () => import('./Pages/Payroll/Training/Transaction/EvaluateEmployee'),
  {
    fallback: <Loading />,
  }
);
export const EvaluateTraining = loadable(
  () => import('./Pages/Payroll/Training/Transaction/EvaluateTraining'),
  {
    fallback: <Loading />,
  }
);

export const TestTemplate = loadable(
  () => import('./Pages/Payroll/Training/Code/TestTemplate'),
  {
    fallback: <Loading />,
  }
);

export const TestTemplateCreate = loadable(
  () => import('./Pages/Payroll/Training/Code/TestTemplateCreate'),
  {
    fallback: <Loading />,
  }
);

export const TrainingCalender = loadable(
  () => import('./Pages/Payroll/Training/Transaction/TrainingCalender'),
  {
    fallback: <Loading />,
  }
);

export const TrainingTest = loadable(
  () => import('./Pages/Payroll/Training/Code/Test'),
  {
    fallback: <Loading />,
  }
);

export const ReviewTest = loadable(
  () => import('./Pages/Payroll/Training/Transaction/ReviewTest'),
  {
    fallback: <Loading />,
  }
);

export const EmployeeTrainingReport = loadable(
  () => import('./Pages/Payroll/Training/reports/EmployeeTrainingReport'),
  {
    fallback: <Loading />,
  }
);

export const TrainingAttendance = loadable(
  () => import('./Pages/Payroll/Training/reports/TrainingAttendance'),
  {
    fallback: <Loading />,
  }
);




// Project managment  ///////////////////////////////////////


export const Customer = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/Customer'),
  {
    fallback: <Loading />,
  }
);

export const CustomerCreate = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/CustomerCreate'),
  {
    fallback: <Loading />,
  }
);

export const CustomerEdit = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/CustomerCreate'),
  {
    fallback: <Loading />,
  }
);

export const Contract = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/Contract'),
  {
    fallback: <Loading />,
  }
);

export const ContractCreate = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/ContractCreate'),
  {
    fallback: <Loading />,
  }
);

export const ContractEdit = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/ContractCreate'),
  {
    fallback: <Loading />,
  }
);

export const Stage = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/Stage'),
  {
    fallback: <Loading />,
  }
);

export const StageCreate = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/StageCreate'),
  {
    fallback: <Loading />,
  }
);

export const StageEdit = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/StageCreate'),
  {
    fallback: <Loading />,
  }
);


export const TimeSheet = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/TimeSheet'),
  {
    fallback: <Loading />,
  }
);

export const TimeSheetCreate = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/TimeSheetCreate'),
  {
    fallback: <Loading />,
  }
);

export const TimeSheetEdit = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/TimeSheetCreate'),
  {
    fallback: <Loading />,
  }
);

export const Project = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/Project'),
  {
    fallback: <Loading />,
  }
);

export const ProjectCreate = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/ProjectCreate'),
  {
    fallback: <Loading />,
  }
);

export const ProjectEdit = loadable(
  () => import('./Pages/Payroll/ProjectManagment/code/ProjectCreate'),
  {
    fallback: <Loading />,
  }
);
