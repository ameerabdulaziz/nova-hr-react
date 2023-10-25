import axiosInstance from '../../api/axios';
const MedicalInsuranceReportsData = (locale) => {
  const api = {};

  api.GetstaffMedicalInsuranceReportReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`MinsuranceReport/GetEmpMinsuranceReport/${locale}?${queryString}`);

    return data.data;
  };



  return api;
};

export default MedicalInsuranceReportsData;
