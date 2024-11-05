import axiosInstance from '../../api/axios';
const EmployeeLocationData = (locale) => {
  const Apis = {};

  
  Apis.GetList = async (params) => {
    
    const queryString = new URLSearchParams(params);
   const data = await axiosInstance.get(`AttLocationEmployee/GetList/${locale}?${queryString}`);
  
   return data.data;
 };
  
 Apis.SaveList= async (data,Location) => {
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


  Apis.Delete = async (data) => {

    const result = await axiosInstance.post("AttLocationEmployee/DeleteList",data);
    return result;
  };


  return Apis;
};

export default EmployeeLocationData;

