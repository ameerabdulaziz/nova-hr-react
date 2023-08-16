import axiosInstance from '../../api/axios';
const DirectMangerData = () => {
  const Apis = {};

  
  Apis.GetList = async (lang,employee) => {
    debugger;
   const data = await axiosInstance.get(`DirectManager/GetList/${lang}/${employee}`);
  
   return data.data;
 };
  
 Apis.Save= async (data) => {
  
    const result = await axiosInstance.post(`DirectManager/Save/${data.employee}`, data.dataList);
    debugger;
    return result;
  };


  return Apis;
};

export default DirectMangerData;

