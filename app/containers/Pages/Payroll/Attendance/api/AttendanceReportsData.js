import axiosInstance from '../../api/axios';
const MedicalInsuranceReportsData = (locale) => {
  const api = {};

  api.GetMissionReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttMissionTrx/GetMissionReport/${locale}?${queryString}`);

    return data.data;
  };


  api.GetEmployeeShiftReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`AttShiftEmployee/GetEmployeeShiftReport/${locale}?${queryString}`);

    return data.data;
  };


  return api;
};

export default MedicalInsuranceReportsData;
