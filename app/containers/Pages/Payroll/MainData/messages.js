/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.MainData';

export default defineMessages({
//Jobs------------------------------------------------------------------
id: {
  id: `${scope}.codes.id`,
  defaultMessage: 'Id',
},
arName: {
  id: `${scope}.codes.arName`,
  defaultMessage: 'AR Name',
},
enName: {
  id: `${scope}.codes.enName`,
  defaultMessage: 'EN Name',
},
jobCode: {
  id: `${scope}.codes.jobcode`,
  defaultMessage: 'Code',
},
isLeadershipPosition: {
  id: `${scope}.codes.isleadership`,
  defaultMessage: 'Leadership',
},
medicalInsuranceStartDay: {
  id: `${scope}.codes.medicalinsurancestartday`,
  defaultMessage: 'Medical.Insu Day',
},
sancLevelName: {
  id: `${scope}.codes.sancLevelName`,
  defaultMessage: 'Sancation Level',
},
sancLevelArName: {
  id: `${scope}.codes.sancLevelArName`,
  defaultMessage: 'AR sancation Level',
},
jobTypeName: {
  id: `${scope}.codes.jobtype`,
  defaultMessage: 'Type',
},
jobNatureName: {
  id: `${scope}.codes.jobnature`,
  defaultMessage: 'Nature',
},
parentName: {
  id: `${scope}.codes.parentName`,
  defaultMessage: 'Parent',
},
actions: {
  id: `${scope}.codes.actions`, 
  defaultMessage: 'Actions',
},
add: {
  id: `${scope}.codes.add`,
  defaultMessage: 'Add',
},
ADD: {
  id: `${scope}.codes.ADD`,
  defaultMessage: 'Add',
},
deleteMessage: {
  id: `${scope}.codes.deleteMessage`,
  defaultMessage: 'Are You Sure You Want To Delete',
},
delete: {
  id: `${scope}.codes.delete`, 
  defaultMessage: 'Delete',
},
createJob: {
  id: `${scope}.codes.createJob`,
  defaultMessage: 'Create Job',
},
editJob: {
  id: `${scope}.codes.editJob`,
  defaultMessage: 'Edit Job',
},
parentNameOrg: {
  id: `${scope}.codes.parentNameOrg`,
  defaultMessage: 'Main Unit',
},
empName: {
  id: `${scope}.codes.empName`,
  defaultMessage: 'Unit Manager',
},
manPower: {  
  id: `${scope}.codes.manPower`,
  defaultMessage: 'ManPower',
},
createOrganization: {
  id: `${scope}.codes.createOrganization`,
  defaultMessage: 'Create Organization',
},
editOrganization: {
  id: `${scope}.codes.editOrganization`,
  defaultMessage: 'Edit Organization',
},
note: {
  id: `${scope}.codes.note`,
  defaultMessage: 'Note',
},
worknatureAllowance: {
  id: `${scope}.codes.worknatureAllowance`,
  defaultMessage: 'Work Nature Allowance',
},
errorMes: {
  id: `${scope}.codes.errorMes`,
  defaultMessage: 'Enter Integer Number',
},
JobsList: {
  id: `${scope}.codes.JobsList`,
  defaultMessage: 'Jobs list',
},
OrganizationsList: {
  id: `${scope}.codes.OrganizationsList`,
  defaultMessage: 'Organizations list',
},

  category: {
    id: `${scope}.codes.category`,
    defaultMessage: 'category',
  },
  documentType: {
    id: `${scope}.codes.documentType`,
    defaultMessage: 'documentType',
  },
  documentDescription: {
    id: `${scope}.codes.documentDescription`,
    defaultMessage: 'documentDescription',
  },
  type: {
    id: `${scope}.codes.type`,
    defaultMessage: 'type',
  },
  employeeInfo: {
    id: `${scope}.codes.employeeInfo`,
    defaultMessage: 'employeeInfo',
  },
  addOrChangeEmployee: {
    id: `${scope}.codes.addOrChangeEmployee`,
    defaultMessage: 'addOrChangeEmployee',
  },
  branch: {
    id: `${scope}.codes.branch`,
    defaultMessage: 'branch',
  },
  department: {
    id: `${scope}.codes.department`,
    defaultMessage: 'department',
  },
  section: {
    id: `${scope}.codes.section`,
    defaultMessage: 'section',
  },
  allSupervisors: {
    id: `${scope}.codes.allSupervisors`,
    defaultMessage: 'allSupervisors',
  },
  allManagers: {
    id: `${scope}.codes.allManagers`,
    defaultMessage: 'allManagers',
  },
  departmentName: {
    id: `${scope}.codes.departmentName`,
    defaultMessage: 'departmentName',
  },
  jobName: {
    id: `${scope}.codes.jobName`,
    defaultMessage: 'jobName',
  },
  noEmployeeFound: {
    id: `${scope}.codes.noEmployeeFound`,
    defaultMessage: 'noEmployeeFound',
  },
  employeeName: {
    id: `${scope}.codes.employeeName`,
    defaultMessage: 'employeeName',
  },
  close: {
    id: `${scope}.codes.close`,
    defaultMessage: 'close',
  },
  save: {
    id: `${scope}.codes.save`,
    defaultMessage: 'save',
  },
  employeeCode: {
    id: `${scope}.codes.employeeCode`,
    defaultMessage: 'employeeCode',
  },
  uploadFileErrorMes: {
    id: `${scope}.codes.uploadFileErrorMes`,
    defaultMessage: 'uploadFileErrorMes',
  },
  uploadAttachment: {
    id: `${scope}.codes.uploadAttachment`,
    defaultMessage: 'uploadAttachment',
  },
  preview: {
    id: `${scope}.codes.preview`,
    defaultMessage: 'preview',
  },
  hrForm: {
    id: `${scope}.codes.hrForm`,
    defaultMessage: 'hrForm',
  },
  companyPolicy: {
    id: `${scope}.codes.companyPolicy`,
    defaultMessage: 'companyPolicy',
  },
  document: {
    id: `${scope}.codes.document`,
    defaultMessage: 'document',
  },

  // Company
  phone: {
    id: `${scope}.codes.phone`,
    defaultMessage: 'phone',
  },
  email: {
    id: `${scope}.codes.email`,
    defaultMessage: 'email',
  },
  address: {
    id: `${scope}.codes.address`,
    defaultMessage: 'address',
  },
  submit: {
    id: `${scope}.codes.submit`,
    defaultMessage: 'submit',
  },
  useGPS: {
    id: `${scope}.codes.useGPS`,
    defaultMessage: 'useGPS',
  },
  arabicOverview: {
    id: `${scope}.codes.arabicOverview`,
    defaultMessage: 'arabicOverview',
  },
  englishOverview: {
    id: `${scope}.codes.englishOverview`,
    defaultMessage: 'englishOverview',
  },
  cvarTitle: {
    id: `${scope}.codes.cvarTitle`,
    defaultMessage: 'cvarTitle',
  },
  cvarSubTitle: {
    id: `${scope}.codes.cvarSubTitle`,
    defaultMessage: 'cvarSubTitle',
  },
  cvenTitle: {
    id: `${scope}.codes.cvenTitle`,
    defaultMessage: 'cvenTitle',
  },
  cvenSubTitle: {
    id: `${scope}.codes.cvenSubTitle`,
    defaultMessage: 'cvenSubTitle',
  },
  apiKey: {
    id: `${scope}.codes.apiKey`,
    defaultMessage: 'apiKey',
  },
  fileSizeShouldBeLessThan10MB: {
    id: `${scope}.codes.fileSizeShouldBeLessThan10MB`,
    defaultMessage: 'fileSizeShouldBeLessThan10MB',
  },
  uploadLogo: {
    id: `${scope}.codes.uploadLogo`,
    defaultMessage: 'uploadLogo',
  },
  logoIsRequired: {
    id: `${scope}.codes.logoIsRequired`,
    defaultMessage: 'logoIsRequired',
  },
  IsDisclaimer: {
    id: `${scope}.codes.IsDisclaimer`,
    defaultMessage: 'Is Disclaimer',
  },
});
