import axiosInstance from '../../api/axios';
const ResetPasswordData = () => {
  const Apis = {};

  Apis.ResetUserPassword = async (body) => {
    const result = await axiosInstance.post('Account/ResetUserPassword', body);

    return result;
  };

  Apis.ResetAllUsersPassword = async (password,isSendEmail) => {
    debugger;
    const result = await axiosInstance.post(`UserManagement/ResetAllUsersPassword?password=${password}&isSendEmail=${isSendEmail}`);

    return result;
  };

  Apis.Logout = async (password,isSendEmail) => {
    debugger;
    const result = await axiosInstance.post(`UserManagement/Logout`);
    return result;
  };

  Apis.getEmployeeUsername = async (employeeId) => {
    const result = await axiosInstance.get(`UserManagement/GetUserName/${employeeId}`);

    return result.data;
  };

  return Apis;
};

export default ResetPasswordData;
