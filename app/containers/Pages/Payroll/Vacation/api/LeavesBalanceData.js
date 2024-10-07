import axiosInstance from '../../api/axios';

const LeavesBalanceData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    debugger;
    const data = await axiosInstance.get(
      `VacReport/GetVacBalReport/${locale}`, {
        params
      }
    );

    return data.data;
  };

  return Apis;
};

export default LeavesBalanceData;
