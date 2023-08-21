/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.Employee';
export const scope2 = 'boilerplate.components.tables';
export default defineMessages({
  employeeCode: {
    id: `${scope}.personal.employeeCode`,
    defaultMessage: 'Code',
  },
  employeename: {
    id: `${scope}.personal.employeename`,
    defaultMessage: 'Name',
  },
  status: {
    id: `${scope}.personal.status`,
    defaultMessage: 'Status',
  },
  identitynumber: {
    id: `${scope}.personal.identitynumber`,
    defaultMessage: 'Identity Number',
  },
  organization: {
    id: `${scope}.personal.organization`,
    defaultMessage: 'Organization',
  },
  reportto: {
    id: `${scope}.personal.reportto`,
    defaultMessage: 'Report To',
  },
  jobname: {
    id: `${scope}.personal.jobname`,
    defaultMessage: 'Job',
  },
  isinsured: {
    id: `${scope}.personal.isinsured`,
    defaultMessage: 'Insured',
  },
  chooseEmp: {
    id: `boilerplate.containers.Payroll.Setting.chooseEmp`,
    defaultMessage: 'Select Employee',
  },
  bank: {
    id: `${scope2}.codes.bank`,
    defaultMessage: 'Bank',
  },
  bankBranchNo: {
    id: `${scope2}.codes.bankBranchNo`,
    defaultMessage: 'Branch No',
  },
  iban: {
    id: `${scope2}.codes.iban`,
    defaultMessage: 'Iban',
  },
  bnkAcc: {
    id: `${scope2}.codes.bnkAcc`,
    defaultMessage: 'Bank Account',
  },
  bnkEmpCode: {
    id: `${scope2}.codes.bnkEmpCode`,
    defaultMessage: 'Emoloyee Bank Code',
  },
  swiftCode: {
    id: `${scope2}.codes.swiftCode`,
    defaultMessage: 'Swift Code',
  },
  submit: {
    id: `${scope}.codes.submit`,
    defaultMessage: 'Submit',
  },
  reset: {
    id: `${scope}.codes.reset`,
    defaultMessage: 'Reset',
  },

  carModel: {
    id: `${scope}.car.carModel`,
    defaultMessage: 'car Model',
  },
  manufactureYear: {
    id: `${scope}.car.manufactureYear`,
    defaultMessage: 'Mnufacture Year',
  },
  hasLicense: {
    id: `${scope}.car.hasLicense`,
    defaultMessage: 'Has License',
  },
  licenseNo: {
    id: `${scope}.car.licenseNo`,
    defaultMessage: 'license No',
  },
  trafficUnit: {
    id: `${scope}.car.trafficUnit`,
    defaultMessage: 'Traffic Unit',
  },
  licenseGrade: {
    id: `${scope}.car.licenseGrade`,
    defaultMessage: 'License Grade',
  },
  hiringDate: {
    id: `${scope}.job.hiringDate`,
    defaultMessage: 'Hiring Date',
  },

  contractEndDate: {
    id: `${scope}.job.contractEndDate`,
    defaultMessage: 'Contract End Date',
  },

  contractStartDate: {
    id: `${scope}.job.contractStartDate`,
    defaultMessage: 'contract Start Date',
  },
  job: {
    id: `${scope}.job.job`,
    defaultMessage: 'Job',
  },

  joblevel: {
    id: `${scope}.job.joblevel`,
    defaultMessage: 'Job Level',
  },

  hiringSource: {
    id: `${scope}.job.hiringSource`,
    defaultMessage: 'Hiring Source',
  },

  isKinship: {
    id: `${scope}.job.isKinship`,
    defaultMessage: 'Is Kinship',
  },

  kinshipLink: {
    id: `${scope}.job.kinshipLink`,
    defaultMessage: 'kinship Link',
  },
  kinshipEmp: {
    id: `${scope}.job.kinshipEmp`,
    defaultMessage: 'kinship Employee',
  },
  hasAlternativeEmp: {
    id: `${scope}.job.hasAlternativeEmp`,
    defaultMessage: 'Has Alternative Employee',
  },

  contractType: {
    id: `${scope}.job.contractType`,
    defaultMessage: 'Contract Type',
  },
  notHasMission: {
    id: `${scope}.job.notHasMission`,
    defaultMessage: 'Not Has Mission',
  },
  ruleTemplate: {
    id: `${scope}.job.ruleTemplate`,
    defaultMessage: 'Rule Template',
  },

  isBnkTransfer: {
    id: `${scope}.salary.isBnkTransfer`,
    defaultMessage: 'Is Bank Transfer',
  },

  taxable: {
    id: `${scope}.salary.taxable`,
    defaultMessage: 'Taxable',
  },
  isHours: {
    id: `${scope}.salary.isHours`,
    defaultMessage: 'Is Hours',
  },

  hourPrice: {
    id: `${scope}.salary.hourPrice`,
    defaultMessage: 'Hour Price',
  },
  isNotApplyAttRule: {
    id: `${scope}.salary.isNotApplyAttRule`,
    defaultMessage: 'Is Not Apply Attendance Rule',
  },
  isMoneyOvertime: {
    id: `${scope}.salary.isMoneyOvertime`,
    defaultMessage: 'Is Money Overtime',
  },

  isVacationOvertime: {
    id: `${scope}.salary.isVacationOvertime`,
    defaultMessage: 'Is Vacation Overtime',
  },
  hasMonthlyBouns: {
    id: `${scope}.salary.hasMonthlyBouns`,
    defaultMessage: 'Has Monthly Bouns',
  },
  hasTransfereAllowance: {
    id: `${scope}.salary.hasTransfereAllowance`,
    defaultMessage: 'Has Transfere Allowance',
  },
  salaryStructure: {
    id: `${scope}.salary.salaryStructure`,
    defaultMessage: 'Salary Structure',
  },
  incentiveFrom: {
    id: `${scope}.salary.incentiveFrom`,
    defaultMessage: 'Incentive From',
  },
});
