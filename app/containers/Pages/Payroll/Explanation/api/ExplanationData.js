import axiosInstance from '../../api/axios';


const ExplanationData = (locale) => {
  const Apis = {};
  
 
  Apis.GetReport = async (params) => {
    const data = await axiosInstance.get(
      `Explanation/GetReport/${locale}`, {
        params
      }
    );
    const result = data.data;

    return result;
  };


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`Explanation/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    
    const data = await axiosInstance.get(`Explanation/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.SaveResponse = async (data) => {
    
    const result = await axiosInstance.post("Explanation/SaveResponse",data);
    return result;
  };

  Apis.SaveComplaint = async (data) => {
    
    const result = await axiosInstance.post("Explanation/SaveComplaint",data);
    return result;
  };
  
  Apis.SaveEnquiry = async (data) => {
    
    const result = await axiosInstance.post("Explanation/SaveEnquiry",data);
    return result;
  };
  Apis.SaveHrLetter = async (data) => {
    
    const result = await axiosInstance.post("Explanation/SaveHrLetter",data);
    return result;
  };



  

  return Apis;
};

export default ExplanationData;
