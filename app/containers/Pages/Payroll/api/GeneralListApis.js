import axiosInstance from './axios';
const GeneralListApis = (locale) => {
  const Apis = {};

  Apis.GetDepartmentList = async () => {
    debugger;
    const data = await axiosInstance.get(
      `GeneralList/GetDepartmentList/${locale}`
    );

    return data.data;
  };

  Apis.GetEmployeeListByDepartment = async (department) => {
    const result = await axiosInstance.get(
      `GeneralList/GetEmployeeListByDepartment/${locale}?departmentId=${department}`
    );

    return result.data;
  };

  Apis.GetEmployeeList = async () => {
<<<<<<< HEAD
    const result = await axiosInstance.get(
      `GeneralList/GetEmployeeList/${locale}`
    );

=======
    debugger;
    const result = await axiosInstance.get(`GeneralList/GetEmployeeList/${locale}`);
   
>>>>>>> e5db13103550138b195a5dbccc73f564c702838b
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
    const result = await axiosInstance.get(
      `GeneralList/GetPenaltyList/${locale}`
    );
    return result.data;
  };

  Apis.GetElementList = async () => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetElementList/${locale}`
    );
    return result.data;
  };
  Apis.GetElementListByTemplate = async (templateId) => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetElementListByTemplate/${templateId}/${locale}`
    );
    return result.data;
  };
  Apis.GetPayTemplateList = async () => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetPayTemplateList/${locale}`
    );
    return result.data;
  };

  Apis.GetEmployeeData = async (id) => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetEmployeeData/${id}/${locale}`
    );
    return result.data;
  };

  Apis.GetLicenseGradeList = async () => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetLicenseGradeList/${locale}`
    );
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

  Apis.GetSalaryStructureList = async () => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetSalaryStructureList/${locale}`
    );
    return result.data;
  };

  Apis.GetJobList = async () => {
    debugger;
    const result = await axiosInstance.get(`GeneralList/GetJobList/${locale}`);
    return result.data;
  };

  Apis.GetJobLevelList = async () => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetJobLevelList/${locale}`
    );
    return result.data;
  };

  Apis.GetkinshipLinkList = async () => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetkinshipLinkList/${locale}`
    );
    return result.data;
  };
  Apis.GetHiringSourceList = async () => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetHiringSourceList/${locale}`
    );
    return result.data;
  };
  Apis.GetContractTypeList = async () => {
    debugger;
    const result = await axiosInstance.get(
      `GeneralList/GetContractTypeList/${locale}`
    );
    return result.data;
  };
  return Apis;
};

export default GeneralListApis;
