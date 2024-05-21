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
    
    const result = await axiosInstance.get(`AttDevice/TestConnection/${data.ip}/${data.port}/${data.devicePass}`);
    return result;
  };
  Apis.ReadAllDevices = async (data) => {
    
    const result = await axiosInstance.post(`AttDevice/ReadAllDevices/`,data);
    return result;
  };

  Apis.ReadAttLog = async (deviceId) => {
    
    const result = await axiosInstance.get(`AttDevice/ReadAttLog/${deviceId}?isDate=true`);
    return result.data;
  };
  Apis.SaveAttLog = async (data,deviceid) => {
    
    const result = await axiosInstance.post(`AttDevice/SaveAttLog/${deviceid}`,data);
    return result;
  };
  
  
  
  return Apis;
};

export default DeviceData;
