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
//MainData /////////////////////////////////////////////////////////////////////////////////
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
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const Grade = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const Government = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const Month = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const Year = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const Nationalities = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const Qualifications = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const Religions = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const Salute = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const LicenseGrade = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const KinshipLink = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const JobLevel = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const MilitaryStatus = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
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
  () => import('./Pages/Payroll/MainData/Code/CreateAndEditJob'),
  {
    fallback: <Loading />,
  }
);

export const EditJob = loadable(
  () => import('./Pages/Payroll/MainData/Code/CreateAndEditJob'),
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
export const JobTypes = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const JobNatures = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const SocialStatus = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
  {
    fallback: <Loading />,
  }
);
export const IdentityType = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
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

//Setting /////////////////////////////////////////////////////////////////////////////////
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
//HR////////////////////////////////////////////////////////////////////////////////////////
export const Courses = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
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
export const ResignReason = loadable(
  () => import('./Pages/Payroll/MainData/Code/General'),
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
  () => import('./Pages/Payroll/HumanResources/Code/PenaltyList'),
  {
    fallback: <Loading />,
  }
);
export const CreatePenalty = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/CreatePenalty'),
  {
    fallback: <Loading />,
  }
);
export const EditPenalty = loadable(
  () => import('./Pages/Payroll/HumanResources/Code/CreatePenalty'),
  {
    fallback: <Loading />,
  }
);

export const RewardTransList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/RewardTransList'),
  {
    fallback: <Loading />,
  }
);
export const RewardCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/RewardCreate'),
  {
    fallback: <Loading />,
  }
);
export const RewardEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/RewardCreate'),
  {
    fallback: <Loading />,
  }
);

export const PenaltyTransList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/PenaltyTransList'),
  {
    fallback: <Loading />,
  }
);
export const PenaltyTransCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/PenaltyCreate'),
  {
    fallback: <Loading />,
  }
);
export const PenaltyTransEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/PenaltyCreate'),
  {
    fallback: <Loading />,
  }
);

export const AttentionList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/AttentionList'),
  {
    fallback: <Loading />,
  }
);
export const AttentionCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/AttentionCreate'),
  {
    fallback: <Loading />,
  }
);
export const AttentionEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/AttentionCreate'),
  {
    fallback: <Loading />,
  }
);

export const LayOffNoticeList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/LayOffNoticeList'),
  {
    fallback: <Loading />,
  }
);
export const LayOffNoticeCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/LayOffNoticeCreate'),
  {
    fallback: <Loading />,
  }
);
export const LayOffNoticeEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/LayOffNoticeCreate'),
  {
    fallback: <Loading />,
  }
);

export const PromotionsList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/PromotionsList'),
  {
    fallback: <Loading />,
  }
);
export const PromotionsCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/PromotionsCreate'),
  {
    fallback: <Loading />,
  }
);
export const PromotionsEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/PromotionsCreate'),
  {
    fallback: <Loading />,
  }
);
export const ExplanationList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/ExplanationList'),
  {
    fallback: <Loading />,
  }
);
export const ExplanationEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/ExplanationEdit'),
  {
    fallback: <Loading />,
  }
);

export const OrganizationManger = loadable(
  () =>
    import('./Pages/Payroll/HumanResources/Transaction/OrganizationManager'),
  {
    fallback: <Loading />,
  }
);
export const NewsList = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/NewsList'),
  {
    fallback: <Loading />,
  }
);
export const NewsCreate = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/NewsCreate'),
  {
    fallback: <Loading />,
  }
);
export const NewsEdit = loadable(
  () => import('./Pages/Payroll/HumanResources/Transaction/NewsCreate'),
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

//Employee /////////////////////////////////////////////////////////////////////////////////

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
//////////////////////////////////////////////////////////////////////////////////////////
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
