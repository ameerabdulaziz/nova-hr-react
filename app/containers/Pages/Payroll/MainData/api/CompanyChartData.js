import axiosInstance from '../../api/axios';
const CompanyChartData = (locale) => {
  const CompanyChartApis = {};

  CompanyChartApis.GetOrganizationChart = async () => {
    
    const data = await axiosInstance.get(`MdOrganization/GetOrganizationChart/${locale}`);
   
    return data.data;
  };

  CompanyChartApis.GetEmployeeChart = async () => {
    
   const data = await axiosInstance.get(`MdOrganization/GetEmployeeChart/${locale}`);
  
   return data.data;
 };

  CompanyChartApis.SaveOrganizationData = async (data) => {
  
    const result = await axiosInstance.post('MdOrganization/SaveOrganizationData', data);
    return result;
  };


  CompanyChartApis.SaveEmployeeData = async (data) => {
  
    const result = await axiosInstance.post('MdOrganization/SaveEmployeeData', data);
    return result;
  };

  return CompanyChartApis;
};

export default CompanyChartData;

