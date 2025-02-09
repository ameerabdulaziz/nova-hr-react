import axiosInstance from '../../api/axios';

const HrNotificationsData = (locale) => {
  const Apis = {};

  Apis.GetList = async (NotificationTypeId) => {

    const data = await axiosInstance.get(
      `EmpReport/GetEmployeeNotificationList/${locale}/${NotificationTypeId}`
    );

    return data.data;
  };

  return Apis;
};

export default HrNotificationsData;
