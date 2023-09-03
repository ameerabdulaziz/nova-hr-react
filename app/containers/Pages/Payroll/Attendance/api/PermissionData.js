import axiosInstance from '../../api/axios';


const PermissionData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`AttPermission/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`AttPermission/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    debugger;

    const result = await axiosInstance.post("AttPermission/Save",data);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`AttPermission/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`AttPermission/DeleteList`,list);
    return result;
  };

  
Apis.GetRewardData = async (id) => {    
  debugger;
  const result = await axiosInstance.get(`AttPermission/GetRewardData/${id}/${locale}`);   
  return result.data;
};

  return Apis;
};

export default PermissionData;
