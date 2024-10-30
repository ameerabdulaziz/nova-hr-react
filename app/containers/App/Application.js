import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Templates/Dashboard";
import { ThemeContext } from "./ThemeWrapper";
import {
  // shymaa
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
  Grade,
  JobLevel,
  JobNatures,
  ResignReason,
  InsuranceRegion,
  MinsuranceItem,
  RecHiringSource,
  RecJobGrade,
  AsCategory,
  MdDocumentCategory,
  CourseType,
  SurveyQuestionGroup,
} from "./GeneralCodePages";
import {
  // shymaa
  Parent,
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
  Profile,
  CompanyDocument,
  CompanyDocumentCreate,
  Error,
  NotFound,
  Section,
  Gender,
  BusinessUnit,
  Bank,
  ContractType,
  City,
  Currency,
  IdentityType,
  Government,
  CurrencyRate,
  Documents,
  Jobs,
  CreateJob,
  EditJob,
  Company,
  CompanyChart,
  EmployeeChart,
  UserMenu,
  MailSetting,
  SMSSetting,
  ChangePassword,
  SettingResetPassword,
  LogReport,
  SettingMailSmsForm,
  PrintForm,
  SettingMailSmsFormCreate,
  CertificateSetting,
  HrPermission,
  OpenCloseMonth,
  Organization,
  CreateOrganization,
  EditOrganization,
  Personal,
  EmployeeData,
  EmployeeAddress,
  EmployeeCourse,
  EmployeeList,
  AdEmployeeImport,
  EmployeeExperince,
  EmployeeInsurance,
  EmployeeBank,
  EmployeeQualification,
  EmployeeContactInfo,
  EmployeeCar,
  EmployeeSalary,
  EmployeeContract,
  EmployeeContractKSA,
  EmployeeDocuments,
  NewEmployeeReport,
  CreateEmployeeDocuments,
  EditEmployeeDocuments,
  TrainingCenterCreate,
  TrainingCenter,
  Rewards,
  Penalty,
  PenaltyCreate,
  RewardTransList,
  PenaltyTransList,
  PenaltyTransCreate,
  AttentionList,
  AttentionCreate,
  LayOffNoticeList,
  LayOffNoticeCreate,
  PromotionsList,
  PromotionsCreate,
  PromotionsReport,
  DirectManager,
  ExplanationList,
  ExplanationEdit,
  ExplanationReport,
  ResignationReport,
  Complaint,
  HrLetter,
  NewIdea,
  OrganizationManger,
  NewsList,
  NewsCreate,
  NewsEdit,
  UploadFileWithKPI,
  UploadEmployeeData,
  Guarantor,
  CreatGuarantor,
  EditGuarantor,
  Custody,
  CustodyCategory,
  CustodyReceiveList,
  CustodyReceiveReport,
  CustodyReceiveCreate,
  CustodyDeliveryList,
  CustodyDeliveryReport,
  CustodyDeliveryCreate,
  Uniform,
  UniformReceiveList,
  UniformReceiveReport,
  UniformReceiveCreate,
  UniformDeliveryList,
  UniformDeliveryReport,
  UniformDeliveryCreate,
  RewardTransCreate,
  ResignTrxList,
  ResignTrxCreate,
  ResignTrxReport,
  ManPowerSetting,
  ResignTrxImport,
  EmpCourseList,
  EmpCourseCreate,
  EmpCourseReport,
  RewardTransReport,
  AttentionReport,
  LayOffNoticeReport,
  PenaltyTransReport,
  PermissionTrxList,
  PermissionTrxCreate,
  PermissionTrxReport,
  MissionTransportaion,
  PermissionList,
  PermissionCreate,
  PermissionTrxImport,
  CollectedPermission,
  MissionType,
  MissionTypeCreate,
  MissionTypeEdit,
  MissionTrxList,
  MissionTrxCreate,
  MissionTrxReport,
  MissionTrxImport,
  CollectedMission,
  WorkFlowCreate,
  WorkFlowList,
  RequestsList,
  CreateVacationType,
  EditVacationType,
  VacationsTypes,
  CreateOfficialVacation,
  OfficialVacations,
  EditOfficialVacation,
  GovernmentSickLeaveSetting,
  LeaveOpenBalance,
  CreateReplaceAnnualLeaveBalance,
  EditReplaceAnnualLeaveBalance,
  ReplaceAnnualLeaveBalance,
  OpeningClosingTheYearForLeaves,
  ShiftCreate,
  SwapShiftTrx,
  SwapShiftTrxCreate,
  ShiftList,
  ShiftManPower,
  ShiftEmployeeList,
  ShiftEmployeeCreate,
  ShiftOrgnization,
  LeaveTrxReport,
  LeaveReport,
  LeaveTrxCreate,
  LeaveTrx,
  ShiftTransfere,
  ShiftReview,
  ExceptionVacDays,
  ShiftImport,
  GovernmentSickLeaveCreate,
  GovernmentSickLeave,
  OpeningLeaveBalancesReport,
  BalanceUpdateLog,
  ImportVacations,
  LeavesBalance,
  GroupLeaves,
  ImportLeaveBalance,
  InsuranceOffices,
  SInsuranceJob,
  SinsuranceCalculationTemplate,
  SInsuranceOrgnization,
  SInsuranceOrgnizationCreate,
  EmployeeDataReport,
  EmployeeStatusReport,
  followStaffContracts,
  SocialInsuranceData,
  EmploymentDocsDetails,
  ImportEmployeeData,
  UpdateInsuranceSalary,
  EmploymentDocs,
  StopInsurance,
  StopInsuranceCreate,
  StopInsuranceReport,
  InsuranceFollow,
  RulesList,
  RulesCreate,
  EmergencyBenefitList,
  InsuranceFormStatus,
  PositionOfGuaranteesAndContradictions,
  SocialInsuranceReport,
  MedicalInsuranceData,
  staffMedicalInsuranceReport,
  InsuranceCompanies,
  MinsuranceCategory,
  MinsuranceCenters,
  MedicalInsuranceReport,
  MedicalInsuranceSubscription,
  MedicalInsuranceSubscriptionCreate,
  medicalInsSubscriptionReport,
  medicalInsuranceListReport,
  MissionReport,
  Form2Insurance,
  EmployeeShiftReport,
  DetailedReportAbsences,
  EmployeeMedicalBenefits,
  EmployeeMedicalBenefitsCreate,
  EmployeesWithoutShiftsReport,
  OverTimeDetailsReport,
  AbsenceReport,
  StopMedicalInsurance,
  StopMedicalInsuranceCreate,
  EarlyAttendanceReport,
  DeviceCreate,
  DeviceList,
  OvertimeHoursRequest,
  OvertimeHoursRequestCreate,
  EarlyLeavingReport,
  EmployeeLessTimeReport,
  ReviewOvertime,
  EmployeeAttendanceTemplateReport,
  ManHoursReport,
  JobAdvertisement,
  JobAdvertisementCreate,
  AttendanceRatioReport,
  CalculateAttendance,
  MonthlyAttendanceReport,
  AttendanceDeviceReport,
  ContinuousAbsenceReport,
  RegisterInAndOutReport,
  ManualAttendanceReport,
  BreakTimeReport,
  StatisticalReport2,
  WorkinHoursByTimeReport,
  OverTimeReport,
  WorkinLeavesDetailsReport,
  OverTimeDayNightReport,
  WorkinLeavesReport,
  LateAttendanceReport,
  JobApplicationPreview,
  RemoveEmployeeSign,
  EmployeeAttendance,
  DetailedAttendanceReport,
  MonthlyAttendanceSummaryReport,
  MonthlyStatisticsReport,
  DeviceLogReport,
  EmployeeLocation,
  DataFromAllDevices,
  JobRequirements,
  RecHrTest,
  RecHrTestCreate,
  AttendanceRatiosStatementsReport,
  RecEvaluation,
  RecEvaluationCreate,
  /* HRApplication, */
  GetAttLog,
  HRApplicationEvaluation,
  TechApplicationReview,
  SecApplicationReview,
  ApplicationCallStatus,
  HRInterviewEvaluation,
  HRInterviewEvaluationEdit,
  ManagerInterviewEvaluation,
  RegisterLocation,
  RegisterLocationCreate,
  RegisterLocationEdit,
  ManagerInterviewEvaluationEdit,
  HiringRequest,
  HiringRequestCreate,
  LoanSetting,
  PayTemplateList,
  PayTemplateCreate,
  Items,
  ElementTaxIns,
  SalaryStructureList,
  SalaryStructureCreate,
  ElementsList,
  ElementsCreate,
  HiringRequestEvaluation,
  HiringRequestEvaluationEdit,
  JobOffer,
  JobOfferCreate,
  BranchSalarySetting,
  JobOfferStatus,
  ElementValList,
  ElementValHistory,
  ElementValCreate,
  ElementVlaImport,
  LoanTrxList,
  LoanTrxCreate,
  LoanReqList,
  LoanReqCreate,
  LoanPostpone,
  Employment,
  JobDataBank,
  JobApplicationStatus,
  EmploymentRequest,
  EmploymentRequestCreate,
  ReviewEmploymentRequest,
  ReviewEmploymentRequestCreate,
  AsChoice,
  AsTemplate,
  AsTemplateCreate,
  PurchaseTrxList,
  PurchaseTrxCreate,
  EmployeeAssessment,
  Competencies,
  CompetenciesCreate,
  AllJobKpi,
  StaffJobKPI,
  JobDescriptions,
  IndividualDevelopmentPlan,
  IndividualDevelopmentPlanCreate,
  UploadAssessmentGuidelines,
  AssessmentGuidelines,
  MonthOpenCloseAss,
  AssessmentReview,
  AssessmentReviewEdit,
  CareerDevPlan,
  CareerDevPlanCreate,
  SalaryCalculation,
  SummaryPayslip,
  AssessmentReport,
  ElementReviewReport,
  SalaryComparisonReport,
  PaymentSlip,
  MonthlyVariablesReport,
  DetailedPayrollReport,
  AnnualTaxReport,
  BankList,
  PaymentSlipTotal,
  SalaryReport,
  FollowEmployeeReport,
  TaxReportReport,
  AdminDashboard,
  ManagementDashboard,
  EmployeeDashboard,
  TotalDeptSalaryReport,
  SalaryYearReport,
  SalarySigningListReport,
  LoanReport,
  PeerAppraisalSetting,
  LocationLog,
  ResignReqTrxCreate,
  ResignReqTrxEdit,
  ResignReqTrxList,
  HrEmployeeDocumentTrxCreate,
  HrEmployeeDocumentTrxEdit,
  HrEmployeeDocumentTrxList,
  ObjectiveReport,
  EmployeeObjective,
  EmployeeObjectiveCreate,
  ManPowerReport,
  EmpInvestigation,
  EmpInvestigationCreate,
  EmpInvestigationEdit,
  KpiData,
  KPI_LOB_Report,
  KPI_SupervisorReport,
  PeerAppraisalList,
  EmployeePeerAppraisal,
  ShiftManPowerReport,
  PeerAppraisalReport,
  Courses,
  CoursesCreate,

  // Survey
  SurveyChoiceGroup,
  SurveyChoiceGroupCreate,
  SurveyTemplate,
  SurveyTemplateCreate,
  Survey,

  // Training
  TrFunctionsList,
  TrFunctionsListCreate,
  EmployeeFunctions,
  FunctionsRequest,
  FunctionsData,
  QualificationCheck,
  TrTrainingTrxList,
  TrTrainingTrxListCreate,
  TrainingRequestList,
  TrainingRequestListCreate,
  TrainingEmployeeAttendance,
  EvaluateEmployee,
  EvaluateTraining,
  TrainingCalender,
  TestTemplate,
  TestTemplateCreate,
  TrainingTest,
  ReviewTest,
  EmployeeTrainingReport,
  TrainingAttendance,
  Customer,
  CustomerCreate,
  Contract,
  ContractCreate,
  ContractEdit,
  Stage,
  StageCreate,
  StageEdit,
  TimeSheet,
  TimeSheetCreate,
  TimeSheetEdit,
  Project,
  ProjectCreate,
  ProjectEdit,
  GPSAttendance,
  LocationAttendanceReport,
} from "../pageListAsync";

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        {/* Home */}
        <Route exact path="/app" component={AdminDashboard} />
        <Route
          path="/app/ManagementDashboard"
          component={ManagementDashboard}
        />
        <Route path="/app/EmployeeDashboard" component={EmployeeDashboard} />
        {/* Widgets */}
        <Route exact path="/app/widgets" component={Parent} />
        {/* Layout */}
        <Route exact path="/app/layouts" component={Parent} />
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
        {/* Pages */}
        <Route exact path="/app/pages" component={Parent} />
        <Route path="/app/pages/user-profile" component={Profile} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        {/* MainData */}
        <Route path="/app/Pages/Payroll/Section" component={Section} />
        <Route path="/app/Pages/MainData/Government" component={Government} />
        <Route path="/app/Pages/MainData/City" component={City} />
        <Route
          path="/app/Pages/MainData/MdDocumentCategory"
          component={MdDocumentCategory}
        />
        <Route
          path="/app/Pages/MainData/CompanyDocument"
          component={CompanyDocument}
        />
        <Route
          path="/app/Pages/MainData/CompanyDocumentCreate"
          component={CompanyDocumentCreate}
        />
        <Route
          path="/app/Pages/MainData/CompanyDocumentEdit"
          component={CompanyDocumentCreate}
        />
        <Route path="/app/Pages/MainData/Currency" component={Currency} />
        <Route
          path="/app/Pages/MainData/Currency-Rate"
          component={CurrencyRate}
        />
        <Route path="/app/Pages/MainData/Documents" component={Documents} />
        <Route path="/app/Pages/MainData/Gender" component={Gender} />
        <Route path="/app/Pages/MainData/BusinessUnit" component={BusinessUnit} />
        
        <Route path="/app/Pages/MainData/Grade" component={Grade} />
        <Route path="/app/Pages/MainData/Job-Level" component={JobLevel} />
        <Route path="/app/Pages/MainData/Job-Natures" component={JobNatures} />
        <Route path="/app/Pages/MainData/job" component={Jobs} />
        <Route path="/app/Pages/MainData/Job-Types" component={JobTypes} />
        <Route
          path="/app/Pages/MainData/Kinship-Link"
          component={KinshipLink}
        />
        <Route path="/app/Pages/MainData/Month" component={Month} />
        <Route path="/app/Pages/MainData/Year" component={Year} />
        <Route
          path="/app/Pages/MainData/Nationalities"
          component={Nationalities}
        />
        <Route
          path="/app/Pages/MainData/Qualifications"
          component={Qualifications}
        />
        <Route path="/app/Pages/MainData/Religions" component={Religions} />
        <Route path="/app/Pages/MainData/Salute" component={Salute} />
        <Route
          path="/app/Pages/MainData/License-Grade"
          component={LicenseGrade}
        />
        <Route
          path="/app/Pages/MainData/Military-Status"
          component={MilitaryStatus}
        />
        <Route
          path="/app/Pages/MainData/Social-Status"
          component={SocialStatus}
        />
        <Route
          path="/app/Pages/MainData/Identity-Type"
          component={IdentityType}
        />

        <Route path="/app/Pages/MainData/Bank" component={Bank} />

        <Route
          path="/app/Pages/MainData/Contract-Type"
          component={ContractType}
        />

        <Route path="/app/Pages/MainData/Company" component={Company} />
        <Route
          path="/app/Pages/MainData/CompanyChart"
          component={CompanyChart}
        />

        <Route
          path="/app/Pages/MainData/EmployeeChart"
          component={EmployeeChart}
        />

        <Route path="/app/Pages/MainData/JobCreate" component={CreateJob} />

        <Route path="/app/Pages/MainData/JobEdit" component={EditJob} />

        <Route
          path="/app/Pages/MainData/Organization"
          component={Organization}
        />
        <Route
          path="/app/Pages/MainData/OrganizationCreate"
          component={CreateOrganization}
        />
        <Route
          path="/app/Pages/MainData/OrganizationEdit"
          component={EditOrganization}
        />

        <Route
          path="/app/Pages/MainData/UploadEmployeeData"
          component={UploadEmployeeData}
        />

        <Route path="/app/Pages/MainData/Guarantor" component={Guarantor} />

        <Route
          path="/app/Pages/MainData/GuarantorCreate"
          component={CreatGuarantor}
        />

        <Route
          path="/app/Pages/MainData/GuarantorEdit"
          component={EditGuarantor}
        />

        {/* Setting */}
        <Route
          path="/app/Pages/Setting/ChangePassword"
          component={ChangePassword}
        />
        <Route path="/app/Pages/Setting/UserMenu" component={UserMenu} />
        <Route path="/app/Pages/Setting/MailSetting" component={MailSetting} />
        <Route path="/app/Pages/Setting/SMSSetting" component={SMSSetting} />
        <Route
          path="/app/Pages/Setting/SettingMailSmsForm"
          component={SettingMailSmsForm}
        />
        <Route
          path="/app/Pages/Setting/OpenCloseMonth"
          component={OpenCloseMonth}
        />
        <Route
          path="/app/Pages/Setting/HrPermission"
          component={HrPermission}
        />
        <Route path="/app/Pages/Setting/PrintForm" component={PrintForm} />
        <Route
          path="/app/Pages/Setting/SettingMailSmsFormCreate"
          component={SettingMailSmsFormCreate}
        />
        <Route
          path="/app/Pages/Setting/SettingMailSmsFormEdit"
          component={SettingMailSmsFormCreate}
        />
        <Route
          path="/app/Pages/Setting/CertificateSetting"
          component={CertificateSetting}
        />
        <Route
          path="/app/Pages/Setting/ResetPassword"
          component={SettingResetPassword}
        />
        <Route path="/app/Pages/Setting/LogReport" component={LogReport} />

        {/* HR */}
        <Route
          path="/app/Pages/HR/ResignReason"
          component={(props1) => (
            <ResignReason
              text="ResignReason"
              table="HrResignReason"
              {...props1}
            />
          )}
        />

        <Route
          path="/app/Pages/HR/CourseType"
          component={(props1) => (
            <CourseType text="HrCourseType" table="HrCourseType" {...props1} />
          )}
        />

        <Route path="/app/Pages/HR/CourseList" component={Courses} />
        <Route
          path="/app/Pages/HR/CourseListCreate"
          component={CoursesCreate}
        />
        <Route path="/app/Pages/HR/CourseListEdit" component={CoursesCreate} />

        <Route
          path="/app/Pages/HR/TrainingCenterList"
          component={TrainingCenter}
        />
        <Route
          path="/app/Pages/HR/TrainingCenterListCreate"
          component={TrainingCenterCreate}
        />
        <Route
          path="/app/Pages/HR/TrainingCenterListEdit"
          component={TrainingCenterCreate}
        />

        <Route path="/app/Pages/HR/Rewards" component={Rewards} />
        <Route path="/app/Pages/HR/Penalty" component={Penalty} />
        <Route path="/app/Pages/HR/PenaltyCreate" component={PenaltyCreate} />
        <Route path="/app/Pages/HR/PenaltyEdit" component={PenaltyCreate} />
        <Route path="/app/Pages/HR/RewardTrans" component={RewardTransList} />
        <Route
          path="/app/Pages/HR/RewardTransCreate"
          component={RewardTransCreate}
        />
        <Route
          path="/app/Pages/HR/RewardTransEdit"
          component={RewardTransCreate}
        />
        <Route path="/app/Pages/HR/PenaltyTrans" component={PenaltyTransList} />
        <Route
          path="/app/Pages/HR/PenaltyTransCreate"
          component={PenaltyTransCreate}
        />
        <Route
          path="/app/Pages/HR/PenaltyTransEdit"
          component={PenaltyTransCreate}
        />

        <Route path="/app/Pages/HR/Attention" component={AttentionList} />
        <Route
          path="/app/Pages/HR/AttentionCreate"
          component={AttentionCreate}
        />
        <Route path="/app/Pages/HR/AttentionEdit" component={AttentionCreate} />

        <Route path="/app/Pages/HR/LayOffNotice" component={LayOffNoticeList} />
        <Route
          path="/app/Pages/HR/LayOffNoticeCreate"
          component={LayOffNoticeCreate}
        />
        <Route
          path="/app/Pages/HR/LayOffNoticeEdit"
          component={LayOffNoticeCreate}
        />

        <Route
          path="/app/Pages/HR/LayOffNoticeList"
          component={LayOffNoticeList}
        />
        <Route
          path="/app/Pages/HR/LayOffNoticeCreate"
          component={LayOffNoticeCreate}
        />
        <Route
          path="/app/Pages/HR/LayOffNoticeEdit"
          component={LayOffNoticeCreate}
        />

        <Route path="/app/Pages/HR/Promotions" component={PromotionsList} />
        <Route
          path="/app/Pages/HR/PromotionsCreate"
          component={PromotionsCreate}
        />
        <Route
          path="/app/Pages/HR/PromotionsEdit"
          component={PromotionsCreate}
        />
        <Route path="/app/Pages/HR/DirectManager" component={DirectManager} />
        <Route path="/app/Pages/HR/Explanation" component={ExplanationList} />
        <Route
          path="/app/Pages/HR/ExplanationEdit"
          component={ExplanationEdit}
        />
        <Route
          path="/app/Pages/HR/OrganizationManger"
          component={OrganizationManger}
        />
        <Route path="/app/Pages/HR/News" component={NewsList} />
        <Route path="/app/Pages/HR/NewsCreate" component={NewsCreate} />
        <Route path="/app/Pages/HR/NewsEdit" component={NewsCreate} />

        <Route
          path="/app/Pages/HR/PromotionsReport"
          component={PromotionsReport}
        />
        <Route
          path="/app/Pages/HR/ExplanationReport"
          component={ExplanationReport}
        />

        <Route
          path="/app/Pages/HR/ResignationReport"
          component={ResignationReport}
        />

        <Route path="/app/Pages/EXP/Complaint" component={Complaint} />
        <Route path="/app/Pages/EXP/HrLetter" component={HrLetter} />
        <Route path="/app/Pages/EXP/NewIdea" component={NewIdea} />

        <Route
          path="/app/Pages/HR/CustodyCategory"
          component={CustodyCategory}
        />
        <Route path="/app/Pages/HR/Custody" component={Custody} />
        <Route
          path="/app/Pages/HR/CustodyDelivery"
          component={CustodyDeliveryList}
        />
        <Route
          path="/app/Pages/HR/CustodyDeliveryCreate"
          component={CustodyDeliveryCreate}
        />
        <Route
          path="/app/Pages/HR/CustodyDeliveryEdit"
          component={CustodyDeliveryCreate}
        />
        <Route
          path="/app/Pages/HR/CustodyReceive"
          component={CustodyReceiveList}
        />
        <Route
          path="/app/Pages/HR/CustodyReceiveCreate"
          component={CustodyReceiveCreate}
        />
        <Route
          path="/app/Pages/HR/CustodyReceiveEdit"
          component={CustodyReceiveCreate}
        />
        <Route
          path="/app/Pages/HR/CustodyDeliveryReport"
          component={CustodyDeliveryReport}
        />
        <Route
          path="/app/Pages/HR/CustodyReceiveReport"
          component={CustodyReceiveReport}
        />

        <Route path="/app/Pages/HR/Uniform" component={Uniform} />
        <Route
          path="/app/Pages/HR/UniformDelivery"
          component={UniformDeliveryList}
        />
        <Route
          path="/app/Pages/HR/UniformDeliveryCreate"
          component={UniformDeliveryCreate}
        />
        <Route
          path="/app/Pages/HR/UniformDeliveryEdit"
          component={UniformDeliveryCreate}
        />
        <Route
          path="/app/Pages/HR/UniformReceive"
          component={UniformReceiveList}
        />
        <Route
          path="/app/Pages/HR/UniformReceiveCreate"
          component={UniformReceiveCreate}
        />
        <Route
          path="/app/Pages/HR/UniformReceiveEdit"
          component={UniformReceiveCreate}
        />
        <Route
          path="/app/Pages/HR/UniformDeliveryReport"
          component={UniformDeliveryReport}
        />
        <Route
          path="/app/Pages/HR/UniformReceiveReport"
          component={UniformReceiveReport}
        />
        <Route path="/app/Pages/HR/ResignTrx" component={ResignTrxList} />
        <Route
          path="/app/Pages/HR/ResignTrxCreate"
          component={ResignTrxCreate}
        />
        <Route path="/app/Pages/HR/ResignTrxEdit" component={ResignTrxCreate} />
        <Route
          path="/app/Pages/HR/ResignTrxReport"
          component={ResignTrxReport}
        />
        <Route
          path="/app/Pages/HR/ManPowerSetting"
          component={ManPowerSetting}
        />
        <Route
          path="/app/Pages/HR/ResignTrxImport"
          component={ResignTrxImport}
        />
        <Route path="/app/Pages/HR/EmpCourse" component={EmpCourseList} />
        <Route
          path="/app/Pages/HR/EmpCourseCreate"
          component={EmpCourseCreate}
        />
        <Route path="/app/Pages/HR/EmpCourseEdit" component={EmpCourseCreate} />
        <Route
          path="/app/Pages/HR/EmpCourseReport"
          component={EmpCourseReport}
        />
        <Route
          path="/app/Pages/HR/RewardTransReport"
          component={RewardTransReport}
        />
        <Route
          path="/app/Pages/HR/PenaltyTransReport"
          component={PenaltyTransReport}
        />
        <Route
          path="/app/Pages/HR/AttentionReport"
          component={AttentionReport}
        />
        <Route
          path="/app/Pages/HR/LayOffNoticeReport"
          component={LayOffNoticeReport}
        />
        <Route path="/app/Pages/HR/Items" component={Items} />

        <Route
          path="/app/Pages/HR/ResignReqTrxCreate"
          component={ResignReqTrxCreate}
        />

        <Route
          path="/app/Pages/HR/ResignReqTrxEdit"
          component={ResignReqTrxEdit}
        />

        <Route path="/app/Pages/HR/ResignReqTrx" component={ResignReqTrxList} />

        <Route
          path='/app/Pages/HR/HrEmployeeDocumentTrxCreate'
          component={HrEmployeeDocumentTrxCreate}
        />

        <Route
          path="/app/Pages/HR/HrEmployeeDocumentTrxEdit"
          component={HrEmployeeDocumentTrxEdit}
        />

        <Route
          path="/app/Pages/HR/HrEmployeeDocumentTrx"
          component={HrEmployeeDocumentTrxList}
        />

        <Route path="/app/Pages/HR/ManPowerReport" component={ManPowerReport} />

        <Route
          path="/app/Pages/HR/EmpInvestigation"
          component={EmpInvestigation}
        />

        <Route
          path="/app/Pages/HR/EmpInvestigationCreate"
          component={EmpInvestigationCreate}
        />

        <Route
          path="/app/Pages/HR/EmpInvestigationEdit"
          component={EmpInvestigationEdit}
        />

        {/* Attendance */}
        <Route
          path="/app/Pages/Att/PermissionTrx"
          component={PermissionTrxList}
        />
        <Route
          path="/app/Pages/Att/PermissionApproval"
          component={RequestsList}
        />
        <Route path="/app/Pages/vac/VacApproval" component={RequestsList} />
        <Route path="/app/Pages/HR/PenaltyApproval" component={RequestsList} />
        <Route path="/app/Pages/HR/RewardsApproval" component={RequestsList} />
        <Route path="/app/Pages/HR/UniformApproval" component={RequestsList} />
        <Route path="/app/Pages/HR/CustodyApproval" component={RequestsList} />
        <Route path="/app/Pages/HR/ResignApproval" component={RequestsList} />
        <Route
          path="/app/Pages/Payroll/LoanApproval"
          component={RequestsList}
        />
        <Route path="/app/Pages/HR/DocumentApproval" component={RequestsList} />
        <Route
          path="/app/Pages/Att/OvertimeApproval"
          component={RequestsList}
        />
        <Route
          path="/app/Pages/Att/ShiftSwapApproval"
          component={RequestsList}
        />
        <Route
          path="/app/Pages/Training/FunctionApproval"
          component={RequestsList}
        />
        <Route
          path="/app/Pages/Training/TrainingApproval"
          component={RequestsList}
        />

        <Route
          path="/app/Pages/Att/PermissionTrxCreate"
          component={PermissionTrxCreate}
        />
        <Route
          path="/app/Pages/Att/PermissionTrxEdit"
          component={PermissionTrxCreate}
        />

        <Route
          path="/app/Pages/Att/PermissionTrxReport"
          component={PermissionTrxReport}
        />
        <Route
          path="/app/Pages/Att/MissionTransportaion"
          component={MissionTransportaion}
        />

        <Route path="/app/Pages/Att/Permission" component={PermissionList} />
        <Route
          path="/app/Pages/Att/PermissionCreate"
          component={PermissionCreate}
        />
        <Route
          path="/app/Pages/Att/PermissionEdit"
          component={PermissionCreate}
        />
        <Route
          path="/app/Pages/Att/PermissionTrxImport"
          component={PermissionTrxImport}
        />
        <Route
          path="/app/Pages/Att/CollectedPermission"
          component={CollectedPermission}
        />
        <Route path="/app/Pages/Att/MissionType" component={MissionType} />

        <Route
          path="/app/Pages/Att/MissionTypeCreate"
          component={MissionTypeCreate}
        />

        <Route
          path="/app/Pages/Att/MissionTypeEdit"
          component={MissionTypeEdit}
        />

        <Route path="/app/Pages/Att/Shift" component={ShiftList} />
        <Route path="/app/Pages/Att/ShiftManPower" component={ShiftManPower} />

        <Route path="/app/Pages/Att/ShiftCreate" component={ShiftCreate} />
        <Route path="/app/Pages/Att/ShiftEdit" component={ShiftCreate} />

        <Route path="/app/Pages/Att/SwapShiftTrx" component={SwapShiftTrx} />
        <Route
          path="/app/Pages/Att/SwapShiftTrxCreate"
          component={SwapShiftTrxCreate}
        />

        <Route
          path="/app/Pages/Att/ShiftEmployee"
          component={ShiftEmployeeList}
        />
        <Route
          path="/app/Pages/Att/ShiftEmployeeCreate"
          component={ShiftEmployeeCreate}
        />
        <Route
          path="/app/Pages/Att/ShiftEmployeeEdit"
          component={ShiftEmployeeCreate}
        />

        <Route
          path="/app/Pages/Att/ShiftOrgnization"
          component={ShiftOrgnization}
        />
        <Route
          path="/app/Pages/Att/ShiftTransfere"
          component={ShiftTransfere}
        />
        <Route path="/app/Pages/Att/ShiftReview" component={ShiftReview} />
        <Route path="/app/Pages/Att/ShiftImport" component={ShiftImport} />

        <Route path="/app/Pages/Att/MissionTrx" component={MissionTrxList} />
        <Route path="/app/Pages/Att/MissionApproval" component={RequestsList} />
        <Route
          path="/app/Pages/Att/MissionTrxCreate"
          component={MissionTrxCreate}
        />
        <Route
          path="/app/Pages/Att/MissionTrxEdit"
          component={MissionTrxCreate}
        />
        <Route
          path="/app/Pages/Att/MissionTrxReport"
          component={MissionTrxReport}
        />
        <Route
          path="/app/Pages/Att/MissionTrxImport"
          component={MissionTrxImport}
        />
        <Route
          path="/app/Pages/Att/CollectedMission"
          component={CollectedMission}
        />
        <Route path="/app/Pages/Att/Rules" component={RulesList} />
        <Route path="/app/Pages/Att/RulesCreate" component={RulesCreate} />
        <Route path="/app/Pages/Att/RulesEdit" component={RulesCreate} />

        <Route path="/app/Pages/Att/Device" component={DeviceList} />
        <Route path="/app/Pages/Att/DeviceCreate" component={DeviceCreate} />
        <Route path="/app/Pages/Att/DeviceEdit" component={DeviceCreate} />

        <Route path="/app/Pages/Att/MissionReport" component={MissionReport} />

        <Route
          path="/app/Pages/Att/EmployeeShiftReport"
          component={EmployeeShiftReport}
        />

        <Route
          path="/app/Pages/Att/DetailedReportAbsences"
          component={DetailedReportAbsences}
        />

        <Route
          path="/app/Pages/Att/EmployeesWithoutShiftsReport"
          component={EmployeesWithoutShiftsReport}
        />

        <Route
          path="/app/Pages/Att/OverTimeDetailsReport"
          component={OverTimeDetailsReport}
        />

        <Route path="/app/Pages/Att/AbsenceReport" component={AbsenceReport} />

        <Route
          path="/app/Pages/Att/EarlyAttendanceReport"
          component={EarlyAttendanceReport}
        />

        <Route
          path="/app/Pages/Att/ReviewOvertime"
          component={ReviewOvertime}
        />
        <Route
          path="/app/Pages/Att/RemoveEmployeeSign"
          component={RemoveEmployeeSign}
        />
        <Route
          path="/app/Pages/Att/EmployeeAttendance"
          component={EmployeeAttendance}
        />

        <Route
          path="/app/Pages/Att/EmployeeLocation"
          component={EmployeeLocation}
        />

        <Route
          path="/app/Pages/Att/DataFromAllDevices"
          component={DataFromAllDevices}
        />

        <Route path="/app/Pages/Att/GetAttLog" component={GetAttLog} />

        <Route
          path="/app/Pages/Att/OvertimeHoursRequest"
          component={OvertimeHoursRequest}
        />

        <Route
          path="/app/Pages/Att/OvertimeHoursRequestCreate"
          component={OvertimeHoursRequestCreate}
        />

        <Route
          path="/app/Pages/Att/OvertimeHoursRequestEdit"
          component={OvertimeHoursRequestCreate}
        />
        <Route
          path="/app/Pages/Att/EarlyLeavingReport"
          component={EarlyLeavingReport}
        />

        <Route
          path="/app/Pages/Att/EmployeeLessTimeReport"
          component={EmployeeLessTimeReport}
        />

        <Route
          path="/app/Pages/Att/EmployeeAttendanceTemplate"
          component={EmployeeAttendanceTemplateReport}
        />

        <Route
          path="/app/Pages/Att/ManHoursReport"
          component={ManHoursReport}
        />

        <Route
          path="/app/Pages/Att/AttendanceRatioReport"
          component={AttendanceRatioReport}
        />

        <Route
          path="/app/Pages/Att/MonthlyAttendanceReport"
          component={MonthlyAttendanceReport}
        />

        <Route
          path="/app/Pages/Att/AttendanceDeviceReport"
          component={AttendanceDeviceReport}
        />

        <Route
          path="/app/Pages/Att/ContinuousAbsenceReport"
          component={ContinuousAbsenceReport}
        />

        <Route
          path="/app/Pages/Att/RegisterInAndOutReport"
          component={RegisterInAndOutReport}
        />

        <Route
          path="/app/Pages/Att/ManualAttendanceReport"
          component={ManualAttendanceReport}
        />

        <Route
          path="/app/Pages/Att/GetBreakTimeReport"
          component={BreakTimeReport}
        />

        <Route
          path="/app/Pages/Att/StatisticalReport2"
          component={StatisticalReport2}
        />

        <Route
          path="/app/Pages/Att/WorkinHoursByTime"
          component={WorkinHoursByTimeReport}
        />

        <Route
          path="/app/Pages/Att/OverTimeReport"
          component={OverTimeReport}
        />

        <Route
          path="/app/Pages/Att/WorkinLeavesDetailsReport"
          component={WorkinLeavesDetailsReport}
        />

        <Route
          path="/app/Pages/Att/OverTimeDayNightReport"
          component={OverTimeDayNightReport}
        />

        <Route
          path="/app/Pages/Att/WorkinLeavesReport"
          component={WorkinLeavesReport}
        />

        <Route
          path="/app/Pages/Att/CalculateAttendance"
          component={CalculateAttendance}
        />

        <Route
          path="/app/Pages/Att/LateAttendanceReport"
          component={LateAttendanceReport}
        />

        <Route
          path="/app/Pages/Att/TimeTableDetailsReport"
          component={DetailedAttendanceReport}
        />

        <Route
          path="/app/Pages/Att/MonthlyAttSummaryReport"
          component={MonthlyAttendanceSummaryReport}
        />

        <Route
          path="/app/Pages/Att/MonthlyStatisticsReport"
          component={MonthlyStatisticsReport}
        />

        <Route path="/app/Pages/Att/AttLogReport" component={DeviceLogReport} />

        <Route
          path="/app/Pages/Att/TimeAttendRatio"
          component={AttendanceRatiosStatementsReport}
        />

        <Route
          path="/app/Pages/Att/RegisterLocation"
          component={RegisterLocation}
        />

        <Route
          path="/app/Pages/Att/RegisterLocationCreate"
          component={RegisterLocationCreate}
        />

        <Route
          path="/app/Pages/Att/RegisterLocationEdit"
          component={RegisterLocationEdit}
        />

        <Route
          path="/app/Pages/Att/GPSAttendance"
          component={GPSAttendance} 
        />

        <Route
          path="/app/Pages/Att/LocationAttendanceReport"
          component={LocationAttendanceReport} 
        />

        <Route
          path="/app/Pages/Att/ShiftManPowerReport"
          component={ShiftManPowerReport}
        />

        {/* Payroll */}
        <Route path="/app/Pages/Payroll/LoanSetting" component={LoanSetting} />
        <Route
          path="/app/Pages/Payroll/PayTemplate"
          component={PayTemplateList}
        />
        <Route
          path="/app/Pages/Payroll/PayTemplateCreate"
          component={PayTemplateCreate}
        />
        <Route
          path="/app/Pages/Payroll/PayTemplateEdit"
          component={PayTemplateCreate}
        />
        <Route
          path="/app/Pages/Payroll/ElementTaxIns"
          component={ElementTaxIns}
        />

        <Route
          path="/app/Pages/Payroll/SalaryStructure"
          component={SalaryStructureList}
        />
        <Route
          path="/app/Pages/Payroll/SalaryStructureCreate"
          component={SalaryStructureCreate}
        />
        <Route
          path="/app/Pages/Payroll/SalaryStructureEdit"
          component={SalaryStructureCreate}
        />
        <Route path="/app/Pages/Payroll/Elements" component={ElementsList} />
        <Route
          path="/app/Pages/Payroll/ElementsCreate"
          component={ElementsCreate}
        />
        <Route
          path="/app/Pages/Payroll/ElementsEdit"
          component={ElementsCreate}
        />

        <Route
          path="/app/Pages/Payroll/ElementVal"
          component={ElementValList}
        />
        <Route
          path="/app/Pages/Payroll/ElementValHistory"
          component={ElementValHistory}
        />
        <Route
          path="/app/Pages/Payroll/ElementValCreate"
          component={ElementValCreate}
        />
        <Route
          path="/app/Pages/Payroll/ElementValEdit"
          component={ElementValCreate}
        />
        <Route
          path="/app/Pages/Payroll/ElementVlaImport"
          component={ElementVlaImport}
        />

        <Route path="/app/Pages/Payroll/LoanTrx" component={LoanTrxList} />
        <Route
          path="/app/Pages/Payroll/LoanTrxCreate"
          component={LoanTrxCreate}
        />
        <Route
          path="/app/Pages/Payroll/LoanTrxEdit"
          component={LoanTrxCreate}
        />
        <Route
          path="/app/Pages/Payroll/LoanPostpone"
          component={LoanPostpone}
        />
        <Route path="/app/Pages/Payroll/LoanReq" component={LoanReqList} />
        <Route
          path="/app/Pages/Payroll/LoanReqCreate"
          component={LoanReqCreate}
        />
        <Route
          path="/app/Pages/Payroll/LoanReqEdit"
          component={LoanReqCreate}
        />

        <Route
          path="/app/Pages/Payroll/PurchaseTrx"
          component={PurchaseTrxList}
        />
        <Route
          path="/app/Pages/Payroll/PurchaseTrxCreate"
          component={PurchaseTrxCreate}
        />
        <Route
          path="/app/Pages/Payroll/PurchaseTrxEdit"
          component={PurchaseTrxCreate}
        />

        <Route
          path="/app/Pages/Payroll/BranchSalarySetting"
          component={BranchSalarySetting}
        />
        <Route
          path="/app/Pages/Payroll/SalaryCalculation"
          component={SalaryCalculation}
        />
        <Route
          path="/app/Pages/Payroll/SummaryPayslip"
          component={SummaryPayslip}
        />

        <Route
          path="/app/Pages/Payroll/ElementReviewReport"
          component={ElementReviewReport}
        />
        <Route
          path="/app/Pages/Payroll/SalaryComparisonReport"
          component={SalaryComparisonReport}
        />
        <Route path="/app/Pages/Payroll/PaymentSlip" component={PaymentSlip} />
        <Route
          path="/app/Pages/Payroll/MonthlyVariablesReport"
          component={MonthlyVariablesReport}
        />
        <Route
          path="/app/Pages/Payroll/DetailedPayrollReport"
          component={DetailedPayrollReport}
        />
        <Route path="/app/Pages/Payroll/BankList" component={BankList} />
        <Route
          path="/app/Pages/Payroll/AnnualTaxReport"
          component={AnnualTaxReport}
        />
        <Route
          path="/app/Pages/Payroll/PaymentSlipTotal"
          component={PaymentSlipTotal}
        />
        <Route
          path="/app/Pages/Payroll/SalaryReport"
          component={SalaryReport}
        />
        <Route
          path="/app/Pages/Payroll/FollowEmployeeReport"
          component={FollowEmployeeReport}
        />
        <Route
          path="/app/Pages/Payroll/TaxReportReport"
          component={TaxReportReport}
        />
        <Route
          path="/app/Pages/Payroll/TotalDeptSalaryReport"
          component={TotalDeptSalaryReport}
        />
        <Route
          path="/app/Pages/Payroll/SalaryYearReport"
          component={SalaryYearReport}
        />
        <Route
          path="/app/Pages/Payroll/SalarySigningListReport"
          component={SalarySigningListReport}
        />
        <Route path="/app/Pages/Payroll/LoanReport" component={LoanReport} />

        {/* WorkFlow */}
        <Route path="/app/Pages/WF/WorkFlow" component={WorkFlowList} />
        <Route path="/app/Pages/WF/WorkFlowCreate" component={WorkFlowCreate} />
        <Route path="/app/Pages/WF/WorkFlowEdit" component={WorkFlowCreate} />
        <Route path="/app/Pages/WF/RequestsList" component={RequestsList} />

        {/* Employee */}
        <Route
          path="/app/Pages/Employee/EmployeeList"
          component={EmployeeList}
        />
        <Route
          path="/app/Pages/Employee/AdEmployeeImport"
          component={AdEmployeeImport}
        />
        <Route
          path="/app/Pages/Employee/EmployeeData"
          component={EmployeeData}
        />
        <Route path="/app/Pages/Employee/Personal" component={Personal} />
        <Route
          path="/app/Pages/Employee/EmployeeAddress"
          component={EmployeeAddress}
        />
        <Route
          path="/app/Pages/Employee/EmployeeCourse"
          component={EmployeeCourse}
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

        <Route
          path="/app/Pages/Employee/EmployeeContractKSA"
          component={EmployeeContractKSA}
        />

        <Route
          path="/app/Pages/Employee/NewEmployeeReport"
          component={NewEmployeeReport}
        />

        <Route
          path="/app/Pages/Employee/EmployeeDocuments"
          component={EmployeeDocuments}
        />

        <Route
          path="/app/Pages/Employee/EmployeeStatusReport"
          component={EmployeeStatusReport}
        />

        <Route
          path="/app/Pages/Employee/EmployeeDocumentsCreate"
          component={CreateEmployeeDocuments}
        />

        <Route
          path="/app/Pages/Employee/EmployeeDocumentsEdit"
          component={EditEmployeeDocuments}
        />

        <Route
          path="/app/Pages/Employee/EmployeeDataReport"
          component={EmployeeDataReport}
        />

        <Route
          path="/app/Pages/Employee/followStaffContracts"
          component={followStaffContracts}
        />

        <Route
          path="/app/Pages/Employee/EmploymentDocsDetails"
          component={EmploymentDocsDetails}
        />

        <Route
          path="/app/Pages/Employee/ImportEmployeeData"
          component={ImportEmployeeData}
        />

        <Route
          path="/app/Pages/Employee/EmploymentDocs"
          component={EmploymentDocs}
        />

        <Route path="/app/Pages/Employee/LocationLog" component={LocationLog} />

        {/* Map */}
        <Route exact path="/app/maps" component={Parent} />

        {/* Vacations */}

        <Route
          path="/app/Pages/vac/VacationsTypesCreate"
          component={CreateVacationType}
        />

        <Route
          path="/app/Pages/vac/VacationsTypesEdit"
          component={EditVacationType}
        />

        <Route
          path="/app/Pages/vac/VacationsTypes"
          component={VacationsTypes}
        />

        <Route
          path="/app/Pages/vac/ExceptionVacDays"
          component={ExceptionVacDays}
        />

        <Route
          path="/app/Pages/vac/OfficialVacationsCreate"
          component={CreateOfficialVacation}
        />

        <Route
          path="/app/Pages/vac/OfficialVacationsEdit"
          component={EditOfficialVacation}
        />

        <Route
          path="/app/Pages/vac/OfficialVacations"
          component={OfficialVacations}
        />

        <Route
          path="/app/Pages/vac/VacationTrxReport"
          component={LeaveTrxReport}
        />

        <Route
          path="/app/Pages/vac/OpeningLeaveBalancesReport"
          component={OpeningLeaveBalancesReport}
        />

        <Route
          path="/app/Pages/vac/BalanceUpdateLog"
          component={BalanceUpdateLog}
        />

        <Route path="/app/Pages/vac/LeavesBalance" component={LeavesBalance} />

        <Route path="/app/Pages/vac/LeaveReport" component={LeaveReport} />

        <Route path="/app/Pages/vac/LeaveTrx" component={LeaveTrx} />

        <Route
          path="/app/Pages/vac/LeaveTrxCreate"
          component={LeaveTrxCreate}
        />

        <Route path="/app/Pages/vac/LeaveTrxEdit" component={LeaveTrxCreate} />

        <Route
          path="/app/Pages/vac/GovernmentSickLeave"
          component={GovernmentSickLeave}
        />

        <Route
          path="/app/Pages/vac/GovernmentSickLeaveCreate"
          component={GovernmentSickLeaveCreate}
        />

        <Route
          path="/app/Pages/vac/GovernmentSickLeaveEdit"
          component={GovernmentSickLeaveCreate}
        />

        <Route
          path="/app/Pages/vac/GovernmentSickLeaveSetting"
          component={GovernmentSickLeaveSetting}
        />

        <Route
          path="/app/Pages/vac/LeaveOpenBalance"
          component={LeaveOpenBalance}
        />

        <Route
          path="/app/Pages/vac/ReplaceAnnualLeaveBalanceCreate"
          component={CreateReplaceAnnualLeaveBalance}
        />

        <Route
          path="/app/Pages/vac/ReplaceAnnualLeaveBalanceEdit"
          component={EditReplaceAnnualLeaveBalance}
        />

        <Route
          path="/app/Pages/vac/ReplaceAnnualLeaveBalance"
          component={ReplaceAnnualLeaveBalance}
        />

        <Route
          path="/app/Pages/vac/OpeningClosingTheYearForLeaves"
          component={OpeningClosingTheYearForLeaves}
        />

        <Route
          path="/app/Pages/vac/ImportVacations"
          component={ImportVacations}
        />

        <Route path="/app/Pages/vac/GroupLeaves" component={GroupLeaves} />

        <Route
          path="/app/Pages/vac/ImportLeaveBalance"
          component={ImportLeaveBalance}
        />

        {/* Insurance */}

        <Route
          path="/app/Pages/insurance/InsuranceOffices"
          component={InsuranceOffices}
        />

        <Route
          path="/app/Pages/insurance/SInsuranceJob"
          component={SInsuranceJob}
        />

        <Route
          path="/app/Pages/insurance/InsuranceRegion"
          component={InsuranceRegion}
        />

        <Route
          path="/app/Pages/insurance/SinsuranceCalculationTemplate"
          component={SinsuranceCalculationTemplate}
        />

        <Route
          path="/app/Pages/insurance/SInsuranceOrgnization"
          component={SInsuranceOrgnization}
        />

        <Route
          path="/app/Pages/insurance/SInsuranceOrgnizationCreate"
          component={SInsuranceOrgnizationCreate}
        />

        <Route
          path="/app/Pages/insurance/SInsuranceOrgnizationEdit"
          component={SInsuranceOrgnizationCreate}
        />

        <Route
          path="/app/Pages/insurance/SocialInsuranceData"
          component={SocialInsuranceData}
        />

        <Route
          path="/app/Pages/insurance/UpdateInsuranceSalary"
          component={UpdateInsuranceSalary}
        />
        <Route
          path="/app/Pages/insurance/StopInsuranceReport"
          component={StopInsuranceReport}
        />

        <Route
          path="/app/Pages/insurance/Insurancefollow"
          component={InsuranceFollow}
        />

        <Route
          path="/app/Pages/insurance/StopInsurance"
          component={StopInsurance}
        />

        <Route
          path="/app/Pages/insurance/StopInsuranceCreate"
          component={StopInsuranceCreate}
        />

        <Route
          path="/app/Pages/insurance/StopInsuranceEdit"
          component={StopInsuranceCreate}
        />

        <Route
          path="/app/Pages/insurance/EmergencyBenefitList"
          component={EmergencyBenefitList}
        />

        <Route
          path="/app/Pages/insurance/InsuranceFormStatus"
          component={InsuranceFormStatus}
        />

        <Route
          path="/app/Pages/insurance/PositionOfGuaranteesAndContradictions"
          component={PositionOfGuaranteesAndContradictions}
        />

        <Route
          path="/app/Pages/insurance/SocialInsuranceReport"
          component={SocialInsuranceReport}
        />

        <Route
          path="/app/Pages/insurance/Form2Insurance"
          component={Form2Insurance}
        />

        {/*Medical Insurance */}

        <Route
          path="/app/Pages/Minsurance/MedicalInsuranceData"
          component={MedicalInsuranceData}
        />

        <Route
          path="/app/Pages/Minsurance/MedicalInsuranceData"
          component={MedicalInsuranceData}
        />

        <Route
          path="/app/Pages/Minsurance/InsuranceCompanies"
          component={InsuranceCompanies}
        />

        <Route
          path="/app/Pages/Minsurance/MinsuranceCategory"
          component={MinsuranceCategory}
        />

        <Route
          path="/app/Pages/Minsurance/MinsuranceCenters"
          component={MinsuranceCenters}
        />

        <Route
          path="/app/Pages/Minsurance/staffMedicalInsuranceReport"
          component={staffMedicalInsuranceReport}
        />

        <Route
          path="/app/Pages/Minsurance/MinsuranceItem"
          component={MinsuranceItem}
        />

        <Route
          path="/app/Pages/Minsurance/MedicalInsuranceReport"
          component={MedicalInsuranceReport}
        />

        <Route
          path="/app/Pages/Minsurance/MedicalInsuranceSubscription"
          component={MedicalInsuranceSubscription}
        />

        <Route
          path="/app/Pages/Minsurance/MedicalInsuranceSubscriptionCreate"
          component={MedicalInsuranceSubscriptionCreate}
        />

        <Route
          path="/app/Pages/Minsurance/MedicalInsuranceSubscriptionEdit"
          component={MedicalInsuranceSubscriptionCreate}
        />
        <Route
          path="/app/Pages/Minsurance/medicalInsSubscriptionReport"
          component={medicalInsSubscriptionReport}
        />

        <Route
          path="/app/Pages/Minsurance/medicalInsuranceListReport"
          component={medicalInsuranceListReport}
        />

        <Route
          path="/app/Pages/Minsurance/EmployeeMedicalBenefits"
          component={EmployeeMedicalBenefits}
        />

        <Route
          path="/app/Pages/Minsurance/EmployeeMedicalBenefitsCreate"
          component={EmployeeMedicalBenefitsCreate}
        />

        <Route
          path="/app/Pages/Minsurance/EmployeeMedicalBenefitsEdit"
          component={EmployeeMedicalBenefitsCreate}
        />

        <Route
          path="/app/Pages/Minsurance/StopMedicalInsurance"
          component={StopMedicalInsurance}
        />

        <Route
          path="/app/Pages/Minsurance/StopMedicalInsuranceCreate"
          component={StopMedicalInsuranceCreate}
        />

        <Route
          path="/app/Pages/Minsurance/StopMedicalInsuranceEdit"
          component={StopMedicalInsuranceCreate}
        />

        {/* JobAdvertisement */}
        <Route
          path="/app/Pages/Recruitment/JobAdvertisement"
          component={JobAdvertisement}
        />

        <Route
          path="/app/Pages/Recruitment/JobRequirements"
          component={JobRequirements}
        />

        <Route path="/app/Pages/Recruitment/RecHrTest" component={RecHrTest} />

        <Route
          path="/app/Pages/Recruitment/RecHrTestCreate"
          component={RecHrTestCreate}
        />

        <Route
          path="/app/Pages/Recruitment/RecHrTestEdit"
          component={RecHrTestCreate}
        />

        <Route
          path="/app/Pages/Recruitment/RecEvaluation"
          component={RecEvaluation}
        />

        <Route
          path="/app/Pages/Recruitment/RecEvaluationCreate"
          component={RecEvaluationCreate}
        />

        <Route
          path="/app/Pages/Recruitment/RecEvaluationEdit"
          component={RecEvaluationCreate}
        />

        <Route
          path="/app/Pages/Recruitment/RecHiringSource"
          component={RecHiringSource}
        />

        <Route
          path="/app/Pages/Recruitment/RecJobGrade"
          component={RecJobGrade}
        />

        <Route
          path="/app/Pages/Recruitment/Employment"
          component={Employment}
        />

        <Route
          path="/app/Pages/Recruitment/JobDataBank"
          component={JobDataBank}
        />

        <Route
          path="/app/Pages/Recruitment/JobApplicationStatus"
          component={JobApplicationStatus}
        />

        <Route
          path="/app/Pages/Recruitment/EmploymentRequest"
          component={EmploymentRequest}
        />

        <Route
          path="/app/Pages/Recruitment/EmploymentRequestCreate"
          component={EmploymentRequestCreate}
        />

        <Route
          path="/app/Pages/Recruitment/EmploymentRequestEdit"
          component={EmploymentRequestCreate}
        />

        <Route
          path="/app/Pages/Recruitment/ReviewEmploymentRequest"
          component={ReviewEmploymentRequest}
        />

        <Route
          path="/app/Pages/Recruitment/ReviewEmploymentRequestEdit"
          component={ReviewEmploymentRequestCreate}
        />

        {/* <Route
          path='/app/Pages/Recruitment/HRApplication'
          component={HRApplication}
        /> */}

        <Route
          path="/app/Pages/Recruitment/HRApplicationEvaluation"
          component={HRApplicationEvaluation}
        />

        <Route
          path="/app/Pages/Recruitment/TechApplicationReview"
          component={TechApplicationReview}
        />

        <Route
          path="/app/Pages/Recruitment/SecApplicationReview"
          component={SecApplicationReview}
        />

        <Route
          path="/app/Pages/Recruitment/ApplicationCallStatus"
          component={ApplicationCallStatus}
        />

        <Route
          path="/app/Pages/Recruitment/HRInterviewEvaluation"
          component={HRInterviewEvaluation}
        />

        <Route
          path="/app/Pages/Recruitment/HRInterviewEvaluationEdit"
          component={HRInterviewEvaluationEdit}
        />

        <Route
          path="/app/Pages/Recruitment/ManagerInterviewEvaluation"
          component={ManagerInterviewEvaluation}
        />

        <Route
          path="/app/Pages/Recruitment/ManagerInterviewEvaluationEdit"
          component={ManagerInterviewEvaluationEdit}
        />

        <Route
          path="/app/Pages/Recruitment/HiringRequest"
          component={HiringRequest}
        />

        <Route
          path="/app/Pages/Recruitment/HiringRequestCreate"
          component={HiringRequestCreate}
        />

        <Route
          path="/app/Pages/Recruitment/HiringRequestEdit"
          component={HiringRequestCreate}
        />

        <Route path="/app/Pages/Recruitment/JobOffer" component={JobOffer} />

        <Route
          path="/app/Pages/Recruitment/JobOfferStatus"
          component={JobOfferStatus}
        />

        <Route
          path="/app/Pages/Recruitment/JobOfferCreate"
          component={JobOfferCreate}
        />

        <Route
          path="/app/Pages/Recruitment/JobOfferEdit"
          component={JobOfferCreate}
        />

        <Route
          path="/app/Pages/Recruitment/HiringRequestEvaluation"
          component={HiringRequestEvaluation}
        />

        <Route
          path="/app/Pages/Recruitment/HiringRequestEvaluationEdit"
          component={HiringRequestEvaluationEdit}
        />

        <Route
          path="/app/Pages/Recruitment/JobAdvertisementCreate"
          component={JobAdvertisementCreate}
        />

        <Route
          path="/app/Pages/Recruitment/JobAdvertisementEdit"
          component={JobAdvertisementCreate}
        />

        <Route
          path="/app/Pages/Recruitment/JobApplicationPreview"
          component={JobApplicationPreview}
        />

        {/* Assessment */}
        <Route path="/app/Pages/Assessment/AsCategory" component={AsCategory} />

        <Route path="/app/Pages/Assessment/AsChoice" component={AsChoice} />

        <Route path="/app/Pages/Assessment/AsTemplate" component={AsTemplate} />

        <Route
          path="/app/Pages/Assessment/AsTemplateCreate"
          component={AsTemplateCreate}
        />

        <Route
          path="/app/Pages/Assessment/AsTemplateEdit"
          component={AsTemplateCreate}
        />

        <Route
          path="/app/Pages/Assessment/Competencies"
          component={Competencies}
        />

        <Route
          path="/app/Pages/Assessment/CompetenciesCreate"
          component={CompetenciesCreate}
        />

        <Route
          path="/app/Pages/Assessment/CompetenciesEdit"
          component={CompetenciesCreate}
        />

        <Route
          path="/app/Pages/Assessment/EmployeeAssessment"
          component={EmployeeAssessment}
        />

        <Route path="/app/Pages/Assessment/AllJobKpi" component={AllJobKpi} />

        <Route
          path="/app/Pages/Assessment/StaffJobKPI"
          component={StaffJobKPI}
        />

        <Route
          path="/app/Pages/Assessment/JobDescriptions"
          component={JobDescriptions}
        />

        <Route
          path="/app/Pages/Assessment/IndividualDevelopmentPlan"
          component={IndividualDevelopmentPlan}
        />

        <Route
          path="/app/Pages/Assessment/IndividualDevelopmentPlanCreate"
          component={IndividualDevelopmentPlanCreate}
        />

        <Route
          path="/app/Pages/Assessment/IndividualDevelopmentPlanEdit"
          component={IndividualDevelopmentPlanCreate}
        />

        <Route
          path="/app/Pages/Assessment/CareerDevPlan"
          component={CareerDevPlan}
        />

        <Route
          path="/app/Pages/Assessment/CareerDevPlanCreate"
          component={CareerDevPlanCreate}
        />

        <Route
          path="/app/Pages/Assessment/CareerDevPlanEdit"
          component={CareerDevPlanCreate}
        />

        <Route
          path="/app/Pages/Assessment/UploadAssessmentGuidelines"
          component={UploadAssessmentGuidelines}
        />

        <Route
          path="/app/Pages/Assessment/AssessmentGuidelines"
          component={AssessmentGuidelines}
        />

        <Route
          path="/app/Pages/Assessment/MonthOpenCloseAss"
          component={MonthOpenCloseAss}
        />

        <Route
          path="/app/Pages/Assessment/AssessmentReview"
          component={AssessmentReview}
        />

        <Route
          path="/app/Pages/Assessment/AssessmentReviewEdit"
          component={AssessmentReviewEdit}
        />

        <Route
          path="/app/Pages/Assessment/AssessmentReport"
          component={AssessmentReport}
        />

        <Route
          path="/app/Pages/Assessment/PeerAppraisalSetting"
          component={PeerAppraisalSetting}
        />

        <Route
          path="/app/Pages/Assessment/PeerAppraisalList"
          component={PeerAppraisalList}
        />

        <Route
          path="/app/Pages/Assessment/EmployeePeerAppraisal"
          component={EmployeePeerAppraisal}
        />

        <Route
          path="/app/Pages/Assessment/PeerAppraisalReport"
          component={PeerAppraisalReport}
        />

        {/* SmartObjective */}

        <Route
          path="/app/Pages/SmartObjective/ObjectiveReport"
          component={ObjectiveReport}
        />
        <Route
          path="/app/Pages/SmartObjective/EmployeeObjective"
          component={EmployeeObjective}
        />
        <Route
          path="/app/Pages/SmartObjective/EmployeeObjectiveCreate"
          component={EmployeeObjectiveCreate}
        />
        <Route
          path="/app/Pages/SmartObjective/EmployeeObjectiveEdit"
          component={EmployeeObjectiveCreate}
        />

        {/* KPI */}

        <Route
          path="/app/Pages/KPI/Upload_KPI_Data"
          component={UploadFileWithKPI}
        />

        <Route path="/app/Pages/KPI/KpiData" component={KpiData} />

        <Route path="/app/Pages/KPI/KPILOBReport" component={KPI_LOB_Report} />

        <Route
          path="/app/Pages/KPI/KPISupervisorReport"
          component={KPI_SupervisorReport}
        />

        {/* Survey */}
        <Route
          path="/app/Pages/Survey/SurveyQuestionGroup"
          component={SurveyQuestionGroup}
        />

        <Route
          path="/app/Pages/Survey/SurveyChoiceGroup"
          component={SurveyChoiceGroup}
        />
        <Route
          path="/app/Pages/Survey/SurveyChoiceGroupCreate"
          component={SurveyChoiceGroupCreate}
        />
        <Route
          path="/app/Pages/Survey/SurveyChoiceGroupEdit"
          component={SurveyChoiceGroupCreate}
        />

        <Route
          path="/app/Pages/Survey/SurveyTemplate"
          component={SurveyTemplate}
        />
        <Route
          path="/app/Pages/Survey/SurveyTemplateCreate"
          component={SurveyTemplateCreate}
        />
        <Route
          path="/app/Pages/Survey/SurveyTemplateEdit"
          component={SurveyTemplateCreate}
        />

        <Route path="/app/Pages/Survey/Survey" component={Survey} />

        {/* Training */}
        <Route
          path="/app/Pages/Training/TrFunctionsList"
          component={TrFunctionsList}
        />
        <Route
          path="/app/Pages/Training/TrFunctionsListCreate"
          component={TrFunctionsListCreate}
        />
        <Route
          path="/app/Pages/Training/TrFunctionsListEdit"
          component={TrFunctionsListCreate}
        />

        <Route
          path="/app/Pages/Training/EmployeeFunctions"
          component={EmployeeFunctions}
        />

        <Route
          path="/app/Pages/Training/FunctionsRequest"
          component={FunctionsRequest}
        />

        <Route
          path="/app/Pages/Training/FunctionsData"
          component={FunctionsData}
        />

        <Route
          path="/app/Pages/Training/QualificationCheck"
          component={QualificationCheck}
        />

        <Route
          path="/app/Pages/Training/TrTrainingTrxList"
          component={TrTrainingTrxList}
        />
        <Route
          path="/app/Pages/Training/TrTrainingTrxListCreate"
          component={TrTrainingTrxListCreate}
        />
        <Route
          path="/app/Pages/Training/TrTrainingTrxListEdit"
          component={TrTrainingTrxListCreate}
        />

        <Route
          path="/app/Pages/Training/TrainingRequestList"
          component={TrainingRequestList}
        />
        <Route
          path="/app/Pages/Training/TrainingRequestListCreate"
          component={TrainingRequestListCreate}
        />
        <Route
          path="/app/Pages/Training/TrainingRequestListEdit"
          component={TrainingRequestListCreate}
        />

        <Route
          path="/app/Pages/Training/EmployeeAttendance"
          component={TrainingEmployeeAttendance}
        />

        <Route
          path="/app/Pages/Training/TrainingCalender"
          component={TrainingCalender}
        />
        <Route
          path="/app/Pages/Training/EvaluateEmployee"
          component={EvaluateEmployee}
        />
        <Route
          path="/app/Pages/Training/EvaluateTraining"
          component={EvaluateTraining}
        />

        <Route
          path="/app/Pages/Training/TestTemplate"
          component={TestTemplate}
        />
        <Route
          path="/app/Pages/Training/TestTemplateCreate"
          component={TestTemplateCreate}
        />
        <Route
          path="/app/Pages/Training/TestTemplateEdit"
          component={TestTemplateCreate}
        />

        <Route path="/app/Pages/Training/Test" component={TrainingTest} />

        <Route path="/app/Pages/Training/ReviewTest" component={ReviewTest} />

        <Route
          path="/app/Pages/Training/EmployeeTrainingReport"
          component={EmployeeTrainingReport}
        />

        <Route
          path="/app/Pages/Training/TrainingAttendance"
          component={TrainingAttendance}
        />




          {/* Project managment */}

        <Route
          path="/app/Pages/ProjectManagment/Customer"
          component={Customer}
        />

        <Route
          path="/app/Pages/ProjectManagment/CustomerCreate"
          component={CustomerCreate}
        />

        <Route
          path="/app/Pages/ProjectManagment/CustomerEdit"
          component={CustomerCreate}
        />

        <Route
          path="/app/Pages/ProjectManagment/Contract"
          component={Contract}
        />

        <Route
          path="/app/Pages/ProjectManagment/ContractCreate"
          component={ContractCreate}
        />

        <Route
          path="/app/Pages/ProjectManagment/ContractEdit"
          component={ContractEdit}
        />

        <Route
          path="/app/Pages/ProjectManagment/Stage"
          component={Stage}
        />

        <Route
          path="/app/Pages/ProjectManagment/StageCreate"
          component={StageCreate}
        />

        <Route
          path="/app/Pages/ProjectManagment/StageEdit"
          component={StageEdit}
        />


        <Route
          path="/app/Pages/ProjectManagment/TimeSheet"
          component={TimeSheet}
        />

        <Route
          path="/app/Pages/ProjectManagment/TimeSheetCreate"
          component={TimeSheetCreate}
        />

        <Route
          path="/app/Pages/ProjectManagment/TimeSheetEdit"
          component={TimeSheetEdit}
        />

        <Route
          path="/app/Pages/ProjectManagment/Project"
          component={Project}
        />

        <Route
          path="/app/Pages/ProjectManagment/ProjectCreate"
          component={ProjectCreate}
        />

        <Route
          path="/app/Pages/ProjectManagment/ProjectEdit"
          component={ProjectEdit}
        />










        {/* Default */}
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = { history: PropTypes.object.isRequired };

export default Application;
