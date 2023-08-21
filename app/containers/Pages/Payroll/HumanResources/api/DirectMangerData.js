import axiosInstance from '../../api/axios';
const DirectMangerData = () => {
  const Apis = {};

  
  Apis.GetList = async (lang,employee) => {
    debugger;
   const data = await axiosInstance.get(`DirectManager/GetList/${lang}/${employee}`);
  
   return data.data;
 };
  
 Apis.Save= async (data) => {
  var submitedData = data.dataList.filter((row) => row.isSelected==true).map((obj) => {return  obj.id;});
  
    const result = await axiosInstance.post(`DirectManager/Save/${data.employee}`, submitedData);
    debugger;
    return result;
  };


  return Apis;
};

export default DirectMangerData;

