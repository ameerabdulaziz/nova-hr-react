import axiosInstance from '../../api/axios';

const API = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`AttShiftSwapTrx/GetList/${locale}`);

    return data.data;
  };

  api.getAttendanceDate = async (attendanceDate) => {
    const data = await axiosInstance.get(`AttShiftSwapTrx/Get/${locale}/${attendanceDate}`);

    return data.data;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('AttShiftSwapTrx/save', body);

    return data;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`AttShiftSwapTrx/Delete/${id}`);
    return data;
  };

  return api;
};

export default API;
