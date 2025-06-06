import axiosInstance from '../../api/axios';

const API = (locale) => {
  const api = {};

  api.GetList = async (params) => {
    const data = await axiosInstance.get(
      `AttEmployeeOverTime/GetReviewOverTime/${locale}`,
      {
        params,
      }
    );
    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('AttEmployeeOverTime/Save', body);

    return result;
  };

  return api;
};

export default API;
