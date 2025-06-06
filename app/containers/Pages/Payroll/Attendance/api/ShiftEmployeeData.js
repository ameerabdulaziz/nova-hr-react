import axiosInstance from '../../api/axios';


const ShiftEmployeeData = (locale) => {
  const Apis = {};


  Apis.GetList = async (EmployeeId,ShiftId,ToDate) => {
    const data = await axiosInstance.get(`AttShiftEmployee/GetList/${locale}?EmployeeId=${EmployeeId}&ShiftId=${ShiftId}&ToDate=${ToDate}`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id,employeeId) => {
    
    const data = await axiosInstance.get(`AttShiftEmployee/Get/${id}/${locale}?EmployeeId=${employeeId}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    
    const result = await axiosInstance.post("AttShiftEmployee/Save",data);
    return result;
  };
  Apis.SaveList = async (data) => {
    const result = await axiosInstance.post("AttShiftEmployee/SaveList",data);
    return result;
  };

  Apis.SaveListFromImport = async (data) => {
    const result = await axiosInstance.post("AttShiftEmployee/SaveListFromImport",data);
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
  Apis.ChangeShift = async (EmployeeId,ShiftId,SelectedDate) => {
    const result = await axiosInstance.post(`AttShiftEmployee/ChangeShift?EmployeeId=${EmployeeId}&ShiftId=${ShiftId}&SelectedDate=${SelectedDate}`);
    return result;
  };
  Apis.TransferShift = async (data) => {
    const result = await axiosInstance.post("AttShiftEmployee/TransferShift",data);
    return result;
  };
  
  
  Apis.GetEmpAttendance = async (FromDate,ToDate, EmployeeId, OrganizationId,EmployeeStatusId,ShiftId) => {
    const data = await axiosInstance.get(`AttEmployeeAttendance/GetEmpAttendance/${locale}?FromDate=${FromDate!=null?FromDate:""}&ToDate=${ToDate!=null?ToDate:""}&EmployeeId=${EmployeeId}&OrganizationId=${OrganizationId}&EmployeeStatusId=${EmployeeStatusId}&ShiftId=${ShiftId}`);
    const result = data.data;
    
    return result;
  };

  return Apis;
};

export default ShiftEmployeeData;
