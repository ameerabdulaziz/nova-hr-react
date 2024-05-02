import axiosInstance from "../../api/axios";

const AssessmentReportData = (locale) => {
  const Apis = {};


  Apis.GetDataById = async (yearId,orgId,employeeId,monthId) => {
    const data = await axiosInstance.get(`AssessmentReport/GetAssessmentReport/${locale}/${yearId}?OrganizationId=${orgId}&EmployeeId=${employeeId}&MonthId=${monthId}`);

    return data.data;
  };

  Apis.PeerAppraisalReportApi = async (yearId,monthId,employeeId,orgId,StatusId) => {
    const data = await axiosInstance.get(`AssessmentReport/GetPeerAppraisalReport/en?YearId=${yearId}&MonthId=${monthId}&EmployeeId=${employeeId}&OrganizationId=${orgId}&StatusId=${StatusId}`);

    return data.data;
  };

  
  return Apis;
};

export default AssessmentReportData;
