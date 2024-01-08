import axiosInstance from '../../api/axios';

const PaymentSlipData = (locale) => {
  const api = {};

  api.GetPaymentSlipTotalReport = async (body = {}) => {
    const data = await axiosInstance.post(
      `PayrollReport/GetPaymentSlipTotalReport/${locale}`,
      body
    );

    return data.data;
  };

  return api;
};

export default PaymentSlipData;
