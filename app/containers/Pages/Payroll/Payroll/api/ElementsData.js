import axiosInstance from '../../api/axios';


const ElementsData = (locale) => {
  const Apis = {};


  Apis.IsArabicNameExist = async (id,name) => {
    
    const data = await axiosInstance.get(`PayrollElement/IsArabicNameExist?Id=${id}&Name=${name}`);
    const result = data.data;    
    return result;
  };

  Apis.IsEnglishNameExist = async (id,name) => {
    
    const data = await axiosInstance.get(`PayrollElement/IsEnglishNameExist?Id=${id}&Name=${name}`);
    const result = data.data;    
    return result;
  };

  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`PayrollElement/GetList`);
    const result = data.data;    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`PayrollElement/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.GetElementTaxAndIns = async (id) => {
    
    const data = await axiosInstance.get(`PayrollElement/GetElementTaxAndIns/${id}/${locale}`);
    
    return data.data;

  };

  Apis.Save = async (data) => {
    

    const result = await axiosInstance.post("PayrollElement/Save",data);
    return result;
  };
  

  Apis.SaveElementTaxAndIns = async (data) => {
    

    const result = await axiosInstance.post("PayrollElement/SaveElementTaxAndIns",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`PayrollElement/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    
    const result = await axiosInstance.post(`PayrollElement/DeleteList`,list);
    return result;
  };

  
  return Apis;
};

export default ElementsData;
