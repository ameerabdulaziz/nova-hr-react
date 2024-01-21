import axiosInstance from '../../api/axios';

const OpenCloseMonthData = (locale) => {
  const Apis = {};

  Apis.Get = async (branchId) => {
    const data = await axiosInstance.get(
      `MonthOpenClose/Get/${locale}/${branchId}`
    );

    return data.data;
  };

  Apis.OpenMonth = async (body = {}) => {
    const result = await axiosInstance.post('MonthOpenClose/OpenMonth', body);

    return result;
  };

  Apis.CloseMonth = async (body = {}) => {
    const result = await axiosInstance.post('MonthOpenClose/CloseMonth', body);

    return result;
  };

  Apis.UpdateDate = async (body = {}) => {
    const result = await axiosInstance.post('MonthOpenClose/UpdateDate', body);

    return result;
  };

  return Apis;
};

export default OpenCloseMonthData;
