import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`AsCareerDevPlan/GetList/${locale}`);

    return data.data;
  };

  api.GetDevelopmentActivitiesList = async () => {
    const data = await axiosInstance.get(
      `AsCareerDevPlan/GetDevelopmentActivitiesList/${locale}`
    );

    return data.data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(`AsCareerDevPlan/Get/${id}/${locale}`);

    return data.data;
  };

  api.GetEmployeeData = async (id) => {
    const data = await axiosInstance.get(
      `AsCareerDevPlan/GetEmployeeData/${locale}/${id}`
    );

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('AsCareerDevPlan/save', body);

    return result;
  };

  api.saveAction = async (id, actionId) => {
    const result = await axiosInstance.post(
      `AsCareerDevPlan/SaveAction/${id}/${actionId}`
    );

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`AsCareerDevPlan/Delete/${id}`);

    return data;
  };

  return api;
};

export default API;
