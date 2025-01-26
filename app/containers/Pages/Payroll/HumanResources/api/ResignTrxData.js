import axiosInstance from "../../api/axios";

const ResignTrxData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `HrResignTrx/GetReport/${locale}?${queryString}`
    );
    const result = data.data;

    return result;
  };
  Apis.GetList = async () => {
    const data = await axiosInstance.get(`HrResignTrx/GetList/${locale}`);
    const result = data.data;

    return result;
  };

  Apis.Get = async (id) => {
    const data = await axiosInstance.get(`HrResignTrx/Get/${id}/${locale}`);

    return data.data;
  };
  Apis.Save = async (data) => {
    
    const result = await axiosInstance.post("HrResignTrx/Save", data);
    return result;
  };

  Apis.SaveList = async (data) => {
    const result = await axiosInstance.post("HrResignTrx/SaveList", data);
    return result;
  };

  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`HrResignTrx/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    const result = await axiosInstance.post(`HrResignTrx/DeleteList`, list);
    return result;
  };
   
  Apis.CalculateSettlement = async (EmployeeId,ResignReasonId,LastWorkingDate) => {
    
    const data = await axiosInstance.get(`HrResignTrx/CalculateSettlement?EmployeeId=${EmployeeId}&ResignReasonId=${ResignReasonId}&LastWorkingDate=${LastWorkingDate}`);
    return data.data;    
  };

  return Apis;
};

export default ResignTrxData;
