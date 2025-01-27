import axiosInstance from '../../api/axios';


const ResignReasonData = (locale) => {
  const Apis = {};
  

  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`HrResignReason/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetDataById = async (id) => {
    
    const data = await axiosInstance.get(`HrResignReason/Get/${id}/${locale}`);
    return data.data;

  };

  Apis.Save = async (body) => {
    
    const result = await axiosInstance.post("HrResignReason/save",body);
    return result;
  };

  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`HrResignReason/Delete/${id}`);
    return result;
  };



  return Apis;
};

export default ResignReasonData;
