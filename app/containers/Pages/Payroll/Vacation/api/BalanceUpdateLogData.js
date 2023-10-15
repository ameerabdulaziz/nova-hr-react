import axiosInstance from '../../api/axios';

const BalanceUpdateLogData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`VacEmployeeVacOpenBalance/GetVacBalLogReport/${locale}?${queryString.toString()}`);

    return data.data;
  };

  return Apis;
};

export default BalanceUpdateLogData;
