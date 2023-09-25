import axiosInstance from '../../api/axios';
const UserMenuData = () => {
  const UserMenuApis = {};

  UserMenuApis.GetUserMenuLookup = async (lang) => {
     
    const data = await axiosInstance.get(`Menu/GetUserMenuLookup/${lang}`);
   
    return data.data;
  };
  UserMenuApis.GetUserMenuList = async (lang,employee) => {
    
   const data = await axiosInstance.get(`Menu/GetUserMenuList/${lang}/${employee}`);
  
   return data.data;
 };
  
  UserMenuApis.SaveUserMenu = async (data) => {
  
    const result = await axiosInstance.post(`Menu/SaveUserMenu/${data.employee}`, data.dataList);
    
    return result;
  };


  return UserMenuApis;
};

export default UserMenuData;

