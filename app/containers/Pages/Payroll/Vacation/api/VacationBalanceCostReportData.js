import axiosInstance from '../../api/axios';

const VacationBalanceCostReportData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {

    const data = await axiosInstance.get(
      `VacReport/GetVacCostReport/${locale}`, {
        params
      }
    );

    return data.data;
  };

  return Apis;
};

export default VacationBalanceCostReportData;
