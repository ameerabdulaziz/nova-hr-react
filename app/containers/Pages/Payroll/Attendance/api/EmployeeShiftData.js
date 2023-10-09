import axiosInstance from '../../api/axios';


const EmployeeShiftData = (locale) => {
  const Apis = {};


  Apis.GetList = async (EmployeeId,ShiftId) => {
    
    const data = await axiosInstance.get(`AttShiftEmployee/GetList/${locale}?EmployeeId=${EmployeeId}&ShiftId=${ShiftId}`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`AttShiftEmployee/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    
debugger ;
    const result = await axiosInstance.post("AttShiftEmployee/Save",data);
    return result;
  };
  Apis.SaveAll = async (data) => {
    const result = await axiosInstance.post("AttShiftEmployee/SaveAll",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`AttShiftEmployee/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`AttShiftEmployee/DeleteList`,list);
    return result;
  };

  
  return Apis;
};

export default EmployeeShiftData;
