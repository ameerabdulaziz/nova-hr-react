import axiosInstance from '../../api/axios';
const StopInsuranceData = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`SInsuranceLog/GetList/${locale}`);

    return data.data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `SinsuranceLog/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`SinsuranceLog/Delete/${id}`);
    return data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('SinsuranceLog/save', body);

    return result;
  };

  return api;
};

export default StopInsuranceData;
