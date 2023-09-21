import axiosInstance from '../../api/axios';
const ReplaceAnnualLeaveBalanceData = (locale) => {
  const ReplaceAnnualLeaveBalanceApis = {};
  ReplaceAnnualLeaveBalanceApis.GetList = async () => {
    const data = await axiosInstance.get(`VacEmpVacBalRepMoney/GetList/${locale}`);
    const result = data.data;

    return result;
  };
  

  ReplaceAnnualLeaveBalanceApis.GetDataById = async (id) => {
    const data = await axiosInstance.get(`VacEmpVacBalRepMoney/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  ReplaceAnnualLeaveBalanceApis.GetElementListByTemplate = async (id) => {
    const data = await axiosInstance.get(`VacEmpVacBalRepMoney/GetElementListByTemplate/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  ReplaceAnnualLeaveBalanceApis.GetCaluVal = async (valData) => {
    const data = await axiosInstance.post(`VacEmpVacBalRepMoney/GetCalcRepVal`, valData);
    const result = data.data;

    return result;
  };

  ReplaceAnnualLeaveBalanceApis.Save = async (data) => {
    const result = await axiosInstance.post('VacEmpVacBalRepMoney/save', data)
        
    return result;
  };


  ReplaceAnnualLeaveBalanceApis.Delete = async (Item) => {
    const data = await axiosInstance.delete(`VacEmpVacBalRepMoney/Delete/${Item[0]}`);
    return data;
  };

  return ReplaceAnnualLeaveBalanceApis;
};

export default ReplaceAnnualLeaveBalanceData;
