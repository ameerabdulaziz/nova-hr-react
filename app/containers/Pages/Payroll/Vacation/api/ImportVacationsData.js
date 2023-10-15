import axiosInstance from '../../api/axios';


const vacationTrxData = (locale) => {
  const Apis = {};
  
  Apis.SaveList = async (data) => {
    
    const result = await axiosInstance.post(`VacVacationTrx/SaveList/${locale}`,data);
    return result;
  };
 
  return Apis;
};

export default vacationTrxData;
