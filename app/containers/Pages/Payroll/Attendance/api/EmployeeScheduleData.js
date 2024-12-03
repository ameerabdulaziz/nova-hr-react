import axiosInstance from '../../api/axios';


const EmployeeScheduleData = (locale) => {
  const Apis = {};


  Apis.GetList = async (params) => {
    
    const queryString = new URLSearchParams(params);
   const data = await axiosInstance.get(`AttShiftEmployee/GetEmployeeShiftCalendar/${locale}?${queryString}`);
  
   return data.data;
 };


  Apis.ChangeShift = async (params,data) => {
    const queryString = new URLSearchParams(params);
    const result = await axiosInstance.post(`AttShiftEmployee/ChangeShift?${queryString}`,data);
    return result;
  };
    
  return Apis;
};

export default EmployeeScheduleData;
