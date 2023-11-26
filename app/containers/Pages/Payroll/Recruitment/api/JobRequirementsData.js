import axiosInstance from '../../api/axios';

const JobRequirementsData = (params) => {
  // const lang = useSelector((state) => state.language.locale);
  const jobId = params;

  const api = {};

  api.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`RecJobCondition/${jobId}`);

    const finaldata = data.data.map((obj) => ({
      id: obj.id,
      enDescription: obj.enDescription,
      arDescription: obj.arDescription,
      edited: false,
    }));

    return { finaldata, anchorTable };
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      jobId,
      enDescription: Item.enDescription,
      arDescription: Item.arDescription,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('RecJobCondition', data)
      : await axiosInstance.put(`RecJobCondition/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`RecJobCondition/${Item.id}`);
    return data;
  };

  return api;
};

export default JobRequirementsData;
