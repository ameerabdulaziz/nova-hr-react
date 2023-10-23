import axiosInstance from '../../api/axios';


const AttRulesData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`AttRules/GetList/${locale}`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`AttRules/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    

    const result = await axiosInstance.post("AttRules/Save",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`AttRules/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`AttRules/DeleteList`,list);
    return result;
  };

  
  return Apis;
};

export default AttRulesData;
