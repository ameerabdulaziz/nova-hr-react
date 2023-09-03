import axiosInstance from '../../api/axios';


const PermissionTrxData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,permission,fromdate,todate) => {
    debugger;
    const data = await axiosInstance.get(`AttPermissionTrx/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&PermissionId=${permission!=null?permission:""}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`AttPermissionTrx/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`AttPermissionTrx/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    debugger;

    const result = await axiosInstance.post("AttPermissionTrx/Save",data);
    return result;
  };
  Apis.SaveAll = async (data) => {
    debugger;
    const result = await axiosInstance.post("AttPermissionTrx/SaveAll",data);
    return result;
  };
  Apis.SaveList = async (data) => {
    debugger;
    const result = await axiosInstance.post("AttPermissionTrx/SaveList",data);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`AttPermissionTrx/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`AttPermissionTrx/DeleteList`,list);
    return result;
  };

  Apis.getRepeatedNo = async (permissionId , date,employeeId) => {
    debugger;
    const data = await axiosInstance.get(`AttPermissionTrx/getRepeatedNo?permissionId=${permissionId}&date=${date}&EmployeeId=${employeeId}`);
    
    return data.data;

  };
  
Apis.GetRewardData = async (id) => {    
  debugger;
  const result = await axiosInstance.get(`AttPermissionTrx/GetRewardData/${id}/${locale}`);   
  return result.data;
};

  return Apis;
};

export default PermissionTrxData;
