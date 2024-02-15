import axiosInstance from '../Pages/Payroll/api/axios';

const API = (locale) => {
  const utils = {};

  utils.getCompanyInfo = async () => {
    const data = await axiosInstance.get(`MdCompany/Get/${locale}`);

    return data.data;
  };

  utils.getMenu = async () => {
    const data = await axiosInstance.get(`Menu/${locale}`);

    return data.data;
  };

  utils.getUserInfo = async () => {
    const data = await axiosInstance.get('EmpEmployee/GetUserData');

    return data.data;
  };

  return utils;
};

export default API;
