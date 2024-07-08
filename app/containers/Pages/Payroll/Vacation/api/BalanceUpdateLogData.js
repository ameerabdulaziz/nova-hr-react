import axiosInstance from '../../api/axios';

const BalanceUpdateLogData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const data = await axiosInstance.get(`VacReport/GetVacBalLogReport/${locale}`, {
      params
    });

    return data.data;
  };

  return Apis;
};

export default BalanceUpdateLogData;
