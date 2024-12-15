import axiosInstance from "../../api/axios";

const TransferRequestData = (locale) => {
  const Apis = {};

  Apis.GetList = async () => {
    const data = await axiosInstance.get(`HrEmpTransfereRequest/Getlist/${locale}`);
    const result = data.data;

    return result;
  };

  Apis.GetById = async (id) => {
    const data = await axiosInstance.get(
      `HrEmpTransfereRequest/Get/${id}/${locale}`
    );

    return data.data;
  };

  Apis.Save = async (data) => {
    const result = await axiosInstance.post("HrEmpTransfereRequest/save", data);
    return result;
  };

  Apis.Delete = async (id) => {
    const result = await axiosInstance.delete(`HrEmpTransfereRequest/Delete/${id}`);
    return result;
  };


  return Apis;
};

export default TransferRequestData;
