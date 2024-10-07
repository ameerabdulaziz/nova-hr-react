import axiosInstance from '../../api/axios';

const LogReportData = (lang) => {
  const api = {};

  api.LogReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const result = await axiosInstance.get(`/SettingLog/GetLogReport/${lang}?${queryString}`);

    return result.data;
  };

  return api;
};

export default LogReportData;
