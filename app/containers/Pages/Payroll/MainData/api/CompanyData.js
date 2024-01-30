import axiosInstance from '../../api/axios';

const CompanyData = (locale = 'en') => {
  const Apis = {};

  Apis.getCompanyInfo = async () => {
    const data = await axiosInstance.get(`MdCompany/Get/${locale}`);
    return data.data;
  };

  Apis.Save = async (body = {}) => {
    const result = await axiosInstance.post('MdCompany/Save', body);

    return result;
  };

  return Apis;
};

export default CompanyData;
