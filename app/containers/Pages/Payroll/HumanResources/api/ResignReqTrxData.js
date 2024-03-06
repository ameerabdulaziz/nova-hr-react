import axiosInstance from '../../api/axios';

const ResignReqTrxData = (locale) => {
  const api = {};

  api.getList = async () => {
    const data = await axiosInstance.get(`HrResignReqTrx/GetList/${locale}`);

    return data.data;
  };

  api.getById = async (id) => {
    const data = await axiosInstance.get(`HrResignReqTrx/Get/${id}/${locale}`);

    return data.data;
  };

  api.getUserInfo = async () => {
    const data = await axiosInstance.get(`EmpProfile/GetInfo/${locale}`);

    return data.data;
  };

  api.save = async (body) => {
    const data = await axiosInstance.post('HrResignReqTrx/Save', body);

    return data;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`HrResignReqTrx/Delete/${id}`);
    return data;
  };

  return api;
};

export default ResignReqTrxData;
