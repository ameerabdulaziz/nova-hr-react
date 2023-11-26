import axiosInstance from "../../api/axios";

const DeviceData = (locale) => {
  const Apis = {};

  Apis.GetList = async () => {
    const data = await axiosInstance.get(`AttDevice`);
    const result = data.data;

    return result;
  };

  Apis.Get = async (id) => {
    const data = await axiosInstance.get(`AttDevice/${id}`);

    return data.data;
  };
  Apis.Save = async (data) => {
    debugger;
    if (data.id) {
      const result = await axiosInstance.put(`AttDevice/${data.id}`, data);
      return result;
    } else {
      const result = await axiosInstance.post("AttDevice", data);
      return result;
    }
  };

  Apis.Delete = async (id) => {
    const result = await axiosInstance.delete(`AttDevice/${id}`);
    return result;
  };

  Apis.testConnection = async (data) => {
    debugger;
    const result = await axiosInstance.get(`AttDevice/TestConnection/${data.ip}/${data.port}/${data.devicePass}`);
    return result;
  };
  Apis.ReadAllDevices = async (data) => {
    debugger;
    const result = await axiosInstance.post(`AttDevice/ReadAllDevices/`,data);
    return result;
  };
  
  
  return Apis;
};

export default DeviceData;
