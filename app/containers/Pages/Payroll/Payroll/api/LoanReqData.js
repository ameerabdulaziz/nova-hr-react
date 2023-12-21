import axiosInstance from '../../api/axios';


const LoanReqData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`PayrollLoanReq/GetList/${locale}`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`PayrollLoanReq/Get/${locale}/${id}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    const result = await axiosInstance.post("PayrollLoanReq/Save",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`PayrollLoanReq/Delete/${id}`);
    return result;
  };

  return Apis;
};

export default LoanReqData;
