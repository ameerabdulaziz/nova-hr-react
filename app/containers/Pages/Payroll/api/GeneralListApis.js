import axiosInstance from './axios';
const GeneralListApis = (locale) => {
  const Apis = {};



  Apis.GetDepartmentList = async () => {
    debugger;
   const data = await axiosInstance.get(`GeneralList/GetDepartmentList/${locale}`);
  
   return data.data;
 };

 Apis.GetEmployeeListByDepartment = async (department) => {
    
    const result = await axiosInstance.get(`GeneralList/GetEmployeeListByDepartment/${locale}?departmentId=${department}`);
   
    return result.data;
  };

  Apis.GetEmployeeList = async () => {
    debugger;
    const result = await axiosInstance.get(`GeneralList/GetEmployeeList/${locale}`);
   
    return result.data;
  };

  
 Apis.GetYears = async () => {    
  debugger;
  const result = await axiosInstance.get(`MdYear/GetListModel/${locale}`);   
  return result.data;
};
Apis.GetMonths = async () => {    
  debugger;
  const result = await axiosInstance.get(`MdMonth/GetListModel/${locale}`);   
  return result.data;
};
Apis.GetRewards = async () => {    
  debugger;
  const result = await axiosInstance.get(`HrRewards/GetListModel/${locale}`);   
  return result.data;
};
Apis.GetPenaltyList = async () => {    
  debugger;
  const result = await axiosInstance.get(`GeneralList/GetPenaltyList/${locale}`);   
  return result.data;
};


Apis.GetElementList = async () => {    
  debugger;
  const result = await axiosInstance.get(`GeneralList/GetElementList/${locale}`);   
  return result.data;
};
Apis.GetElementListByTemplate = async (templateId) => {    
  debugger;
  const result = await axiosInstance.get(`GeneralList/GetElementListByTemplate/${templateId}/${locale}`);    
  return result.data;
};
Apis.GetPayTemplateList = async () => {    
  debugger;
  const result = await axiosInstance.get(`GeneralList/GetPayTemplateList/${locale}`);   
  return result.data;
};

Apis.GetEmployeeData = async (id) => {    
  debugger;
  const result = await axiosInstance.get(`GeneralList/GetEmployeeData/${id}/${locale}`);   
  return result.data;
};
Apis.GetJobsList = async () => {    
  debugger;
  const result = await axiosInstance.get(`MdJobs/GetListModel/${locale}`);   
  return result.data;
};
Apis.GetEmployeeDataList = async () => {    
  debugger;
  const result = await axiosInstance.get(`GeneralList/GetEmployeeDataList/${locale}`);   
  return result.data;
};
Apis.GetExplanationTypeList = async () => {    
  debugger;
  const result = await axiosInstance.get(`GeneralList/GetExplanationTypeList/${locale}`);   
  return result.data;
};
Apis.GetNewsTypeList = async () => {    
  debugger;
  const result = await axiosInstance.get(`GeneralList/GetNewsTypeList/${locale}`);   
  return result.data;
};

  return  Apis;
};

export default GeneralListApis;

