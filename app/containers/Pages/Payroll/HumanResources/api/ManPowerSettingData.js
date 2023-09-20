import axiosInstance from '../../api/axios';
const ManPowerSettingData = () => {
  const Apis = {};

  
  Apis.GetList = async (lang,organization) => {
    debugger;
   const data = await axiosInstance.get(`HrManPowerSetting/GetList/${lang}/${organization}`);
  
   return data.data;
 };
  
 Apis.Save= async (data) => {
  debugger ;
  var submitedData = data.dataList.filter((row) => row.isSelected==true);;
  
    const result = await axiosInstance.post(`HrManPowerSetting/Save/${data.organization}`, submitedData);
    debugger;
    return result;
  };


  return Apis;
};

export default ManPowerSettingData;

