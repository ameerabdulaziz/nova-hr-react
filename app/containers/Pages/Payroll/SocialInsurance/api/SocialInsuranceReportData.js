import axiosInstance from '../../api/axios';

const SocialInsuranceReportData = (locale) => {
  const api = {};

  api.GetReport = async (params) => {
    const data = await axiosInstance.get(
      `SInsuranceReport/GetInsuranceReport/${locale}`,
      {
        params,
      }
    );

    return data.data;
  };

  api.GetSInsuranceOffices = async () => {
    const data = await axiosInstance.get(
      `SinsuranceOffices/GetListModel/${locale}`
    );

    return data.data;
  };

  api.AddHRNotes = async (params) => {
    const data = await axiosInstance.post(
      `SInsuranceReport/AddNotesInFollowReport/${params.id}?Notes=${params.notes}`
    );

    return data;
  };

  return api;
};

export default SocialInsuranceReportData;
