import axiosInstance from '../../api/axios';
const LeaveOpenBalanceData = (locale) => {
  const LeaveOpenBalanceApis = {};

  LeaveOpenBalanceApis.GetDataById = async (EmployeeId,LeaveTypeId) => {
    const data = await axiosInstance.get(`VacEmployeeVacOpenBalance/Get/${EmployeeId}/${LeaveTypeId}`);
    const result = data.data;

    return result;
  };

  LeaveOpenBalanceApis.Save = async (data) => {
    const result = await axiosInstance.post('VacEmployeeVacOpenBalance/Save', data)
        
    return result;
  };


  return LeaveOpenBalanceApis;
};

export default LeaveOpenBalanceData;
