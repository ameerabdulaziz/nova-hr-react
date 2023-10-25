import axiosInstance from '../../api/axios';
const MedicalInsuranceData = (locale) => {
  const api = {};

  api.GetEmployeeById = async (id) => {
    const data = await axiosInstance.get(`MinsuranceEmployee/Get/${id}/${locale}`);

    return data.data;
  };

  api.GetMinsuranceCompany = async () => {
    const data = await axiosInstance.get(`MinsuranceCompany/GetListModel/${locale}`);

    return data.data;
  };

  api.GetMinsuranceCategory = async () => {
    const data = await axiosInstance.get(`MinsuranceCategory/GetListModel/${locale}`);

    return data.data;
  };

  api.Save = async (body) => {
    const result = await axiosInstance.post('MinsuranceEmployee/save', body);

    return result;
  };

  return api;
};

export default MedicalInsuranceData;
