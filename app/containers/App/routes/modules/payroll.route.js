import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const LoanSetting = loadable(
  () => import('../../../Pages/Payroll/Payroll/Code/LoanSetting'),
  {
    fallback: <Loading />,
  }
);
const PayTemplateList = loadable(
  () => import('../../../Pages/Payroll/Payroll/Code/PayTemplate/PayTemplateList'),
  {
    fallback: <Loading />,
  }
);
const PayTemplateCreate = loadable(
  () => import('../../../Pages/Payroll/Payroll/Code/PayTemplate/PayTemplateCreate'),
  {
    fallback: <Loading />,
  }
);

const ElementValList = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Transaction/ElementVal/ElementValList'
  ),
  {
    fallback: <Loading />,
  }
);
const ElementValHistory = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Transaction/ElementVal/ElementValHistory'
  ),
  {
    fallback: <Loading />,
  }
);

const ElementValCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Transaction/ElementVal/ElementValCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const ElementVlaImport = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Transaction/ElementVal/ElementVlaImport'
  ),
  {
    fallback: <Loading />,
  }
);

const ElementTaxIns = loadable(
  () => import('../../../Pages/Payroll/Payroll/Code/ElementTaxIns'),
  {
    fallback: <Loading />,
  }
);
const SalaryStructureList = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Code/SalaryStructure/SalaryStructureList'
  ),
  {
    fallback: <Loading />,
  }
);
const SalaryStructureCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Code/SalaryStructure/SalaryStructureCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const ElementsList = loadable(
  () => import('../../../Pages/Payroll/Payroll/Code/Elements/ElementsList'),
  {
    fallback: <Loading />,
  }
);
const ElementsCreate = loadable(
  () => import('../../../Pages/Payroll/Payroll/Code/Elements/ElementsCreate'),
  {
    fallback: <Loading />,
  }
);

const BranchSalarySetting = loadable(
  () => import('../../../Pages/Payroll/Payroll/Code/BranchSalarySetting'),
  {
    fallback: <Loading />,
  }
);

const PaymentSlip = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/PaymentSlip'),
  {
    fallback: <Loading />,
  }
);

const PaymentSlipReview = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/PaymentSlipReview'),
  {
    fallback: <Loading />,
  }
);

const PaymentSlipTotal = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/PaymentSlipTotal'),
  {
    fallback: <Loading />,
  }
);

const PaymentSlipTotalReview = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/PaymentSlipTotalReview'),
  {
    fallback: <Loading />,
  }
);

const SalaryReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/SalaryReport'),
  {
    fallback: <Loading />,
  }
);

const MonthlyVariablesReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/MonthlyVariablesReport'),
  {
    fallback: <Loading />,
  }
);

const DetailedPayrollReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/DetailedPayrollReport'),
  {
    fallback: <Loading />,
  }
);

const AnnualTaxReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/AnnualTaxReport'),
  {
    fallback: <Loading />,
  }
);

const BankList = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/BankList'),
  {
    fallback: <Loading />,
  }
);

const LoanTrxList = loadable(
  () => import('../../../Pages/Payroll/Payroll/Transaction/Loan/LoanTrxList'),
  {
    fallback: <Loading />,
  }
);
const LoanTrxCreate = loadable(
  () => import('../../../Pages/Payroll/Payroll/Transaction/Loan/LoanTrxCreate'),
  {
    fallback: <Loading />,
  }
);

const LoanReqList = loadable(
  () => import('../../../Pages/Payroll/Payroll/Transaction/Loan/LoanReqList'),
  {
    fallback: <Loading />,
  }
);
const LoanReqCreate = loadable(
  () => import('../../../Pages/Payroll/Payroll/Transaction/Loan/LoanReqCreate'),
  {
    fallback: <Loading />,
  }
);

const LoanPostpone = loadable(
  () => import('../../../Pages/Payroll/Payroll/Transaction/Loan/LoanPostpone'),
  {
    fallback: <Loading />,
  }
);

const PurchaseTrxList = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Transaction/Purchase/PurchaseTrxList'
  ),
  {
    fallback: <Loading />,
  }
);
const PurchaseTrxCreate = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Transaction/Purchase/PurchaseTrxCreate'
  ),
  {
    fallback: <Loading />,
  }
);
const SalaryCalculation = loadable(
  () => import(
    '../../../Pages/Payroll/Payroll/Transaction/Calculation/SalaryCalculation'
  ),
  {
    fallback: <Loading />,
  }
);

const SummaryPayslip = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/SummaryPayslip'),
  {
    fallback: <Loading />,
  }
);

const ElementReviewReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/ElementReview'),
  {
    fallback: <Loading />,
  }
);

const SalaryComparisonReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/SalaryComparisonReport'),
  {
    fallback: <Loading />,
  }
);

const FollowEmployeeReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/FollowEmployee'),
  {
    fallback: <Loading />,
  }
);

const TaxReportReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/TaxReportReport'),
  {
    fallback: <Loading />,
  }
);

const TotalDeptSalaryReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/TotalDeptSalaryReport'),
  {
    fallback: <Loading />,
  }
);

const SalaryYearReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/SalaryYearReport'),
  {
    fallback: <Loading />,
  }
);

const SalarySigningListReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/SalarySigningListReport'),
  {
    fallback: <Loading />,
  }
);

const LoanReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/LoanReport'),
  {
    fallback: <Loading />,
  }
);

const WBS = loadable(
  () => import('../../../Pages/Payroll/Payroll/Transaction/WBS'),
  {
    fallback: <Loading />,
  }
);

const WBSReport = loadable(
  () => import('../../../Pages/Payroll/Payroll/Reports/WBSReport'),
  {
    fallback: <Loading />,
  }
);

const payroll = {
  LoanSetting,
  PayTemplateList,
  PayTemplateCreate,
  ElementValList,
  ElementValHistory,
  ElementValCreate,
  ElementVlaImport,
  ElementTaxIns,
  SalaryStructureList,
  SalaryStructureCreate,
  ElementsList,
  ElementsCreate,
  BranchSalarySetting,
  PaymentSlip,
  PaymentSlipReview,
  PaymentSlipTotal,
  PaymentSlipTotalReview,
  SalaryReport,
  MonthlyVariablesReport,
  DetailedPayrollReport,
  AnnualTaxReport,
  BankList,
  LoanTrxList,
  LoanTrxCreate,
  LoanReqList,
  LoanReqCreate,
  LoanPostpone,
  PurchaseTrxList,
  PurchaseTrxCreate,
  SalaryCalculation,
  SummaryPayslip,
  ElementReviewReport,
  SalaryComparisonReport,
  FollowEmployeeReport,
  TaxReportReport,
  TotalDeptSalaryReport,
  SalaryYearReport,
  SalarySigningListReport,
  LoanReport,
  WBS,
  WBSReport,
};

export default payroll;
