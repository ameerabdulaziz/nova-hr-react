import axiosInstance from '../../api/axios';
const ResetPasswordData = () => {
  const Apis = {};

  Apis.ResetUserPassword = async (body) => {
    const result = await axiosInstance.post('Account/ResetUserPassword', body);

    return result;
  };

  Apis.ResetAllUsersPassword = async (password) => {
    const result = await axiosInstance.post('Account/ResetAllUsersPassword', {
      NewPassword: password,
    });

    return result;
  };

  Apis.getEmployeeUsername = async (employeeId) => {
    const result = await axiosInstance.get(`Account/GetUserName/${employeeId}`);

    return result.data;
  };

  return Apis;
};

export default ResetPasswordData;
