import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `RecJobApplicationEvaluation/GetApplicationForm/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  return api;
};

export default API;
