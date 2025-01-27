import axiosInstance from '../../api/axios';


const SalaryCalculationData = (locale) => {
  const Apis = {};

  Apis.GetList = async (param) => {
    debugger;
    const queryString = new URLSearchParams(param);
    const data = await axiosInstance.get(`PayrollCalculation/GetList/${locale}?${queryString}`);
    const result = data.data;    
    return result;
  };

  Apis.CalculateSalary = async (param) => {
    
    const queryString = new URLSearchParams(param);
    const data = await axiosInstance.get(`PayrollCalculation/CalculateSalary/${locale}?${queryString}`);
    
    return data;
  };
  Apis.DeleteSalary = async (param) => {
    
    const queryString = new URLSearchParams(param);
    const data = await axiosInstance.get(`PayrollCalculation/DeleteSalary?${queryString}`);
    
    return data;
  };
  Apis.StopOrOperateAttendance = async (param) => {
    
    const queryString = new URLSearchParams(param);
    const data = await axiosInstance.get(`PayrollCalculation/StopOrOperateAttendance?${queryString}`);
    
    return data;
  };
  Apis.ShowOrHideReport = async (param) => {
    
    const queryString = new URLSearchParams(param);
    const data = await axiosInstance.get(`PayrollCalculation/ShowOrHideReport?${queryString}`);
    
    return data;
  };
  Apis.IsShowReport = async (param) => {
    
    const queryString = new URLSearchParams(param);
    const data = await axiosInstance.get(`PayrollCalculation/IsShowReport?${queryString}`);
    
    return data;
  };


  

  return Apis;
};

export default SalaryCalculationData;
