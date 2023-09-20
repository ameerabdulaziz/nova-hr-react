import axiosInstance from '../../api/axios';
const OrganizationData = (locale) => {
  const OrganizationApis = {};
  OrganizationApis.GetList = async () => {
    const data = await axiosInstance.get(`MdOrganization/GetAllOrganization/${locale}`);
    const result = data.data;

    return result;
  };




  OrganizationApis.GetDataById = async (id,locale) => {
    const data = await axiosInstance.get(`MdOrganization/GetAllOrganization/${locale}?id=${id}`);
    const result = data.data;

    return result;
  };

  OrganizationApis.Save = async (data) => {
    const result = await axiosInstance.post('MdOrganization/Save', data);
        
    return result;
  };



  OrganizationApis.Delete = async (Item) => {
    const data = await axiosInstance.delete(`MdOrganization/${Item[0]}`);
    return data;
  };

  return OrganizationApis;
};

export default OrganizationData;
