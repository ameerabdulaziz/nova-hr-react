import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`/PmProject/GetList/${locale}`);

    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post(
      `PmProject/Save`,
      body
    );

    return data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `/PmProject/Get/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.Delete = async (id) => {
    const data = await axiosInstance.delete(
      `PmProject/Delete/${id}`
    );

    const result = data.data;

    return result;
  };

  return api;
};

export default API;
