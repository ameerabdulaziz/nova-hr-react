import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecJobApplication/GetJobApplication/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  return api;
};

export default API;
