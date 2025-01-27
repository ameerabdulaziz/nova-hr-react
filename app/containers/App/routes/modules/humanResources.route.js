import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const Courses = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/Courses'),
  {
    fallback: <Loading />,
  }
);

const CoursesCreate = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/CoursesCreate'),
  {
    fallback: <Loading />,
  }
);

const TrainingCenter = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/TrainingCenter'),
  {
    fallback: <Loading />,
  }
);

const TrainingCenterCreate = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/TrainingCenterCreate'),
  {
    fallback: <Loading />,
  }
);

const Rewards = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/Rewards'),
  {
    fallback: <Loading />,
  }
);
const Penalty = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/Penalty/PenaltyList'),
  {
    fallback: <Loading />,
  }
);
const PenaltyCreate = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/Penalty/PenaltyCreate'),
  {
    fallback: <Loading />,
  }
);

const RewardTransList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Reward/RewardTransList'
  ),
  {
    fallback: <Loading />,
  }
);
const RewardTransCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Reward/RewardTransCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const PenaltyTransList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Penalty/PenaltyTransList'
  ),
  {
    fallback: <Loading />,
  }
);
const PenaltyTransCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Penalty/PenaltyTransCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const AttentionList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Attention/AttentionList'
  ),
  {
    fallback: <Loading />,
  }
);
const AttentionCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Attention/AttentionCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const LayOffNoticeList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/LayOffNotice/LayOffNoticeList'
  ),
  {
    fallback: <Loading />,
  }
);
const LayOffNoticeCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/LayOffNotice/LayOffNoticeCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const PromotionsList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Promotions/PromotionsList'
  ),
  {
    fallback: <Loading />,
  }
);
const PromotionsCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Promotions/PromotionsCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const ExplanationList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Explanation/ExplanationList'
  ),
  {
    fallback: <Loading />,
  }
);
const ExplanationEdit = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Explanation/ExplanationEdit'
  ),
  {
    fallback: <Loading />,
  }
);

const OrganizationManger = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/OrganizationManager'
  ),
  {
    fallback: <Loading />,
  }
);
const NewsList = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Transaction/News/NewsList'),
  {
    fallback: <Loading />,
  }
);
const NewsCreate = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Transaction/News/NewsCreate'),
  {
    fallback: <Loading />,
  }
);

const ResignationReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/ResignationReport'),
  {
    fallback: <Loading />,
  }
);

const ExplanationReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/ExplanationReport'),
  {
    fallback: <Loading />,
  }
);
const Complaint = loadable(
  () => import('../../../Pages/Payroll/Explanation/Complaint'),
  {
    fallback: <Loading />,
  }
);
const HrLetter = loadable(
  () => import('../../../Pages/Payroll/Explanation/HrLetter'),
  {
    fallback: <Loading />,
  }
);
const NewIdea = loadable(
  () => import('../../../Pages/Payroll/Explanation/NewIdea'),
  {
    fallback: <Loading />,
  }
);

const PromotionsReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/PromotionsReport'),
  {
    fallback: <Loading />,
  }
);

const DirectManager = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Transaction/DirectManager'),
  {
    fallback: <Loading />,
  }
);

const Custody = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/Custody'),
  {
    fallback: <Loading />,
  }
);
const CustodyCategory = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/CustodyCategory'),
  {
    fallback: <Loading />,
  }
);

const CustodyDeliveryReport = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Reports/CustodyDeliveryReport'
  ),
  {
    fallback: <Loading />,
  }
);
const CustodyDeliveryList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/CustodyDelivery/CustodyDeliveryList'
  ),
  {
    fallback: <Loading />,
  }
);
const CustodyDeliveryCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/CustodyDelivery/CustodyDeliveryCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const CustodyReceiveReport = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Reports/CustodyReceiveReport'
  ),
  {
    fallback: <Loading />,
  }
);
const CustodyReceiveList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/CustodyReceive/CustodyReceiveList'
  ),
  {
    fallback: <Loading />,
  }
);
const CustodyReceiveCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/CustodyReceive/CustodyReceiveCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const Uniform = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/Uniform'),
  {
    fallback: <Loading />,
  }
);

