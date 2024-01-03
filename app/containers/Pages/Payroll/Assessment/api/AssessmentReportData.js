import axiosInstance from "../../api/axios";

const AssessmentReportData = (locale) => {
  const Apis = {};


  Apis.GetDataById = async (yearId,orgId,employeeId,monthId) => {
    const data = await axiosInstance.get(`AssessmentReport/GetAssessmentReport/${locale}/${yearId}?OrganizationId=${orgId}&EmployeeId=${employeeId}&MonthId=${monthId}`);

    return data.data;
  };

//   Apis.Save = async (data) => {

//       const result = await axiosInstance.post("Assessment/Save", data);
//       return result;
//   };

  
  return Apis;
};

export default AssessmentReportData;
