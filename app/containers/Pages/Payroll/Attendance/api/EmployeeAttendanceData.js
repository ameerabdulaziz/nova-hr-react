import axiosInstance from '../../api/axios';


const EmployeeAttendanceData = (locale) => {
  const Apis = {};


  Apis.UpdateAll = async (data) => {
    
    const result = await axiosInstance.post(`AttEmployeeAttendance/UpdateAll/${locale}`,data);
    return result;
  };
  Apis.SaveAll = async (data) => {
    const result = await axiosInstance.post(`AttEmployeeAttendance/SaveAll/${locale}`,data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`AttEmployeeAttendance/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`AttEmployeeAttendance/DeleteList`,list);
    return result;
  };


  return Apis;
};

export default EmployeeAttendanceData;
