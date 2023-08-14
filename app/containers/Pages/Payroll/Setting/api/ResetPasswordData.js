import axiosInstance from '../../api/axios';
const ResetPasswordData = () => {
  const Apis = {};


  Apis.ResetUserPassword = async (EmployeeId,NewPassword) => {
  
    const data={"EmployeeId":EmployeeId,"NewPassword":NewPassword} ;
    const result = await axiosInstance.post(`Account/ResetUserPassword`, data);
    debugger;
    return result;
  };

  Apis.ResetAllUsersPassword = async (EmployeeId,NewPassword) => {
  
    const result = await axiosInstance.post(`Account/ResetAllUsersPassword`);
    debugger;
    return result;
  };

  return  Apis;
};

export default ResetPasswordData;

