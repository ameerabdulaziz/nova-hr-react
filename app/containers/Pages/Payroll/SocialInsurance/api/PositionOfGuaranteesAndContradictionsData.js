import axiosInstance from '../../api/axios';

const PositionOfGuaranteesAndContradictionsData = (locale) => {
  const api = {};

  api.GetReport = async (params) => {
    const data = await axiosInstance.get(
      `SInsuranceReport/GetInsuPositionReport/${locale}`,
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

  return api;
};

export default PositionOfGuaranteesAndContradictionsData;
