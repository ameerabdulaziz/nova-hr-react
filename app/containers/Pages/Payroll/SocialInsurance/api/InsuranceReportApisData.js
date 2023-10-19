import axiosInstance from '../../api/axios';
const InsuranceReportApisData = (locale) => {
  const InsuranceReportsApi = {};
  InsuranceReportsApi.GetStopInsuranceReport = async (params) => {
    const queryString = new URLSearchParams(params);
    const data = await axiosInstance.get(
      `SInsuranceReport/GetInsuLogReport/${locale}?${queryString}`
    );
    const result = data.data;

    return result;
  };

 

  return InsuranceReportsApi;
};

export default InsuranceReportApisData;
