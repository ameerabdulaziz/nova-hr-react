import axiosInstance from '../../api/axios';
const KPI_Reports_Data = (locale) => {
  const KPI_Reports_DataApis = {};

  KPI_Reports_DataApis.GetLobReport = async (params) => {

    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`KpiReport/GetKpiLobReport/${locale}?${queryString.toString()}`);
    const result = data.data;

    return result;
  };

  KPI_Reports_DataApis.GetSupervisorReport = async (params) => {

    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`KpiReport/GetKpiSupervisorReport/${locale}?${queryString.toString()}`);
    const result = data.data;

    return result;
  };

  return KPI_Reports_DataApis;
};

export default KPI_Reports_Data;
