import axiosInstance from '../../api/axios';

const PaymentSlipData = (locale) => {
  const api = {};

  api.GetPaymentSlipReport = async (body = {}) => {
    const data = await axiosInstance.post(
      `PayrollReport/GetPaymentSlipReport/${locale}`,
      body
    );
debugger;
    return data.data;
  };

  return api;
};

export default PaymentSlipData;
