const DOMAIN_NAME = '/Novahr';

const SITEMAP = {
  payroll: {
    Section: { route: `${DOMAIN_NAME}/Payroll/Section` },
    LoanSetting: { route: `${DOMAIN_NAME}/Payroll/LoanSetting` },
    PayTemplate: { route: `${DOMAIN_NAME}/Payroll/PayTemplate` },
    PayTemplateCreate: { route: `${DOMAIN_NAME}/Payroll/PayTemplateCreate` },
    PayTemplateEdit: { route: `${DOMAIN_NAME}/Payroll/PayTemplateEdit` },
    ElementTaxIns: { route: `${DOMAIN_NAME}/Payroll/ElementTaxIns` },
    SalaryStructure: { route: `${DOMAIN_NAME}/Payroll/SalaryStructure` },
    SalaryStructureCreate: {
      route: `${DOMAIN_NAME}/Payroll/SalaryStructureCreate`,
    },
    SalaryStructureEdit: {
      route: `${DOMAIN_NAME}/Payroll/SalaryStructureEdit`,
    },
    Elements: { route: `${DOMAIN_NAME}/Payroll/Elements` },
    ElementsCreate: { route: `${DOMAIN_NAME}/Payroll/ElementsCreate` },
    ElementsEdit: { route: `${DOMAIN_NAME}/Payroll/ElementsEdit` },
    ElementVal: { route: `${DOMAIN_NAME}/Payroll/ElementVal` },
    ElementValHistory: { route: `${DOMAIN_NAME}/Payroll/ElementValHistory` },
    ElementValCreate: { route: `${DOMAIN_NAME}/Payroll/ElementValCreate` },
    ElementValEdit: { route: `${DOMAIN_NAME}/Payroll/ElementValEdit` },
    ElementVlaImport: { route: `${DOMAIN_NAME}/Payroll/ElementVlaImport` },
    LoanTrx: { route: `${DOMAIN_NAME}/Payroll/LoanTrx` },
    LoanTrxCreate: { route: `${DOMAIN_NAME}/Payroll/LoanTrxCreate` },
    LoanTrxEdit: { route: `${DOMAIN_NAME}/Payroll/LoanTrxEdit` },
    LoanPostpone: { route: `${DOMAIN_NAME}/Payroll/LoanPostpone` },
    LoanReq: { route: `${DOMAIN_NAME}/Payroll/LoanReq` },
    LoanReqCreate: { route: `${DOMAIN_NAME}/Payroll/LoanReqCreate` },
    LoanReqEdit: { route: `${DOMAIN_NAME}/Payroll/LoanReqEdit` },
    PurchaseTrx: { route: `${DOMAIN_NAME}/Payroll/PurchaseTrx` },
    PurchaseTrxCreate: { route: `${DOMAIN_NAME}/Payroll/PurchaseTrxCreate` },
    PurchaseTrxEdit: { route: `${DOMAIN_NAME}/Payroll/PurchaseTrxEdit` },
    BranchSalarySetting: {
      route: `${DOMAIN_NAME}/Payroll/BranchSalarySetting`,
    },
    SalaryCalculation: { route: `${DOMAIN_NAME}/Payroll/SalaryCalculation` },
    SummaryPayslip: { route: `${DOMAIN_NAME}/Payroll/SummaryPayslip` },
    ElementReviewReport: {
      route: `${DOMAIN_NAME}/Payroll/ElementReviewReport`,
    },
    SalaryComparisonReport: {
      route: `${DOMAIN_NAME}/Payroll/SalaryComparisonReport`,
    },
    PaymentSlipReview: { route: `${DOMAIN_NAME}/Payroll/PaymentSlip/Review` },
    PaymentSlip: { route: `${DOMAIN_NAME}/Payroll/PaymentSlip` },
    MonthlyVariablesReport: {
      route: `${DOMAIN_NAME}/Payroll/MonthlyVariablesReport`,
    },
    DetailedPayrollReport: {
      route: `${DOMAIN_NAME}/Payroll/DetailedPayrollReport`,
    },
    LoanApproval: { route: `${DOMAIN_NAME}/Payroll/LoanApproval` },
    BankList: { route: `${DOMAIN_NAME}/Payroll/BankList` },
    AnnualTaxReport: { route: `${DOMAIN_NAME}/Payroll/AnnualTaxReport` },
    PaymentSlipTotalReview: {
      route: `${DOMAIN_NAME}/Payroll/PaymentSlipTotal/Review`,
    },
    PaymentSlipTotal: { route: `${DOMAIN_NAME}/Payroll/PaymentSlipTotal` },
    SalaryReport: { route: `${DOMAIN_NAME}/Payroll/SalaryReport` },
    FollowEmployeeReport: {
      route: `${DOMAIN_NAME}/Payroll/FollowEmployeeReport`,
    },
    TaxReportReport: { route: `${DOMAIN_NAME}/Payroll/TaxReportReport` },
    TotalDeptSalaryReport: {
      route: `${DOMAIN_NAME}/Payroll/TotalDeptSalaryReport`,
    },
    SalaryYearReport: { route: `${DOMAIN_NAME}/Payroll/SalaryYearReport` },
    SalarySigningListReport: {
      route: `${DOMAIN_NAME}/Payroll/SalarySigningListReport`,
    },
    LoanReport: { route: `${DOMAIN_NAME}/Payroll/LoanReport` },
  },
  mainData: {
    Government: {
      route: `${DOMAIN_NAME}/MainData/Government`,
    },
    City: {
      route: `${DOMAIN_NAME}/MainData/City`,
    },
    MdDocumentCategory: {
      route: `${DOMAIN_NAME}/MainData/MdDocumentCategory`,
    },
    CompanyDocument: {
      route: `${DOMAIN_NAME}/MainData/CompanyDocument`,
    },
    CompanyDocumentCreate: {
      route: `${DOMAIN_NAME}/MainData/CompanyDocumentCreate`,
    },
    CompanyDocumentEdit: {
      route: `${DOMAIN_NAME}/MainData/CompanyDocumentEdit`,
    },
    Currency: {
      route: `${DOMAIN_NAME}/MainData/Currency`,
    },
    CurrencyRate: {
      route: `${DOMAIN_NAME}/MainData/Currency-Rate`,
    },
    Documents: {
      route: `${DOMAIN_NAME}/MainData/Documents`,
    },
    Gender: {
      route: `${DOMAIN_NAME}/MainData/Gender`,
    },
    BusinessUnit: {
      route: `${DOMAIN_NAME}/MainData/BusinessUnit`,
    },
    Grade: {
      route: `${DOMAIN_NAME}/MainData/Grade`,
    },
    JobLevel: {
      route: `${DOMAIN_NAME}/MainData/Job-Level`,
    },
    JobNatures: {
      route: `${DOMAIN_NAME}/MainData/Job-Natures`,
    },
    Job: {
      route: `${DOMAIN_NAME}/MainData/job`,
    },
    JobTypes: {
      route: `${DOMAIN_NAME}/MainData/Job-Types`,
    },
    KinshipLink: {
      route: `${DOMAIN_NAME}/MainData/Kinship-Link`,
    },
    Month: {
      route: `${DOMAIN_NAME}/MainData/Month`,
    },
    Year: {
      route: `${DOMAIN_NAME}/MainData/Year`,
    },
    Nationalities: {
      route: `${DOMAIN_NAME}/MainData/Nationalities`,
    },
    Qualifications: {
      route: `${DOMAIN_NAME}/MainData/Qualifications`,
    },
    Religions: {
      route: `${DOMAIN_NAME}/MainData/Religions`,
    },
    Salute: {
      route: `${DOMAIN_NAME}/MainData/Salute`,
    },
    LicenseGrade: {
      route: `${DOMAIN_NAME}/MainData/License-Grade`,
    },
    MilitaryStatus: {
      route: `${DOMAIN_NAME}/MainData/Military-Status`,
    },
    SocialStatus: {
      route: `${DOMAIN_NAME}/MainData/Social-Status`,
    },
    IdentityType: {
      route: `${DOMAIN_NAME}/MainData/Identity-Type`,
    },
    Bank: {
      route: `${DOMAIN_NAME}/MainData/Bank`,
    },
    ContractType: {
      route: `${DOMAIN_NAME}/MainData/Contract-Type`,
    },
    Company: {
      route: `${DOMAIN_NAME}/MainData/Company`,
    },
    CompanyChart: {
      route: `${DOMAIN_NAME}/MainData/CompanyChart`,
    },
    EmployeeChart: {
      route: `${DOMAIN_NAME}/MainData/EmployeeChart`,
    },
    JobCreate: {
      route: `${DOMAIN_NAME}/MainData/JobCreate`,
    },
    JobEdit: {
      route: `${DOMAIN_NAME}/MainData/JobEdit`,
    },
    Organization: {
      route: `${DOMAIN_NAME}/MainData/Organization`,
    },
    OrganizationCreate: {
      route: `${DOMAIN_NAME}/MainData/OrganizationCreate`,
    },
    OrganizationEdit: {
      route: `${DOMAIN_NAME}/MainData/OrganizationEdit`,
    },
    UploadEmployeeData: {
      route: `${DOMAIN_NAME}/MainData/UploadEmployeeData`,
    },
    Guarantor: {
      route: `${DOMAIN_NAME}/MainData/Guarantor`,
    },
    GuarantorCreate: {
      route: `${DOMAIN_NAME}/MainData/GuarantorCreate`,
    },
    GuarantorEdit: {
      route: `${DOMAIN_NAME}/MainData/GuarantorEdit`,
    },
  },
  setting: {
    ChangePassword: {
      route: `${DOMAIN_NAME}/Setting/ChangePassword`,
    },
    UserMenu: {
      route: `${DOMAIN_NAME}/Setting/UserMenu`,
    },
    MailSetting: {
      route: `${DOMAIN_NAME}/Setting/MailSetting`,
    },
    SMSSetting: {
      route: `${DOMAIN_NAME}/Setting/SMSSetting`,
    },
    SettingMailSmsForm: {
      route: `${DOMAIN_NAME}/Setting/SettingMailSmsForm`,
    },
    OpenCloseMonth: {
      route: `${DOMAIN_NAME}/Setting/OpenCloseMonth`,
    },
    HrPermission: {
      route: `${DOMAIN_NAME}/Setting/HrPermission`,
    },
    PrintForm: {
      route: `${DOMAIN_NAME}/Setting/PrintForm`,
    },
    SettingMailSmsFormCreate: {
      route: `${DOMAIN_NAME}/Setting/SettingMailSmsFormCreate`,
    },
    SettingMailSmsFormEdit: {
      route: `${DOMAIN_NAME}/Setting/SettingMailSmsFormEdit`,
    },
    CertificateSetting: {
      route: `${DOMAIN_NAME}/Setting/CertificateSetting`,
    },
    ResetPassword: {
      route: `${DOMAIN_NAME}/Setting/ResetPassword`,
    },
    LogReport: {
      route: `${DOMAIN_NAME}/Setting/LogReport`,
    },
  },
  humanResources: {
    ResignReason: { route: `${DOMAIN_NAME}/HR/ResignReason` },
    CourseType: { route: `${DOMAIN_NAME}/HR/CourseType` },
    CourseList: { route: `${DOMAIN_NAME}/HR/CourseList` },
    CourseListCreate: { route: `${DOMAIN_NAME}/HR/CourseListCreate` },
    CourseListEdit: { route: `${DOMAIN_NAME}/HR/CourseListEdit` },
    TrainingCenterList: { route: `${DOMAIN_NAME}/HR/TrainingCenterList` },
    TrainingCenterListCreate: {
      route: `${DOMAIN_NAME}/HR/TrainingCenterListCreate`,
    },
    TrainingCenterListEdit: {
      route: `${DOMAIN_NAME}/HR/TrainingCenterListEdit`,
    },
    Rewards: { route: `${DOMAIN_NAME}/HR/Rewards` },
    Penalty: { route: `${DOMAIN_NAME}/HR/Penalty` },
    PenaltyCreate: { route: `${DOMAIN_NAME}/HR/PenaltyCreate` },
    PenaltyEdit: { route: `${DOMAIN_NAME}/HR/PenaltyEdit` },
    RewardTrans: { route: `${DOMAIN_NAME}/HR/RewardTrans` },
    RewardTransCreate: { route: `${DOMAIN_NAME}/HR/RewardTransCreate` },
    RewardTransEdit: { route: `${DOMAIN_NAME}/HR/RewardTransEdit` },
    PenaltyTrans: { route: `${DOMAIN_NAME}/HR/PenaltyTrans` },
    PenaltyTransCreate: { route: `${DOMAIN_NAME}/HR/PenaltyTransCreate` },
    PenaltyTransEdit: { route: `${DOMAIN_NAME}/HR/PenaltyTransEdit` },
    Attention: { route: `${DOMAIN_NAME}/HR/Attention` },
    AttentionCreate: { route: `${DOMAIN_NAME}/HR/AttentionCreate` },
    AttentionEdit: { route: `${DOMAIN_NAME}/HR/AttentionEdit` },
    LayOffNoticeList: { route: `${DOMAIN_NAME}/HR/LayOffNoticeList` },
    LayOffNotice: { route: `${DOMAIN_NAME}/HR/LayOffNotice` },
    LayOffNoticeCreate: { route: `${DOMAIN_NAME}/HR/LayOffNoticeCreate` },
    LayOffNoticeEdit: { route: `${DOMAIN_NAME}/HR/LayOffNoticeEdit` },
    Promotions: { route: `${DOMAIN_NAME}/HR/Promotions` },
    PromotionsCreate: { route: `${DOMAIN_NAME}/HR/PromotionsCreate` },
    PromotionsEdit: { route: `${DOMAIN_NAME}/HR/PromotionsEdit` },
    DirectManager: { route: `${DOMAIN_NAME}/HR/DirectManager` },
    Explanation: { route: `${DOMAIN_NAME}/HR/Explanation` },
    ExplanationEdit: { route: `${DOMAIN_NAME}/HR/ExplanationEdit` },
    OrganizationManger: { route: `${DOMAIN_NAME}/HR/OrganizationManger` },
    News: { route: `${DOMAIN_NAME}/HR/News` },
    NewsCreate: { route: `${DOMAIN_NAME}/HR/NewsCreate` },
    NewsEdit: { route: `${DOMAIN_NAME}/HR/NewsEdit` },
    PromotionsReport: { route: `${DOMAIN_NAME}/HR/PromotionsReport` },
    ExplanationReport: { route: `${DOMAIN_NAME}/HR/ExplanationReport` },
    ResignationReport: { route: `${DOMAIN_NAME}/HR/ResignationReport` },
    CustodyCategory: { route: `${DOMAIN_NAME}/HR/CustodyCategory` },
    Custody: { route: `${DOMAIN_NAME}/HR/Custody` },
    CustodyDelivery: { route: `${DOMAIN_NAME}/HR/CustodyDelivery` },
    CustodyDeliveryCreate: {
      route: `${DOMAIN_NAME}/HR/CustodyDeliveryCreate`,
    },
    CustodyDeliveryEdit: { route: `${DOMAIN_NAME}/HR/CustodyDeliveryEdit` },
    CustodyReceive: { route: `${DOMAIN_NAME}/HR/CustodyReceive` },
    CustodyReceiveCreate: { route: `${DOMAIN_NAME}/HR/CustodyReceiveCreate` },
    CustodyReceiveEdit: { route: `${DOMAIN_NAME}/HR/CustodyReceiveEdit` },
    CustodyDeliveryReport: {
      route: `${DOMAIN_NAME}/HR/CustodyDeliveryReport`,
    },
    CustodyReceiveReport: { route: `${DOMAIN_NAME}/HR/CustodyReceiveReport` },
    Uniform: { route: `${DOMAIN_NAME}/HR/Uniform` },
    UniformDelivery: { route: `${DOMAIN_NAME}/HR/UniformDelivery` },
    UniformDeliveryCreate: {
      route: `${DOMAIN_NAME}/HR/UniformDeliveryCreate`,
    },
    UniformDeliveryEdit: { route: `${DOMAIN_NAME}/HR/UniformDeliveryEdit` },
    UniformReceive: { route: `${DOMAIN_NAME}/HR/UniformReceive` },
    UniformReceiveCreate: { route: `${DOMAIN_NAME}/HR/UniformReceiveCreate` },
    UniformReceiveEdit: { route: `${DOMAIN_NAME}/HR/UniformReceiveEdit` },
    UniformDeliveryReport: {
      route: `${DOMAIN_NAME}/HR/UniformDeliveryReport`,
    },
    UniformReceiveReport: { route: `${DOMAIN_NAME}/HR/UniformReceiveReport` },
    ResignTrx: { route: `${DOMAIN_NAME}/HR/ResignTrx` },
    ResignTrxCreate: { route: `${DOMAIN_NAME}/HR/ResignTrxCreate` },
    ResignTrxEdit: { route: `${DOMAIN_NAME}/HR/ResignTrxEdit` },
    ResignTrxReport: { route: `${DOMAIN_NAME}/HR/ResignTrxReport` },
    ManPowerSetting: { route: `${DOMAIN_NAME}/HR/ManPowerSetting` },
    ResignTrxImport: { route: `${DOMAIN_NAME}/HR/ResignTrxImport` },
    EmpCourse: { route: `${DOMAIN_NAME}/HR/EmpCourse` },
    EmpCourseCreate: { route: `${DOMAIN_NAME}/HR/EmpCourseCreate` },
    EmpCourseEdit: { route: `${DOMAIN_NAME}/HR/EmpCourseEdit` },
    EmpCourseReport: { route: `${DOMAIN_NAME}/HR/EmpCourseReport` },
    RewardTransReport: { route: `${DOMAIN_NAME}/HR/RewardTransReport` },
    PenaltyTransReport: { route: `${DOMAIN_NAME}/HR/PenaltyTransReport` },
    AttentionReport: { route: `${DOMAIN_NAME}/HR/AttentionReport` },
    LayOffNoticeReport: { route: `${DOMAIN_NAME}/HR/LayOffNoticeReport` },
    Items: { route: `${DOMAIN_NAME}/HR/Items` },
    ResignReqTrxCreate: { route: `${DOMAIN_NAME}/HR/ResignReqTrxCreate` },
    ResignReqTrxEdit: { route: `${DOMAIN_NAME}/HR/ResignReqTrxEdit` },
    ResignReqTrx: { route: `${DOMAIN_NAME}/HR/ResignReqTrx` },
    HrEmployeeDocumentTrxCreate: {
      route: `${DOMAIN_NAME}/HR/HrEmployeeDocumentTrxCreate`,
    },
    HrEmployeeDocumentTrxEdit: {
      route: `${DOMAIN_NAME}/HR/HrEmployeeDocumentTrxEdit`,
    },
    HrEmployeeDocumentTrx: {
      route: `${DOMAIN_NAME}/HR/HrEmployeeDocumentTrx`,
    },
    ManPowerReport: { route: `${DOMAIN_NAME}/HR/ManPowerReport` },
    EmpInvestigation: { route: `${DOMAIN_NAME}/HR/EmpInvestigation` },
    EmpInvestigationCreate: {
      route: `${DOMAIN_NAME}/HR/EmpInvestigationCreate`,
    },
    EmpInvestigationEdit: { route: `${DOMAIN_NAME}/HR/EmpInvestigationEdit` },
    TransferRequest: { route: `${DOMAIN_NAME}/HR/TransferRequest` },
    TransferRequestCreate: {
      route: `${DOMAIN_NAME}/HR/TransferRequestCreate`,
    },
    TransferRequestEdit: { route: `${DOMAIN_NAME}/HR/TransferRequestEdit` },
    PenaltyApproval: { route: `${DOMAIN_NAME}/HR/PenaltyApproval` },
    RewardsApproval: { route: `${DOMAIN_NAME}/HR/RewardsApproval` },
    UniformApproval: { route: `${DOMAIN_NAME}/HR/UniformApproval` },
    CustodyApproval: { route: `${DOMAIN_NAME}/HR/CustodyApproval` },
    ResignApproval: { route: `${DOMAIN_NAME}/HR/ResignApproval` },
    DocumentApproval: { route: `${DOMAIN_NAME}/HR/DocumentApproval` },
    TransferRequestApproval: {
      route: `${DOMAIN_NAME}/HR/TransferRequestApproval`,
    },
  },
  exp: {
    Complaint: { route: `${DOMAIN_NAME}/EXP/Complaint` },
    HrLetter: { route: `${DOMAIN_NAME}/EXP/HrLetter` },
    NewIdea: { route: `${DOMAIN_NAME}/EXP/NewIdea` },
  },
  attendance: {
    PermissionTrx: { route: `${DOMAIN_NAME}/Att/PermissionTrx` },
    PermissionApproval: { route: `${DOMAIN_NAME}/Att/PermissionApproval` },
    OvertimeApproval: { route: `${DOMAIN_NAME}/Att/OvertimeApproval` },
    ShiftSwapApproval: { route: `${DOMAIN_NAME}/Att/ShiftSwapApproval` },
    ForgotFingerprintApproval: {
      route: `${DOMAIN_NAME}/Att/ForgotFingerprintApproval`,
    },
    PermissionTrxCreate: { route: `${DOMAIN_NAME}/Att/PermissionTrxCreate` },
    PermissionTrxEdit: { route: `${DOMAIN_NAME}/Att/PermissionTrxEdit` },
    PermissionTrxReport: { route: `${DOMAIN_NAME}/Att/PermissionTrxReport` },
    MissionTransportaion: { route: `${DOMAIN_NAME}/Att/MissionTransportaion` },
    Permission: { route: `${DOMAIN_NAME}/Att/Permission` },
    PermissionCreate: { route: `${DOMAIN_NAME}/Att/PermissionCreate` },
    PermissionEdit: { route: `${DOMAIN_NAME}/Att/PermissionEdit` },
    PermissionTrxImport: { route: `${DOMAIN_NAME}/Att/PermissionTrxImport` },
    CollectedPermission: { route: `${DOMAIN_NAME}/Att/CollectedPermission` },
    MissionType: { route: `${DOMAIN_NAME}/Att/MissionType` },
    MissionTypeCreate: { route: `${DOMAIN_NAME}/Att/MissionTypeCreate` },
    MissionTypeEdit: { route: `${DOMAIN_NAME}/Att/MissionTypeEdit` },
    Shift: { route: `${DOMAIN_NAME}/Att/Shift` },
    ShiftManPower: { route: `${DOMAIN_NAME}/Att/ShiftManPower` },
    ShiftCreate: { route: `${DOMAIN_NAME}/Att/ShiftCreate` },
    ShiftEdit: { route: `${DOMAIN_NAME}/Att/ShiftEdit` },
    SwapShiftTrx: { route: `${DOMAIN_NAME}/Att/SwapShiftTrx` },
    SwapShiftTrxCreate: { route: `${DOMAIN_NAME}/Att/SwapShiftTrxCreate` },
    ShiftEmployee: { route: `${DOMAIN_NAME}/Att/ShiftEmployee` },
    ShiftEmployeeCreate: { route: `${DOMAIN_NAME}/Att/ShiftEmployeeCreate` },
    ShiftEmployeeEdit: { route: `${DOMAIN_NAME}/Att/ShiftEmployeeEdit` },
    ShiftOrgnization: { route: `${DOMAIN_NAME}/Att/ShiftOrgnization` },
    ShiftTransfere: { route: `${DOMAIN_NAME}/Att/ShiftTransfere` },
    ShiftReview: { route: `${DOMAIN_NAME}/Att/ShiftReview` },
    ShiftImport: { route: `${DOMAIN_NAME}/Att/ShiftImport` },
    MissionTrx: { route: `${DOMAIN_NAME}/Att/MissionTrx` },
    MissionApproval: { route: `${DOMAIN_NAME}/Att/MissionApproval` },
    MissionTrxCreate: { route: `${DOMAIN_NAME}/Att/MissionTrxCreate` },
    MissionTrxEdit: { route: `${DOMAIN_NAME}/Att/MissionTrxEdit` },
    MissionTrxReport: { route: `${DOMAIN_NAME}/Att/MissionTrxReport` },
    MissionTrxImport: { route: `${DOMAIN_NAME}/Att/MissionTrxImport` },
    CollectedMission: { route: `${DOMAIN_NAME}/Att/CollectedMission` },
    Rules: { route: `${DOMAIN_NAME}/Att/Rules` },
    RulesCreate: { route: `${DOMAIN_NAME}/Att/RulesCreate` },
    RulesEdit: { route: `${DOMAIN_NAME}/Att/RulesEdit` },
    Device: { route: `${DOMAIN_NAME}/Att/Device` },
    DeviceCreate: { route: `${DOMAIN_NAME}/Att/DeviceCreate` },
    DeviceEdit: { route: `${DOMAIN_NAME}/Att/DeviceEdit` },
    MissionReport: { route: `${DOMAIN_NAME}/Att/MissionReport` },
    EmployeeShiftReport: { route: `${DOMAIN_NAME}/Att/EmployeeShiftReport` },
    DetailedReportAbsences: {
      route: `${DOMAIN_NAME}/Att/DetailedReportAbsences`,
    },
    EmployeesWithoutShiftsReport: {
      route: `${DOMAIN_NAME}/Att/EmployeesWithoutShiftsReport`,
    },
    OverTimeDetailsReport: {
      route: `${DOMAIN_NAME}/Att/OverTimeDetailsReport`,
    },
    AbsenceReport: { route: `${DOMAIN_NAME}/Att/AbsenceReport` },
    EarlyAttendanceReport: {
      route: `${DOMAIN_NAME}/Att/EarlyAttendanceReport`,
    },
    ReviewOvertime: { route: `${DOMAIN_NAME}/Att/ReviewOvertime` },
    RemoveEmployeeSign: { route: `${DOMAIN_NAME}/Att/RemoveEmployeeSign` },
    EmployeeAttendance: { route: `${DOMAIN_NAME}/Att/EmployeeAttendance` },
    EmployeeLocation: { route: `${DOMAIN_NAME}/Att/EmployeeLocation` },
    DataFromAllDevices: { route: `${DOMAIN_NAME}/Att/DataFromAllDevices` },
    GetAttLog: { route: `${DOMAIN_NAME}/Att/GetAttLog` },
    OvertimeHoursRequest: { route: `${DOMAIN_NAME}/Att/OvertimeHoursRequest` },
    OvertimeHoursRequestCreate: {
      route: `${DOMAIN_NAME}/Att/OvertimeHoursRequestCreate`,
    },
    OvertimeHoursRequestEdit: {
      route: `${DOMAIN_NAME}/Att/OvertimeHoursRequestEdit`,
    },
    EarlyLeavingReport: { route: `${DOMAIN_NAME}/Att/EarlyLeavingReport` },
    EmployeeLessTimeReport: {
      route: `${DOMAIN_NAME}/Att/EmployeeLessTimeReport`,
    },
    EmployeeAttendanceTemplate: {
      route: `${DOMAIN_NAME}/Att/EmployeeAttendanceTemplate`,
    },
    ManHoursReport: { route: `${DOMAIN_NAME}/Att/ManHoursReport` },
    AttendanceRatioReport: {
      route: `${DOMAIN_NAME}/Att/AttendanceRatioReport`,
    },
    MonthlyAttendanceReport: {
      route: `${DOMAIN_NAME}/Att/MonthlyAttendanceReport`,
    },
    AttendanceDeviceReport: {
      route: `${DOMAIN_NAME}/Att/AttendanceDeviceReport`,
    },
    ContinuousAbsenceReport: {
      route: `${DOMAIN_NAME}/Att/ContinuousAbsenceReport`,
    },
    RegisterInAndOutReport: {
      route: `${DOMAIN_NAME}/Att/RegisterInAndOutReport`,
    },
    ManualAttendanceReport: {
      route: `${DOMAIN_NAME}/Att/ManualAttendanceReport`,
    },
    GetBreakTimeReport: { route: `${DOMAIN_NAME}/Att/GetBreakTimeReport` },
    StatisticalReport2: { route: `${DOMAIN_NAME}/Att/StatisticalReport2` },
    WorkinHoursByTime: { route: `${DOMAIN_NAME}/Att/WorkinHoursByTime` },
    OverTimeReport: { route: `${DOMAIN_NAME}/Att/OverTimeReport` },
    WorkinLeavesDetailsReport: {
      route: `${DOMAIN_NAME}/Att/WorkinLeavesDetailsReport`,
    },
    OverTimeDayNightReport: {
      route: `${DOMAIN_NAME}/Att/OverTimeDayNightReport`,
    },
    WorkinLeavesReport: { route: `${DOMAIN_NAME}/Att/WorkinLeavesReport` },
    CalculateAttendance: { route: `${DOMAIN_NAME}/Att/CalculateAttendance` },
    LateAttendanceReport: { route: `${DOMAIN_NAME}/Att/LateAttendanceReport` },
    TimeTableDetailsReportReview: {
      route: `${DOMAIN_NAME}/Att/TimeTableDetailsReport/Review`,
    },
    TimeTableDetailsReport: {
      route: `${DOMAIN_NAME}/Att/TimeTableDetailsReport`,
    },
    MonthlyAttSummaryReport: {
      route: `${DOMAIN_NAME}/Att/MonthlyAttSummaryReport`,
    },
    ShiftManPowerReport: { route: `${DOMAIN_NAME}/Att/ShiftManPowerReport` },
    ForgotFingerprintRequest: {
      route: `${DOMAIN_NAME}/Att/ForgotFingerprintRequest`,
    },
    ForgotFingerprintRequestCreate: {
      route: `${DOMAIN_NAME}/Att/ForgotFingerprintRequestCreate`,
    },
    ForgotFingerprintRequestEdit: {
      route: `${DOMAIN_NAME}/Att/ForgotFingerprintRequestEdit`,
    },
    EmployeeSchedule: { route: `${DOMAIN_NAME}/Att/EmployeeSchedule` },
    MonthlyStatisticsReport: {
      route: `${DOMAIN_NAME}/Att/MonthlyStatisticsReport`,
    },
    AttLogReport: { route: `${DOMAIN_NAME}/Att/AttLogReport` },
    TimeAttendRatio: { route: `${DOMAIN_NAME}/Att/TimeAttendRatio` },
    RegisterLocation: { route: `${DOMAIN_NAME}/Att/RegisterLocation` },
    RegisterLocationCreate: {
      route: `${DOMAIN_NAME}/Att/RegisterLocationCreate`,
    },
    RegisterLocationEdit: { route: `${DOMAIN_NAME}/Att/RegisterLocationEdit` },
    GPSAttendance: { route: `${DOMAIN_NAME}/Att/GPSAttendance` },
    LocationAttendanceReport: {
      route: `${DOMAIN_NAME}/Att/LocationAttendanceReport`,
    },
    EmployeeLocationReport: {
      route: `${DOMAIN_NAME}/Att/EmployeeLocationReport`,
    },
  },
  workFlow: {
    WorkFlow: { route: `${DOMAIN_NAME}/WF/WorkFlow` },
    WorkFlowCreate: { route: `${DOMAIN_NAME}/WF/WorkFlowCreate` },
    WorkFlowEdit: { route: `${DOMAIN_NAME}/WF/WorkFlowEdit` },
    RequestsList: { route: `${DOMAIN_NAME}/WF/RequestsList` },
  },
  employee: {
    EmployeeList: { route: `${DOMAIN_NAME}/Employee/EmployeeList` },
    AdEmployeeImport: { route: `${DOMAIN_NAME}/Employee/AdEmployeeImport` },
    EmployeeData: { route: `${DOMAIN_NAME}/Employee/EmployeeData` },
    Personal: { route: `${DOMAIN_NAME}/Employee/Personal` },
    EmployeeAddress: { route: `${DOMAIN_NAME}/Employee/EmployeeAddress` },
    EmployeeCourse: { route: `${DOMAIN_NAME}/Employee/EmployeeCourse` },
    EmployeeExperince: { route: `${DOMAIN_NAME}/Employee/EmployeeExperince` },
    EmployeeInsurance: { route: `${DOMAIN_NAME}/Employee/EmployeeInsurance` },
    EmployeeBank: { route: `${DOMAIN_NAME}/Employee/EmployeeBank` },
    EmployeeQualification: {
      route: `${DOMAIN_NAME}/Employee/EmployeeQualification`,
    },
    EmployeeCar: { route: `${DOMAIN_NAME}/Employee/EmployeeCar` },
    EmployeeSalary: { route: `${DOMAIN_NAME}/Employee/EmployeeSalary` },
    EmployeeContactInfo: {
      route: `${DOMAIN_NAME}/Employee/EmployeeContactInfo`,
    },
    EmployeeContract: { route: `${DOMAIN_NAME}/Employee/EmployeeContract` },
    EmployeeContractKSA: {
      route: `${DOMAIN_NAME}/Employee/EmployeeContractKSA`,
    },
    NewEmployeeReport: { route: `${DOMAIN_NAME}/Employee/NewEmployeeReport` },
    EmployeeDocuments: { route: `${DOMAIN_NAME}/Employee/EmployeeDocuments` },
    EmployeeStatusReport: {
      route: `${DOMAIN_NAME}/Employee/EmployeeStatusReport`,
    },
    EmployeeDocumentsCreate: {
      route: `${DOMAIN_NAME}/Employee/EmployeeDocumentsCreate`,
    },
    EmployeeDocumentsEdit: {
      route: `${DOMAIN_NAME}/Employee/EmployeeDocumentsEdit`,
    },
    EmployeeDataReport: {
      route: `${DOMAIN_NAME}/Employee/EmployeeDataReport`,
    },
    followStaffContracts: {
      route: `${DOMAIN_NAME}/Employee/followStaffContracts`,
    },
    EmploymentDocsDetails: {
      route: `${DOMAIN_NAME}/Employee/EmploymentDocsDetails`,
    },
    ImportEmployeeData: {
      route: `${DOMAIN_NAME}/Employee/ImportEmployeeData`,
    },
    EmploymentDocs: { route: `${DOMAIN_NAME}/Employee/EmploymentDocs` },
    LocationLog: { route: `${DOMAIN_NAME}/Employee/LocationLog` },
  },
  vacation: {
    VacApproval: { route: `${DOMAIN_NAME}/vac/VacApproval` },
    VacationsTypesCreate: { route: `${DOMAIN_NAME}/vac/VacationsTypesCreate` },
    VacationsTypesEdit: { route: `${DOMAIN_NAME}/vac/VacationsTypesEdit` },
    VacationsTypes: { route: `${DOMAIN_NAME}/vac/VacationsTypes` },
    ExceptionVacDays: { route: `${DOMAIN_NAME}/vac/ExceptionVacDays` },
    OfficialVacationsCreate: {
      route: `${DOMAIN_NAME}/vac/OfficialVacationsCreate`,
    },
    OfficialVacationsEdit: {
      route: `${DOMAIN_NAME}/vac/OfficialVacationsEdit`,
    },
    OfficialVacations: { route: `${DOMAIN_NAME}/vac/OfficialVacations` },
    VacationTrxReport: { route: `${DOMAIN_NAME}/vac/VacationTrxReport` },
    OpeningLeaveBalancesReport: {
      route: `${DOMAIN_NAME}/vac/OpeningLeaveBalancesReport`,
    },
    BalanceUpdateLog: { route: `${DOMAIN_NAME}/vac/BalanceUpdateLog` },
    LeavesBalance: { route: `${DOMAIN_NAME}/vac/LeavesBalance` },
    LeaveReport: { route: `${DOMAIN_NAME}/vac/LeaveReport` },
    LeaveTrx: { route: `${DOMAIN_NAME}/vac/LeaveTrx` },
    LeaveTrxCreate: { route: `${DOMAIN_NAME}/vac/LeaveTrxCreate` },
    LeaveTrxEdit: { route: `${DOMAIN_NAME}/vac/LeaveTrxEdit` },
    GovernmentSickLeave: { route: `${DOMAIN_NAME}/vac/GovernmentSickLeave` },
    GovernmentSickLeaveCreate: {
      route: `${DOMAIN_NAME}/vac/GovernmentSickLeaveCreate`,
    },
    GovernmentSickLeaveEdit: {
      route: `${DOMAIN_NAME}/vac/GovernmentSickLeaveEdit`,
    },
    GovernmentSickLeaveSetting: {
      route: `${DOMAIN_NAME}/vac/GovernmentSickLeaveSetting`,
    },
    LeaveOpenBalance: { route: `${DOMAIN_NAME}/vac/LeaveOpenBalance` },
    ReplaceAnnualLeaveBalanceCreate: {
      route: `${DOMAIN_NAME}/vac/ReplaceAnnualLeaveBalanceCreate`,
    },
    ReplaceAnnualLeaveBalanceEdit: {
      route: `${DOMAIN_NAME}/vac/ReplaceAnnualLeaveBalanceEdit`,
    },
    ReplaceAnnualLeaveBalance: {
      route: `${DOMAIN_NAME}/vac/ReplaceAnnualLeaveBalance`,
    },
    OpeningClosingTheYearForLeaves: {
      route: `${DOMAIN_NAME}/vac/OpeningClosingTheYearForLeaves`,
    },
    ImportVacations: { route: `${DOMAIN_NAME}/vac/ImportVacations` },
    GroupLeaves: { route: `${DOMAIN_NAME}/vac/GroupLeaves` },
    ImportLeaveBalance: { route: `${DOMAIN_NAME}/vac/ImportLeaveBalance` },
  },
  socialInsurance: {
    InsuranceOffices: { route: `${DOMAIN_NAME}/insurance/InsuranceOffices` },
    SInsuranceJob: { route: `${DOMAIN_NAME}/insurance/SInsuranceJob` },
    InsuranceRegion: { route: `${DOMAIN_NAME}/insurance/InsuranceRegion` },
    SinsuranceCalculationTemplate: {
      route: `${DOMAIN_NAME}/insurance/SinsuranceCalculationTemplate`,
    },
    SInsuranceOrgnization: {
      route: `${DOMAIN_NAME}/insurance/SInsuranceOrgnization`,
    },
    SInsuranceOrgnizationCreate: {
      route: `${DOMAIN_NAME}/insurance/SInsuranceOrgnizationCreate`,
    },
    SInsuranceOrgnizationEdit: {
      route: `${DOMAIN_NAME}/insurance/SInsuranceOrgnizationEdit`,
    },
    SocialInsuranceData: {
      route: `${DOMAIN_NAME}/insurance/SocialInsuranceData`,
    },
    UpdateInsuranceSalary: {
      route: `${DOMAIN_NAME}/insurance/UpdateInsuranceSalary`,
    },
    StopInsuranceReport: {
      route: `${DOMAIN_NAME}/insurance/StopInsuranceReport`,
    },
    InsuranceFollow: { route: `${DOMAIN_NAME}/insurance/Insurancefollow` },
    StopInsurance: { route: `${DOMAIN_NAME}/insurance/StopInsurance` },
    StopInsuranceCreate: {
      route: `${DOMAIN_NAME}/insurance/StopInsuranceCreate`,
    },
    StopInsuranceEdit: { route: `${DOMAIN_NAME}/insurance/StopInsuranceEdit` },
    EmergencyBenefitList: {
      route: `${DOMAIN_NAME}/insurance/EmergencyBenefitList`,
    },
    InsuranceFormStatus: {
      route: `${DOMAIN_NAME}/insurance/InsuranceFormStatus`,
    },
    PositionOfGuaranteesAndContradictions: {
      route: `${DOMAIN_NAME}/insurance/PositionOfGuaranteesAndContradictions`,
    },
    SocialInsuranceReport: {
      route: `${DOMAIN_NAME}/insurance/SocialInsuranceReport`,
    },
    Form1Insurance: { route: `${DOMAIN_NAME}/insurance/Form1Insurance` },
    Form1InsuranceReview: {
      route: `${DOMAIN_NAME}/insurance/Form1Insurance/Review`,
    },
    Form2Insurance: { route: `${DOMAIN_NAME}/insurance/Form2Insurance` },
    Form6Insurance: { route: `${DOMAIN_NAME}/insurance/Form6Insurance` },
  },
  medicalInsurance: {
    MedicalInsuranceData: {
      route: `${DOMAIN_NAME}/Minsurance/MedicalInsuranceData`,
    },
    InsuranceCompanies: {
      route: `${DOMAIN_NAME}/Minsurance/InsuranceCompanies`,
    },
    MinsuranceCategory: {
      route: `${DOMAIN_NAME}/Minsurance/MinsuranceCategory`,
    },
    MinsuranceCenters: {
      route: `${DOMAIN_NAME}/Minsurance/MinsuranceCenters`,
    },
    staffMedicalInsuranceReport: {
      route: `${DOMAIN_NAME}/Minsurance/staffMedicalInsuranceReport`,
    },
    MinsuranceItem: { route: `${DOMAIN_NAME}/Minsurance/MinsuranceItem` },
    MedicalInsuranceReport: {
      route: `${DOMAIN_NAME}/Minsurance/MedicalInsuranceReport`,
    },
    MedicalInsuranceSubscription: {
      route: `${DOMAIN_NAME}/Minsurance/MedicalInsuranceSubscription`,
    },
    MedicalInsuranceSubscriptionCreate: {
      route: `${DOMAIN_NAME}/Minsurance/MedicalInsuranceSubscriptionCreate`,
    },
    MedicalInsuranceSubscriptionEdit: {
      route: `${DOMAIN_NAME}/Minsurance/MedicalInsuranceSubscriptionEdit`,
    },
    medicalInsSubscriptionReport: {
      route: `${DOMAIN_NAME}/Minsurance/medicalInsSubscriptionReport`,
    },
    medicalInsuranceListReport: {
      route: `${DOMAIN_NAME}/Minsurance/medicalInsuranceListReport`,
    },
    EmployeeMedicalBenefits: {
      route: `${DOMAIN_NAME}/Minsurance/EmployeeMedicalBenefits`,
    },
    EmployeeMedicalBenefitsCreate: {
      route: `${DOMAIN_NAME}/Minsurance/EmployeeMedicalBenefitsCreate`,
    },
    EmployeeMedicalBenefitsEdit: {
      route: `${DOMAIN_NAME}/Minsurance/EmployeeMedicalBenefitsEdit`,
    },
    StopMedicalInsurance: {
      route: `${DOMAIN_NAME}/Minsurance/StopMedicalInsurance`,
    },
    StopMedicalInsuranceCreate: {
      route: `${DOMAIN_NAME}/Minsurance/StopMedicalInsuranceCreate`,
    },
    StopMedicalInsuranceEdit: {
      route: `${DOMAIN_NAME}/Minsurance/StopMedicalInsuranceEdit`,
    },
  },
  recruitment: {
    JobAdvertisement: { route: `${DOMAIN_NAME}/Recruitment/JobAdvertisement` },
    JobRequirements: { route: `${DOMAIN_NAME}/Recruitment/JobRequirements` },
    RecHrTest: { route: `${DOMAIN_NAME}/Recruitment/RecHrTest` },
    RecHrTestCreate: { route: `${DOMAIN_NAME}/Recruitment/RecHrTestCreate` },
    RecHrTestEdit: { route: `${DOMAIN_NAME}/Recruitment/RecHrTestEdit` },
    RecEvaluation: { route: `${DOMAIN_NAME}/Recruitment/RecEvaluation` },
    RecEvaluationCreate: {
      route: `${DOMAIN_NAME}/Recruitment/RecEvaluationCreate`,
    },
    RecEvaluationEdit: {
      route: `${DOMAIN_NAME}/Recruitment/RecEvaluationEdit`,
    },
    RecHiringSource: { route: `${DOMAIN_NAME}/Recruitment/RecHiringSource` },
    RecJobGrade: { route: `${DOMAIN_NAME}/Recruitment/RecJobGrade` },
    Employment: { route: `${DOMAIN_NAME}/Recruitment/Employment` },
    JobDataBank: { route: `${DOMAIN_NAME}/Recruitment/JobDataBank` },
    JobApplicationStatus: {
      route: `${DOMAIN_NAME}/Recruitment/JobApplicationStatus`,
    },
    EmploymentRequest: {
      route: `${DOMAIN_NAME}/Recruitment/EmploymentRequest`,
    },
    EmploymentRequestCreate: {
      route: `${DOMAIN_NAME}/Recruitment/EmploymentRequestCreate`,
    },
    EmploymentRequestEdit: {
      route: `${DOMAIN_NAME}/Recruitment/EmploymentRequestEdit`,
    },
    ReviewEmploymentRequest: {
      route: `${DOMAIN_NAME}/Recruitment/ReviewEmploymentRequest`,
    },
    ReviewEmploymentRequestEdit: {
      route: `${DOMAIN_NAME}/Recruitment/ReviewEmploymentRequestEdit`,
    },
    HRApplicationEvaluation: {
      route: `${DOMAIN_NAME}/Recruitment/HRApplicationEvaluation`,
    },
    HRApplication: {
      route: `${DOMAIN_NAME}/Recruitment/HRApplication`,
    },
    TechApplicationReview: {
      route: `${DOMAIN_NAME}/Recruitment/TechApplicationReview`,
    },
    SecApplicationReview: {
      route: `${DOMAIN_NAME}/Recruitment/SecApplicationReview`,
    },
    ApplicationCallStatus: {
      route: `${DOMAIN_NAME}/Recruitment/ApplicationCallStatus`,
    },
    HRInterviewEvaluation: {
      route: `${DOMAIN_NAME}/Recruitment/HRInterviewEvaluation`,
    },
    HRInterviewEvaluationEdit: {
      route: `${DOMAIN_NAME}/Recruitment/HRInterviewEvaluationEdit`,
    },
    ManagerInterviewEvaluation: {
      route: `${DOMAIN_NAME}/Recruitment/ManagerInterviewEvaluation`,
    },
    ManagerInterviewEvaluationEdit: {
      route: `${DOMAIN_NAME}/Recruitment/ManagerInterviewEvaluationEdit`,
    },
    HiringRequest: { route: `${DOMAIN_NAME}/Recruitment/HiringRequest` },
    HiringRequestCreate: {
      route: `${DOMAIN_NAME}/Recruitment/HiringRequestCreate`,
    },
    HiringRequestEdit: {
      route: `${DOMAIN_NAME}/Recruitment/HiringRequestEdit`,
    },
    JobOffer: { route: `${DOMAIN_NAME}/Recruitment/JobOffer` },
    JobOfferStatus: { route: `${DOMAIN_NAME}/Recruitment/JobOfferStatus` },
    JobOfferCreate: { route: `${DOMAIN_NAME}/Recruitment/JobOfferCreate` },
    JobOfferEdit: { route: `${DOMAIN_NAME}/Recruitment/JobOfferEdit` },
    HiringRequestEvaluation: {
      route: `${DOMAIN_NAME}/Recruitment/HiringRequestEvaluation`,
    },
    HiringRequestEvaluationEdit: {
      route: `${DOMAIN_NAME}/Recruitment/HiringRequestEvaluationEdit`,
    },
    JobAdvertisementCreate: {
      route: `${DOMAIN_NAME}/Recruitment/JobAdvertisementCreate`,
    },
    JobAdvertisementEdit: {
      route: `${DOMAIN_NAME}/Recruitment/JobAdvertisementEdit`,
    },
    JobApplicationPreview: {
      route: `${DOMAIN_NAME}/Recruitment/JobApplicationPreview`,
    },
  },
  assessment: {
    AsCategory: { route: `${DOMAIN_NAME}/Assessment/AsCategory` },
    AsChoice: { route: `${DOMAIN_NAME}/Assessment/AsChoice` },
    AsTemplate: { route: `${DOMAIN_NAME}/Assessment/AsTemplate` },
    AsTemplateCreate: { route: `${DOMAIN_NAME}/Assessment/AsTemplateCreate` },
    AsTemplateEdit: { route: `${DOMAIN_NAME}/Assessment/AsTemplateEdit` },
    Competencies: { route: `${DOMAIN_NAME}/Assessment/Competencies` },
    CompetenciesCreate: {
      route: `${DOMAIN_NAME}/Assessment/CompetenciesCreate`,
    },
    CompetenciesEdit: { route: `${DOMAIN_NAME}/Assessment/CompetenciesEdit` },
    EmployeeAssessment: {
      route: `${DOMAIN_NAME}/Assessment/EmployeeAssessment`,
    },
    AllJobKpi: { route: `${DOMAIN_NAME}/Assessment/AllJobKpi` },
    StaffJobKPI: { route: `${DOMAIN_NAME}/Assessment/StaffJobKPI` },
    JobDescriptions: { route: `${DOMAIN_NAME}/Assessment/JobDescriptions` },
    IndividualDevelopmentPlan: {
      route: `${DOMAIN_NAME}/Assessment/IndividualDevelopmentPlan`,
    },
    IndividualDevelopmentPlanCreate: {
      route: `${DOMAIN_NAME}/Assessment/IndividualDevelopmentPlanCreate`,
    },
    IndividualDevelopmentPlanEdit: {
      route: `${DOMAIN_NAME}/Assessment/IndividualDevelopmentPlanEdit`,
    },
    CareerDevPlan: { route: `${DOMAIN_NAME}/Assessment/CareerDevPlan` },
    CareerDevPlanCreate: {
      route: `${DOMAIN_NAME}/Assessment/CareerDevPlanCreate`,
    },
    CareerDevPlanEdit: {
      route: `${DOMAIN_NAME}/Assessment/CareerDevPlanEdit`,
    },
    UploadAssessmentGuidelines: {
      route: `${DOMAIN_NAME}/Assessment/UploadAssessmentGuidelines`,
    },
    AssessmentGuidelines: {
      route: `${DOMAIN_NAME}/Assessment/AssessmentGuidelines`,
    },
    MonthOpenCloseAss: {
      route: `${DOMAIN_NAME}/Assessment/MonthOpenCloseAss`,
    },
    AssessmentReview: { route: `${DOMAIN_NAME}/Assessment/AssessmentReview` },
    AssessmentReviewEdit: {
      route: `${DOMAIN_NAME}/Assessment/AssessmentReviewEdit`,
    },
    AssessmentReport: { route: `${DOMAIN_NAME}/Assessment/AssessmentReport` },
    PeerAppraisalSetting: {
      route: `${DOMAIN_NAME}/Assessment/PeerAppraisalSetting`,
    },
    PeerAppraisalList: {
      route: `${DOMAIN_NAME}/Assessment/PeerAppraisalList`,
    },
    EmployeePeerAppraisal: {
      route: `${DOMAIN_NAME}/Assessment/EmployeePeerAppraisal`,
    },
    PeerAppraisalReport: {
      route: `${DOMAIN_NAME}/Assessment/PeerAppraisalReport`,
    },
  },
  smartObjective: {
    ObjectiveReport: {
      route: `${DOMAIN_NAME}/SmartObjective/ObjectiveReport`,
    },
    EmployeeObjective: {
      route: `${DOMAIN_NAME}/SmartObjective/EmployeeObjective`,
    },
    EmployeeObjectiveCreate: {
      route: `${DOMAIN_NAME}/SmartObjective/EmployeeObjectiveCreate`,
    },
    EmployeeObjectiveEdit: {
      route: `${DOMAIN_NAME}/SmartObjective/EmployeeObjectiveEdit`,
    },
  },
  kpi: {
    Upload_KPI_Data: { route: `${DOMAIN_NAME}/KPI/Upload_KPI_Data` },
    KpiData: { route: `${DOMAIN_NAME}/KPI/KpiData` },
    KPILOBReport: { route: `${DOMAIN_NAME}/KPI/KPILOBReport` },
    KPISupervisorReport: { route: `${DOMAIN_NAME}/KPI/KPISupervisorReport` },
  },
  survey: {
    SurveyQuestionGroup: {
      route: `${DOMAIN_NAME}/Survey/SurveyQuestionGroup`,
    },
    SurveyChoiceGroup: { route: `${DOMAIN_NAME}/Survey/SurveyChoiceGroup` },
    SurveyChoiceGroupCreate: {
      route: `${DOMAIN_NAME}/Survey/SurveyChoiceGroupCreate`,
    },
    SurveyChoiceGroupEdit: {
      route: `${DOMAIN_NAME}/Survey/SurveyChoiceGroupEdit`,
    },
    SurveyTemplate: { route: `${DOMAIN_NAME}/Survey/SurveyTemplate` },
    SurveyTemplateCreate: {
      route: `${DOMAIN_NAME}/Survey/SurveyTemplateCreate`,
    },
    SurveyTemplateEdit: { route: `${DOMAIN_NAME}/Survey/SurveyTemplateEdit` },
    Survey: { route: `${DOMAIN_NAME}/Survey/Survey` },
  },
  training: {
    TrFunctionsList: { route: `${DOMAIN_NAME}/Training/TrFunctionsList` },
    FunctionApproval: { route: `${DOMAIN_NAME}/Training/FunctionApproval` },
    TrainingApproval: { route: `${DOMAIN_NAME}/Training/TrainingApproval` },
    TrFunctionsListCreate: {
      route: `${DOMAIN_NAME}/Training/TrFunctionsListCreate`,
    },
    TrFunctionsListEdit: {
      route: `${DOMAIN_NAME}/Training/TrFunctionsListEdit`,
    },
    EmployeeFunctions: { route: `${DOMAIN_NAME}/Training/EmployeeFunctions` },
    FunctionsRequest: { route: `${DOMAIN_NAME}/Training/FunctionsRequest` },
    FunctionsData: { route: `${DOMAIN_NAME}/Training/FunctionsData` },
    QualificationCheck: {
      route: `${DOMAIN_NAME}/Training/QualificationCheck`,
    },
    TrTrainingTrxList: { route: `${DOMAIN_NAME}/Training/TrTrainingTrxList` },
    TrTrainingTrxListCreate: {
      route: `${DOMAIN_NAME}/Training/TrTrainingTrxListCreate`,
    },
    TrTrainingTrxListEdit: {
      route: `${DOMAIN_NAME}/Training/TrTrainingTrxListEdit`,
    },
    TrainingRequestList: {
      route: `${DOMAIN_NAME}/Training/TrainingRequestList`,
    },
    TrainingRequestListCreate: {
      route: `${DOMAIN_NAME}/Training/TrainingRequestListCreate`,
    },
    TrainingRequestListEdit: {
      route: `${DOMAIN_NAME}/Training/TrainingRequestListEdit`,
    },
    EmployeeAttendance: {
      route: `${DOMAIN_NAME}/Training/EmployeeAttendance`,
    },
    TrainingCalender: { route: `${DOMAIN_NAME}/Training/TrainingCalender` },
    EvaluateEmployee: { route: `${DOMAIN_NAME}/Training/EvaluateEmployee` },
    EvaluateTraining: { route: `${DOMAIN_NAME}/Training/EvaluateTraining` },
    TestTemplate: { route: `${DOMAIN_NAME}/Training/TestTemplate` },
    TestTemplateCreate: {
      route: `${DOMAIN_NAME}/Training/TestTemplateCreate`,
    },
    TestTemplateEdit: { route: `${DOMAIN_NAME}/Training/TestTemplateEdit` },
    Test: { route: `${DOMAIN_NAME}/Training/Test` },
    ReviewTest: { route: `${DOMAIN_NAME}/Training/ReviewTest` },
    EmployeeTrainingReport: {
      route: `${DOMAIN_NAME}/Training/EmployeeTrainingReport`,
    },
    TrainingAttendance: {
      route: `${DOMAIN_NAME}/Training/TrainingAttendance`,
    },
  },
  projectManagement: {
    Customer: { route: `${DOMAIN_NAME}/ProjectManagment/Customer` },
    CustomerCreate: {
      route: `${DOMAIN_NAME}/ProjectManagment/CustomerCreate`,
    },
    CustomerEdit: { route: `${DOMAIN_NAME}/ProjectManagment/CustomerEdit` },
    Contract: { route: `${DOMAIN_NAME}/ProjectManagment/Contract` },
    ContractCreate: {
      route: `${DOMAIN_NAME}/ProjectManagment/ContractCreate`,
    },
    ContractEdit: { route: `${DOMAIN_NAME}/ProjectManagment/ContractEdit` },
    Stage: { route: `${DOMAIN_NAME}/ProjectManagment/Stage` },
    StageCreate: { route: `${DOMAIN_NAME}/ProjectManagment/StageCreate` },
    StageEdit: { route: `${DOMAIN_NAME}/ProjectManagment/StageEdit` },
    TimeSheet: { route: `${DOMAIN_NAME}/ProjectManagment/TimeSheet` },
    TimeSheetCreate: {
      route: `${DOMAIN_NAME}/ProjectManagment/TimeSheetCreate`,
    },
    TimeSheetEdit: { route: `${DOMAIN_NAME}/ProjectManagment/TimeSheetEdit` },
    Project: { route: `${DOMAIN_NAME}/ProjectManagment/Project` },
    ProjectCreate: { route: `${DOMAIN_NAME}/ProjectManagment/ProjectCreate` },
    ProjectEdit: { route: `${DOMAIN_NAME}/ProjectManagment/ProjectEdit` },
  },
  auth: {
    Login: {
      route: `${DOMAIN_NAME}/auth/login`,
    },
    Register: {
      route: `${DOMAIN_NAME}/auth/register`,
    },
    Profile: {
      route: `${DOMAIN_NAME}/auth/user-profile`,
    },
    ResetPassword: {
      route: `${DOMAIN_NAME}/auth/reset-password`,
    },
    ForgotPassword: {
      route: `${DOMAIN_NAME}/auth/ForgotPassword`,
    },
    LoginFullstack: {
      route: `${DOMAIN_NAME}/auth/login-firebase`,
    },
    RegisterFullstack: {
      route: `${DOMAIN_NAME}/auth/register-firebase`,
    },
    ResetPasswordFullstack: {
      route: `${DOMAIN_NAME}/auth/reset-password-firebase`,
    },
    LockScreen: {
      route: `${DOMAIN_NAME}/auth/lock-screen`,
    },
  },
  global: {
    NotFound: {
      route: `${DOMAIN_NAME}/not-found`,
    },
    Error: {
      route: `${DOMAIN_NAME}/error`,
    },
    Section: {
      route: `${DOMAIN_NAME}/Payroll/Section`,
    },
    ManagementDashboard: {
      route: `${DOMAIN_NAME}/ManagementDashboard`,
    },
    EmployeeDashboard: {
      route: `${DOMAIN_NAME}/EmployeeDashboard`,
    },
    AdminDashboard: {
      route: DOMAIN_NAME,
    },
    NewsDetails: {
      route: `${DOMAIN_NAME}/NewsDetails`,
    },
  },
};

export default SITEMAP;
export { DOMAIN_NAME };
