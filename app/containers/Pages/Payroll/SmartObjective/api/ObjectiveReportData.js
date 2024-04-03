import axiosInstance from '../../api/axios';

const ObjectiveReportData = (locale) => {
  const api = {};

  api.getList = async (params) => {
    const data = await axiosInstance.get(
      `SmartObjectiveTrx/GetReport/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default ObjectiveReportData;
