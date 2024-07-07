import axiosInstance from '../../api/axios';

const vacationTrxData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const data = await axiosInstance.get(
      `VacReport/GetVacOpenBal/${locale}`, {
        params
      }
    );

    return data.data;
  };

  return Apis;
};

export default vacationTrxData;
