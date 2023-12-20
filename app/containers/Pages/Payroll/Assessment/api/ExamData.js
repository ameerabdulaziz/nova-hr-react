import axiosInstance from "../../api/axios";

const ExamData = (locale) => {
  const Apis = {};


  Apis.Get = async () => {
    const data = await axiosInstance.get(`Assessment/GetEmployeeAssessment/${locale}`);

    return data.data;
  };

//   Apis.Save = async (data) => {

//       const result = await axiosInstance.post("PayrollBranchSallarySetting/Save", data);
//       return result;
//   };
//   Apis.CopyToAllBranches = async (id) => {

    
//       const result = await axiosInstance.post(`PayrollLoanSetting/CopyToAllBranches/${id}`);
//       return result;
//   };
  
  return Apis;
};

export default ExamData;
