import axiosInstance from '../../api/axios';
const UserMenuData = (lang) => {
  const api = {};

  api.getList = async (employee) => {
    const data = await axiosInstance.get(
      `MdOrganizationEmployee/GetList/${lang}/${employee}`
    );

    return data.data;
  };

  api.GetHrList = async () => {
    const data = await axiosInstance.get(
      `MdOrganizationEmployee/GetHrList/${lang}`
    );

    return data.data;
  };

  api.GetSimpleOrganizationChart = async () => {
    const data = await axiosInstance.get(
      `MdOrganization/GetSimpleOrganizationChart/${lang}`
    );

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post(
      `MdOrganizationEmployee/Save/${body.employee}`,
      body.dataList
    );

    return result;
  };

  return api;
};

export default UserMenuData;
