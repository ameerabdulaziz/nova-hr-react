import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(`RecJobOffer/GetList/${locale}`);

    const result = data.data;

    return result;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(`RecJobOffer/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  api.GetbyApplicant = async (id) => {
    const data = await axiosInstance.get(
      `RecJobOffer/GetbyApplicant/${id}/${locale}`
    );
    const result = data.data;

    return result;
  };

  api.GetApplicantList = async (hiringRequestId = '') => {
    const data = await axiosInstance.get(
      `RecJobOffer/GetApplicantList?HiringRequestId=${hiringRequestId}`
    );

    const result = data.data;

    return result;
  };

  api.GetSalatyElement = async (body) => {
    const data = await axiosInstance.get(
      `RecJobOffer/GetSalatyElement/${locale}?SalaryStructureId=${body.status}&GrossSalary=${body.salary}`
    );

    const result = data.data;

    return result;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('RecJobOffer/Save', body);

    const result = data.data;

    return result;
  };

  api.print = async (id) => {
    const data = await axiosInstance.get(
      `RecJobOffer/GetPrint/${id}/${locale}`
    );

    const result = data.data;

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`RecJobOffer/Delete/${id}`);
    const result = data.data;

    return result;
  };

  return api;
};

export default API;
