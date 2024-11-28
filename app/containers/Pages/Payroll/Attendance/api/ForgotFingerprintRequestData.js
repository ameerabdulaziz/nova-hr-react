import axiosInstance from '../../api/axios';


const ShiftData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`AttSignRequest/Getlist/${locale}`);
    const result = data.data;    
    return result;
  };

  Apis.GetDataById = async (id) => {
    
    const data = await axiosInstance.get(`AttSignRequest/Get/${id}/${locale}`);
    
    return data.data;

  };

  Apis.Save = async (data) => {
    
    const result = await axiosInstance.post("AttSignRequest/save",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`AttSignRequest/Delete/${id}`);
    return result;
  };

  
  return Apis;
};

export default ShiftData;
