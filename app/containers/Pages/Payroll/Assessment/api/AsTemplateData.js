import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      'AsTemplate/GetList/'
    );

    return data.data;
  };

  api.GetCompetencyList = async () => {
    const data = await axiosInstance.get(
      `AsTemplate/GetCompetencyList/${locale}`
    );

    return data.data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `AsTemplate/Get/${locale}/${id}`
    );

    return data.data;
  };

  api.GetEmployee = async (id, jobs, probationPeriod) => {
    const data = await axiosInstance.post(
      `AsTemplate/GetEmployee/${locale}/${id}/${probationPeriod}`,
      jobs
    );

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('AsTemplate', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`AsTemplate/${id}`);

    return data;
  };

  return api;
};

export default API;
