import axiosInstance from '../../api/axios';
const MenuTemplateData = (local) => {
  const Apis = {};

  Apis.GetMenuTemplateList = async (tempId) => {
     
    const data = await axiosInstance.get(`Menu/GetTemplateMenuList/${local}/${tempId}`);
   
    return data.data;
  };


  
  Apis.SaveMenuTemplate = async (tempId,body) => {
  
    const result = await axiosInstance.post(`Menu/SaveTemplateMenu/${tempId}`, body);
    
    return result;
  };


  return Apis;
};

export default MenuTemplateData;

