import axiosInstance from "../../api/axios";

const ResignTrxData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    debugger;
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `HrEmployeeCourse/GetReport/${locale}?${queryString}`
    );
    const result = data.data;

    return result;
  };

  Apis.GetList = async () => {
    const data = await axiosInstance.get(`HrEmployeeCourse/GetList/${locale}`);
    const result = data.data;

    return result;
  };

  Apis.Get = async (id) => {
    const data = await axiosInstance.get(
      `HrEmployeeCourse/Get/${id}/${locale}`
    );

    return data.data;
  };
  Apis.Save = async (data) => {
    const result = await axiosInstance.post("HrEmployeeCourse/Save", data);
    return result;
  };

  Apis.Delete = async (id) => {
    const result = await axiosInstance.delete(`HrEmployeeCourse/Delete/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    const result = await axiosInstance.post(
      `HrEmployeeCourse/DeleteList`,
      list
    );
    return result;
  };

  return Apis;
};

export default ResignTrxData;
