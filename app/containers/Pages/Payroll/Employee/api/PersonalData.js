import axiosInstance from '../../api/axios';
const PersonalData = (locale) => {
  const Apis = {};

  Apis.GetList = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(`EmpEmployee/AllData/${locale}?${queryString}`);
    const result = data.data;
    return result;
  };

  Apis.Delete = async (Item) => {
    const data = await axiosInstance.delete(`EmpEmployee/${Item}`);
    const result = data.data;
    return result;
  };
  return Apis;
};

export default PersonalData;
