import axiosInstance from "../../api/axios";

const ResignTrxData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    debugger;
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
    var requestData = {
      id: data.id,
      date: data.date,
      employeeId: data.employeeId,
      resignReasonId: data.resignReasonId,
      note: data.note,
      payTemplateId: data.payTemplateId,
      settlElementId: data.settlElementId,
      vacElementId: data.vacElementId,
      settlementV: data.settlementV,
      vacSettlValue: data.vacSettlValue,
      lworkingDay: data.lworkingDay,
      isStop: data.isStop,
    };
    const result = await axiosInstance.post("HrResignTrx/Save", requestData);
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

  return Apis;
};

export default ResignTrxData;
