import axiosInstance from '../../api/axios';


const ExplanationData = (locale) => {
  const Apis = {};
  
  Apis.GetReport = async (employee,type,fromdate,todate,allData) => {
    debugger;
    
      const data = await axiosInstance.get(`Explanation/GetReport/${locale}?FromDate=${fromdate!=null?fromdate:""}&ToDate=${todate!=null?todate:""}&EmployeeId=${employee!=null?employee:""}&TypeId=${type!=null?type:""}&AllData=${allData}`);
      const result = data.data;
   
    return result;
  };

  Apis.GetList = async () => {
    debugger;
    const data = await axiosInstance.get(`Explanation/GetList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.Get = async (id) => {
    debugger;
    const data = await axiosInstance.get(`Explanation/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.SaveResponse = async (data) => {
    debugger;
  var requestData={    
    "id":data.id,    
    "response":data.response,
    }    
    const result = await axiosInstance.post("Explanation/SaveResponse",requestData);
    return result;
  };

  

  return Apis;
};

export default ExplanationData;
