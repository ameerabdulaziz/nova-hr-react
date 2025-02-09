const DOMAIN_NAME = process.env.NODE_ENV === 'production' ? process.env.DOMAIN_NAME : '';

const SITEMAP = {
  payroll: {
    Section: { route: '/Payroll/Section' },
    LoanSetting: { route: '/Payroll/LoanSetting' },
    PayTemplate: { route: '/Payroll/PayTemplate' },
    PayTemplateCreate: { route: '/Payroll/PayTemplateCreate' },
    PayTemplateEdit: { route: '/Payroll/PayTemplateEdit' },
    ElementTaxIns: { route: '/Payroll/ElementTaxIns' },
    SalaryStructure: { route: '/Payroll/SalaryStructure' },
    SalaryStructureCreate: {
      route: '/Payroll/SalaryStructureCreate',
    },
    SalaryStructureEdit: {
      route: '/Payroll/SalaryStructureEdit',
    },
    Elements: { route: '/Payroll/Elements' },
    ElementsCreate: { route: '/Payroll/ElementsCreate' },
    ElementsEdit: { route: '/Payroll/ElementsEdit' },
    ElementVal: { route: '/Payroll/ElementVal' },
    ElementValHistory: { route: '/Payroll/ElementValHistory' },
    ElementValCreate: { route: '/Payroll/ElementValCreate' },
    ElementValEdit: { route: '/Payroll/ElementValEdit' },
    ElementVlaImport: { route: '/Payroll/ElementVlaImport' },
    LoanTrx: { route: '/Payroll/LoanTrx' },
    LoanTrxCreate: { route: '/Payroll/LoanTrxCreate' },
    LoanTrxEdit: { route: '/Payroll/LoanTrxEdit' },
    LoanPostpone: { route: '/Payroll/LoanPostpone' },
    LoanReq: { route: '/Payroll/LoanReq' },
    LoanReqCreate: { route: '/Payroll/LoanReqCreate' },
    LoanReqEdit: { route: '/Payroll/LoanReqEdit' },
    PurchaseTrx: { route: '/Payroll/PurchaseTrx' },
    PurchaseTrxCreate: { route: '/Payroll/PurchaseTrxCreate' },
    PurchaseTrxEdit: { route: '/Payroll/PurchaseTrxEdit' },
    BranchSalarySetting: {
      route: '/Payroll/BranchSalarySetting',
    },
    SalaryCalculation: { route: '/Payroll/SalaryCalculation' },
    SummaryPayslip: { route: '/Payroll/SummaryPayslip' },
    ElementReviewReport: {
      route: '/Payroll/ElementReviewReport',
    },
    SalaryComparisonReport: {
      route: '/Payroll/SalaryComparisonReport',
    },
    PaymentSlipReview: { route: '/Payroll/PaymentSlip/Review' },
    PaymentSlip: { route: '/Payroll/PaymentSlip' },
    MonthlyVariablesReport: {
      route: '/Payroll/MonthlyVariablesReport',
    },
    DetailedPayrollReport: {
      route: '/Payroll/DetailedPayrollReport',
    },
    LoanApproval: { route: '/Payroll/LoanApproval' },
    BankList: { route: '/Payroll/BankList' },
    AnnualTaxReport: { route: '/Payroll/AnnualTaxReport' },
    PaymentSlipTotalReview: {
      route: '/Payroll/PaymentSlipTotal/Review',
    },
    PaymentSlipTotal: { route: '/Payroll/PaymentSlipTotal' },
    SalaryReport: { route: '/Payroll/SalaryReport' },
    FollowEmployeeReport: {
      route: '/Payroll/FollowEmployeeReport',
    },
    TaxReportReport: { route: '/Payroll/TaxReportReport' },
    TotalDeptSalaryReport: {
      route: '/Payroll/TotalDeptSalaryReport',
    },
    SalaryYearReport: { route: '/Payroll/SalaryYearReport' },
    SalarySigningListReport: {
      route: '/Payroll/SalarySigningListReport',
    },
    LoanReport: { route: '/Payroll/LoanReport' },
    WBS: { route: '/Payroll/WBS' },
    WBSReport: { route: '/Payroll/WBSReport' },
  },
  mainData: {
    Government: {
      route: '/MainData/Government',
    },
    City: {
      route: '/MainData/City',
    },
    MdDocumentCategory: {
      route: '/MainData/MdDocumentCategory',
    },
    CompanyDocument: {
      route: '/MainData/CompanyDocument',
    },
    CompanyDocumentCreate: {
      route: '/MainData/CompanyDocumentCreate',
    },
    CompanyDocumentEdit: {
      route: '/MainData/CompanyDocumentEdit',
    },
    Currency: {
      route: '/MainData/Currency',
    },
    CurrencyRate: {
      route: '/MainData/Currency-Rate',
    },
    Documents: {
      route: '/MainData/Documents',
    },
    Gender: {
      route: '/MainData/Gender',
    },
    BusinessUnit: {
      route: '/MainData/BusinessUnit',
    },
    Grade: {
      route: '/MainData/Grade',
    },
    JobLevel: {
      route: '/MainData/Job-Level',
    },
    JobNatures: {
      route: '/MainData/Job-Natures',
    },
    Job: {
      route: '/MainData/Job',
    },
    JobTypes: {
      route: '/MainData/Job-Types',
    },
    KinshipLink: {
      route: '/MainData/Kinship-Link',
    },
    Month: {
      route: '/MainData/Month',
    },
    Year: {
      route: '/MainData/Year',
    },
    Nationalities: {
      route: '/MainData/Nationalities',
    },
    Qualifications: {
      route: '/MainData/Qualifications',
    },
    Religions: {
      route: '/MainData/Religions',
    },
    Salute: {
      route: '/MainData/Salute',
    },
    LicenseGrade: {
      route: '/MainData/License-Grade',
    },
    MilitaryStatus: {
      route: '/MainData/Military-Status',
    },
    SocialStatus: {
      route: '/MainData/Social-Status',
    },
    IdentityType: {
      route: '/MainData/Identity-Type',
    },
    Bank: {
      route: '/MainData/Bank',
    },
    ContractType: {
      route: '/MainData/Contract-Type',
    },
    Company: {
      route: '/MainData/Company',
    },
    CompanyChart: {
      route: '/MainData/CompanyChart',
    },
    EmployeeChart: {
      route: '/MainData/EmployeeChart',
    },
    JobCreate: {
      route: '/MainData/JobCreate',
    },
    JobEdit: {
      route: '/MainData/JobEdit',
    },
    Organization: {
      route: '/MainData/Organization',
    },
    OrganizationCreate: {
      route: '/MainData/OrganizationCreate',
    },
    OrganizationEdit: {
      route: '/MainData/OrganizationEdit',
    },
    UploadEmployeeData: {
      route: '/MainData/UploadEmployeeData',
    },
    Guarantor: {
      route: '/MainData/Guarantor',
    },
    GuarantorCreate: {
      route: '/MainData/GuarantorCreate',
    },
    GuarantorEdit: {
      route: '/MainData/GuarantorEdit',
    },
    Languages: {
      route: '/MainData/Languages',
    },
  },
  setting: {
    ChangePassword: {
      route: '/Setting/ChangePassword',
    },
    UserMenu: {
      route: '/Setting/UserMenu',
    },
    MailSetting: {
      route: '/Setting/MailSetting',
    },
    SMSSetting: {
      route: '/Setting/SMSSetting',
    },
    SettingMailSmsForm: {
      route: '/Setting/SettingMailSmsForm',
    },
    OpenCloseMonth: {
      route: '/Setting/OpenCloseMonth',
    },
    HrPermission: {
      route: '/Setting/HrPermission',
    },
    PrintForm: {
      route: '/Setting/PrintForm',
    },
    SettingMailSmsFormCreate: {
      route: '/Setting/SettingMailSmsFormCreate',
    },
    SettingMailSmsFormEdit: {
      route: '/Setting/SettingMailSmsFormEdit',
    },
    CertificateSetting: {
      route: '/Setting/CertificateSetting',
    },
    ResetPassword: {
      route: '/Setting/ResetPassword',
    },
    LogReport: {
      route: '/Setting/LogReport',
    },
    MenuTemplate: {
      route: '/Setting/menuTemplate',
    },
  },
  humanResources: {
    ResignReason: { route: '/HR/ResignReason' },
    ResignReasonCreate: { route: '/HR/ResignReasonCreate' },
    ResignReasonEdit: { route: '/HR/ResignReasonEdit' },
    CourseType: { route: '/HR/CourseType' },
    CourseList: { route: '/HR/CourseList' },
    CourseListCreate: { route: '/HR/CourseListCreate' },
    CourseListEdit: { route: '/HR/CourseListEdit' },
    TrainingCenterList: { route: '/HR/TrainingCenterList' },
    TrainingCenterListCreate: {
      route: '/HR/TrainingCenterListCreate',
    },
    TrainingCenterListEdit: {
      route: '/HR/TrainingCenterListEdit',
    },
    Rewards: { route: '/HR/Rewards' },
    Penalty: { route: '/HR/Penalty' },
    PenaltyCreate: { route: '/HR/PenaltyCreate' },
    PenaltyEdit: { route: '/HR/PenaltyEdit' },
    RewardTrans: { route: '/HR/RewardTrans' },
    RewardTransCreate: { route: '/HR/RewardTransCreate' },
    RewardTransEdit: { route: '/HR/RewardTransEdit' },
    PenaltyTrans: { route: '/HR/PenaltyTrans' },
    PenaltyTransCreate: { route: '/HR/PenaltyTransCreate' },
    PenaltyTransEdit: { route: '/HR/PenaltyTransEdit' },
    Attention: { route: '/HR/Attention' },
    AttentionCreate: { route: '/HR/AttentionCreate' },
    AttentionEdit: { route: '/HR/AttentionEdit' },
    LayOffNoticeList: { route: '/HR/LayOffNoticeList' },
    LayOffNotice: { route: '/HR/LayOffNotice' },
    LayOffNoticeCreate: { route: '/HR/LayOffNoticeCreate' },
    LayOffNoticeEdit: { route: '/HR/LayOffNoticeEdit' },
    Promotions: { route: '/HR/Promotions' },
    PromotionsCreate: { route: '/HR/PromotionsCreate' },
    PromotionsEdit: { route: '/HR/PromotionsEdit' },
    DirectManager: { route: '/HR/DirectManager' },
    Explanation: { route: '/HR/Explanation' },
    ExplanationEdit: { route: '/HR/ExplanationEdit' },
    OrganizationManger: { route: '/HR/OrganizationManger' },
    News: { route: '/HR/News' },
    NewsCreate: { route: '/HR/NewsCreate' },
    NewsEdit: { route: '/HR/NewsEdit' },
    PromotionsReport: { route: '/HR/PromotionsReport' },
    ExplanationReport: { route: '/HR/ExplanationReport' },
    ResignationReport: { route: '/HR/ResignationReport' },
    CustodyCategory: { route: '/HR/CustodyCategory' },
    Custody: { route: '/HR/Custody' },
    CustodyDelivery: { route: '/HR/CustodyDelivery' },
    CustodyDeliveryCreate: {
      route: '/HR/CustodyDeliveryCreate',
    },
    CustodyDeliveryEdit: { route: '/HR/CustodyDeliveryEdit' },
    CustodyReceive: { route: '/HR/CustodyReceive' },
    CustodyReceiveCreate: { route: '/HR/CustodyReceiveCreate' },
    CustodyReceiveEdit: { route: '/HR/CustodyReceiveEdit' },
    CustodyDeliveryReport: {
      route: '/HR/CustodyDeliveryReport',
    },
    CustodyReceiveReport: { route: '/HR/CustodyReceiveReport' },
    Uniform: { route: '/HR/Uniform' },
    UniformDelivery: { route: '/HR/UniformDelivery' },
    UniformDeliveryCreate: {
      route: '/HR/UniformDeliveryCreate',
    },
    UniformDeliveryEdit: { route: '/HR/UniformDeliveryEdit' },
    UniformReceive: { route: '/HR/UniformReceive' },
    UniformReceiveCreate: { route: '/HR/UniformReceiveCreate' },
    UniformReceiveEdit: { route: '/HR/UniformReceiveEdit' },
    UniformDeliveryReport: {
      route: '/HR/UniformDeliveryReport',
    },
    UniformReceiveReport: { route: '/HR/UniformReceiveReport' },
    ResignTrx: { route: '/HR/ResignTrx' },
    ResignTrxCreate: { route: '/HR/ResignTrxCreate' },
    ResignTrxEdit: { route: '/HR/ResignTrxEdit' },
    ResignTrxReport: { route: '/HR/ResignTrxReport' },
    ManPowerSetting: { route: '/HR/ManPowerSetting' },
    ResignTrxImport: { route: '/HR/ResignTrxImport' },
    EmpCourse: { route: '/HR/EmpCourse' },
    EmpCourseCreate: { route: '/HR/EmpCourseCreate' },
    EmpCourseEdit: { route: '/HR/EmpCourseEdit' },
    EmpCourseReport: { route: '/HR/EmpCourseReport' },
    RewardTransReport: { route: '/HR/RewardTransReport' },
    PenaltyTransReport: { route: '/HR/PenaltyTransReport' },
    AttentionReport: { route: '/HR/AttentionReport' },
    LayOffNoticeReport: { route: '/HR/LayOffNoticeReport' },
    Items: { route: '/HR/Items' },
    ResignReqTrxCreate: { route: '/HR/ResignReqTrxCreate' },
    ResignReqTrxEdit: { route: '/HR/ResignReqTrxEdit' },
    ResignReqTrx: { route: '/HR/ResignReqTrx' },
    HrEmployeeDocumentTrxCreate: {
      route: '/HR/HrEmployeeDocumentTrxCreate',
    },
    HrEmployeeDocumentTrxEdit: {
      route: '/HR/HrEmployeeDocumentTrxEdit',
    },
    HrEmployeeDocumentTrx: {
      route: '/HR/HrEmployeeDocumentTrx',
    },
    ManPowerReport: { route: '/HR/ManPowerReport' },
    EmpInvestigation: { route: '/HR/EmpInvestigation' },
    EmpInvestigationCreate: {
      route: '/HR/EmpInvestigationCreate',
    },
    EmpInvestigationEdit: { route: '/HR/EmpInvestigationEdit' },
    TransferRequest: { route: '/HR/TransferRequest' },
    TransferRequestCreate: {
      route: '/HR/TransferRequestCreate',
    },
    TransferRequestEdit: { route: '/HR/TransferRequestEdit' },
    PenaltyApproval: { route: '/HR/PenaltyApproval' },
    RewardsApproval: { route: '/HR/RewardsApproval' },
    UniformApproval: { route: '/HR/UniformApproval' },
    CustodyApproval: { route: '/HR/CustodyApproval' },
    ResignApproval: { route: '/HR/ResignApproval' },
    DocumentApproval: { route: '/HR/DocumentApproval' },
    TransferRequestApproval: {
      route: '/HR/TransferRequestApproval',
    },
    HrResignRuleList: { route: '/HR/HrResignRule' },
    HrResignRuleCreate: { route: '/HR/HrResignRuleCreate' },
    HrResignRuleEdit: { route: '/HR/HrResignRuleEdit' },
    hrNotifications: { route: '/HR/hrNotifications' },
  },
  exp: {
    Complaint: { route: '/EXP/Complaint' },
    HrLetter: { route: '/EXP/HrLetter' },
    NewIdea: { route: '/EXP/NewIdea' },
  },
  attendance: {
    PermissionTrx: { route: '/Att/PermissionTrx' },
    PermissionApproval: { route: '/Att/PermissionApproval' },
    OvertimeApproval: { route: '/Att/OvertimeApproval' },
    ShiftSwapApproval: { route: '/Att/ShiftSwapApproval' },
    ForgotFingerprintApproval: {
      route: '/Att/ForgotFingerprintApproval',
    },
    PermissionTrxCreate: { route: '/Att/PermissionTrxCreate' },
    PermissionTrxEdit: { route: '/Att/PermissionTrxEdit' },
    PermissionTrxReport: { route: '/Att/PermissionTrxReport' },
    MissionTransportaion: { route: '/Att/MissionTransportaion' },
    Permission: { route: '/Att/Permission' },
    PermissionCreate: { route: '/Att/PermissionCreate' },
    PermissionEdit: { route: '/Att/PermissionEdit' },
    PermissionTrxImport: { route: '/Att/PermissionTrxImport' },
    CollectedPermission: { route: '/Att/CollectedPermission' },
    MissionType: { route: '/Att/MissionType' },
    MissionTypeCreate: { route: '/Att/MissionTypeCreate' },
    MissionTypeEdit: { route: '/Att/MissionTypeEdit' },
    Shift: { route: '/Att/Shift' },
    ShiftManPower: { route: '/Att/ShiftManPower' },
    ShiftCreate: { route: '/Att/ShiftCreate' },
    ShiftEdit: { route: '/Att/ShiftEdit' },
    SwapShiftTrx: { route: '/Att/SwapShiftTrx' },
    SwapShiftTrxCreate: { route: '/Att/SwapShiftTrxCreate' },
    ShiftEmployee: { route: '/Att/ShiftEmployee' },
    ShiftEmployeeCreate: { route: '/Att/ShiftEmployeeCreate' },
    ShiftEmployeeEdit: { route: '/Att/ShiftEmployeeEdit' },
    ShiftOrgnization: { route: '/Att/ShiftOrgnization' },
    ShiftTransfere: { route: '/Att/ShiftTransfere' },
    ShiftReview: { route: '/Att/ShiftReview' },
    ShiftImport: { route: '/Att/ShiftImport' },
    MissionTrx: { route: '/Att/MissionTrx' },
    MissionApproval: { route: '/Att/MissionApproval' },
    MissionTrxCreate: { route: '/Att/MissionTrxCreate' },
    MissionTrxEdit: { route: '/Att/MissionTrxEdit' },
    MissionTrxReport: { route: '/Att/MissionTrxReport' },
    MissionTrxImport: { route: '/Att/MissionTrxImport' },
    CollectedMission: { route: '/Att/CollectedMission' },
    Rules: { route: '/Att/Rules' },
    RulesCreate: { route: '/Att/RulesCreate' },
    RulesEdit: { route: '/Att/RulesEdit' },
    Device: { route: '/Att/Device' },
    DeviceCreate: { route: '/Att/DeviceCreate' },
    DeviceEdit: { route: '/Att/DeviceEdit' },
    MissionReport: { route: '/Att/MissionReport' },
    EmployeeShiftReport: { route: '/Att/EmployeeShiftReport' },
    DetailedReportAbsences: {
      route: '/Att/DetailedReportAbsences',
    },
    EmployeesWithoutShiftsReport: {
      route: '/Att/EmployeesWithoutShiftsReport',
    },
    OverTimeDetailsReport: {
      route: '/Att/OverTimeDetailsReport',
    },
    AbsenceReport: { route: '/Att/AbsenceReport' },
    EarlyAttendanceReport: {
      route: '/Att/EarlyAttendanceReport',
    },
    ReviewOvertime: { route: '/Att/ReviewOvertime' },
    RemoveEmployeeSign: { route: '/Att/RemoveEmployeeSign' },
    EmployeeAttendance: { route: '/Att/EmployeeAttendance' },
    EmployeeLocation: { route: '/Att/EmployeeLocation' },
    DataFromAllDevices: { route: '/Att/DataFromAllDevices' },
    GetAttLog: { route: '/Att/GetAttLog' },
    OvertimeHoursRequest: { route: '/Att/OvertimeHoursRequest' },
    OvertimeHoursRequestCreate: {
      route: '/Att/OvertimeHoursRequestCreate',
    },
    OvertimeHoursRequestEdit: {
      route: '/Att/OvertimeHoursRequestEdit',
    },
    EarlyLeavingReport: { route: '/Att/EarlyLeavingReport' },
    EmployeeLessTimeReport: {
      route: '/Att/EmployeeLessTimeReport',
    },
    EmployeeAttendanceTemplate: {
      route: '/Att/EmployeeAttendanceTemplate',
    },
    ManHoursReport: { route: '/Att/ManHoursReport' },
    AttendanceRatioReport: {
      route: '/Att/AttendanceRatioReport',
    },
    MonthlyAttendanceReport: {
      route: '/Att/MonthlyAttendanceReport',
    },
    AttendanceDeviceReport: {
      route: '/Att/AttendanceDeviceReport',
    },
    ContinuousAbsenceReport: {
      route: '/Att/ContinuousAbsenceReport',
    },
    RegisterInAndOutReport: {
      route: '/Att/RegisterInAndOutReport',
    },
    ManualAttendanceReport: {
      route: '/Att/ManualAttendanceReport',
    },
    GetBreakTimeReport: { route: '/Att/GetBreakTimeReport' },
    StatisticalReport2: { route: '/Att/StatisticalReport2' },
    WorkinHoursByTime: { route: '/Att/WorkinHoursByTime' },
    OverTimeReport: { route: '/Att/OverTimeReport' },
    WorkinLeavesDetailsReport: {
      route: '/Att/WorkinLeavesDetailsReport',
    },
    OverTimeDayNightReport: {
      route: '/Att/OverTimeDayNightReport',
    },
    WorkinLeavesReport: { route: '/Att/WorkinLeavesReport' },
    CalculateAttendance: { route: '/Att/CalculateAttendance' },
    LateAttendanceReport: { route: '/Att/LateAttendanceReport' },
    TimeTableDetailsReportReview: {
      route: '/Att/TimeTableDetailsReport/Review',
    },
    TimeTableDetailsReport: {
      route: '/Att/TimeTableDetailsReport',
    },
    MonthlyAttSummaryReport: {
      route: '/Att/MonthlyAttSummaryReport',
    },
    ShiftManPowerReport: { route: '/Att/ShiftManPowerReport' },
    ForgotFingerprintRequest: {
      route: '/Att/ForgotFingerprintRequest',
    },
    ForgotFingerprintRequestCreate: {
      route: '/Att/ForgotFingerprintRequestCreate',
    },
    ForgotFingerprintRequestEdit: {
      route: '/Att/ForgotFingerprintRequestEdit',
    },
    EmployeeSchedule: { route: '/Att/EmployeeSchedule' },
    MonthlyStatisticsReport: {
      route: '/Att/MonthlyStatisticsReport',
    },
    AttLogReport: { route: '/Att/AttLogReport' },
    TimeAttendRatio: { route: '/Att/TimeAttendRatio' },
    RegisterLocation: { route: '/Att/RegisterLocation' },
    RegisterLocationCreate: {
      route: '/Att/RegisterLocationCreate',
    },
    RegisterLocationEdit: { route: '/Att/RegisterLocationEdit' },
    GPSAttendance: { route: '/Att/GPSAttendance' },
    LocationAttendanceReport: {
      route: '/Att/LocationAttendanceReport',
    },
    EmployeeLocationReport: {
      route: '/Att/EmployeeLocationReport',
    },
  },
  workFlow: {
    WorkFlow: { route: '/WF/WorkFlow' },
    WorkFlowCreate: { route: '/WF/WorkFlowCreate' },
    WorkFlowEdit: { route: '/WF/WorkFlowEdit' },
    RequestsList: { route: '/WF/RequestsList' },
  },
  employee: {
    EmployeeList: { route: '/Employee/EmployeeList' },
    AdEmployeeImport: { route: '/Employee/AdEmployeeImport' },
    EmployeeData: { route: '/Employee/EmployeeData' },
    Personal: { route: '/Employee/Personal' },
    EmployeeAddress: { route: '/Employee/EmployeeAddress' },
    EmployeeCourse: { route: '/Employee/EmployeeCourse' },
    EmployeeExperince: { route: '/Employee/EmployeeExperince' },
    EmployeeInsurance: { route: '/Employee/EmployeeInsurance' },
    EmployeeBank: { route: '/Employee/EmployeeBank' },
    EmployeeQualification: {
      route: '/Employee/EmployeeQualification',
    },
    EmployeeCar: { route: '/Employee/EmployeeCar' },
    EmployeeSalary: { route: '/Employee/EmployeeSalary' },
    EmployeeContactInfo: {
      route: '/Employee/EmployeeContactInfo',
    },
    EmployeeContract: { route: '/Employee/EmployeeContract' },
    EmployeeContractKSA: {
      route: '/Employee/EmployeeContractKSA',
    },
    NewEmployeeReport: { route: '/Employee/NewEmployeeReport' },
    EmployeeDocuments: { route: '/Employee/EmployeeDocuments' },
    EmployeeStatusReport: {
      route: '/Employee/EmployeeStatusReport',
    },
    EmployeeDocumentsCreate: {
      route: '/Employee/EmployeeDocumentsCreate',
    },
    EmployeeDocumentsEdit: {
      route: '/Employee/EmployeeDocumentsEdit',
    },
    EmployeeDataReport: {
      route: '/Employee/EmployeeDataReport',
    },
    followStaffContracts: {
      route: '/Employee/followStaffContracts',
    },
    EmploymentDocsDetails: {
      route: '/Employee/EmploymentDocsDetails',
    },
    ImportEmployeeData: {
      route: '/Employee/ImportEmployeeData',
    },
    EmploymentDocs: { route: '/Employee/EmploymentDocs' },
    LocationLog: { route: '/Employee/LocationLog' },
  },
  vacation: {
    VacApproval: { route: '/vac/VacApproval' },
    VacationsTypesCreate: { route: '/vac/VacationsTypesCreate' },
    VacationsTypesEdit: { route: '/vac/VacationsTypesEdit' },
    VacationsTypes: { route: '/vac/VacationsTypes' },
    ExceptionVacDays: { route: '/vac/ExceptionVacDays' },
    OfficialVacationsCreate: {
      route: '/vac/OfficialVacationsCreate',
    },
    OfficialVacationsEdit: {
      route: '/vac/OfficialVacationsEdit',
    },
    OfficialVacations: { route: '/vac/OfficialVacations' },
    VacationTrxReport: { route: '/vac/VacationTrxReport' },
    OpeningLeaveBalancesReport: {
      route: '/vac/OpeningLeaveBalancesReport',
    },
    BalanceUpdateLog: { route: '/vac/BalanceUpdateLog' },
    LeavesBalance: { route: '/vac/LeavesBalance' },
    LeaveReport: { route: '/vac/LeaveReport' },
    LeaveTrx: { route: '/vac/LeaveTrx' },
    LeaveTrxCreate: { route: '/vac/LeaveTrxCreate' },
    LeaveTrxEdit: { route: '/vac/LeaveTrxEdit' },
    GovernmentSickLeave: { route: '/vac/GovernmentSickLeave' },
    GovernmentSickLeaveCreate: {
      route: '/vac/GovernmentSickLeaveCreate',
    },
    GovernmentSickLeaveEdit: {
      route: '/vac/GovernmentSickLeaveEdit',
    },
    GovernmentSickLeaveSetting: {
      route: '/vac/GovernmentSickLeaveSetting',
    },
    LeaveOpenBalance: { route: '/vac/LeaveOpenBalance' },
    ReplaceAnnualLeaveBalanceCreate: {
      route: '/vac/ReplaceAnnualLeaveBalanceCreate',
    },
    ReplaceAnnualLeaveBalanceEdit: {
      route: '/vac/ReplaceAnnualLeaveBalanceEdit',
    },
    ReplaceAnnualLeaveBalance: {
      route: '/vac/ReplaceAnnualLeaveBalance',
    },
    OpeningClosingTheYearForLeaves: {
      route: '/vac/OpeningClosingTheYearForLeaves',
    },
    ImportVacations: { route: '/vac/ImportVacations' },
    GroupLeaves: { route: '/vac/GroupLeaves' },
    ImportLeaveBalance: { route: '/vac/ImportLeaveBalance' },
    VacationBalanceCostReport: {
      route: '/vac/VacationBalanceCostReport',
    },
  },
  socialInsurance: {
    InsuranceOffices: { route: '/insurance/InsuranceOffices' },
    SInsuranceJob: { route: '/insurance/SInsuranceJob' },
    InsuranceRegion: { route: '/insurance/InsuranceRegion' },
    SinsuranceCalculationTemplate: {
      route: '/insurance/SinsuranceCalculationTemplate',
    },
    SinsuranceCalculationTemplateCreate: {
      route: '/insurance/SinsuranceCalculationTemplateCreate',
    },
    SinsuranceCalculationTemplateEdit: {
      route: '/insurance/SinsuranceCalculationTemplateEdit',
    },
    SInsuranceOrgnization: {
      route: '/insurance/SInsuranceOrgnization',
    },
    SInsuranceOrgnizationCreate: {
      route: '/insurance/SInsuranceOrgnizationCreate',
    },
    SInsuranceOrgnizationEdit: {
      route: '/insurance/SInsuranceOrgnizationEdit',
    },
    SocialInsuranceData: {
      route: '/insurance/SocialInsuranceData',
    },
    UpdateInsuranceSalary: {
      route: '/insurance/UpdateInsuranceSalary',
    },
    StopInsuranceReport: {
      route: '/insurance/StopInsuranceReport',
    },
    InsuranceFollow: { route: '/insurance/Insurancefollow' },
    StopInsurance: { route: '/insurance/StopInsurance' },
    StopInsuranceCreate: {
      route: '/insurance/StopInsuranceCreate',
    },
    StopInsuranceEdit: { route: '/insurance/StopInsuranceEdit' },
    EmergencyBenefitList: {
      route: '/insurance/EmergencyBenefitList',
    },
    InsuranceFormStatus: {
      route: '/insurance/InsuranceFormStatus',
    },
    PositionOfGuaranteesAndContradictions: {
      route: '/insurance/PositionOfGuaranteesAndContradictions',
    },
    SocialInsuranceReport: {
      route: '/insurance/SocialInsuranceReport',
    },
    Form1Insurance: { route: '/insurance/Form1Insurance' },
    Form1InsuranceReview: {
      route: '/insurance/Form1Insurance/Review',
    },
    Form2Insurance: { route: '/insurance/Form2Insurance' },
    Form6Insurance: { route: '/insurance/Form6Insurance' },
    Form6InsuranceReview: {
      route: '/insurance/Form6Insurance/Review',
    },
  },
  medicalInsurance: {
    MedicalInsuranceData: {
      route: '/Minsurance/MedicalInsuranceData',
    },
    InsuranceCompanies: {
      route: '/Minsurance/InsuranceCompanies',
    },
    MinsuranceCategory: {
      route: '/Minsurance/MinsuranceCategory',
    },
    MinsuranceCenters: {
      route: '/Minsurance/MinsuranceCenters',
    },
    staffMedicalInsuranceReport: {
      route: '/Minsurance/staffMedicalInsuranceReport',
    },
    MinsuranceItem: { route: '/Minsurance/MinsuranceItem' },
    MedicalInsuranceReport: {
      route: '/Minsurance/MedicalInsuranceReport',
    },
    MedicalInsuranceSubscription: {
      route: '/Minsurance/MedicalInsuranceSubscription',
    },
    MedicalInsuranceSubscriptionCreate: {
      route: '/Minsurance/MedicalInsuranceSubscriptionCreate',
    },
    MedicalInsuranceSubscriptionEdit: {
      route: '/Minsurance/MedicalInsuranceSubscriptionEdit',
    },
    medicalInsSubscriptionReport: {
      route: '/Minsurance/medicalInsSubscriptionReport',
    },
    medicalInsuranceListReport: {
      route: '/Minsurance/medicalInsuranceListReport',
    },
    EmployeeMedicalBenefits: {
      route: '/Minsurance/EmployeeMedicalBenefits',
    },
    EmployeeMedicalBenefitsCreate: {
      route: '/Minsurance/EmployeeMedicalBenefitsCreate',
    },
    EmployeeMedicalBenefitsEdit: {
      route: '/Minsurance/EmployeeMedicalBenefitsEdit',
    },
    StopMedicalInsurance: {
      route: '/Minsurance/StopMedicalInsurance',
    },
    StopMedicalInsuranceCreate: {
      route: '/Minsurance/StopMedicalInsuranceCreate',
    },
    StopMedicalInsuranceEdit: {
      route: '/Minsurance/StopMedicalInsuranceEdit',
    },
  },
  recruitment: {
    JobAdvertisement: { route: '/Recruitment/JobAdvertisement' },
    JobRequirements: { route: '/Recruitment/JobRequirements' },
    RecHrTest: { route: '/Recruitment/RecHrTest' },
    RecHrTestCreate: { route: '/Recruitment/RecHrTestCreate' },
    RecHrTestEdit: { route: '/Recruitment/RecHrTestEdit' },
    RecEvaluation: { route: '/Recruitment/RecEvaluation' },
    RecEvaluationCreate: {
      route: '/Recruitment/RecEvaluationCreate',
    },
    RecEvaluationEdit: {
      route: '/Recruitment/RecEvaluationEdit',
    },
    RecHiringSource: { route: '/Recruitment/RecHiringSource' },
    RecJobGrade: { route: '/Recruitment/RecJobGrade' },
    Employment: { route: '/Recruitment/Employment' },
    JobDataBank: { route: '/Recruitment/JobDataBank' },
    JobApplicationStatus: {
      route: '/Recruitment/JobApplicationStatus',
    },
    EmploymentRequest: {
      route: '/Recruitment/EmploymentRequest',
    },
    EmploymentRequestCreate: {
      route: '/Recruitment/EmploymentRequestCreate',
    },
    EmploymentRequestEdit: {
      route: '/Recruitment/EmploymentRequestEdit',
    },
    ReviewEmploymentRequest: {
      route: '/Recruitment/ReviewEmploymentRequest',
    },
    ReviewEmploymentRequestEdit: {
      route: '/Recruitment/ReviewEmploymentRequestEdit',
    },
    HRApplicationEvaluation: {
      route: '/Recruitment/HRApplicationEvaluation',
    },
    HRApplication: {
      route: '/Recruitment/HRApplication',
    },
    TechApplicationReview: {
      route: '/Recruitment/TechApplicationReview',
    },
    SecApplicationReview: {
      route: '/Recruitment/SecApplicationReview',
    },
    ApplicationCallStatus: {
      route: '/Recruitment/ApplicationCallStatus',
    },
    HRInterviewEvaluation: {
      route: '/Recruitment/HRInterviewEvaluation',
    },
    HRInterviewEvaluationEdit: {
      route: '/Recruitment/HRInterviewEvaluationEdit',
    },
    ManagerInterviewEvaluation: {
      route: '/Recruitment/ManagerInterviewEvaluation',
    },
    ManagerInterviewEvaluationEdit: {
      route: '/Recruitment/ManagerInterviewEvaluationEdit',
    },
    HiringRequest: { route: '/Recruitment/HiringRequest' },
    HiringRequestCreate: {
      route: '/Recruitment/HiringRequestCreate',
    },
    HiringRequestEdit: {
      route: '/Recruitment/HiringRequestEdit',
    },
    JobOffer: { route: '/Recruitment/JobOffer' },
    JobOfferStatus: { route: '/Recruitment/JobOfferStatus' },
    JobOfferCreate: { route: '/Recruitment/JobOfferCreate' },
    JobOfferEdit: { route: '/Recruitment/JobOfferEdit' },
    HiringRequestEvaluation: {
      route: '/Recruitment/HiringRequestEvaluation',
    },
    HiringRequestEvaluationEdit: {
      route: '/Recruitment/HiringRequestEvaluationEdit',
    },
    JobAdvertisementCreate: {
      route: '/Recruitment/JobAdvertisementCreate',
    },
    JobAdvertisementEdit: {
      route: '/Recruitment/JobAdvertisementEdit',
    },
    JobApplicationPreview: {
      route: '/Recruitment/JobApplicationPreview',
    },
  },
  assessment: {
    AsCategory: { route: '/Assessment/AsCategory' },
    AsChoice: { route: '/Assessment/AsChoice' },
    AsTemplate: { route: '/Assessment/AsTemplate' },
    AsTemplateCreate: { route: '/Assessment/AsTemplateCreate' },
    AsTemplateEdit: { route: '/Assessment/AsTemplateEdit' },
    Competencies: { route: '/Assessment/Competencies' },
    CompetenciesCreate: {
      route: '/Assessment/CompetenciesCreate',
    },
    CompetenciesEdit: { route: '/Assessment/CompetenciesEdit' },
    EmployeeAssessment: {
      route: '/Assessment/EmployeeAssessment',
    },
    AllJobKpi: { route: '/Assessment/AllJobKpi' },
    StaffJobKPI: { route: '/Assessment/StaffJobKPI' },
    JobDescriptions: { route: '/Assessment/JobDescriptions' },
    IndividualDevelopmentPlan: {
      route: '/Assessment/IndividualDevelopmentPlan',
    },
    IndividualDevelopmentPlanCreate: {
      route: '/Assessment/IndividualDevelopmentPlanCreate',
    },
    IndividualDevelopmentPlanEdit: {
      route: '/Assessment/IndividualDevelopmentPlanEdit',
    },
    CareerDevPlan: { route: '/Assessment/CareerDevPlan' },
    CareerDevPlanCreate: {
      route: '/Assessment/CareerDevPlanCreate',
    },
    CareerDevPlanEdit: {
      route: '/Assessment/CareerDevPlanEdit',
    },
    UploadAssessmentGuidelines: {
      route: '/Assessment/UploadAssessmentGuidelines',
    },
    AssessmentGuidelines: {
      route: '/Assessment/AssessmentGuidelines',
    },
    MonthOpenCloseAss: {
      route: '/Assessment/MonthOpenCloseAss',
    },
    AssessmentReview: { route: '/Assessment/AssessmentReview' },
    AssessmentReviewEdit: {
      route: '/Assessment/AssessmentReviewEdit',
    },
    AssessmentReport: { route: '/Assessment/AssessmentReport' },
    PeerAppraisalSetting: {
      route: '/Assessment/PeerAppraisalSetting',
    },
    PeerAppraisalList: {
      route: '/Assessment/PeerAppraisalList',
    },
    EmployeePeerAppraisal: {
      route: '/Assessment/EmployeePeerAppraisal',
    },
    PeerAppraisalReport: {
      route: '/Assessment/PeerAppraisalReport',
    },
  },
  smartObjective: {
    ObjectiveReport: {
      route: '/SmartObjective/ObjectiveReport',
    },
    EmployeeObjective: {
      route: '/SmartObjective/EmployeeObjective',
    },
    EmployeeObjectiveCreate: {
      route: '/SmartObjective/EmployeeObjectiveCreate',
    },
    EmployeeObjectiveEdit: {
      route: '/SmartObjective/EmployeeObjectiveEdit',
    },
  },
  kpi: {
    Upload_KPI_Data: { route: '/KPI/Upload_KPI_Data' },
    KpiData: { route: '/KPI/KpiData' },
    KPILOBReport: { route: '/KPI/KPILOBReport' },
    KPISupervisorReport: { route: '/KPI/KPISupervisorReport' },
  },
  survey: {
    SurveyQuestionGroup: {
      route: '/Survey/SurveyQuestionGroup',
    },
    SurveyChoiceGroup: { route: '/Survey/SurveyChoiceGroup' },
    SurveyChoiceGroupCreate: {
      route: '/Survey/SurveyChoiceGroupCreate',
    },
    SurveyChoiceGroupEdit: {
      route: '/Survey/SurveyChoiceGroupEdit',
    },
    SurveyTemplate: { route: '/Survey/SurveyTemplate' },
    SurveyTemplateCreate: {
      route: '/Survey/SurveyTemplateCreate',
    },
    SurveyTemplateEdit: { route: '/Survey/SurveyTemplateEdit' },
    Survey: { route: '/Survey/Survey' },
    EmployeeSurvey: { route: '/Survey/EmployeeSurvey' },
    SurveySummaryReview: {
      route: '/Survey/Surveysummary/Review',
    },
    SurveySummary: { route: '/Survey/Surveysummary' },
    SurveyHistoryReport: {
      route: '/Survey/SurveyHistoryReport',
    },
    SurveyFollowReport: {
      route: '/Survey/SurveyStatisticReport',
    },
  },
  training: {
    TrFunctionsList: { route: '/Training/TrFunctionsList' },
    FunctionApproval: { route: '/Training/FunctionApproval' },
    TrainingApproval: { route: '/Training/TrainingApproval' },
    TrFunctionsListCreate: {
      route: '/Training/TrFunctionsListCreate',
    },
    TrFunctionsListEdit: {
      route: '/Training/TrFunctionsListEdit',
    },
    EmployeeFunctions: { route: '/Training/EmployeeFunctions' },
    FunctionsRequest: { route: '/Training/FunctionsRequest' },
    FunctionsData: { route: '/Training/FunctionsData' },
    QualificationCheck: {
      route: '/Training/QualificationCheck',
    },
    TrTrainingTrxList: { route: '/Training/TrTrainingTrxList' },
    TrTrainingTrxListCreate: {
      route: '/Training/TrTrainingTrxListCreate',
    },
    TrTrainingTrxListEdit: {
      route: '/Training/TrTrainingTrxListEdit',
    },
    TrainingRequestList: {
      route: '/Training/TrainingRequestList',
    },
    TrainingRequestListCreate: {
      route: '/Training/TrainingRequestListCreate',
    },
    TrainingRequestListEdit: {
      route: '/Training/TrainingRequestListEdit',
    },
    EmployeeAttendance: {
      route: '/Training/EmployeeAttendance',
    },
    TrainingCalender: { route: '/Training/TrainingCalender' },
    EvaluateEmployee: { route: '/Training/EvaluateEmployee' },
    EvaluateTraining: { route: '/Training/EvaluateTraining' },
    TestTemplate: { route: '/Training/TestTemplate' },
    TestTemplateCreate: {
      route: '/Training/TestTemplateCreate',
    },
    TestTemplateEdit: { route: '/Training/TestTemplateEdit' },
    Test: { route: '/Training/Test' },
    ReviewTest: { route: '/Training/ReviewTest' },
    EmployeeTrainingReport: {
      route: '/Training/EmployeeTrainingReport',
    },
    TrainingAttendance: {
      route: '/Training/TrainingAttendance',
    },
  },
  projectManagement: {
    Customer: { route: '/ProjectManagment/Customer' },
    CustomerCreate: {
      route: '/ProjectManagment/CustomerCreate',
    },
    CustomerEdit: { route: '/ProjectManagment/CustomerEdit' },
    Contract: { route: '/ProjectManagment/Contract' },
    ContractCreate: {
      route: '/ProjectManagment/ContractCreate',
    },
    ContractEdit: { route: '/ProjectManagment/ContractEdit' },
    Stage: { route: '/ProjectManagment/Stage' },
    StageCreate: { route: '/ProjectManagment/StageCreate' },
    StageEdit: { route: '/ProjectManagment/StageEdit' },
    TimeSheet: { route: '/ProjectManagment/TimeSheet' },
    TimeSheetCreate: {
      route: '/ProjectManagment/TimeSheetCreate',
    },
    TimeSheetEdit: { route: '/ProjectManagment/TimeSheetEdit' },
    Project: { route: '/ProjectManagment/Project' },
    ProjectCreate: { route: '/ProjectManagment/ProjectCreate' },
    ProjectEdit: { route: '/ProjectManagment/ProjectEdit' },
  },
  // hrNotifications: {
  //   hrNotifications: { route: '/hrNotifications' },
  // },
  auth: {
    Login: {
      route: '/login',
    },
    Register: {
      route: '/register',
    },
    ResetPassword: {
      route: '/reset-password',
    },
    ForgotPassword: {
      route: '/ForgotPassword',
    },
    LoginFullstack: {
      route: '/login-firebase',
    },
    RegisterFullstack: {
      route: '/register-firebase',
    },
    ResetPasswordFullstack: {
      route: '/reset-password-firebase',
    },
    LockScreen: {
      route: '/lock-screen',
    },
  },
  global: {
    Profile: {
      route: '/user-profile',
    },
    NotFound: {
      route: '/not-found',
    },
    Error: {
      route: '/error',
    },
    Section: {
      route: '/Payroll/Section',
    },
    ManagementDashboard: {
      route: '/ManagementDashboard',
    },
    EmployeeDashboard: {
      route: '/EmployeeDashboard',
    },
    AdminDashboard: {
      route: '/',
    },
    NewsDetails: {
      route: '/NewsDetails',
    },
  },
};

export default SITEMAP;
export { DOMAIN_NAME };
