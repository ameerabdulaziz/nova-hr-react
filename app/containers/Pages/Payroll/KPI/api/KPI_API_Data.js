import axiosInstance from '../../api/axios';
const KPI_API_Data = (locale) => {
  const KPI_API_DataApis = {};
  KPI_API_DataApis.GetList = async (URL,params) => {

    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(`${URL}/GetList/${locale}?${queryString.toString()}`);
    const result = data.data;

    return result;
  };

  KPI_API_DataApis.Save = async (URL,data) => {
    const result = await axiosInstance.post(`${URL}/Save`, data)

    return result;
  };

  return KPI_API_DataApis;
};

export default KPI_API_Data;
