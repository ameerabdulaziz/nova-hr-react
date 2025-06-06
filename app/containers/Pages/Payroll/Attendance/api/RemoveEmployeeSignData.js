import axiosInstance from "../../api/axios";

const RemoveEmployeeSignData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `AttPermissionTrx/GetReport/${locale}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  
  Apis.GetList = async (params) => {
    const queryString = new URLSearchParams(params);
    
    const data = await axiosInstance.get(`AttDevice/GetList/${locale}?${queryString}`);
    const result = data.data;

    return result;
  };


  Apis.DeleteList = async (list) => {
    const result = await axiosInstance.post(
      `AttDevice/DeleteList`,
      list
    );
    return result;
  };
  
  
  return Apis;
};

export default RemoveEmployeeSignData;
