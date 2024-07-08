import axiosInstance from '../../api/axios';

const ChangePasswordData = () => {
  const api = {};

  api.ChangeUserPassword = async (body) => {
    const result = await axiosInstance.post('Account/ChangeUserPassword', body);

    return result;
  };

  return api;
};

export default ChangePasswordData;
