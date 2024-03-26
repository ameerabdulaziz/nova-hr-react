import axiosInstance from '../../api/axios';

const ManPowerReportData = (locale) => {
  const api = {};

  api.GetReport = async (id,params) => {
    const data = await axiosInstance.get(`HrManPowerSetting/GetReport/${locale}/${id}`, {
      params
    });

    return data.data;
  };

  return api;
};

export default ManPowerReportData;
