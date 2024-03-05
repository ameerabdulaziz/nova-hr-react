import axiosInstance from '../../api/axios';

const ResignationReportData = (locale) => {
  const api = {};

  api.GetReport = async (params) => {
    const data = await axiosInstance.get(`HrResignReqTrx/GetReport/${locale}`, {
      params
    });

    return data.data;
  };

  api.print = async (id) => {
    const data = await axiosInstance.get(`HrResignReqTrx/GetPrintForm/${id}`);

    return data.data;
  };

  return api;
};

export default ResignationReportData;
