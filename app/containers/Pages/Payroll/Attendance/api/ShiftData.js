import axiosInstance from '../../api/axios';


const ShiftData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`AttShift/GetList/${locale}`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`AttShift/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    

    const result = await axiosInstance.post("AttShift/Save",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`AttShift/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`AttShift/DeleteList`,list);
    return result;
  };

  
  return Apis;
};

export default ShiftData;
