import axiosInstance from '../../api/axios';
const TrainingCenterData = () => {
  const TrainingCentersApis = {};

  TrainingCentersApis.GetList = async () => {
    // debugger;
    const data = await axiosInstance.get('HrTrainingCenter');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      address: obj.address,
      phone: obj.phone,      
      edited: false,
    }));

    return finaldata;
  };

  TrainingCentersApis.Save = async (Item) => {
    // debugger;
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      address: Item.address,
      phone: Item.phone,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('HrTrainingCenter', data)
        : await axiosInstance.put(`HrTrainingCenter/${Item.id}`, data);
    return result;
  };

  TrainingCentersApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`HrTrainingCenter/${Item.id}`);
    return data;
  };

  return TrainingCentersApis;
};

export default TrainingCenterData;
