import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`/PmTimeSheet/GetList/${locale}`);

    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      `/PmTimeSheet/save`,
      body
    );

    return data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `/PmTimeSheet/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.Delete = async (id) => {
    const data = await axiosInstance.delete(
      `/PmTimeSheet/Delete/${id}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
