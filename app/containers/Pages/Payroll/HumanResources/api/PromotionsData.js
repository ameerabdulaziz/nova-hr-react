import axiosInstance from '../../api/axios';


const PromotionsData = (locale) => {
  const Apis = {};
  
  

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`HrPromotions/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HrPromotions/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    debugger;
  var requestData={
    "PromotionsDate": data.PromotionsDate,
    "employeeId":data.employeeId,
    "id":data.id,
    "reason":data.reason,
    }
    const result = await axiosInstance.post("HrPromotions/Save",requestData);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrPromotions/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrPromotions/DeleteList`,list);
    return result;
  };


  return Apis;
};

export default PromotionsData;
