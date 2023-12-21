import axiosInstance from '../../api/axios';


const LoanTrxData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`PayrollLoanTrx/GetList/${locale}`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`PayrollLoanTrx/Get/${locale}/${id}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    const result = await axiosInstance.post("PayrollLoanTrx/Save",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`PayrollLoanTrx/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`PayrollLoanTrx/DeleteList`,list);
    return result;
  };

  Apis.GetDetailList = async (YearId,MonthId,BranchId,EmployeeId) => {
    
    const data = await axiosInstance.get(`PayrollLoanTrx/GetDetailList/${locale}?YearId=${YearId??""}&MonthId=${MonthId??""}&BranchId=${BranchId??""}&EmployeeId=${EmployeeId??""}`);
    const result = data.data;    
    return result;
  };
  Apis.DetailPostpone = async (data,YearId,MonthId) => {
    const result = await axiosInstance.post(`PayrollLoanTrx/DetailPostpone?YearId=${YearId}&MonthId=${MonthId}`,data);
    return result;
  };

  Apis.PostponeOneLoan = async (Id,LoanTraxId) => {
    
    const data = await axiosInstance.get(`PayrollLoanTrx/PostponeOneLoan/${locale}?Id=${Id}&LoanTraxId=${LoanTraxId}`);
    const result = data.data;    
    return result;
  };

  Apis.RecalculateLoan = async (Id,LoanTraxId,NewValue) => {
    
    const data = await axiosInstance.get(`PayrollLoanTrx/RecalculateLoan/${locale}?Id=${Id}&LoanTraxId=${LoanTraxId}&NewValue=${NewValue}`);
    const result = data.data;    
    return result;
  };

  return Apis;
};

export default LoanTrxData;
