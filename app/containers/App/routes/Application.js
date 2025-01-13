import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../Templates/Dashboard';
import { ThemeContext } from '../ThemeWrapper';
import GeneralCodePages from './GeneralCodePages';
import PAGES from './pageListAsync';
import SITEMAP from './sitemap';

function Application(props) {
  const { history } = props;

  const changeMode = useContext(ThemeContext);

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route
          exact
          path={SITEMAP.global.AdminDashboard.route}
          component={PAGES.global.AdminDashboard}
        />

        <Route
          exact
          path={SITEMAP.global.NewsDetails.route}
          component={PAGES.global.NewsDetails}
        />

        <Route
          path={SITEMAP.auth.Profile.route}
          component={PAGES.global.Profile}
        />

        <Route
          path={SITEMAP.global.ManagementDashboard.route}
          component={PAGES.global.ManagementDashboard}
        />

        <Route
          path={SITEMAP.global.EmployeeDashboard.route}
          component={PAGES.global.EmployeeDashboard}
        />

        {/* Widgets */}
        <Route
          exact
          path='/app/widgets'
          component={PAGES.themeComponents.Parent}
        />

        {/* Layout */}
        <Route
          exact
          path='/app/layouts'
          component={PAGES.themeComponents.Parent}
        />

        {/* Table */}
        <Route
          exact
          path='/app/tables'
          component={PAGES.themeComponents.Parent}
        />
        <Route
          path='/app/tables/basic-table'
          component={PAGES.themeComponents.SimpleTable}
        />
        <Route
          path='/app/tables/data-table'
          component={PAGES.themeComponents.AdvancedTable}
        />
        <Route
          path='/app/tables/table-playground'
          component={PAGES.themeComponents.TablePlayground}
        />
        <Route
          path='/app/tables/editable-cell'
          component={PAGES.themeComponents.EditableCell}
        />
        <Route
          path='/app/tables/tree-table'
          component={PAGES.themeComponents.TreeTable}
        />

        {/* Form & Button */}
        <Route
          exact
          path='/app/forms'
          component={PAGES.themeComponents.Parent}
        />
        <Route
          path='/app/forms/reduxform'
          component={PAGES.themeComponents.ReduxForm}
        />
        <Route
          path='/app/forms/date-time-picker'
          component={PAGES.themeComponents.DateTimePicker}
        />
        <Route
          path='/app/forms/dial-button'
          component={PAGES.themeComponents.DialButton}
        />
        <Route
          path='/app/forms/checkbox-radio'
          component={PAGES.themeComponents.CheckboxRadio}
        />
        <Route
          path='/app/forms/switches'
          component={PAGES.themeComponents.Switches}
        />
        <Route
          path='/app/forms/selectbox'
          component={PAGES.themeComponents.Selectbox}
        />
        <Route
          path='/app/forms/slider-range'
          component={PAGES.themeComponents.SliderRange}
        />
        <Route
          path='/app/forms/buttons'
          component={PAGES.themeComponents.Buttons}
        />
        <Route
          path='/app/forms/toggle-button'
          component={PAGES.themeComponents.ToggleButton}
        />
        <Route
          path='/app/forms/textfields'
          component={PAGES.themeComponents.Textbox}
        />
        <Route
          path='/app/forms/autocomplete'
          component={PAGES.themeComponents.Autocomplete}
        />
        <Route
          path='/app/forms/upload'
          component={PAGES.themeComponents.Upload}
        />

        <Route
          path='/app/forms/wysiwyg-editor'
          component={PAGES.themeComponents.TextEditor}
        />

        {/* Ui Components */}
        <Route exact path='/app/ui' component={PAGES.themeComponents.Parent} />

        {/* Pages */}
        <Route
          exact
          path='/app/pages'
          component={PAGES.themeComponents.Parent}
        />

        <Route
          path={SITEMAP.global.NotFound.route}
          component={PAGES.global.NotFound}
        />

        <Route
          path={SITEMAP.global.Error.route}
          component={PAGES.global.Error}
        />

        <Route
          path={SITEMAP.global.Section.route}
          component={PAGES.global.Section}
        />

        {/* Main Data */}
        <Route
          path={SITEMAP.mainData.MdDocumentCategory.route}
          component={GeneralCodePages.MdDocumentCategory}
        />

        <Route
          path={SITEMAP.mainData.Grade.route}
          component={GeneralCodePages.Grade}
        />

        <Route
          path={SITEMAP.mainData.JobLevel.route}
          component={GeneralCodePages.JobLevel}
        />

        <Route
          path={SITEMAP.mainData.JobNatures.route}
          component={GeneralCodePages.JobNatures}
        />

        <Route
          path={SITEMAP.mainData.JobTypes.route}
          component={GeneralCodePages.JobTypes}
        />

        <Route
          path={SITEMAP.mainData.KinshipLink.route}
          component={GeneralCodePages.KinshipLink}
        />

        <Route
          path={SITEMAP.mainData.Month.route}
          component={GeneralCodePages.Month}
        />

        <Route
          path={SITEMAP.mainData.Year.route}
          component={GeneralCodePages.Year}
        />

        <Route
          path={SITEMAP.mainData.Nationalities.route}
          component={GeneralCodePages.Nationalities}
        />

        <Route
          path={SITEMAP.mainData.Qualifications.route}
          component={GeneralCodePages.Qualifications}
        />

        <Route
          path={SITEMAP.mainData.Religions.route}
          component={GeneralCodePages.Religions}
        />

        <Route
          path={SITEMAP.mainData.Salute.route}
          component={GeneralCodePages.Salute}
        />

        <Route
          path={SITEMAP.mainData.LicenseGrade.route}
          component={GeneralCodePages.LicenseGrade}
        />

        <Route
          path={SITEMAP.mainData.MilitaryStatus.route}
          component={GeneralCodePages.MilitaryStatus}
        />

        <Route
          path={SITEMAP.mainData.SocialStatus.route}
          component={GeneralCodePages.SocialStatus}
        />

        <Route
          path={SITEMAP.mainData.Government.route}
          component={PAGES.mainData.Government}
        />

        <Route
          path={SITEMAP.mainData.City.route}
          component={PAGES.mainData.City}
        />

        <Route
          path={SITEMAP.mainData.CompanyDocument.route}
          component={PAGES.mainData.CompanyDocument}
        />

        <Route
          path={SITEMAP.mainData.CompanyDocumentCreate.route}
          component={PAGES.mainData.CompanyDocumentCreate}
        />

        <Route
          path={SITEMAP.mainData.CompanyDocumentEdit.route}
          component={PAGES.mainData.CompanyDocumentCreate}
        />

        <Route
          path={SITEMAP.mainData.Currency.route}
          component={PAGES.mainData.Currency}
        />

        <Route
          path={SITEMAP.mainData.CurrencyRate.route}
          component={PAGES.mainData.CurrencyRate}
        />

        <Route
          path={SITEMAP.mainData.Documents.route}
          component={PAGES.mainData.Documents}
        />

        <Route
          path={SITEMAP.mainData.Gender.route}
          component={PAGES.mainData.Gender}
        />

        <Route
          path={SITEMAP.mainData.BusinessUnit.route}
          component={PAGES.mainData.BusinessUnit}
        />

        <Route
          path={SITEMAP.mainData.Job.route}
          component={PAGES.mainData.Jobs}
        />

        <Route
          path={SITEMAP.mainData.IdentityType.route}
          component={PAGES.mainData.IdentityType}
        />

        <Route
          path={SITEMAP.mainData.Bank.route}
          component={PAGES.mainData.Bank}
        />

        <Route
          path={SITEMAP.mainData.ContractType.route}
          component={PAGES.mainData.ContractType}
        />

        <Route
          path={SITEMAP.mainData.Company.route}
          component={PAGES.mainData.Company}
        />

        <Route
          path={SITEMAP.mainData.CompanyChart.route}
          component={PAGES.mainData.CompanyChart}
        />

        <Route
          path={SITEMAP.mainData.EmployeeChart.route}
          component={PAGES.mainData.EmployeeChart}
        />

        <Route
          path={SITEMAP.mainData.JobCreate.route}
          component={PAGES.mainData.CreateJob}
        />

        <Route
          path={SITEMAP.mainData.JobEdit.route}
          component={PAGES.mainData.EditJob}
        />

        <Route
          path={SITEMAP.mainData.Organization.route}
          component={PAGES.mainData.Organization}
        />

        <Route
          path={SITEMAP.mainData.OrganizationCreate.route}
          component={PAGES.mainData.CreateOrganization}
        />

        <Route
          path={SITEMAP.mainData.OrganizationEdit.route}
          component={PAGES.mainData.EditOrganization}
        />

        <Route
          path={SITEMAP.mainData.UploadEmployeeData.route}
          component={PAGES.mainData.UploadEmployeeData}
        />

        <Route
          path={SITEMAP.mainData.Guarantor.route}
          component={PAGES.mainData.Guarantor}
        />

        <Route
          path={SITEMAP.mainData.GuarantorCreate.route}
          component={PAGES.mainData.CreatGuarantor}
        />

        <Route
          path={SITEMAP.mainData.GuarantorEdit.route}
          component={PAGES.mainData.EditGuarantor}
        />

        {/* Setting */}
        <Route
          path={SITEMAP.setting.ChangePassword.route}
          component={PAGES.setting.ChangePassword}
        />

        <Route
          path={SITEMAP.setting.UserMenu.route}
          component={PAGES.setting.UserMenu}
        />

        <Route
          path={SITEMAP.setting.MailSetting.route}
          component={PAGES.setting.MailSetting}
        />

        <Route
          path={SITEMAP.setting.SMSSetting.route}
          component={PAGES.setting.SMSSetting}
        />

        <Route
          path={SITEMAP.setting.SettingMailSmsForm.route}
          component={PAGES.setting.SettingMailSmsForm}
        />

        <Route
          path={SITEMAP.setting.OpenCloseMonth.route}
          component={PAGES.setting.OpenCloseMonth}
        />

        <Route
          path={SITEMAP.setting.HrPermission.route}
          component={PAGES.setting.HrPermission}
        />

        <Route
          path={SITEMAP.setting.PrintForm.route}
          component={PAGES.setting.PrintForm}
        />

        <Route
          path={SITEMAP.setting.SettingMailSmsFormCreate.route}
          component={PAGES.setting.SettingMailSmsFormCreate}
        />

        <Route
          path={SITEMAP.setting.SettingMailSmsFormEdit.route}
          component={PAGES.setting.SettingMailSmsFormCreate}
        />

        <Route
          path={SITEMAP.setting.CertificateSetting.route}
          component={PAGES.setting.CertificateSetting}
        />

        <Route
          path={SITEMAP.setting.ResetPassword.route}
          component={PAGES.setting.SettingResetPassword}
        />

        <Route
          path={SITEMAP.setting.LogReport.route}
          component={PAGES.setting.LogReport}
        />

        {/* Human Resources */}
        <Route
          path={SITEMAP.humanResources.ResignReason.route}
          component={GeneralCodePages.ResignReason}
        />

        <Route
          path={SITEMAP.humanResources.CourseType.route}
          component={GeneralCodePages.CourseType}
        />

        <Route
          path={SITEMAP.humanResources.CourseList.route}
          component={PAGES.humanResources.Courses}
        />

        <Route
          path={SITEMAP.humanResources.CourseListCreate.route}
          component={PAGES.humanResources.CoursesCreate}
        />

        <Route
          path={SITEMAP.humanResources.CourseListEdit.route}
          component={PAGES.humanResources.CoursesCreate}
        />

        <Route
          path={SITEMAP.humanResources.TrainingCenterList.route}
          component={PAGES.humanResources.TrainingCenter}
        />

        <Route
          path={SITEMAP.humanResources.TrainingCenterListCreate.route}
          component={PAGES.humanResources.TrainingCenterCreate}
        />

        <Route
          path={SITEMAP.humanResources.TrainingCenterListEdit.route}
          component={PAGES.humanResources.TrainingCenterCreate}
        />

        <Route
          path={SITEMAP.humanResources.Rewards.route}
          component={PAGES.humanResources.Rewards}
        />

        <Route
          path={SITEMAP.humanResources.Penalty.route}
          component={PAGES.humanResources.Penalty}
        />

        <Route
          path={SITEMAP.humanResources.PenaltyCreate.route}
          component={PAGES.humanResources.PenaltyCreate}
        />

        <Route
          path={SITEMAP.humanResources.PenaltyEdit.route}
          component={PAGES.humanResources.PenaltyCreate}
        />

        <Route
          path={SITEMAP.humanResources.RewardTrans.route}
          component={PAGES.humanResources.RewardTransList}
        />

        <Route
          path={SITEMAP.humanResources.RewardTransCreate.route}
          component={PAGES.humanResources.RewardTransCreate}
        />

        <Route
          path={SITEMAP.humanResources.RewardTransEdit.route}
          component={PAGES.humanResources.RewardTransCreate}
        />

        <Route
          path={SITEMAP.humanResources.PenaltyTrans.route}
          component={PAGES.humanResources.PenaltyTransList}
        />

        <Route
          path={SITEMAP.humanResources.PenaltyTransCreate.route}
          component={PAGES.humanResources.PenaltyTransCreate}
        />

        <Route
          path={SITEMAP.humanResources.PenaltyTransEdit.route}
          component={PAGES.humanResources.PenaltyTransCreate}
        />

        <Route
          path={SITEMAP.humanResources.Attention.route}
          component={PAGES.humanResources.AttentionList}
        />

        <Route
          path={SITEMAP.humanResources.AttentionCreate.route}
          component={PAGES.humanResources.AttentionCreate}
        />

        <Route
          path={SITEMAP.humanResources.AttentionEdit.route}
          component={PAGES.humanResources.AttentionCreate}
        />

        <Route
          path={SITEMAP.humanResources.LayOffNotice.route}
          component={PAGES.humanResources.LayOffNoticeList}
        />

        <Route
          path={SITEMAP.humanResources.LayOffNoticeList.route}
          component={PAGES.humanResources.LayOffNoticeList}
        />

        <Route
          path={SITEMAP.humanResources.LayOffNoticeCreate.route}
          component={PAGES.humanResources.LayOffNoticeCreate}
        />

        <Route
          path={SITEMAP.humanResources.LayOffNoticeEdit.route}
          component={PAGES.humanResources.LayOffNoticeCreate}
        />

        <Route
          path={SITEMAP.humanResources.Promotions.route}
          component={PAGES.humanResources.PromotionsList}
        />

        <Route
          path={SITEMAP.humanResources.PromotionsCreate.route}
          component={PAGES.humanResources.PromotionsCreate}
        />

        <Route
          path={SITEMAP.humanResources.PromotionsEdit.route}
          component={PAGES.humanResources.PromotionsCreate}
        />

        <Route
          path={SITEMAP.humanResources.DirectManager.route}
          component={PAGES.humanResources.DirectManager}
        />

        <Route
          path={SITEMAP.humanResources.Explanation.route}
          component={PAGES.humanResources.ExplanationList}
        />

        <Route
          path={SITEMAP.humanResources.ExplanationEdit.route}
          component={PAGES.humanResources.ExplanationEdit}
        />

        <Route
          path={SITEMAP.humanResources.OrganizationManger.route}
          component={PAGES.humanResources.OrganizationManger}
        />

        <Route
          path={SITEMAP.humanResources.News.route}
          component={PAGES.humanResources.NewsList}
        />

        <Route
          path={SITEMAP.humanResources.NewsCreate.route}
          component={PAGES.humanResources.NewsCreate}
        />

        <Route
          path={SITEMAP.humanResources.NewsEdit.route}
          component={PAGES.humanResources.NewsCreate}
        />

        <Route
          path={SITEMAP.humanResources.PromotionsReport.route}
          component={PAGES.humanResources.PromotionsReport}
        />

        <Route
          path={SITEMAP.humanResources.ExplanationReport.route}
          component={PAGES.humanResources.ExplanationReport}
        />

        <Route
          path={SITEMAP.humanResources.ResignationReport.route}
          component={PAGES.humanResources.ResignationReport}
        />

        <Route
          path={SITEMAP.exp.Complaint.route}
          component={PAGES.humanResources.Complaint}
        />

        <Route
          path={SITEMAP.exp.HrLetter.route}
          component={PAGES.humanResources.HrLetter}
        />

        <Route
          path={SITEMAP.exp.NewIdea.route}
          component={PAGES.humanResources.NewIdea}
        />

        <Route
          path={SITEMAP.humanResources.CustodyCategory.route}
          component={PAGES.humanResources.CustodyCategory}
        />

        <Route
          path={SITEMAP.humanResources.Custody.route}
          component={PAGES.humanResources.Custody}
        />

        <Route
          path={SITEMAP.humanResources.CustodyDelivery.route}
          component={PAGES.humanResources.CustodyDeliveryList}
        />

        <Route
          path={SITEMAP.humanResources.CustodyDeliveryCreate.route}
          component={PAGES.humanResources.CustodyDeliveryCreate}
        />

        <Route
          path={SITEMAP.humanResources.CustodyDeliveryEdit.route}
          component={PAGES.humanResources.CustodyDeliveryCreate}
        />

        <Route
          path={SITEMAP.humanResources.CustodyReceive.route}
          component={PAGES.humanResources.CustodyReceiveList}
        />

        <Route
          path={SITEMAP.humanResources.CustodyReceiveCreate.route}
          component={PAGES.humanResources.CustodyReceiveCreate}
        />

        <Route
          path={SITEMAP.humanResources.CustodyReceiveEdit.route}
          component={PAGES.humanResources.CustodyReceiveCreate}
        />

        <Route
          path={SITEMAP.humanResources.CustodyDeliveryReport.route}
          component={PAGES.humanResources.CustodyDeliveryReport}
        />

        <Route
          path={SITEMAP.humanResources.CustodyReceiveReport.route}
          component={PAGES.humanResources.CustodyReceiveReport}
        />

        <Route
          path={SITEMAP.humanResources.Uniform.route}
          component={PAGES.humanResources.Uniform}
        />

        <Route
          path={SITEMAP.humanResources.UniformDelivery.route}
          component={PAGES.humanResources.UniformDeliveryList}
        />

        <Route
          path={SITEMAP.humanResources.UniformDeliveryCreate.route}
          component={PAGES.humanResources.UniformDeliveryCreate}
        />

        <Route
          path={SITEMAP.humanResources.UniformDeliveryEdit.route}
          component={PAGES.humanResources.UniformDeliveryCreate}
        />

        <Route
          path={SITEMAP.humanResources.UniformReceive.route}
          component={PAGES.humanResources.UniformReceiveList}
        />

        <Route
          path={SITEMAP.humanResources.UniformReceiveCreate.route}
          component={PAGES.humanResources.UniformReceiveCreate}
        />

        <Route
          path={SITEMAP.humanResources.UniformReceiveEdit.route}
          component={PAGES.humanResources.UniformReceiveCreate}
        />

        <Route
          path={SITEMAP.humanResources.UniformDeliveryReport.route}
          component={PAGES.humanResources.UniformDeliveryReport}
        />

        <Route
          path={SITEMAP.humanResources.UniformReceiveReport.route}
          component={PAGES.humanResources.UniformReceiveReport}
        />

        <Route
          path={SITEMAP.humanResources.ResignTrx.route}
          component={PAGES.humanResources.ResignTrxList}
        />

        <Route
          path={SITEMAP.humanResources.ResignTrxCreate.route}
          component={PAGES.humanResources.ResignTrxCreate}
        />

        <Route
          path={SITEMAP.humanResources.ResignTrxEdit.route}
          component={PAGES.humanResources.ResignTrxCreate}
        />

        <Route
          path={SITEMAP.humanResources.ResignTrxReport.route}
          component={PAGES.humanResources.ResignTrxReport}
        />

        <Route
          path={SITEMAP.humanResources.ManPowerSetting.route}
          component={PAGES.humanResources.ManPowerSetting}
        />

        <Route
          path={SITEMAP.humanResources.ResignTrxImport.route}
          component={PAGES.humanResources.ResignTrxImport}
        />

        <Route
          path={SITEMAP.humanResources.EmpCourse.route}
          component={PAGES.humanResources.EmpCourseList}
        />

        <Route
          path={SITEMAP.humanResources.EmpCourseCreate.route}
          component={PAGES.humanResources.EmpCourseCreate}
        />

        <Route
          path={SITEMAP.humanResources.EmpCourseEdit.route}
          component={PAGES.humanResources.EmpCourseCreate}
        />

        <Route
          path={SITEMAP.humanResources.EmpCourseReport.route}
          component={PAGES.humanResources.EmpCourseReport}
        />

        <Route
          path={SITEMAP.humanResources.RewardTransReport.route}
          component={PAGES.humanResources.RewardTransReport}
        />

        <Route
          path={SITEMAP.humanResources.PenaltyTransReport.route}
          component={PAGES.humanResources.PenaltyTransReport}
        />

        <Route
          path={SITEMAP.humanResources.AttentionReport.route}
          component={PAGES.humanResources.AttentionReport}
        />

        <Route
          path={SITEMAP.humanResources.LayOffNoticeReport.route}
          component={PAGES.humanResources.LayOffNoticeReport}
        />

        <Route
          path={SITEMAP.humanResources.Items.route}
          component={PAGES.humanResources.Items}
        />

        <Route
          path={SITEMAP.humanResources.ResignReqTrxCreate.route}
          component={PAGES.humanResources.ResignReqTrxCreate}
        />

        <Route
          path={SITEMAP.humanResources.ResignReqTrxEdit.route}
          component={PAGES.humanResources.ResignReqTrxEdit}
        />

        <Route
          path={SITEMAP.humanResources.ResignReqTrx.route}
          component={PAGES.humanResources.ResignReqTrxList}
        />

        <Route
          path={SITEMAP.humanResources.HrEmployeeDocumentTrxCreate.route}
          component={PAGES.humanResources.HrEmployeeDocumentTrxCreate}
        />

        <Route
          path={SITEMAP.humanResources.HrEmployeeDocumentTrxEdit.route}
          component={PAGES.humanResources.HrEmployeeDocumentTrxEdit}
        />

        <Route
          path={SITEMAP.humanResources.HrEmployeeDocumentTrx.route}
          component={PAGES.humanResources.HrEmployeeDocumentTrxList}
        />

        <Route
          path={SITEMAP.humanResources.ManPowerReport.route}
          component={PAGES.humanResources.ManPowerReport}
        />

        <Route
          path={SITEMAP.humanResources.EmpInvestigation.route}
          component={PAGES.humanResources.EmpInvestigation}
        />

        <Route
          path={SITEMAP.humanResources.EmpInvestigationCreate.route}
          component={PAGES.humanResources.EmpInvestigationCreate}
        />

        <Route
          path={SITEMAP.humanResources.EmpInvestigationEdit.route}
          component={PAGES.humanResources.EmpInvestigationEdit}
        />

        <Route
          path={SITEMAP.humanResources.TransferRequest.route}
          component={PAGES.humanResources.TransferRequest}
        />

        <Route
          path={SITEMAP.humanResources.TransferRequestCreate.route}
          component={PAGES.humanResources.TransferRequestCreate}
        />

        <Route
          path={SITEMAP.humanResources.TransferRequestEdit.route}
          component={PAGES.humanResources.TransferRequestEdit}
        />

        <Route
          path={SITEMAP.humanResources.PenaltyApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.humanResources.TransferRequestApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.humanResources.RewardsApproval.route}
          component={PAGES.workFlow.RequestsList}
        />
        <Route
          path={SITEMAP.humanResources.UniformApproval.route}
          component={PAGES.workFlow.RequestsList}
        />
        <Route
          path={SITEMAP.humanResources.CustodyApproval.route}
          component={PAGES.workFlow.RequestsList}
        />
        <Route
          path={SITEMAP.humanResources.ResignApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.humanResources.DocumentApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        {/* Attendance */}
        <Route
          path={SITEMAP.attendance.PermissionTrx.route}
          component={PAGES.attendance.PermissionTrxList}
        />

        <Route
          path={SITEMAP.attendance.PermissionApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.attendance.OvertimeApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.attendance.ShiftSwapApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.attendance.ForgotFingerprintApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.attendance.PermissionTrxCreate.route}
          component={PAGES.attendance.PermissionTrxCreate}
        />

        <Route
          path={SITEMAP.attendance.PermissionTrxEdit.route}
          component={PAGES.attendance.PermissionTrxCreate}
        />

        <Route
          path={SITEMAP.attendance.PermissionTrxReport.route}
          component={PAGES.attendance.PermissionTrxReport}
        />

        <Route
          path={SITEMAP.attendance.MissionTransportaion.route}
          component={PAGES.attendance.MissionTransportaion}
        />

        <Route
          path={SITEMAP.attendance.Permission.route}
          component={PAGES.attendance.PermissionList}
        />

        <Route
          path={SITEMAP.attendance.PermissionCreate.route}
          component={PAGES.attendance.PermissionCreate}
        />

        <Route
          path={SITEMAP.attendance.PermissionEdit.route}
          component={PAGES.attendance.PermissionCreate}
        />

        <Route
          path={SITEMAP.attendance.PermissionTrxImport.route}
          component={PAGES.attendance.PermissionTrxImport}
        />

        <Route
          path={SITEMAP.attendance.CollectedPermission.route}
          component={PAGES.attendance.CollectedPermission}
        />

        <Route
          path={SITEMAP.attendance.MissionType.route}
          component={PAGES.attendance.MissionType}
        />

        <Route
          path={SITEMAP.attendance.MissionTypeCreate.route}
          component={PAGES.attendance.MissionTypeCreate}
        />

        <Route
          path={SITEMAP.attendance.MissionTypeEdit.route}
          component={PAGES.attendance.MissionTypeEdit}
        />

        <Route
          path={SITEMAP.attendance.Shift.route}
          component={PAGES.attendance.ShiftList}
        />

        <Route
          path={SITEMAP.attendance.ShiftManPower.route}
          component={PAGES.attendance.ShiftManPower}
        />

        <Route
          path={SITEMAP.attendance.ShiftCreate.route}
          component={PAGES.attendance.ShiftCreate}
        />

        <Route
          path={SITEMAP.attendance.ShiftEdit.route}
          component={PAGES.attendance.ShiftCreate}
        />

        <Route
          path={SITEMAP.attendance.SwapShiftTrx.route}
          component={PAGES.attendance.SwapShiftTrx}
        />

        <Route
          path={SITEMAP.attendance.SwapShiftTrxCreate.route}
          component={PAGES.attendance.SwapShiftTrxCreate}
        />

        <Route
          path={SITEMAP.attendance.ShiftEmployee.route}
          component={PAGES.attendance.ShiftEmployeeList}
        />

        <Route
          path={SITEMAP.attendance.ShiftEmployeeCreate.route}
          component={PAGES.attendance.ShiftEmployeeCreate}
        />

        <Route
          path={SITEMAP.attendance.ShiftEmployeeEdit.route}
          component={PAGES.attendance.ShiftEmployeeCreate}
        />

        <Route
          path={SITEMAP.attendance.ShiftOrgnization.route}
          component={PAGES.attendance.ShiftOrgnization}
        />

        <Route
          path={SITEMAP.attendance.ShiftTransfere.route}
          component={PAGES.attendance.ShiftTransfere}
        />

        <Route
          path={SITEMAP.attendance.ShiftReview.route}
          component={PAGES.attendance.ShiftReview}
        />

        <Route
          path={SITEMAP.attendance.ShiftImport.route}
          component={PAGES.attendance.ShiftImport}
        />

        <Route
          path={SITEMAP.attendance.MissionTrx.route}
          component={PAGES.attendance.MissionTrxList}
        />

        <Route
          path={SITEMAP.attendance.MissionApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.attendance.MissionTrxCreate.route}
          component={PAGES.attendance.MissionTrxCreate}
        />

        <Route
          path={SITEMAP.attendance.MissionTrxEdit.route}
          component={PAGES.attendance.MissionTrxCreate}
        />

        <Route
          path={SITEMAP.attendance.MissionTrxReport.route}
          component={PAGES.attendance.MissionTrxReport}
        />

        <Route
          path={SITEMAP.attendance.MissionTrxImport.route}
          component={PAGES.attendance.MissionTrxImport}
        />

        <Route
          path={SITEMAP.attendance.CollectedMission.route}
          component={PAGES.attendance.CollectedMission}
        />

        <Route
          path={SITEMAP.attendance.Rules.route}
          component={PAGES.attendance.RulesList}
        />

        <Route
          path={SITEMAP.attendance.RulesCreate.route}
          component={PAGES.attendance.RulesCreate}
        />

        <Route
          path={SITEMAP.attendance.RulesEdit.route}
          component={PAGES.attendance.RulesCreate}
        />

        <Route
          path={SITEMAP.attendance.Device.route}
          component={PAGES.attendance.DeviceList}
        />

        <Route
          path={SITEMAP.attendance.DeviceCreate.route}
          component={PAGES.attendance.DeviceCreate}
        />

        <Route
          path={SITEMAP.attendance.DeviceEdit.route}
          component={PAGES.attendance.DeviceCreate}
        />

        <Route
          path={SITEMAP.attendance.MissionReport.route}
          component={PAGES.attendance.MissionReport}
        />

        <Route
          path={SITEMAP.attendance.EmployeeShiftReport.route}
          component={PAGES.attendance.EmployeeShiftReport}
        />

        <Route
          path={SITEMAP.attendance.DetailedReportAbsences.route}
          component={PAGES.attendance.DetailedReportAbsences}
        />

        <Route
          path={SITEMAP.attendance.EmployeesWithoutShiftsReport.route}
          component={PAGES.attendance.EmployeesWithoutShiftsReport}
        />

        <Route
          path={SITEMAP.attendance.OverTimeDetailsReport.route}
          component={PAGES.attendance.OverTimeDetailsReport}
        />

        <Route
          path={SITEMAP.attendance.AbsenceReport.route}
          component={PAGES.attendance.AbsenceReport}
        />

        <Route
          path={SITEMAP.attendance.EarlyAttendanceReport.route}
          component={PAGES.attendance.EarlyAttendanceReport}
        />

        <Route
          path={SITEMAP.attendance.ReviewOvertime.route}
          component={PAGES.attendance.ReviewOvertime}
        />

        <Route
          path={SITEMAP.attendance.RemoveEmployeeSign.route}
          component={PAGES.attendance.RemoveEmployeeSign}
        />

        <Route
          path={SITEMAP.attendance.EmployeeAttendance.route}
          component={PAGES.attendance.EmployeeAttendance}
        />

        <Route
          path={SITEMAP.attendance.EmployeeLocation.route}
          component={PAGES.attendance.EmployeeLocation}
        />

        <Route
          path={SITEMAP.attendance.DataFromAllDevices.route}
          component={PAGES.attendance.DataFromAllDevices}
        />

        <Route
          path={SITEMAP.attendance.GetAttLog.route}
          component={PAGES.attendance.GetAttLog}
        />

        <Route
          path={SITEMAP.attendance.OvertimeHoursRequest.route}
          component={PAGES.attendance.OvertimeHoursRequest}
        />

        <Route
          path={SITEMAP.attendance.OvertimeHoursRequestCreate.route}
          component={PAGES.attendance.OvertimeHoursRequestCreate}
        />

        <Route
          path={SITEMAP.attendance.OvertimeHoursRequestEdit.route}
          component={PAGES.attendance.OvertimeHoursRequestCreate}
        />

        <Route
          path={SITEMAP.attendance.EarlyLeavingReport.route}
          component={PAGES.attendance.EarlyLeavingReport}
        />

        <Route
          path={SITEMAP.attendance.EmployeeLessTimeReport.route}
          component={PAGES.attendance.EmployeeLessTimeReport}
        />

        <Route
          path={SITEMAP.attendance.EmployeeAttendanceTemplate.route}
          component={PAGES.attendance.EmployeeAttendanceTemplateReport}
        />

        <Route
          path={SITEMAP.attendance.ManHoursReport.route}
          component={PAGES.attendance.ManHoursReport}
        />

        <Route
          path={SITEMAP.attendance.AttendanceRatioReport.route}
          component={PAGES.attendance.AttendanceRatioReport}
        />

        <Route
          path={SITEMAP.attendance.MonthlyAttendanceReport.route}
          component={PAGES.attendance.MonthlyAttendanceReport}
        />

        <Route
          path={SITEMAP.attendance.AttendanceDeviceReport.route}
          component={PAGES.attendance.AttendanceDeviceReport}
        />

        <Route
          path={SITEMAP.attendance.ContinuousAbsenceReport.route}
          component={PAGES.attendance.ContinuousAbsenceReport}
        />

        <Route
          path={SITEMAP.attendance.RegisterInAndOutReport.route}
          component={PAGES.attendance.RegisterInAndOutReport}
        />

        <Route
          path={SITEMAP.attendance.ManualAttendanceReport.route}
          component={PAGES.attendance.ManualAttendanceReport}
        />

        <Route
          path={SITEMAP.attendance.GetBreakTimeReport.route}
          component={PAGES.attendance.BreakTimeReport}
        />

        <Route
          path={SITEMAP.attendance.StatisticalReport2.route}
          component={PAGES.attendance.StatisticalReport2}
        />

        <Route
          path={SITEMAP.attendance.WorkinHoursByTime.route}
          component={PAGES.attendance.WorkinHoursByTimeReport}
        />

        <Route
          path={SITEMAP.attendance.OverTimeReport.route}
          component={PAGES.attendance.OverTimeReport}
        />

        <Route
          path={SITEMAP.attendance.WorkinLeavesDetailsReport.route}
          component={PAGES.attendance.WorkinLeavesDetailsReport}
        />

        <Route
          path={SITEMAP.attendance.OverTimeDayNightReport.route}
          component={PAGES.attendance.OverTimeDayNightReport}
        />

        <Route
          path={SITEMAP.attendance.WorkinLeavesReport.route}
          component={PAGES.attendance.WorkinLeavesReport}
        />

        <Route
          path={SITEMAP.attendance.CalculateAttendance.route}
          component={PAGES.attendance.CalculateAttendance}
        />

        <Route
          path={SITEMAP.attendance.LateAttendanceReport.route}
          component={PAGES.attendance.LateAttendanceReport}
        />

        <Route
          path={SITEMAP.attendance.TimeTableDetailsReportReview.route}
          component={PAGES.attendance.DetailedAttendanceReview}
        />

        <Route
          path={SITEMAP.attendance.TimeTableDetailsReport.route}
          component={PAGES.attendance.DetailedAttendanceReport}
        />

        <Route
          path={SITEMAP.attendance.MonthlyAttSummaryReport.route}
          component={PAGES.attendance.MonthlyAttendanceSummaryReport}
        />

        <Route
          path={SITEMAP.attendance.MonthlyStatisticsReport.route}
          component={PAGES.attendance.MonthlyStatisticsReport}
        />

        <Route
          path={SITEMAP.attendance.AttLogReport.route}
          component={PAGES.attendance.DeviceLogReport}
        />

        <Route
          path={SITEMAP.attendance.TimeAttendRatio.route}
          component={PAGES.attendance.AttendanceRatiosStatementsReport}
        />

        <Route
          path={SITEMAP.attendance.RegisterLocation.route}
          component={PAGES.attendance.RegisterLocation}
        />

        <Route
          path={SITEMAP.attendance.RegisterLocationCreate.route}
          component={PAGES.attendance.RegisterLocationCreate}
        />

        <Route
          path={SITEMAP.attendance.RegisterLocationEdit.route}
          component={PAGES.attendance.RegisterLocationEdit}
        />

        <Route
          path={SITEMAP.attendance.GPSAttendance.route}
          component={PAGES.attendance.GPSAttendance}
        />

        <Route
          path={SITEMAP.attendance.LocationAttendanceReport.route}
          component={PAGES.attendance.LocationAttendanceReport}
        />

        <Route
          path={SITEMAP.attendance.EmployeeLocationReport.route}
          component={PAGES.attendance.EmployeeLocationReport}
        />

        <Route
          path={SITEMAP.attendance.ShiftManPowerReport.route}
          component={PAGES.attendance.ShiftManPowerReport}
        />

        <Route
          path={SITEMAP.attendance.ForgotFingerprintRequest.route}
          component={PAGES.attendance.ForgotFingerprintRequest}
        />

        <Route
          path={SITEMAP.attendance.ForgotFingerprintRequestCreate.route}
          component={PAGES.attendance.ForgotFingerprintRequestCreate}
        />

        <Route
          path={SITEMAP.attendance.ForgotFingerprintRequestEdit.route}
          component={PAGES.attendance.ForgotFingerprintRequestEdit}
        />

        <Route
          path={SITEMAP.attendance.EmployeeSchedule.route}
          component={PAGES.attendance.EmployeeSchedule}
        />

        {/* Payroll */}
        <Route
          path={SITEMAP.payroll.LoanApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.payroll.LoanSetting.route}
          component={PAGES.payroll.LoanSetting}
        />

        <Route
          path={SITEMAP.payroll.PayTemplate.route}
          component={PAGES.payroll.PayTemplateList}
        />

        <Route
          path={SITEMAP.payroll.PayTemplateCreate.route}
          component={PAGES.payroll.PayTemplateCreate}
        />

        <Route
          path={SITEMAP.payroll.PayTemplateEdit.route}
          component={PAGES.payroll.PayTemplateCreate}
        />

        <Route
          path={SITEMAP.payroll.ElementTaxIns.route}
          component={PAGES.payroll.ElementTaxIns}
        />

        <Route
          path={SITEMAP.payroll.SalaryStructure.route}
          component={PAGES.payroll.SalaryStructureList}
        />

        <Route
          path={SITEMAP.payroll.SalaryStructureCreate.route}
          component={PAGES.payroll.SalaryStructureCreate}
        />

        <Route
          path={SITEMAP.payroll.SalaryStructureEdit.route}
          component={PAGES.payroll.SalaryStructureCreate}
        />

        <Route
          path={SITEMAP.payroll.Elements.route}
          component={PAGES.payroll.ElementsList}
        />

        <Route
          path={SITEMAP.payroll.ElementsCreate.route}
          component={PAGES.payroll.ElementsCreate}
        />

        <Route
          path={SITEMAP.payroll.ElementsEdit.route}
          component={PAGES.payroll.ElementsCreate}
        />

        <Route
          path={SITEMAP.payroll.ElementVal.route}
          component={PAGES.payroll.ElementValList}
        />

        <Route
          path={SITEMAP.payroll.ElementValHistory.route}
          component={PAGES.payroll.ElementValHistory}
        />

        <Route
          path={SITEMAP.payroll.ElementValCreate.route}
          component={PAGES.payroll.ElementValCreate}
        />

        <Route
          path={SITEMAP.payroll.ElementValEdit.route}
          component={PAGES.payroll.ElementValCreate}
        />

        <Route
          path={SITEMAP.payroll.ElementVlaImport.route}
          component={PAGES.payroll.ElementVlaImport}
        />

        <Route
          path={SITEMAP.payroll.LoanTrx.route}
          component={PAGES.payroll.LoanTrxList}
        />

        <Route
          path={SITEMAP.payroll.LoanTrxCreate.route}
          component={PAGES.payroll.LoanTrxCreate}
        />

        <Route
          path={SITEMAP.payroll.LoanTrxEdit.route}
          component={PAGES.payroll.LoanTrxCreate}
        />

        <Route
          path={SITEMAP.payroll.LoanPostpone.route}
          component={PAGES.payroll.LoanPostpone}
        />

        <Route
          path={SITEMAP.payroll.LoanReq.route}
          component={PAGES.payroll.LoanReqList}
        />

        <Route
          path={SITEMAP.payroll.LoanReqCreate.route}
          component={PAGES.payroll.LoanReqCreate}
        />

        <Route
          path={SITEMAP.payroll.LoanReqEdit.route}
          component={PAGES.payroll.LoanReqCreate}
        />

        <Route
          path={SITEMAP.payroll.PurchaseTrx.route}
          component={PAGES.payroll.PurchaseTrxList}
        />

        <Route
          path={SITEMAP.payroll.PurchaseTrxCreate.route}
          component={PAGES.payroll.PurchaseTrxCreate}
        />

        <Route
          path={SITEMAP.payroll.PurchaseTrxEdit.route}
          component={PAGES.payroll.PurchaseTrxCreate}
        />

        <Route
          path={SITEMAP.payroll.BranchSalarySetting.route}
          component={PAGES.payroll.BranchSalarySetting}
        />

        <Route
          path={SITEMAP.payroll.SalaryCalculation.route}
          component={PAGES.payroll.SalaryCalculation}
        />

        <Route
          path={SITEMAP.payroll.SummaryPayslip.route}
          component={PAGES.payroll.SummaryPayslip}
        />

        <Route
          path={SITEMAP.payroll.ElementReviewReport.route}
          component={PAGES.payroll.ElementReviewReport}
        />

        <Route
          path={SITEMAP.payroll.SalaryComparisonReport.route}
          component={PAGES.payroll.SalaryComparisonReport}
        />

        <Route
          path={SITEMAP.payroll.PaymentSlipReview.route}
          component={PAGES.payroll.PaymentSlipReview}
        />

        <Route
          path={SITEMAP.payroll.PaymentSlip.route}
          component={PAGES.payroll.PaymentSlip}
        />

        <Route
          path={SITEMAP.payroll.MonthlyVariablesReport.route}
          component={PAGES.payroll.MonthlyVariablesReport}
        />

        <Route
          path={SITEMAP.payroll.DetailedPayrollReport.route}
          component={PAGES.payroll.DetailedPayrollReport}
        />

        <Route
          path={SITEMAP.payroll.BankList.route}
          component={PAGES.payroll.BankList}
        />

        <Route
          path={SITEMAP.payroll.AnnualTaxReport.route}
          component={PAGES.payroll.AnnualTaxReport}
        />

        <Route
          path={SITEMAP.payroll.PaymentSlipTotalReview.route}
          component={PAGES.payroll.PaymentSlipTotalReview}
        />

        <Route
          path={SITEMAP.payroll.PaymentSlipTotal.route}
          component={PAGES.payroll.PaymentSlipTotal}
        />

        <Route
          path={SITEMAP.payroll.SalaryReport.route}
          component={PAGES.payroll.SalaryReport}
        />

        <Route
          path={SITEMAP.payroll.FollowEmployeeReport.route}
          component={PAGES.payroll.FollowEmployeeReport}
        />

        <Route
          path={SITEMAP.payroll.TaxReportReport.route}
          component={PAGES.payroll.TaxReportReport}
        />

        <Route
          path={SITEMAP.payroll.TotalDeptSalaryReport.route}
          component={PAGES.payroll.TotalDeptSalaryReport}
        />

        <Route
          path={SITEMAP.payroll.SalaryYearReport.route}
          component={PAGES.payroll.SalaryYearReport}
        />

        <Route
          path={SITEMAP.payroll.SalarySigningListReport.route}
          component={PAGES.payroll.SalarySigningListReport}
        />

        <Route
          path={SITEMAP.payroll.LoanReport.route}
          component={PAGES.payroll.LoanReport}
        />

        {/* WorkFlow */}
        <Route
          path={SITEMAP.workFlow.WorkFlow.route}
          component={PAGES.workFlow.WorkFlowList}
        />

        <Route
          path={SITEMAP.workFlow.WorkFlowCreate.route}
          component={PAGES.workFlow.WorkFlowCreate}
        />

        <Route
          path={SITEMAP.workFlow.WorkFlowEdit.route}
          component={PAGES.workFlow.WorkFlowCreate}
        />

        <Route
          path={SITEMAP.workFlow.RequestsList.route}
          component={PAGES.workFlow.RequestsList}
        />

        {/* Employee */}
        <Route
          path={SITEMAP.employee.EmployeeList.route}
          component={PAGES.employee.EmployeeList}
        />

        <Route
          path={SITEMAP.employee.AdEmployeeImport.route}
          component={PAGES.employee.AdEmployeeImport}
        />

        <Route
          path={SITEMAP.employee.EmployeeData.route}
          component={PAGES.employee.EmployeeData}
        />

        <Route
          path={SITEMAP.employee.Personal.route}
          component={PAGES.employee.Personal}
        />

        <Route
          path={SITEMAP.employee.EmployeeAddress.route}
          component={PAGES.employee.EmployeeAddress}
        />

        <Route
          path={SITEMAP.employee.EmployeeCourse.route}
          component={PAGES.employee.EmployeeCourse}
        />

        <Route
          path={SITEMAP.employee.EmployeeExperince.route}
          component={PAGES.employee.EmployeeExperince}
        />

        <Route
          path={SITEMAP.employee.EmployeeInsurance.route}
          component={PAGES.employee.EmployeeInsurance}
        />

        <Route
          path={SITEMAP.employee.EmployeeBank.route}
          component={PAGES.employee.EmployeeBank}
        />

        <Route
          path={SITEMAP.employee.EmployeeQualification.route}
          component={PAGES.employee.EmployeeQualification}
        />

        <Route
          path={SITEMAP.employee.EmployeeCar.route}
          component={PAGES.employee.EmployeeCar}
        />

        <Route
          path={SITEMAP.employee.EmployeeSalary.route}
          component={PAGES.employee.EmployeeSalary}
        />

        <Route
          path={SITEMAP.employee.EmployeeContactInfo.route}
          component={PAGES.employee.EmployeeContactInfo}
        />

        <Route
          path={SITEMAP.employee.EmployeeContract.route}
          component={PAGES.employee.EmployeeContract}
        />

        <Route
          path={SITEMAP.employee.EmployeeContractKSA.route}
          component={PAGES.employee.EmployeeContractKSA}
        />

        <Route
          path={SITEMAP.employee.NewEmployeeReport.route}
          component={PAGES.employee.NewEmployeeReport}
        />

        <Route
          path={SITEMAP.employee.EmployeeDocuments.route}
          component={PAGES.employee.EmployeeDocuments}
        />

        <Route
          path={SITEMAP.employee.EmployeeStatusReport.route}
          component={PAGES.employee.EmployeeStatusReport}
        />

        <Route
          path={SITEMAP.employee.EmployeeDocumentsCreate.route}
          component={PAGES.employee.CreateEmployeeDocuments}
        />

        <Route
          path={SITEMAP.employee.EmployeeDocumentsEdit.route}
          component={PAGES.employee.EditEmployeeDocuments}
        />

        <Route
          path={SITEMAP.employee.EmployeeDataReport.route}
          component={PAGES.employee.EmployeeDataReport}
        />

        <Route
          path={SITEMAP.employee.followStaffContracts.route}
          component={PAGES.employee.followStaffContracts}
        />

        <Route
          path={SITEMAP.employee.EmploymentDocsDetails.route}
          component={PAGES.employee.EmploymentDocsDetails}
        />

        <Route
          path={SITEMAP.employee.ImportEmployeeData.route}
          component={PAGES.employee.ImportEmployeeData}
        />

        <Route
          path={SITEMAP.employee.EmploymentDocs.route}
          component={PAGES.employee.EmploymentDocs}
        />

        <Route
          path={SITEMAP.employee.LocationLog.route}
          component={PAGES.employee.LocationLog}
        />

        {/* Vacations */}
        <Route
          path={SITEMAP.vacation.VacApproval.route}
          component={PAGES.workFlow.RequestsList}
        />

        <Route
          path={SITEMAP.vacation.VacationsTypesCreate.route}
          component={PAGES.vacation.CreateVacationType}
        />

        <Route
          path={SITEMAP.vacation.VacationsTypesEdit.route}
          component={PAGES.vacation.EditVacationType}
        />

        <Route
          path={SITEMAP.vacation.VacationsTypes.route}
          component={PAGES.vacation.VacationsTypes}
        />

        <Route
          path={SITEMAP.vacation.ExceptionVacDays.route}
          component={PAGES.vacation.ExceptionVacDays}
        />

        <Route
          path={SITEMAP.vacation.OfficialVacationsCreate.route}
          component={PAGES.vacation.CreateOfficialVacation}
        />

        <Route
          path={SITEMAP.vacation.OfficialVacationsEdit.route}
          component={PAGES.vacation.EditOfficialVacation}
        />

        <Route
          path={SITEMAP.vacation.OfficialVacations.route}
          component={PAGES.vacation.OfficialVacations}
        />

        <Route
          path={SITEMAP.vacation.VacationTrxReport.route}
          component={PAGES.vacation.LeaveTrxReport}
        />

        <Route
          path={SITEMAP.vacation.OpeningLeaveBalancesReport.route}
          component={PAGES.vacation.OpeningLeaveBalancesReport}
        />

        <Route
          path={SITEMAP.vacation.BalanceUpdateLog.route}
          component={PAGES.vacation.BalanceUpdateLog}
        />

        <Route
          path={SITEMAP.vacation.LeavesBalance.route}
          component={PAGES.vacation.LeavesBalance}
        />

        <Route
          path={SITEMAP.vacation.LeaveReport.route}
          component={PAGES.vacation.LeaveReport}
        />

        <Route
          path={SITEMAP.vacation.LeaveTrx.route}
          component={PAGES.vacation.LeaveTrx}
        />

        <Route
          path={SITEMAP.vacation.LeaveTrxCreate.route}
          component={PAGES.vacation.LeaveTrxCreate}
        />

        <Route
          path={SITEMAP.vacation.LeaveTrxEdit.route}
          component={PAGES.vacation.LeaveTrxCreate}
        />

        <Route
          path={SITEMAP.vacation.GovernmentSickLeave.route}
          component={PAGES.vacation.GovernmentSickLeave}
        />

        <Route
          path={SITEMAP.vacation.GovernmentSickLeaveCreate.route}
          component={PAGES.vacation.GovernmentSickLeaveCreate}
        />

        <Route
          path={SITEMAP.vacation.GovernmentSickLeaveEdit.route}
          component={PAGES.vacation.GovernmentSickLeaveCreate}
        />

        <Route
          path={SITEMAP.vacation.GovernmentSickLeaveSetting.route}
          component={PAGES.vacation.GovernmentSickLeaveSetting}
        />

        <Route
          path={SITEMAP.vacation.LeaveOpenBalance.route}
          component={PAGES.vacation.LeaveOpenBalance}
        />

        <Route
          path={SITEMAP.vacation.ReplaceAnnualLeaveBalanceCreate.route}
          component={PAGES.vacation.CreateReplaceAnnualLeaveBalance}
        />

        <Route
          path={SITEMAP.vacation.ReplaceAnnualLeaveBalanceEdit.route}
          component={PAGES.vacation.EditReplaceAnnualLeaveBalance}
        />

        <Route
          path={SITEMAP.vacation.ReplaceAnnualLeaveBalance.route}
          component={PAGES.vacation.ReplaceAnnualLeaveBalance}
        />

        <Route
          path={SITEMAP.vacation.OpeningClosingTheYearForLeaves.route}
          component={PAGES.vacation.OpeningClosingTheYearForLeaves}
        />

        <Route
          path={SITEMAP.vacation.ImportVacations.route}
          component={PAGES.vacation.ImportVacations}
        />

        <Route
          path={SITEMAP.vacation.GroupLeaves.route}
          component={PAGES.vacation.GroupLeaves}
        />

        <Route
          path={SITEMAP.vacation.ImportLeaveBalance.route}
          component={PAGES.vacation.ImportLeaveBalance}
        />

        {/* Social Insurance */}
        <Route
          path={SITEMAP.socialInsurance.InsuranceOffices.route}
          component={PAGES.socialInsurance.InsuranceOffices}
        />

        <Route
          path={SITEMAP.socialInsurance.SInsuranceJob.route}
          component={PAGES.socialInsurance.SInsuranceJob}
        />

        <Route
          path={SITEMAP.socialInsurance.InsuranceRegion.route}
          component={GeneralCodePages.InsuranceRegion}
        />

        <Route
          path={SITEMAP.socialInsurance.SinsuranceCalculationTemplate.route}
          component={PAGES.socialInsurance.SinsuranceCalculationTemplate}
        />

        <Route
          path={SITEMAP.socialInsurance.SInsuranceOrgnization.route}
          component={PAGES.socialInsurance.SInsuranceOrgnization}
        />

        <Route
          path={SITEMAP.socialInsurance.SInsuranceOrgnizationCreate.route}
          component={PAGES.socialInsurance.SInsuranceOrgnizationCreate}
        />

        <Route
          path={SITEMAP.socialInsurance.SInsuranceOrgnizationEdit.route}
          component={PAGES.socialInsurance.SInsuranceOrgnizationCreate}
        />

        <Route
          path={SITEMAP.socialInsurance.SocialInsuranceData.route}
          component={PAGES.socialInsurance.SocialInsuranceData}
        />

        <Route
          path={SITEMAP.socialInsurance.UpdateInsuranceSalary.route}
          component={PAGES.socialInsurance.UpdateInsuranceSalary}
        />
        <Route
          path={SITEMAP.socialInsurance.StopInsuranceReport.route}
          component={PAGES.socialInsurance.StopInsuranceReport}
        />

        <Route
          path={SITEMAP.socialInsurance.InsuranceFollow.route}
          component={PAGES.socialInsurance.InsuranceFollow}
        />

        <Route
          path={SITEMAP.socialInsurance.StopInsurance.route}
          component={PAGES.socialInsurance.StopInsurance}
        />

        <Route
          path={SITEMAP.socialInsurance.StopInsuranceCreate.route}
          component={PAGES.socialInsurance.StopInsuranceCreate}
        />

        <Route
          path={SITEMAP.socialInsurance.StopInsuranceEdit.route}
          component={PAGES.socialInsurance.StopInsuranceCreate}
        />

        <Route
          path={SITEMAP.socialInsurance.EmergencyBenefitList.route}
          component={PAGES.socialInsurance.EmergencyBenefitList}
        />

        <Route
          path={SITEMAP.socialInsurance.InsuranceFormStatus.route}
          component={PAGES.socialInsurance.InsuranceFormStatus}
        />

        <Route
          path={
            SITEMAP.socialInsurance.PositionOfGuaranteesAndContradictions.route
          }
          component={
            PAGES.socialInsurance.PositionOfGuaranteesAndContradictions
          }
        />

        <Route
          path={SITEMAP.socialInsurance.SocialInsuranceReport.route}
          component={PAGES.socialInsurance.SocialInsuranceReport}
        />

        <Route
          path={SITEMAP.socialInsurance.Form2Insurance.route}
          component={PAGES.socialInsurance.Form2Insurance}
        />

        <Route
          path={SITEMAP.socialInsurance.Form6Insurance.route}
          component={PAGES.socialInsurance.Form6Insurance}
        />

        {/* <Route
          path={SITEMAP.socialInsurance.Form1Insurance.route}
          component={PAGES.socialInsurance.Form1Insurance}
        /> */}

        {/* Medical Insurance */}
        <Route
          path={SITEMAP.medicalInsurance.MinsuranceItem.route}
          component={GeneralCodePages.MinsuranceItem}
        />

        <Route
          path={SITEMAP.medicalInsurance.MedicalInsuranceData.route}
          component={PAGES.medicalInsurance.MedicalInsuranceData}
        />

        <Route
          path={SITEMAP.medicalInsurance.InsuranceCompanies.route}
          component={PAGES.medicalInsurance.InsuranceCompanies}
        />

        <Route
          path={SITEMAP.medicalInsurance.MinsuranceCategory.route}
          component={PAGES.medicalInsurance.MinsuranceCategory}
        />

        <Route
          path={SITEMAP.medicalInsurance.MinsuranceCenters.route}
          component={PAGES.medicalInsurance.MinsuranceCenters}
        />

        <Route
          path={SITEMAP.medicalInsurance.staffMedicalInsuranceReport.route}
          component={PAGES.medicalInsurance.staffMedicalInsuranceReport}
        />

        <Route
          path={SITEMAP.medicalInsurance.MedicalInsuranceReport.route}
          component={PAGES.medicalInsurance.MedicalInsuranceReport}
        />

        <Route
          path={SITEMAP.medicalInsurance.MedicalInsuranceSubscription.route}
          component={PAGES.medicalInsurance.MedicalInsuranceSubscription}
        />

        <Route
          path={
            SITEMAP.medicalInsurance.MedicalInsuranceSubscriptionCreate.route
          }
          component={PAGES.medicalInsurance.MedicalInsuranceSubscriptionCreate}
        />

        <Route
          path={SITEMAP.medicalInsurance.MedicalInsuranceSubscriptionEdit.route}
          component={PAGES.medicalInsurance.MedicalInsuranceSubscriptionCreate}
        />
        <Route
          path={SITEMAP.medicalInsurance.medicalInsSubscriptionReport.route}
          component={PAGES.medicalInsurance.medicalInsSubscriptionReport}
        />

        <Route
          path={SITEMAP.medicalInsurance.medicalInsuranceListReport.route}
          component={PAGES.medicalInsurance.medicalInsuranceListReport}
        />

        <Route
          path={SITEMAP.medicalInsurance.EmployeeMedicalBenefits.route}
          component={PAGES.medicalInsurance.EmployeeMedicalBenefits}
        />

        <Route
          path={SITEMAP.medicalInsurance.EmployeeMedicalBenefitsCreate.route}
          component={PAGES.medicalInsurance.EmployeeMedicalBenefitsCreate}
        />

        <Route
          path={SITEMAP.medicalInsurance.EmployeeMedicalBenefitsEdit.route}
          component={PAGES.medicalInsurance.EmployeeMedicalBenefitsCreate}
        />

        <Route
          path={SITEMAP.medicalInsurance.StopMedicalInsurance.route}
          component={PAGES.medicalInsurance.StopMedicalInsurance}
        />

        <Route
          path={SITEMAP.medicalInsurance.StopMedicalInsuranceCreate.route}
          component={PAGES.medicalInsurance.StopMedicalInsuranceCreate}
        />

        <Route
          path={SITEMAP.medicalInsurance.StopMedicalInsuranceEdit.route}
          component={PAGES.medicalInsurance.StopMedicalInsuranceCreate}
        />

        {/* JobAdvertisement */}
        <Route
          path={SITEMAP.recruitment.JobAdvertisement.route}
          component={PAGES.recruitment.JobAdvertisement}
        />

        <Route
          path={SITEMAP.recruitment.JobRequirements.route}
          component={PAGES.recruitment.JobRequirements}
        />

        <Route
          path={SITEMAP.recruitment.RecHrTest.route}
          component={PAGES.recruitment.RecHrTest}
        />

        <Route
          path={SITEMAP.recruitment.RecHrTestCreate.route}
          component={PAGES.recruitment.RecHrTestCreate}
        />

        <Route
          path={SITEMAP.recruitment.RecHrTestEdit.route}
          component={PAGES.recruitment.RecHrTestCreate}
        />

        <Route
          path={SITEMAP.recruitment.RecEvaluation.route}
          component={PAGES.recruitment.RecEvaluation}
        />

        <Route
          path={SITEMAP.recruitment.RecEvaluationCreate.route}
          component={PAGES.recruitment.RecEvaluationCreate}
        />

        <Route
          path={SITEMAP.recruitment.RecEvaluationEdit.route}
          component={PAGES.recruitment.RecEvaluationCreate}
        />

        <Route
          path={SITEMAP.recruitment.RecHiringSource.route}
          component={GeneralCodePages.RecHiringSource}
        />

        <Route
          path={SITEMAP.recruitment.RecJobGrade.route}
          component={GeneralCodePages.RecJobGrade}
        />

        <Route
          path={SITEMAP.recruitment.Employment.route}
          component={PAGES.recruitment.Employment}
        />

        <Route
          path={SITEMAP.recruitment.JobDataBank.route}
          component={PAGES.recruitment.JobDataBank}
        />

        <Route
          path={SITEMAP.recruitment.JobApplicationStatus.route}
          component={PAGES.recruitment.JobApplicationStatus}
        />

        <Route
          path={SITEMAP.recruitment.EmploymentRequest.route}
          component={PAGES.recruitment.EmploymentRequest}
        />

        <Route
          path={SITEMAP.recruitment.EmploymentRequestCreate.route}
          component={PAGES.recruitment.EmploymentRequestCreate}
        />

        <Route
          path={SITEMAP.recruitment.EmploymentRequestEdit.route}
          component={PAGES.recruitment.EmploymentRequestCreate}
        />

        <Route
          path={SITEMAP.recruitment.ReviewEmploymentRequest.route}
          component={PAGES.recruitment.ReviewEmploymentRequest}
        />

        <Route
          path={SITEMAP.recruitment.ReviewEmploymentRequestEdit.route}
          component={PAGES.recruitment.ReviewEmploymentRequestCreate}
        />

        {/* <Route
          path={SITEMAP.recruitment.HRApplication.route}
          component={PAGES.recruitment.HRApplication}
        /> */}

        <Route
          path={SITEMAP.recruitment.HRApplicationEvaluation.route}
          component={PAGES.recruitment.HRApplicationEvaluation}
        />

        <Route
          path={SITEMAP.recruitment.TechApplicationReview.route}
          component={PAGES.recruitment.TechApplicationReview}
        />

        <Route
          path={SITEMAP.recruitment.SecApplicationReview.route}
          component={PAGES.recruitment.SecApplicationReview}
        />

        <Route
          path={SITEMAP.recruitment.ApplicationCallStatus.route}
          component={PAGES.recruitment.ApplicationCallStatus}
        />

        <Route
          path={SITEMAP.recruitment.HRInterviewEvaluation.route}
          component={PAGES.recruitment.HRInterviewEvaluation}
        />

        <Route
          path={SITEMAP.recruitment.HRInterviewEvaluationEdit.route}
          component={PAGES.recruitment.HRInterviewEvaluationEdit}
        />

        <Route
          path={SITEMAP.recruitment.ManagerInterviewEvaluation.route}
          component={PAGES.recruitment.ManagerInterviewEvaluation}
        />

        <Route
          path={SITEMAP.recruitment.ManagerInterviewEvaluationEdit.route}
          component={PAGES.recruitment.ManagerInterviewEvaluationEdit}
        />

        <Route
          path={SITEMAP.recruitment.HiringRequest.route}
          component={PAGES.recruitment.HiringRequest}
        />

        <Route
          path={SITEMAP.recruitment.HiringRequestCreate.route}
          component={PAGES.recruitment.HiringRequestCreate}
        />

        <Route
          path={SITEMAP.recruitment.HiringRequestEdit.route}
          component={PAGES.recruitment.HiringRequestCreate}
        />

        <Route
          path={SITEMAP.recruitment.JobOffer.route}
          component={PAGES.recruitment.JobOffer}
        />

        <Route
          path={SITEMAP.recruitment.JobOfferStatus.route}
          component={PAGES.recruitment.JobOfferStatus}
        />

        <Route
          path={SITEMAP.recruitment.JobOfferCreate.route}
          component={PAGES.recruitment.JobOfferCreate}
        />

        <Route
          path={SITEMAP.recruitment.JobOfferEdit.route}
          component={PAGES.recruitment.JobOfferCreate}
        />

        <Route
          path={SITEMAP.recruitment.HiringRequestEvaluation.route}
          component={PAGES.recruitment.HiringRequestEvaluation}
        />

        <Route
          path={SITEMAP.recruitment.HiringRequestEvaluationEdit.route}
          component={PAGES.recruitment.HiringRequestEvaluationEdit}
        />

        <Route
          path={SITEMAP.recruitment.JobAdvertisementCreate.route}
          component={PAGES.recruitment.JobAdvertisementCreate}
        />

        <Route
          path={SITEMAP.recruitment.JobAdvertisementEdit.route}
          component={PAGES.recruitment.JobAdvertisementCreate}
        />

        <Route
          path={SITEMAP.recruitment.JobApplicationPreview.route}
          component={PAGES.recruitment.JobApplicationPreview}
        />

        {/* Assessment */}
        <Route
          path={SITEMAP.assessment.AsCategory.route}
          component={GeneralCodePages.AsCategory}
        />

        <Route
          path={SITEMAP.assessment.AsChoice.route}
          component={PAGES.assessment.AsChoice}
        />

        <Route
          path={SITEMAP.assessment.AsTemplate.route}
          component={PAGES.assessment.AsTemplate}
        />

        <Route
          path={SITEMAP.assessment.AsTemplateCreate.route}
          component={PAGES.assessment.AsTemplateCreate}
        />

        <Route
          path={SITEMAP.assessment.AsTemplateEdit.route}
          component={PAGES.assessment.AsTemplateCreate}
        />

        <Route
          path={SITEMAP.assessment.Competencies.route}
          component={PAGES.assessment.Competencies}
        />

        <Route
          path={SITEMAP.assessment.CompetenciesCreate.route}
          component={PAGES.assessment.CompetenciesCreate}
        />

        <Route
          path={SITEMAP.assessment.CompetenciesEdit.route}
          component={PAGES.assessment.CompetenciesCreate}
        />

        <Route
          path={SITEMAP.assessment.EmployeeAssessment.route}
          component={PAGES.assessment.EmployeeAssessment}
        />

        <Route
          path={SITEMAP.assessment.AllJobKpi.route}
          component={PAGES.assessment.AllJobKpi}
        />

        <Route
          path={SITEMAP.assessment.StaffJobKPI.route}
          component={PAGES.assessment.StaffJobKPI}
        />

        <Route
          path={SITEMAP.assessment.JobDescriptions.route}
          component={PAGES.assessment.JobDescriptions}
        />

        <Route
          path={SITEMAP.assessment.IndividualDevelopmentPlan.route}
          component={PAGES.assessment.IndividualDevelopmentPlan}
        />

        <Route
          path={SITEMAP.assessment.IndividualDevelopmentPlanCreate.route}
          component={PAGES.assessment.IndividualDevelopmentPlanCreate}
        />

        <Route
          path={SITEMAP.assessment.IndividualDevelopmentPlanEdit.route}
          component={PAGES.assessment.IndividualDevelopmentPlanCreate}
        />

        <Route
          path={SITEMAP.assessment.CareerDevPlan.route}
          component={PAGES.assessment.CareerDevPlan}
        />

        <Route
          path={SITEMAP.assessment.CareerDevPlanCreate.route}
          component={PAGES.assessment.CareerDevPlanCreate}
        />

        <Route
          path={SITEMAP.assessment.CareerDevPlanEdit.route}
          component={PAGES.assessment.CareerDevPlanCreate}
        />

        <Route
          path={SITEMAP.assessment.UploadAssessmentGuidelines.route}
          component={PAGES.assessment.UploadAssessmentGuidelines}
        />

        <Route
          path={SITEMAP.assessment.AssessmentGuidelines.route}
          component={PAGES.assessment.AssessmentGuidelines}
        />

        <Route
          path={SITEMAP.assessment.MonthOpenCloseAss.route}
          component={PAGES.assessment.MonthOpenCloseAss}
        />

        <Route
          path={SITEMAP.assessment.AssessmentReview.route}
          component={PAGES.assessment.AssessmentReview}
        />

        <Route
          path={SITEMAP.assessment.AssessmentReviewEdit.route}
          component={PAGES.assessment.AssessmentReviewEdit}
        />

        <Route
          path={SITEMAP.assessment.AssessmentReport.route}
          component={PAGES.assessment.AssessmentReport}
        />

        <Route
          path={SITEMAP.assessment.PeerAppraisalSetting.route}
          component={PAGES.assessment.PeerAppraisalSetting}
        />

        <Route
          path={SITEMAP.assessment.PeerAppraisalList.route}
          component={PAGES.assessment.PeerAppraisalList}
        />

        <Route
          path={SITEMAP.assessment.EmployeePeerAppraisal.route}
          component={PAGES.assessment.EmployeePeerAppraisal}
        />

        <Route
          path={SITEMAP.assessment.PeerAppraisalReport.route}
          component={PAGES.assessment.PeerAppraisalReport}
        />

        {/* SmartObjective */}
        <Route
          path={SITEMAP.smartObjective.ObjectiveReport.route}
          component={PAGES.smartObjective.ObjectiveReport}
        />

        <Route
          path={SITEMAP.smartObjective.EmployeeObjective.route}
          component={PAGES.smartObjective.EmployeeObjective}
        />

        <Route
          path={SITEMAP.smartObjective.EmployeeObjectiveCreate.route}
          component={PAGES.smartObjective.EmployeeObjectiveCreate}
        />

        <Route
          path={SITEMAP.smartObjective.EmployeeObjectiveEdit.route}
          component={PAGES.smartObjective.EmployeeObjectiveCreate}
        />

        {/* KPI */}
        <Route
          path={SITEMAP.kpi.Upload_KPI_Data.route}
          component={PAGES.kpi.UploadFileWithKPI}
        />

        <Route path={SITEMAP.kpi.KpiData.route} component={PAGES.kpi.KpiData} />

        <Route
          path={SITEMAP.kpi.KPILOBReport.route}
          component={PAGES.kpi.KPI_LOB_Report}
        />

        <Route
          path={SITEMAP.kpi.KPISupervisorReport.route}
          component={PAGES.kpi.KPI_SupervisorReport}
        />

        {/* Survey */}
        <Route
          path={SITEMAP.survey.SurveyQuestionGroup.route}
          component={GeneralCodePages.SurveyQuestionGroup}
        />

        <Route
          path={SITEMAP.survey.SurveyChoiceGroup.route}
          component={PAGES.survey.SurveyChoiceGroup}
        />

        <Route
          path={SITEMAP.survey.SurveyChoiceGroupCreate.route}
          component={PAGES.survey.SurveyChoiceGroupCreate}
        />

        <Route
          path={SITEMAP.survey.SurveyChoiceGroupEdit.route}
          component={PAGES.survey.SurveyChoiceGroupCreate}
        />

        <Route
          path={SITEMAP.survey.SurveyTemplate.route}
          component={PAGES.survey.SurveyTemplate}
        />

        <Route
          path={SITEMAP.survey.SurveyTemplateCreate.route}
          component={PAGES.survey.SurveyTemplateCreate}
        />

        <Route
          path={SITEMAP.survey.SurveyTemplateEdit.route}
          component={PAGES.survey.SurveyTemplateCreate}
        />

        <Route
          path={SITEMAP.survey.Survey.route}
          component={PAGES.survey.Survey}
        />

        {/* Training */}
        <Route
          path={SITEMAP.training.TrFunctionsList.route}
          component={PAGES.training.TrFunctionsList}
        />

        <Route
          path={SITEMAP.training.TrFunctionsListCreate.route}
          component={PAGES.training.TrFunctionsListCreate}
        />

        <Route
          path={SITEMAP.training.TrFunctionsListEdit.route}
          component={PAGES.training.TrFunctionsListCreate}
        />

        <Route
          path={SITEMAP.training.EmployeeFunctions.route}
          component={PAGES.training.EmployeeFunctions}
        />

        <Route
          path={SITEMAP.training.FunctionsRequest.route}
          component={PAGES.training.FunctionsRequest}
        />

        <Route
          path={SITEMAP.training.FunctionsData.route}
          component={PAGES.training.FunctionsData}
        />

        <Route
          path={SITEMAP.training.QualificationCheck.route}
          component={PAGES.training.QualificationCheck}
        />

        <Route
          path={SITEMAP.training.TrTrainingTrxList.route}
          component={PAGES.training.TrTrainingTrxList}
        />

        <Route
          path={SITEMAP.training.FunctionApproval.route}
          component={PAGES.training.RequestsList}
        />

        <Route
          path={SITEMAP.training.TrainingApproval.route}
          component={PAGES.training.RequestsList}
        />

        <Route
          path={SITEMAP.training.TrTrainingTrxListCreate.route}
          component={PAGES.training.TrTrainingTrxListCreate}
        />

        <Route
          path={SITEMAP.training.TrTrainingTrxListEdit.route}
          component={PAGES.training.TrTrainingTrxListCreate}
        />

        <Route
          path={SITEMAP.training.TrainingRequestList.route}
          component={PAGES.training.TrainingRequestList}
        />

        <Route
          path={SITEMAP.training.TrainingRequestListCreate.route}
          component={PAGES.training.TrainingRequestListCreate}
        />

        <Route
          path={SITEMAP.training.TrainingRequestListEdit.route}
          component={PAGES.training.TrainingRequestListCreate}
        />

        <Route
          path={SITEMAP.training.EmployeeAttendance.route}
          component={PAGES.training.TrainingEmployeeAttendance}
        />

        <Route
          path={SITEMAP.training.TrainingCalender.route}
          component={PAGES.training.TrainingCalender}
        />

        <Route
          path={SITEMAP.training.EvaluateEmployee.route}
          component={PAGES.training.EvaluateEmployee}
        />

        <Route
          path={SITEMAP.training.EvaluateTraining.route}
          component={PAGES.training.EvaluateTraining}
        />

        <Route
          path={SITEMAP.training.TestTemplate.route}
          component={PAGES.training.TestTemplate}
        />

        <Route
          path={SITEMAP.training.TestTemplateCreate.route}
          component={PAGES.training.TestTemplateCreate}
        />

        <Route
          path={SITEMAP.training.TestTemplateEdit.route}
          component={PAGES.training.TestTemplateCreate}
        />

        <Route
          path={SITEMAP.training.Test.route}
          component={PAGES.training.TrainingTest}
        />

        <Route
          path={SITEMAP.training.ReviewTest.route}
          component={PAGES.training.ReviewTest}
        />

        <Route
          path={SITEMAP.training.EmployeeTrainingReport.route}
          component={PAGES.training.EmployeeTrainingReport}
        />

        <Route
          path={SITEMAP.training.TrainingAttendance.route}
          component={PAGES.training.TrainingAttendance}
        />

        {/* Project management */}
        <Route
          path={SITEMAP.projectManagement.Customer.route}
          component={PAGES.projectManagement.Customer}
        />

        <Route
          path={SITEMAP.projectManagement.CustomerCreate.route}
          component={PAGES.projectManagement.CustomerCreate}
        />

        <Route
          path={SITEMAP.projectManagement.CustomerEdit.route}
          component={PAGES.projectManagement.CustomerCreate}
        />

        <Route
          path={SITEMAP.projectManagement.Contract.route}
          component={PAGES.projectManagement.Contract}
        />

        <Route
          path={SITEMAP.projectManagement.ContractCreate.route}
          component={PAGES.projectManagement.ContractCreate}
        />

        <Route
          path={SITEMAP.projectManagement.ContractEdit.route}
          component={PAGES.projectManagement.ContractEdit}
        />

        <Route
          path={SITEMAP.projectManagement.Stage.route}
          component={PAGES.projectManagement.Stage}
        />

        <Route
          path={SITEMAP.projectManagement.StageCreate.route}
          component={PAGES.projectManagement.StageCreate}
        />

        <Route
          path={SITEMAP.projectManagement.StageEdit.route}
          component={PAGES.projectManagement.StageEdit}
        />

        <Route
          path={SITEMAP.projectManagement.TimeSheet.route}
          component={PAGES.projectManagement.TimeSheet}
        />

        <Route
          path={SITEMAP.projectManagement.TimeSheetCreate.route}
          component={PAGES.projectManagement.TimeSheetCreate}
        />

        <Route
          path={SITEMAP.projectManagement.TimeSheetEdit.route}
          component={PAGES.projectManagement.TimeSheetEdit}
        />

        <Route
          path={SITEMAP.projectManagement.Project.route}
          component={PAGES.projectManagement.Project}
        />

        <Route
          path={SITEMAP.projectManagement.ProjectCreate.route}
          component={PAGES.projectManagement.ProjectCreate}
        />

        <Route
          path={SITEMAP.projectManagement.ProjectEdit.route}
          component={PAGES.projectManagement.ProjectEdit}
        />

        {/* Default */}
        <Route component={PAGES.global.NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = { history: PropTypes.object.isRequired };

export default Application;
