import axiosInstance from '../../api/axios';


const ImportLeaveBalanceData = (locale) => {
  const Apis = {};
  
  Apis.SaveList = async (data, vacTypId) => {
    
    const result = await axiosInstance.post(`VacEmployeeVacOpenBalance/SaveList/${locale}/${vacTypId}`,data);
    return result;
  };
 
  return Apis;
};

export default ImportLeaveBalanceData;