const UniformDeliveryReport = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Reports/UniformDeliveryReport'
  ),
  {
    fallback: <Loading />,
  }
);
const UniformDeliveryList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/UniformDelivery/UniformDeliveryList'
  ),
  {
    fallback: <Loading />,
  }
);
const UniformDeliveryCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/UniformDelivery/UniformDeliveryCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const UniformReceiveReport = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Reports/UniformReceiveReport'
  ),
  {
    fallback: <Loading />,
  }
);
const UniformReceiveList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/UniformReceive/UniformReceiveList'
  ),
  {
    fallback: <Loading />,
  }
);
const UniformReceiveCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/UniformReceive/UniformReceiveCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const ResignTrxList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Resign/ResignTrxList'
  ),
  {
    fallback: <Loading />,
  }
);
const ResignTrxCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Resign/ResignTrxCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const ResignTrxReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/ResignTrxReport'),
  {
    fallback: <Loading />,
  }
);
const ManPowerSetting = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Transaction/ManPowerSetting'),
  {
    fallback: <Loading />,
  }
);
const ResignTrxImport = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/Resign/ResignTrxImport'
  ),
  {
    fallback: <Loading />,
  }
);
const EmpCourseList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/EmpCourse/EmpCourseList'
  ),
  {
    fallback: <Loading />,
  }
);
const EmpCourseCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/EmpCourse/EmpCourseCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const LayOffNoticeReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/LayOffNoticeReport'),
  {
    fallback: <Loading />,
  }
);
const Items = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Code/Items'),
  {
    fallback: <Loading />,
  }
);
const AttentionReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/AttentionReport'),
  {
    fallback: <Loading />,
  }
);
const PenaltyTransReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/PenaltyTransReport'),
  {
    fallback: <Loading />,
  }
);
const RewardTransReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/RewardTransReport'),
  {
    fallback: <Loading />,
  }
);
const EmpCourseReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/EmpCourseReport'),
  {
    fallback: <Loading />,
  }
);

const ResignReqTrxCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/ResignReqTrx/ResignReqTrxCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const ResignReqTrxEdit = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/ResignReqTrx/ResignReqTrxCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const ResignReqTrxList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/ResignReqTrx/ResignReqTrx'
  ),
  {
    fallback: <Loading />,
  }
);

const HrEmployeeDocumentTrxCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/HrEmployeeDocumentTrxCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const HrEmployeeDocumentTrxEdit = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/HrEmployeeDocumentTrxCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const HrEmployeeDocumentTrxList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/HrEmployeeDocumentTrx'
  ),
  {
    fallback: <Loading />,
  }
);

const ManPowerReport = loadable(
  () => import('../../../Pages/Payroll/HumanResources/Reports/ManPowerReport'),
  {
    fallback: <Loading />,
  }
);

const EmpInvestigation = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/EmployeeInvestigation/EmployeeInvestigation'
  ),
  {
    fallback: <Loading />,
  }
);

const EmpInvestigationCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/EmployeeInvestigation/EmployeeInvestigationCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const EmpInvestigationEdit = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/EmployeeInvestigation/EmployeeInvestigationCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const TransferRequest = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/TransferRequest/TransferRequest'
  ),
  {
    fallback: <Loading />,
  }
);

const TransferRequestCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/TransferRequest/TransferRequestCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const TransferRequestEdit = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Transaction/TransferRequest/TransferRequestCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const ResignReasonList = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Code/ResignReasonList'
  ),
  {
    fallback: <Loading />,
  }
);

const ResignReasonCreate = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Code/ResignReasonCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const ResignReasonEdit = loadable(
  () => import(
    '../../../Pages/Payroll/HumanResources/Code/ResignReasonCreate'
  ),
  {
    fallback: <Loading />,
  }
);

const humanResources = {
  Courses,
  CoursesCreate,
  TrainingCenter,
  TrainingCenterCreate,
  Rewards,
  Penalty,
  PenaltyCreate,
  RewardTransList,
  RewardTransCreate,
  PenaltyTransList,
  PenaltyTransCreate,
  AttentionList,
  AttentionCreate,
  LayOffNoticeList,
  LayOffNoticeCreate,
  PromotionsList,
  PromotionsCreate,
  ExplanationList,
  ExplanationEdit,
  OrganizationManger,
  NewsList,
  NewsCreate,
  ResignationReport,
  ExplanationReport,
  Complaint,
  HrLetter,
  NewIdea,
  PromotionsReport,
  DirectManager,
  Custody,
  CustodyCategory,
  CustodyDeliveryReport,
  CustodyDeliveryList,
  CustodyDeliveryCreate,
  CustodyReceiveReport,
  CustodyReceiveList,
  CustodyReceiveCreate,
  Uniform,
  UniformDeliveryReport,
  UniformDeliveryList,
  UniformDeliveryCreate,
  UniformReceiveReport,
  UniformReceiveList,
  UniformReceiveCreate,
  ResignTrxList,
  ResignTrxCreate,
  ResignTrxReport,
  ManPowerSetting,
  ResignTrxImport,
  EmpCourseList,
  EmpCourseCreate,
  LayOffNoticeReport,
  Items,
  AttentionReport,
  PenaltyTransReport,
  RewardTransReport,
  EmpCourseReport,
  ResignReqTrxCreate,
  ResignReqTrxEdit,
  ResignReqTrxList,
  HrEmployeeDocumentTrxCreate,
  HrEmployeeDocumentTrxEdit,
  HrEmployeeDocumentTrxList,
  ManPowerReport,
  EmpInvestigation,
  EmpInvestigationCreate,
  EmpInvestigationEdit,
  TransferRequest,
  TransferRequestCreate,
  TransferRequestEdit,
  ResignReasonList,
  ResignReasonCreate,
  ResignReasonEdit
};

export default humanResources;
