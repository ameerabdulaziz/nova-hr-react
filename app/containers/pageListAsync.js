import React from 'react';
import Loading from 'enl-components/Loading';
import loadable from '../utils/loadable';

// Landing Page
export const HomePage = loadable(() => import('./LandingPage/HomePage'), {
  fallback: <Loading />,
});
// Dashboard
export const AnalyticDashboard = loadable(
  () => import('./Dashboard/AnalyticDashboard'),
  {
    fallback: <Loading />,
  }
);
export const MarketingDashboard = loadable(
  () => import('./Dashboard/MarketingDashboard'),
  {
    fallback: <Loading />,
  }
);
export const CryptoDashboard = loadable(
  () => import('./Dashboard/CryptoDashboard'),
  {
    fallback: <Loading />,
  }
);

// Layouts
export const Infographics = loadable(() => import('./Widgets/Infographics'), {
  fallback: <Loading />,
});
export const MiniApps = loadable(() => import('./Widgets/MiniApps'), {
  fallback: <Loading />,
});
export const Analytics = loadable(() => import('./Widgets/Analytics'), {
  fallback: <Loading />,
});
export const Gallery = loadable(() => import('./Widgets/Gallery'), {
  fallback: <Loading />,
});
export const Status = loadable(() => import('./Widgets/Status'), {
  fallback: <Loading />,
});

// Layouts
export const AppLayout = loadable(() => import('./Layouts/AppLayout'), {
  fallback: <Loading />,
});
export const Responsive = loadable(() => import('./Layouts/Responsive'), {
  fallback: <Loading />,
});
export const Grid = loadable(() => import('./Layouts/Grid'), {
  fallback: <Loading />,
});

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

// UI Components
export const Badges = loadable(() => import('./UiElements/Badges'), {
  fallback: <Loading />,
});
export const Avatars = loadable(() => import('./UiElements/Avatars'), {
  fallback: <Loading />,
});
export const Accordion = loadable(() => import('./UiElements/Accordion'), {
  fallback: <Loading />,
});
export const List = loadable(() => import('./UiElements/List'), {
  fallback: <Loading />,
});
export const PopoverTooltip = loadable(
  () => import('./UiElements/PopoverTooltip'),
  {
    fallback: <Loading />,
  }
);
export const Snackbar = loadable(() => import('./UiElements/Snackbar'), {
  fallback: <Loading />,
});
export const Typography = loadable(() => import('./UiElements/Typography'), {
  fallback: <Loading />,
});
export const Tabs = loadable(() => import('./UiElements/Tabs'), {
  fallback: <Loading />,
});
export const Cards = loadable(() => import('./UiElements/Cards'), {
  fallback: <Loading />,
});
export const ImageGrid = loadable(() => import('./UiElements/ImageGrid'), {
  fallback: <Loading />,
});
export const Progress = loadable(() => import('./UiElements/Progress'), {
  fallback: <Loading />,
});
export const DialogModal = loadable(() => import('./UiElements/DialogModal'), {
  fallback: <Loading />,
});
export const Steppers = loadable(() => import('./UiElements/Steppers'), {
  fallback: <Loading />,
});
export const DrawerMenu = loadable(() => import('./UiElements/DrawerMenu'), {
  fallback: <Loading />,
});
export const Breadcrumbs = loadable(() => import('./UiElements/Breadcrumbs'), {
  fallback: <Loading />,
});
export const Icons = loadable(() => import('./UiElements/Icons'), {
  fallback: <Loading />,
});
export const SliderCarousel = loadable(
  () => import('./UiElements/SliderCarousel'),
  {
    fallback: <Loading />,
  }
);
export const Tags = loadable(() => import('./UiElements/Tags'), {
  fallback: <Loading />,
});
export const TreeView = loadable(() => import('./UiElements/TreeView'), {
  fallback: <Loading />,
});
// Chart
export const LineCharts = loadable(() => import('./Charts/LineCharts'), {
  fallback: <Loading />,
});
export const BarCharts = loadable(() => import('./Charts/BarCharts'), {
  fallback: <Loading />,
});
export const AreaCharts = loadable(() => import('./Charts/AreaCharts'), {
  fallback: <Loading />,
});
export const PieCharts = loadable(() => import('./Charts/PieCharts'), {
  fallback: <Loading />,
});
export const RadarCharts = loadable(() => import('./Charts/RadarCharts'), {
  fallback: <Loading />,
});
export const ScatterCharts = loadable(() => import('./Charts/ScatterCharts'), {
  fallback: <Loading />,
});
export const CompossedCharts = loadable(
  () => import('./Charts/CompossedCharts'),
  {
    fallback: <Loading />,
  }
);

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
export const ComingSoon = loadable(() => import('./Pages/ComingSoon'), {
  fallback: <Loading />,
});
export const Ecommerce = loadable(() => import('./Pages/Ecommerce'), {
  fallback: <Loading />,
});
export const ProductPage = loadable(
  () => import('./Pages/Ecommerce/ProductPage'),
  {
    fallback: <Loading />,
  }
);
export const CheckoutPage = loadable(
  () => import('./Pages/Ecommerce/CheckoutPage'),
  {
    fallback: <Loading />,
  }
);
export const InvoicePage = loadable(
  () => import('./Pages/Ecommerce/InvoicePage'),
  {
    fallback: <Loading />,
  }
);
export const Profile = loadable(() => import('./Pages/UserProfile'), {
  fallback: <Loading />,
});
export const Timeline = loadable(() => import('./Pages/Timeline'), {
  fallback: <Loading />,
});
export const Chat = loadable(() => import('./Pages/Chat'), {
  fallback: <Loading />,
});
export const BlankPage = loadable(() => import('./Pages/BlankPage'), {
  fallback: <Loading />,
});
export const AuthenticatedPage = loadable(
  () => import('./Pages/AuthenticatedPage'),
  {
    fallback: <Loading />,
  }
);

