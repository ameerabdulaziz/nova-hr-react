import axiosInstance from '../../api/axios';
const UserMenuData = () => {
  const UserMenuApis = {};

  UserMenuApis.GetUserMenuLookup = async (lang) => {
     debugger;
    const data = await axiosInstance.get(`Menu/GetUserMenuLookup/${lang}`);
   
    return data.data;
  };
  UserMenuApis.GetUserMenuList = async (lang,employee) => {
    debugger;
   const data = await axiosInstance.get(`Menu/GetUserMenuList/${lang}/${employee}`);
  
   return data.data;
 };
  
  UserMenuApis.SaveUserMenu = async (data) => {
  
    const result = await axiosInstance.post(`Menu/SaveUserMenu/${data.employee}`, data.dataList);
    debugger;
    return result;
  };


  return UserMenuApis;
};

export default UserMenuData;

