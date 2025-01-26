import assessment from './modules/assessment.route';
import attendance from './modules/attendance.route';
import cvApplications from './modules/cvApplication.routes';
import employee from './modules/employee.route';
import global from './modules/global.route';
import humanResources from './modules/humanResources.route';
import kpi from './modules/kpi.route';
import mainData from './modules/mainData.route';
import medicalInsurance from './modules/medicalInsurance.route';
import payroll from './modules/payroll.route';
import projectManagement from './modules/projectManagement.route';
import recruitment from './modules/recruitment.route';
import setting from './modules/setting.route';
import smartObjective from './modules/smartObjective.route';
import socialInsurance from './modules/socialInsurance.route';
import survey from './modules/survey.route';
import themeComponents from './modules/themeComponents.route';
import training from './modules/training.route';
import vacation from './modules/vacation.route';
import workFlow from './modules/workFlow.route';

const PAGES = {
  assessment,
  smartObjective,
  attendance,
  cvApplications,
  employee,
  humanResources,
  kpi,
  mainData,
  medicalInsurance,
  payroll,
  projectManagement,
  recruitment,
  setting,
  socialInsurance,
  survey,
  training,
  vacation,
  workFlow,
  global,
  themeComponents,
};

export default PAGES;
