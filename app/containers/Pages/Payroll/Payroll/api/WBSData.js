

import axiosInstance from '../../api/axios';

const WBSData = (locale) => {
  const api = {};

  api.GetList = async (year,month,PayTemplate,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetNotPayedSalaryList/${locale}/${year}/${month}/${PayTemplate}?${queryString}`);

    return data.data;
  };


  api.Save = async (body) => {
    const result = await axiosInstance.post('PayrollCalculation/PaySallary', body)
        
    return result;
  };


  api.GetReportList = async (PayTemplate,params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `PayrollReport/GetPayedSalaryList/${locale}/${PayTemplate}?${queryString}`);

    return data.data;
  };

  return api;
};

export default WBSData;
