import axiosInstance from '../../api/axios';

const InsuranceReportApisData = (locale) => {
  const InsuranceReportsApi = {};

  InsuranceReportsApi.GetStopInsuranceReport = async (params) => {
    const data = await axiosInstance.get(
      `SInsuranceReport/GetInsuLogReport/${locale}`,
      { params }
    );
    const result = data.data;

    return result;
  };

  InsuranceReportsApi.GetInsuranceFollowReport = async (params) => {
    const data = await axiosInstance.get(
      `SInsuranceReport/GetInsuFollowReport/${locale}`,{
        params,
      }
    );
    const result = data.data;

    return result;
  };

  InsuranceReportsApi.save = async (data, rowIndexVal) => {
    const result = await axiosInstance.post(
      `SInsuranceReport/AddNotesInFollowReport/${rowIndexVal}?Notes=${data}`
    );

    return result;
  };

  return InsuranceReportsApi;
};

export default InsuranceReportApisData;
