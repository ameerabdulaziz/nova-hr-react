import axiosInstance from '../../api/axios';


const PermissionTrxData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,permission,fromdate,todate,Status,Deleted) => {
    
    debugger ;
    const data = await axiosInstance.get(`AttPermissionTrx/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee}&PermissionId=${permission}&StatusId=${Status}&IsDeleted=${Deleted}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`AttPermissionTrx/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`AttPermissionTrx/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.getPermissions = async (data) => {
    
    const result = await axiosInstance.get(`AttPermissionTrx/getPermissions/${locale}?permissionId=${data.permissionId}&date=${data.date}&StartTime=${data.startTime}&EndTime=${data.endTime}`);
    
    return result.data;

  };
  
  Apis.Save = async (data) => {
    

    const result = await axiosInstance.post("AttPermissionTrx/Save",data);
    return result;
  };
  Apis.SaveAll = async (data) => {
    
    const result = await axiosInstance.post("AttPermissionTrx/SaveAll",data);
    return result;
  };
  Apis.SaveList = async (data) => {
    
    const result = await axiosInstance.post("AttPermissionTrx/SaveList",data);
    return result;
  };
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`AttPermissionTrx/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`AttPermissionTrx/DeleteList`,list);
    return result;
  };
  Apis.DeleteAll = async (data) => {
    
    const result = await axiosInstance.post("AttPermissionTrx/DeleteAll",data);
    return result;
  };
  Apis.getRepeatedNo = async (permissionId , date,employeeId) => {
    
    const data = await axiosInstance.get(`AttPermissionTrx/getRepeatedNo?permissionId=${permissionId}&date=${date}&EmployeeId=${employeeId}`);
    
    return data.data;

  };
  


  return Apis;
};

export default PermissionTrxData;
