import axiosInstance from "../../api/axios";

const PeerAppraisalSettingData = (locale) => {
  const Apis = {};


  Apis.GetData = async (YearId,EmployeeId,MonthId) => {
    const data = await axiosInstance.get(`ApPeerAppraisalSetting/Get/${locale}?EmployeeId=${EmployeeId}&yearid=${YearId}&monthid=${MonthId}`);
    return data.data;
  };

  Apis.Save = async (data) => {
      const result = await axiosInstance.post("ApPeerAppraisalSetting/Save", data);
      return result;
  };

  Apis.Delete = async (id) => {
    const data = await axiosInstance.delete(`ApPeerAppraisalSetting/Delete/${id}`);
    return data;
  };



  Apis.GetPeerAppraisalData = async () => {
      const data = await axiosInstance.get(`PeerAppraisal/GetPeerAppraisalList/${locale}`);
      return data.data;
    };

  Apis.GetAssessmentPeerAppraisalData = async (id) => {
    const data = await axiosInstance.get(`PeerAppraisal/GetEmployeePeerAppraisal/${locale}/${id}`);
    return data.data;
  };

  Apis.SaveAssessmentPeerAppraisalData = async (data,paramsData) => {
    const result = await axiosInstance.post(`PeerAppraisal/Save`, data,  { params: paramsData });
    return result;
  };

  
  return Apis;
};

export default PeerAppraisalSettingData;
