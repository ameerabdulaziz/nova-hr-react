import axiosInstance from '../api/axios';

const dashboardData = (locale) => {
  const api = {};

  api.getNotifications = async () => {
    const data = await axiosInstance.get(
      `Notification/GetNotification/${locale}`
    );

    return data.data;
  };

  return api;
};

export default dashboardData;
