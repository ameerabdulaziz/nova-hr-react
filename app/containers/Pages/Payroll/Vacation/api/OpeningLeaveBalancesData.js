import axiosInstance from '../../api/axios';

const vacationTrxData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(
      `VacReport/GetVacOpenBal/${locale}?${queryString.toString()}`
    );

    return data.data;
  };

  return Apis;
};

export default vacationTrxData;
