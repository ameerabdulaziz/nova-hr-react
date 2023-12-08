import axiosInstance from "../../api/axios";

const LoanSetting = (locale) => {
  const Apis = {};


  Apis.Get = async (id) => {
    const data = await axiosInstance.get(`PayrollLoanSetting/Get/${id}`);

    return data.data;
  };

  Apis.Save = async (data) => {
    debugger;
   
      const result = await axiosInstance.post("PayrollLoanSetting/Save", data);
      return result;
  };
  Apis.CopyToAllBranches = async (id) => {
    debugger;
    
      const result = await axiosInstance.post(`PayrollLoanSetting/CopyToAllBranches/${id}`);
      return result;
  };
  
  return Apis;
};

export default LoanSetting;
