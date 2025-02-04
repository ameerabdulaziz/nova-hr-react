import axiosInstance from '../../api/axios';


const hrResignRuleData = (locale) => {
  const Apis = {};
  

  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`HrResignRule/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetDataById = async (id) => {
    
    const data = await axiosInstance.get(`HrResignRule/Get/${id}/${locale}`);
    return data.data;

  };

  Apis.Save = async (body) => {
    
    const result = await axiosInstance.post("HrResignRule/Save",body);
    return result;
  };

  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`HrResignRule/Delete/${id}`);
    return result;
  };



  return Apis;
};

export default hrResignRuleData;
