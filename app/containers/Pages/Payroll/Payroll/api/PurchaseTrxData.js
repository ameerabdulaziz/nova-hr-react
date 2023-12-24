import axiosInstance from '../../api/axios';


const PurchaseTrxData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`PayrollPurchaseTrx/GetList/${locale}`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`PayrollPurchaseTrx/Get/${locale}/${id}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    const result = await axiosInstance.post("PayrollPurchaseTrx/Save",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`PayrollPurchaseTrx/Delete/${id}`);
    return result;
  };
  
  Apis.PostponeOneLoan = async (Id,LoanTraxId) => {
    
    const data = await axiosInstance.get(`PayrollPurchaseTrx/PostponeOneLoan/${locale}?Id=${Id}&LoanTraxId=${LoanTraxId}`);
    const result = data.data;    
    return result;
  };

  Apis.RecalculateLoan = async (Id,LoanTraxId,NewValue) => {
    
    const data = await axiosInstance.get(`PayrollPurchaseTrx/RecalculateLoan/${locale}?Id=${Id}&LoanTraxId=${LoanTraxId}&NewValue=${NewValue}`);
    const result = data.data;    
    return result;
  };
  

  return Apis;
};

export default PurchaseTrxData;
