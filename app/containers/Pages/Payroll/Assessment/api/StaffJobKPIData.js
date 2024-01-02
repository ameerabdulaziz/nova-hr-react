import axiosInstance from '../../api/axios';

const StaffJobKPIEmployeeData = (employeeId) => {
  const api = {};

  api.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`JobKPIEmployee/${employeeId}`);

    const finaldata = data.data.map((item) => ({
      id: item.id,
      enKpidesc: item.enKpidesc,
      arKpidesc: item.arKpidesc,
      edited: false,
    }));

    return { finaldata, anchorTable };
  };

  api.Save = async (item) => {
    const data = {
      id: item.id,
      employeeId,
      enKpidesc: item.enKpidesc,
      arKpidesc: item.arKpidesc,
    };

    const result = item.id === 0
      ? await axiosInstance.post('JobKPIEmployee', data)
      : await axiosInstance.put(`JobKPIEmployee/${item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`JobKPIEmployee/${Item.id}`);
    return data;
  };

  return api;
};

export default StaffJobKPIEmployeeData;
