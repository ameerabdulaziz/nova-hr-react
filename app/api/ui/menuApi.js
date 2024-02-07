import axiosInstance from '../../containers/Pages/Payroll/api/axios';

const menuApi = {
  fetchApi: async (locale) => {
    debugger ;
    const data = await axiosInstance.get(`Menu/${locale}`);

    return data.data;
  },

  getCompanyInfo: async (locale) => {
    const data = await axiosInstance.get(`MdCompany/Get/${locale}`);

    return data.data;
  },
};

export default menuApi;
