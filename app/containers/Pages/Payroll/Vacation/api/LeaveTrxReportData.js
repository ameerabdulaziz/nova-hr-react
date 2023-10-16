import axiosInstance from '../../api/axios';

const vacationTrxData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.post(`VacReport/GetLeaveDetails/${locale}?${queryString.toString()}`, params.VacationId);

    return data.data;
  };

  return Apis;
};

export default vacationTrxData;
