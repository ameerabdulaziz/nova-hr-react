import axiosInstance from '../../api/axios';
const Form2ReportData = (locale) => {
  const api = {};

  api.GetSInsuranceOffices = async () => {
    const data = await axiosInstance.get(`SinsuranceOffices/GetListModel/${locale}`);

    return data.data;
  };

  api.GetSInsuranceOrgnization = async () => {
    const data = await axiosInstance.get(`SinsuranceOrgnization/GetListModel/${locale}`);

    return data.data;
  };

  api.GetList = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`SInsuranceReport/GetForm2Report/${locale}?${queryString}`);

    return data.data;
  };

  return api;
};

export default Form2ReportData;
