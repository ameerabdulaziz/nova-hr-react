import axiosInstance from "../../api/axios";

const AveragePeerAppraisalReportData = (locale) => {
  const Apis = {};


  Apis.GetData = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(`AssessmentReport/GetavgPeerAppraisalReport/${locale}/?${queryString}`);

    return data.data;
  };

  Apis.printApi = async (Id) => {
    const data = await axiosInstance.get(`AssessmentReport/GetPeerAppraisal/en/${Id}`);

    return data.data;
  };

  
  return Apis;
};

export default AveragePeerAppraisalReportData;
