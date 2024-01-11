import axiosInstance from '../../api/axios';

const BankListData = (locale) => {
  const api = {};

  api.GetList = async (params = {}) => {
    const data = await axiosInstance.get(
      `PayrollReport/GetBankList/${locale}/${params.YearId}/${params.MonthId}/${params.PayTemplateId}`
    );

    return data.data;
  };

  return api;
};

export default BankListData;
