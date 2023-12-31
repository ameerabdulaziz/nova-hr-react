import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `AsIndividualDevelopmentPlan/GetList/${locale}`
    );

    return data.data;
  };

  api.GetDevelopmentActivitiesList = async () => {
    const data = await axiosInstance.get(
      `AsIndividualDevelopmentPlan/GetDevelopmentActivitiesList/${locale}`
    );

    return data.data;
  };

  api.GetById = async (id, employeeId = null) => {
    const data = await axiosInstance.get(
      `AsIndividualDevelopmentPlan/Get/${id}/${locale}${employeeId ? '?employeeId=' + employeeId : ''}`
    );

    return data.data;
  };

  api.saveAction = async (id, actionId) => {
    const result = await axiosInstance.post(
      `AsIndividualDevelopmentPlan/SaveAction/${id}/${actionId}`
    );

    return result;
  };

  api.GetEmployee = async (id, jobs, probationPeriod) => {
    const data = await axiosInstance.post(
      `AsIndividualDevelopmentPlan/GetEmployee/${locale}/${id}/${probationPeriod}`,
      jobs
    );

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('AsIndividualDevelopmentPlan/save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`AsIndividualDevelopmentPlan/Delete/${id}`);

    return data;
  };

  return api;
};

export default API;
