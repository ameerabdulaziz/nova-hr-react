import axiosInstance from '../../api/axios';
const PersonalData = (locale) => {
  const Apis = {};
  
  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`EmpEmployee/AllData/${locale}`);
    const result = data.data;
    return result;
  };
  Apis.Delete = async (Item) => {
    const data = await axiosInstance.delete(`EmpEmployee/${Item.id}`);
    const result = data.data;
    return result;
  };
  return Apis;
};

export default PersonalData;
