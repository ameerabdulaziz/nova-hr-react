import axiosInstance from '../api/axios';

const dashboardData = (locale) => {
  const api = {};

  api.getNotifications = async () => {
    const data = await axiosInstance.get(
      `Notification/GetNotification/${locale}`
    );

    return data.data;
  };

  api.getAgeDemographics = async () => {
    const data = await axiosInstance.get(
      `Dashboard/GetAgeDemographics`
    );

    return data.data;
  };

  api.getGenderRatio = async () => {
    const data = await axiosInstance.get(
      `Dashboard/GetGenderRatio`
    );

    return data.data;
  };

  api.getEmpWithBestAtt = async () => {
    const data = await axiosInstance.get(
      `Dashboard/GetEmpWithBestAtt`
    );

    return data.data;
  };

  return api;
};

export default dashboardData;