// Sample Pre Build Apps
export const Todo = loadable(() => import('./SampleApps/Todo'), {
  fallback: <Loading />,
});
export const TodoFirebase = loadable(
  () => import('./SampleFullstackApps/Todo'),
  {
    fallback: <Loading />,
  }
);
export const Contact = loadable(() => import('./SampleApps/Contact'), {
  fallback: <Loading />,
});
export const ContactFirebase = loadable(
  () => import('./SampleFullstackApps/Contact'),
  {
    fallback: <Loading />,
  }
);
export const Email = loadable(() => import('./SampleApps/Email'), {
  fallback: <Loading />,
});
export const EmailFirebase = loadable(
  () => import('./SampleFullstackApps/Email'),
  {
    fallback: <Loading />,
  }
);

export const Photos = loadable(() => import('./Pages/Photos'), {
  fallback: <Loading />,
});

// Maps
export const MapMarker = loadable(() => import('./Maps/MapMarker'), {
  fallback: <Loading />,
});
export const MapDirection = loadable(() => import('./Maps/MapDirection'), {
  fallback: <Loading />,
});
export const SearchMap = loadable(() => import('./Maps/SearchMap'), {
  fallback: <Loading />,
});
export const TrafficIndicator = loadable(
  () => import('./Maps/TrafficIndicator'),
  {
    fallback: <Loading />,
  }
);
export const StreetViewMap = loadable(() => import('./Maps/StreetViewMap'), {
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
export const Department = loadable(
  () => import('./Pages/Payroll/Department/DepartmentList'),
  {
    fallback: <Loading />,
  }
);
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

export const ImportFile = loadable(
  () => import('./Pages/Payroll/MainData/Code/ImportFile'),
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

// Setting /////////////////////////////////////////////////////////////////////////////////
export const UserMenu = loadable(
  () => import('./Pages/Payroll/Setting/UserMenu'),
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
// HR////////////////////////////////////////////////////////////////////////////////////////

export const TrainingCenter = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/TrainingCenter'),
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

export const ShiftList = loadable(
  () => import('./Pages/Payroll/Attendance/Code/Shift/ShiftList'),
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
  () => import('./Pages/Payroll/Attendance/Transaction/OvertimeHoursRequest'),
  {
    fallback: <Loading />,
  }
);

export const OvertimeHoursRequestCreate = loadable(
  () => import('./Pages/Payroll/Attendance/Transaction/OvertimeHoursRequestCreate'),
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
  () => import('./Pages/Payroll/Attendance/Transaction/ReviewOvertime'),
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

/// ///////////////////////////////////////////////////////////////////////////////////////
export const Maintenance = loadable(() => import('./Pages/Maintenance'), {
  fallback: <Loading />,
});
export const Parent = loadable(() => import('./Parent'), {
  fallback: <Loading />,
});
export const TermsConditions = loadable(
  () => import('./Pages/TermsConditions'),
  {
    fallback: <Loading />,
  }
);

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

export const JobVacation = loadable(
  () => import('./Pages/Payroll/cv-application/JobVacation'),
  {
    fallback: <Loading />,
  }
);

export const JobVacationApplication = loadable(
  () => import('./Pages/Payroll/cv-application/JobVacationApplication'),
  {
    fallback: <Loading />,
  }
);
