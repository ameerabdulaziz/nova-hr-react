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

  Apis.SaveMenuTemplateNewElements = async (body) => {
  
    const result = await axiosInstance.post(`MdMenuTemplate`, body);
    
    return result;
  };

  Apis.GetMenuTemplateById = async (tempId) => {
     
    const data = await axiosInstance.get(`MdMenuTemplate/GetModel/${tempId}`);
   
    return data.data;
  };

  Apis.updateMenuTemplateData = async (tempId,body) => {
     
    const result = await axiosInstance.put(`MdMenuTemplate/${tempId}`, body);
    
    return result;
  };

  Apis.delete = async (id) => {
    const data = await axiosInstance.delete(
      `Menu/Delete/${id}`
    );

    const result = data.data;

    return result;
  };


  return Apis;
};

export default MenuTemplateData;

