import axiosInstance from '../../api/axios';
const EmployeeLocationData = (locale) => {
  const Apis = {};

  
  Apis.GetList = async (params) => {
    debugger;
    const queryString = new URLSearchParams(params);
   const data = await axiosInstance.get(`AttLocationEmployee/GetList/${locale}?${queryString}`);
  
   return data.data;
 };
  
 Apis.SaveList= async (data,Location) => {
  debugger ;
  
  var submitedData = data.filter((row) => row.isSelected==true);;
  
  var data = submitedData.map((obj) => {
    return {
      ...obj,
      locationId: Location,
    };
  }) || []
    const result = await axiosInstance.post(`AttLocationEmployee/SaveList/`, data);
    
    return result;
  };


  return Apis;
};

export default EmployeeLocationData;

