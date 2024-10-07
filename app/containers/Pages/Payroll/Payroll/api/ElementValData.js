import axiosInstance from "../../api/axios";

const ElementValData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollEmpElementVal/GetReport/${locale}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  Apis.GetList = async (BranchId,EmployeeId,PayTemplateId,ElementId) => {
    const data = await axiosInstance.get(`PayrollEmpElementVal/GetList/${locale}?BranchId=${BranchId}&EmployeeId=${EmployeeId?EmployeeId:""}&PayTemplateId=${PayTemplateId?PayTemplateId:""}&ElementId=${ElementId?ElementId:""}`);
    const result = data.data;

    return result;
  };

  Apis.GetElementHistory = async (FromDate,ToDate,BranchId,EmployeeId,PayTemplateId,ElementId) => {
    const data = await axiosInstance.get(`PayrollEmpElementVal/GetElementHistory/${locale}?FromDate=${FromDate?FromDate:""}&ToDate=${ToDate?ToDate:""}&BranchId=${BranchId?BranchId:""}&EmployeeId=${EmployeeId?EmployeeId:""}&PayTemplateId=${PayTemplateId?PayTemplateId:""}&ElementId=${ElementId?ElementId:""}`);
    const result = data.data;

    return result;
  };


  Apis.Get = async (id) => {
    const data = await axiosInstance.get(
      `PayrollEmpElementVal/Get/${id}/${locale}`
    );

    return data.data;
  };
  Apis.getPermissions = async (data) => {
    const result = await axiosInstance.get(
      `PayrollEmpElementVal/getPermissions/${locale}?permissionId=${data.permissionId}&date=${data.date}&StartTime=${data.startTime}&EndTime=${data.endTime}`
    );

    return result.data;
  };

  Apis.Save = async (data) => {
    const result = await axiosInstance.post("PayrollEmpElementVal/Save", data);
    return result;
  };
  Apis.UpdateList = async (data,Value,Type) => {
    const result = await axiosInstance.post(`PayrollEmpElementVal/UpdateList?Value=${Value}&Type=${Type}`, data);
    return result;
  };
  Apis.PostponetoNextMonth = async (data,Value,Type) => {
    const result = await axiosInstance.post(`PayrollEmpElementVal/PostponetoNextMonth`, data);
    return result;
  };
  Apis.CopytoSpecifiedMonth = async (data, YearId, MonthId) => {
    const result = await axiosInstance.post(`PayrollEmpElementVal/CopytoSpecifiedMonth?YearId=${YearId}&MonthId=${MonthId}`, data);
    return result;
  };
  
  Apis.SaveList = async (data) => {
    const result = await axiosInstance.post("PayrollEmpElementVal/SaveList", data);
    return result;
  };

  Apis.SaveListFromImport = async (data) => {
    const result = await axiosInstance.post("PayrollEmpElementVal/SaveListFromImport", data);
    return result;
  };

  Apis.Delete = async (id) => {
    const result = await axiosInstance.delete(`PayrollEmpElementVal/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    const result = await axiosInstance.post(
      `PayrollEmpElementVal/DeleteList`,
      list
    );
    return result;
  };
  Apis.DeleteAll = async (data) => {
    const result = await axiosInstance.post("PayrollEmpElementVal/DeleteAll", data);
    return result;
  };
  Apis.getRepeatedNo = async (permissionId, date, employeeId) => {
    const data = await axiosInstance.get(
      `PayrollEmpElementVal/getRepeatedNo?permissionId=${permissionId}&date=${date}&EmployeeId=${employeeId}`
    );

    return data.data;
  };

  return Apis;
};

export default ElementValData;
