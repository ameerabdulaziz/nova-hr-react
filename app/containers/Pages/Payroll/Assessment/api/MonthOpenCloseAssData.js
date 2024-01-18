import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetOpenMonth = async (id) => {
    const data = await axiosInstance.get(
      `AsMonthOpenClose/GetOpenMonth/${locale}/${id}`
    );

    return data.data;
  };

  api.OpenMonth = async (body) => {
    const result = await axiosInstance.post('AsMonthOpenClose/OpenMonth', body);

    return result;
  };

  api.CloseMonth = async (body) => {
    const result = await axiosInstance.post(
      'AsMonthOpenClose/CloseMonth',
      body
    );

    return result;
  };

  api.EmpAssessment = async (body) => {
    const result = await axiosInstance.post(
      `AsMonthOpenClose/EmpAssessment/${body.yearId}/${body.monthId}/${body.organizationId}`
    );

    return result;
  };

  return api;
};

export default API;
