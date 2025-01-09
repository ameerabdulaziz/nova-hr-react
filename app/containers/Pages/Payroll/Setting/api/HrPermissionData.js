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

  api.save = async (body) => {
    const result = await axiosInstance.post(
      `MdOrganizationEmployee/Save/${body.employee}`,
      body.dataList
    );

    return result;
  };

  api.GetNotAllowedEmpsList = async (id) => {
    const data = await axiosInstance.get(
      `EmpHrPermission/Get/${id}/${lang}`
    );

    return data.data;
  };

  api.saveNotAllowedEmps = async (body) => {
    const result = await axiosInstance.post(
      `EmpHrPermission/Save`,
      body
    );

    return result;
  };

  return api;
};

export default UserMenuData;
