import axiosInstance from '../../api/axios';
const MedicalInsuranceReportsData = (locale) => {
  const api = {};

  api.GetstaffMedicalInsuranceReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`MinsuranceReport/GetEmpMinsuranceReport/${locale}?${queryString}`);

    return data.data;
  };

  api.GetMedicalInsuranceReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`MinsuranceReport/GetMInsuFollowReport/${locale}?${queryString}`);

    return data.data;
  };

  api.save = async (data,rowIndexVal) => {
    const result = await axiosInstance.post(`MInsuranceReport/AddNotesInFollowReport/${rowIndexVal}?Notes=${data}`);

    return result;
  };

  api.GetMedicalInsSubscriptionReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`MinsuranceReport/GetMInsSubscriptionReport/${locale}?${queryString}`);

    return data.data;
  };

  api.GetMedicalInsuranceListReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`MinsuranceReport/GetMInsuReport/${locale}?${queryString}`);

    return data.data;
  };



  return api;
};

export default MedicalInsuranceReportsData;
