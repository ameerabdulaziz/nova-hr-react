import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import withAuthorizationRouter from '../Session/withAuthorizationRouter';
import {
  //shymaa
  AnalyticDashboard,
  MarketingDashboard,
  CryptoDashboard,
  Infographics,
  MiniApps,
  Analytics,
  Gallery,
  Status,
  Parent,
  AppLayout,
  Responsive,
  Grid,
  SimpleTable,
  AdvancedTable,
  TablePlayground,
  TreeTable,
  EditableCell,
  ReduxForm,
  DialButton,
  DateTimePicker,
  CheckboxRadio,
  Switches,
  Selectbox,
  SliderRange,
  Buttons,
  ToggleButton,
  Textbox,
  Autocomplete,
  Upload,
  TextEditor,
  Avatars,
  Accordion,
  Badges,
  List,
  PopoverTooltip,
  Snackbar,
  Typography,
  Tabs,
  Cards,
  ImageGrid,
  Progress,
  DialogModal,
  Steppers,
  DrawerMenu,
  Breadcrumbs,
  Icons,
  SliderCarousel,
  Tags,
  TreeView,
  LineCharts,
  BarCharts,
  AreaCharts,
  PieCharts,
  RadarCharts,
  ScatterCharts,
  CompossedCharts,
  Contact,
  Email,
  Todo,
  TodoFirebase,
  ContactFirebase,
  EmailFirebase,
  Timeline,
  Profile,
  Chat,
  Ecommerce,
  ProductPage,
  CheckoutPage,
  InvoicePage,
  BlankPage,
  AuthenticatedPage,
  Photos,
  Error,
  MapMarker,
  MapDirection,
  SearchMap,
  TrafficIndicator,
  StreetViewMap,
  NotFound,
  Department,
  Section,
  Gender,
  Grade,
  Bank,
  ContractType,
  City,
  Currency,
  CurrencyRate,
  Documents,
  Government,
  JobLevel,
  JobNatures,
  Jobs,
  JobTypes,
  KinshipLink,
  Month,
  Year,
  Nationalities,
  Qualifications,
  Religions,
  Salute,
  LicenseGrade,
  MilitaryStatus,
  SocialStatus,
  IdentityType,
  Company,
  CompanyChart,
  EmployeeChart,
  UserMenu,
  MailSetting,
  SMSSetting,
  SettingResetPassword,
  Organization,
  Personal,
  EmployeeAddress,
  EmployeeCourse,
  EmployeeList,
  Courses,
  TrainingCenter,
  ResignReason,
  Rewards,
  Penalty,
  CreatePenalty,
  EditPenalty,
  RewardTransList,
  RewardCreate,
  RewardEdit,
  PenaltyTransList,
  PenaltyTransCreate,
  PenaltyTransEdit,
  AttentionList,
  AttentionCreate,
  AttentionEdit,
  LayOffNoticeList,
  LayOffNoticeCreate,
  LayOffNoticeEdit,
  EmployeeExperince,
  EmployeeInsurance,
  EmployeeBank,
  EmployeeQualification,
  EmployeeContactInfo,
  EmployeeCar,
  EmployeeSalary,
  EmployeeContract,
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        {/* Home */}
        <Route exact path="/app" component={AnalyticDashboard} />
        <Route path="/app/dashboard/marketing" component={MarketingDashboard} />
        <Route path="/app/dashboard/crypto" component={CryptoDashboard} />
        {/* Widgets */}
        <Route exact path="/app/widgets" component={Parent} />
        <Route path="/app/widgets/infographics" component={Infographics} />
        <Route path="/app/widgets/mini-apps" component={MiniApps} />
        <Route path="/app/widgets/analytics" component={Analytics} />
        <Route path="/app/widgets/gallery-carousel" component={Gallery} />
        <Route path="/app/widgets/status" component={Status} />
        {/* Layout */}
        <Route exact path="/app/layouts" component={Parent} />
        <Route path="/app/layouts/grid" component={Grid} />
        <Route path="/app/layouts/app-layout" component={AppLayout} />
        <Route path="/app/layouts/responsive" component={Responsive} />
        {/* Table */}
        <Route exact path="/app/tables" component={Parent} />
        <Route path="/app/tables/basic-table" component={SimpleTable} />
        <Route path="/app/tables/data-table" component={AdvancedTable} />
        <Route
          path="/app/tables/table-playground"
          component={TablePlayground}
        />
        <Route path="/app/tables/editable-cell" component={EditableCell} />
        <Route path="/app/tables/tree-table" component={TreeTable} />
        {/* Form & Button */}
        <Route exact path="/app/forms" component={Parent} />
        <Route path="/app/forms/reduxform" component={ReduxForm} />
        <Route path="/app/forms/date-time-picker" component={DateTimePicker} />
        <Route path="/app/forms/dial-button" component={DialButton} />
        <Route path="/app/forms/checkbox-radio" component={CheckboxRadio} />
        <Route path="/app/forms/switches" component={Switches} />
        <Route path="/app/forms/selectbox" component={Selectbox} />
        <Route path="/app/forms/slider-range" component={SliderRange} />
        <Route path="/app/forms/buttons" component={Buttons} />
        <Route path="/app/forms/toggle-button" component={ToggleButton} />
        <Route path="/app/forms/textfields" component={Textbox} />
        <Route path="/app/forms/autocomplete" component={Autocomplete} />
        <Route path="/app/forms/upload" component={Upload} />
        <Route path="/app/forms/wysiwyg-editor" component={TextEditor} />

        {/* Ui Components */}
        <Route exact path="/app/ui" component={Parent} />
        <Route path="/app/ui/avatars" component={Avatars} />
        <Route path="/app/ui/accordion" component={Accordion} />
        <Route path="/app/ui/badges" component={Badges} />
        <Route path="/app/ui/list" component={List} />
        <Route path="/app/ui/popover-tooltip" component={PopoverTooltip} />
        <Route path="/app/ui/snackbar" component={Snackbar} />
        <Route path="/app/ui/typography" component={Typography} />
        <Route path="/app/ui/tabs" component={Tabs} />
        <Route path="/app/ui/card-papper" component={Cards} />
        <Route path="/app/ui/image-grid" component={ImageGrid} />
        <Route path="/app/ui/progress" component={Progress} />
        <Route path="/app/ui/dialog-modal" component={DialogModal} />
        <Route path="/app/ui/steppers" component={Steppers} />
        <Route path="/app/ui/drawer-menu" component={DrawerMenu} />
        <Route path="/app/ui/breadcrumbs" component={Breadcrumbs} />
        <Route path="/app/ui/icons" component={Icons} />
        <Route path="/app/ui/slider-carousel" component={SliderCarousel} />
        <Route path="/app/ui/tags" component={Tags} />
        <Route path="/app/ui/tree-view" component={TreeView} />
        {/* Chart */}
        <Route exact path="/app/charts" component={Parent} />
        <Route path="/app/charts/line-charts" component={LineCharts} />
        <Route path="/app/charts/bar-charts" component={BarCharts} />
        <Route path="/app/charts/area-charts" component={AreaCharts} />
        <Route path="/app/charts/pie-charts" component={PieCharts} />
        <Route path="/app/charts/radar-charts" component={RadarCharts} />
        <Route path="/app/charts/scatter-charts" component={ScatterCharts} />
        <Route path="/app/charts/compossed-chart" component={CompossedCharts} />
        {/* Sample Apps */}
        <Route path="/app/pages/contact" component={Contact} />
        <Route path="/app/pages/email" component={Email} />
        <Route path="/app/pages/todo" component={Todo} />
        <Route path="/app/pages/todo-firebase" component={TodoFirebase} />
        <Route path="/app/pages/contact-firebase" component={ContactFirebase} />
        <Route path="/app/pages/email-firebase" component={EmailFirebase} />
        {/* Pages */}
        <Route exact path="/app/pages" component={Parent} />
        <Route path="/app/pages/ecommerce" component={Ecommerce} />
        <Route path="/app/pages/product-detail" component={ProductPage} />
        <Route path="/app/pages/checkout" component={CheckoutPage} />
        <Route path="/app/pages/invoice" component={InvoicePage} />
        <Route path="/app/pages/user-profile" component={Profile} />
        <Route path="/app/pages/timeline" component={Timeline} />
        <Route path="/app/pages/chat" component={Chat} />
        <Route
          path="/app/pages/authenticated-page"
          component={withAuthorizationRouter(AuthenticatedPage)}
        />
        <Route path="/app/pages/blank-page" component={BlankPage} />
        <Route path="/app/pages/photo-gallery" component={Photos} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        {/* MainData */}
        <Route
          path="/app/Pages/Payroll/Department"
          component={withAuthorizationRouter(Department)}
        />
        <Route
          path="/app/Pages/Payroll/Section"
          component={withAuthorizationRouter(Section)}
        />
        <Route
          path="/app/Pages/MainData/Government"
          component={withAuthorizationRouter((props1) => (
            <Government text="Government" table="MdGovernment" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/City"
          component={withAuthorizationRouter(City)}
        />
        <Route
          path="/app/Pages/MainData/Currency"
          component={withAuthorizationRouter(Currency)}
        />
        <Route
          path="/app/Pages/MainData/Currency-Rate"
          component={withAuthorizationRouter(CurrencyRate)}
        />
        <Route
          path="/app/Pages/MainData/Documents"
          component={withAuthorizationRouter(Documents)}
        />
        <Route
          path="/app/Pages/MainData/Gender"
          component={withAuthorizationRouter((props1) => (
            <Gender text="Gender" table="MdGender" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Grade"
          component={withAuthorizationRouter((props1) => (
            <Grade text="Grade" table="MdGrade" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Job-Level"
          component={withAuthorizationRouter((props1) => (
            <JobLevel text="Job Level" table="MdJobLevel" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Job-Natures"
          component={withAuthorizationRouter((props1) => (
            <JobNatures text="Job Natures" table="MdJobNatures" {...props1} />
          ))}
        />
        <Route path="/app/Pages/MainData/job" component={Jobs} />
        <Route
          path="/app/Pages/MainData/Job-Types"
          component={withAuthorizationRouter((props1) => (
            <JobTypes text="Job Types" table="MdJobsTypes" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Kinship-Link"
          component={withAuthorizationRouter((props1) => (
            <KinshipLink
              text="Kinship Link"
              table="MdKinshipLink"
              {...props1}
            />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Month"
          component={withAuthorizationRouter((props1) => (
            <Month text="Month" table="MdMonth" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Year"
          component={withAuthorizationRouter((props1) => (
            <Year text="Year" table="MdYear" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Nationalities"
          component={withAuthorizationRouter((props1) => (
            <Nationalities
              text="Nationalities"
              table="MdNationalities"
              {...props1}
            />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Qualifications"
          component={withAuthorizationRouter((props1) => (
            <Qualifications
              text="Qualifications"
              table="MdQualifications"
              {...props1}
            />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Religions"
          component={withAuthorizationRouter((props1) => (
            <Religions text="Religions" table="MdReligions" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Salute"
          component={withAuthorizationRouter((props1) => (
            <Salute text="Salute" table="MdSalute" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/MainData/License-Grade"
          component={withAuthorizationRouter((props1) => (
            <LicenseGrade
              text="License Grade"
              table="MdLicenseGrade"
              {...props1}
            />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Military-Status"
          component={withAuthorizationRouter((props1) => (
            <MilitaryStatus
              text="Military Status"
              table="MdMilitaryStatus"
              {...props1}
            />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Social-Status"
          component={withAuthorizationRouter((props1) => (
            <SocialStatus
              text="Social Status"
              table="MdSocialStatus"
              {...props1}
            />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Identity-Type"
          component={withAuthorizationRouter((props1) => (
            <IdentityType
              text="Identity Type"
              table="MdIdentityType"
              {...props1}
            />
          ))}
        />
        <Route
          path="/app/Pages/MainData/Bank"
          component={withAuthorizationRouter(Bank)}
        />
        <Route
          path="/app/Pages/MainData/Contract-Type"
          component={withAuthorizationRouter(ContractType)}
        />
        <Route
          path="/app/Pages/MainData/Company"
          component={withAuthorizationRouter(Company)}
        />
        <Route
          path="/app/Pages/MainData/CompanyChart"
          component={withAuthorizationRouter(CompanyChart)}
        />
        <Route
          path="/app/Pages/MainData/EmployeeChart"
          component={withAuthorizationRouter(EmployeeChart)}
        />
        <Route
          path="/app/Pages/MainData/Organization"
          component={withAuthorizationRouter(Organization)}
        />

        {/* Setting */}
        <Route
          path="/app/Pages/Setting/UserMenu"
          component={withAuthorizationRouter(UserMenu)}
        />
        <Route
          path="/app/Pages/Setting/MailSetting"
          component={withAuthorizationRouter(MailSetting)}
        />
        <Route
          path="/app/Pages/Setting/SMSSetting"
          component={withAuthorizationRouter(SMSSetting)}
        />
        <Route
          path="/app/Pages/Setting/ResetPassword"
          component={withAuthorizationRouter(SettingResetPassword)}
        />
        {/* HR */}
        <Route
          path="/app/Pages/HR/Course"
          component={withAuthorizationRouter((props1) => (
            <Courses text="Courses" table="HrCourses" {...props1} />
          ))}
        />
        <Route
          path="/app/Pages/HR/ResignReason"
          component={withAuthorizationRouter((props1) => (
            <ResignReason
              text="ResignReason"
              table="HrResignReason"
              {...props1}
            />
          ))}
        />
        <Route
          path="/app/Pages/HR/TrainingCenter"
          component={withAuthorizationRouter(TrainingCenter)}
        />
        <Route
          path="/app/Pages/HR/Rewards"
          component={withAuthorizationRouter(Rewards)}
        />
        <Route
          path="/app/Pages/HR/Penalty"
          component={withAuthorizationRouter(Penalty)}
        />
        <Route
          path="/app/Pages/HR/CreatePenalty"
          component={withAuthorizationRouter(CreatePenalty)}
        />
        <Route
          path="/app/Pages/HR/EditPenalty:id"
          component={withAuthorizationRouter(EditPenalty)}
        />
        <Route
          path="/app/Pages/HR/RewardTransList"
          component={withAuthorizationRouter(RewardTransList)}
        />
        <Route
          path="/app/Pages/HR/RewardCreate"
          component={withAuthorizationRouter(RewardCreate)}
        />
        <Route
          path="/app/Pages/HR/RewardEdit:id"
          component={withAuthorizationRouter(RewardEdit)}
        />
        <Route
          path="/app/Pages/HR/PenaltyTransList"
          component={withAuthorizationRouter(PenaltyTransList)}
        />
        <Route
          path="/app/Pages/HR/PenaltyCreate"
          component={withAuthorizationRouter(PenaltyTransCreate)}
        />
        <Route
          path="/app/Pages/HR/PenaltyEdit:id"
          component={withAuthorizationRouter(PenaltyTransEdit)}
        />

        <Route
          path="/app/Pages/HR/AttentionList"
          component={withAuthorizationRouter(AttentionList)}
        />
        <Route
          path="/app/Pages/HR/AttentionCreate"
          component={withAuthorizationRouter(AttentionCreate)}
        />
        <Route
          path="/app/Pages/HR/AttentionEdit:id"
          component={withAuthorizationRouter(AttentionEdit)}
        />

        <Route
          path="/app/Pages/HR/LayOffNoticeList"
          component={withAuthorizationRouter(LayOffNoticeList)}
        />
        <Route
          path="/app/Pages/HR/LayOffNoticeCreate"
          component={withAuthorizationRouter(LayOffNoticeCreate)}
        />
        <Route
          path="/app/Pages/HR/LayOffNoticeEdit:id"
          component={withAuthorizationRouter(LayOffNoticeEdit)}
        />

        {/* Employee */}
        <Route
          path="/app/Pages/Employee/EmployeeList"
          component={withAuthorizationRouter(EmployeeList)}
        />
        <Route
          path="/app/Pages/Employee/Personal"
          component={withAuthorizationRouter(Personal)}
        />
        <Route
          path="/app/Pages/Employee/EmployeeAddress"
          component={withAuthorizationRouter(EmployeeAddress)}
        />
        <Route
          path="/app/Pages/Employee/EmployeeCourse"
          component={withAuthorizationRouter(EmployeeCourse)}
        />

        <Route
          path="/app/Pages/Employee/EmployeeCourse"
          component={EmployeeCourse}
        />

        <Route
          path="/app/Pages/Employee/EmployeeExperince"
          component={EmployeeExperince}
        />
        <Route
          path="/app/Pages/Employee/EmployeeInsurance"
          component={EmployeeInsurance}
        />

        <Route
          path="/app/Pages/Employee/EmployeeBank"
          component={EmployeeBank}
        />
        <Route
          path="/app/Pages/Employee/EmployeeQualification"
          component={EmployeeQualification}
        />
        <Route path="/app/Pages/Employee/EmployeeCar" component={EmployeeCar} />
        <Route
          path="/app/Pages/Employee/EmployeeSalary"
          component={EmployeeSalary}
        />
        <Route
          path="/app/Pages/Employee/EmployeeContactInfo"
          component={EmployeeContactInfo}
        />
        <Route
          path="/app/Pages/Employee/EmployeeContract"
          component={EmployeeContract}
        />

        {/* Map */}
        <Route exact path="/app/maps" component={Parent} />
        <Route path="/app/maps/map-marker" component={MapMarker} />
        <Route path="/app/maps/map-direction" component={MapDirection} />
        <Route path="/app/maps/map-searchbox" component={SearchMap} />
        <Route path="/app/maps/map-traffic" component={TrafficIndicator} />
        <Route path="/app/maps/street-view" component={StreetViewMap} />
        {/* Default */}
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = { history: PropTypes.object.isRequired };

export default Application;
