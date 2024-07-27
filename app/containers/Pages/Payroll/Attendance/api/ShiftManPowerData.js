import axiosInstance from '../../api/axios';
const ShiftManPowerData = () => {
  const Apis = {};

  
  Apis.GetList = async (lang,organization) => {
    
   const data = await axiosInstance.get(`AttShiftManPower/GetList/${lang}/${organization}`);
  
   return data.data;
 };
  
 Apis.Save= async (data) => {
  
  var submitedData = data.dataList.filter((row) => row.isSelected==true);;
  
    const result = await axiosInstance.post(`AttShiftManPower/Save/${data.organization}`, submitedData);
    
    return result;
  };


  return Apis;
};

export default ShiftManPowerData;

