import axiosInstance from "../../api/axios";

const BranchSalarySettingData = () => {
  const Apis = {};


  Apis.Get = async (id) => {
    const data = await axiosInstance.get(`PayrollBranchSallarySetting/Get/${id}`);

    return data.data;
  };

//   Apis.Save = async (data) => {

   
//       const result = await axiosInstance.post("PayrollLoanSetting/Save", data);
//       return result;
//   };
//   Apis.CopyToAllBranches = async (id) => {

    
//       const result = await axiosInstance.post(`PayrollLoanSetting/CopyToAllBranches/${id}`);
//       return result;
//   };
  
  return Apis;
};

export default BranchSalarySettingData;
