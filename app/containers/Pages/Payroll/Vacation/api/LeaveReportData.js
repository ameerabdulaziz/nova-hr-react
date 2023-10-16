import axiosInstance from '../../api/axios';

const LeaveReportData = (locale) => {
  const Apis = {};

  Apis.GetReport = async (params) => {
    const queryString = new URLSearchParams(params);

    const data = await axiosInstance.get(
      `/VacReport/GetLeaveReport/${locale}?${queryString.toString()}`
    );

    return data.data;
  };

  return Apis;
};

export default LeaveReportData;
