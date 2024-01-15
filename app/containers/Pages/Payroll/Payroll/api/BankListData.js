import axiosInstance from '../../api/axios';

const BankListData = (locale) => {
  const api = {};

  api.GetList = async (body = {}, params = {}) => {
    const data = await axiosInstance.get(
      `PayrollReport/GetBankList/${locale}/${body.YearId}/${body.MonthId}/${body.PayTemplateId}`,
      {
        params,
      }
    );

    return data.data;
  };

  return api;
};

export default BankListData;
