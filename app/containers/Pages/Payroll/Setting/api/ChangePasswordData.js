import axiosInstance from '../../api/axios';

const ChangePasswordData = () => {
  const api = {};

  api.ChangeUserPassword = async (body) => {
    const result = await axiosInstance.post('UserManagement/ChangeUserPassword', body);

    return result;
  };

  return api;
};

export default ChangePasswordData;
