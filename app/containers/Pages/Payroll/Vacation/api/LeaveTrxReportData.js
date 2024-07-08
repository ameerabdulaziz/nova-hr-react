import axiosInstance from '../../api/axios';

const vacationTrxData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const data = await axiosInstance.post(
      `VacReport/GetLeaveDetails/${locale}`,
      params.VacationId,
      {
        params,
      }
    );

    return data.data;
  };

  return Apis;
};

export default vacationTrxData;
