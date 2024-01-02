import axiosInstance from '../../api/axios';
const API = (locale) => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get(
      `AsCompetency/GetList/${locale}`
    );

    return data.data;
  };

  api.GetCategoryList = async () => {
    const data = await axiosInstance.get(
      `AsCategory/GetListModel/${locale}`
    );

    return data.data;
  };

  api.GetById = async (id) => {
    const data = await axiosInstance.get(
      `AsCompetency/Get/${id}/${locale}`
    );

    return data.data;
  };

  api.save = async (body) => {
    const result = await axiosInstance.post('AsCompetency/Save', body);

    return result;
  };

  api.delete = async (id) => {
    const data = await axiosInstance.delete(`AsCompetency/Delete/${id}`);

    return data;
  };

  return api;
};

export default API;
