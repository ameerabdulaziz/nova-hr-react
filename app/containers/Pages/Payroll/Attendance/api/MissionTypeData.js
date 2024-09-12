import axiosInstance from '../../api/axios';
const MissionTypeData = () => {
  const MissionTypeApis = {};

  MissionTypeApis.GetList = async () => {
    
    const data = await axiosInstance.get('AttMissionType');
    const result = data.data;

    return result;


    // const finaldata = result.map((obj) => ({
    //   id: obj.id,
    //   name: obj.arName,
    //   EnName: obj.enName,
    //   transportaion: obj.transportaion,
    //   reqInSameDay: obj.reqInSameDay ?? false,
    //   reqBeforeDays: obj.reqBeforeDays,
    //   reqAfterDays: obj.reqAfterDays,
    //   edited: false,
    // }));

    // return finaldata;
  };

  MissionTypeApis.GetDataById = async (id) => {
    
    const data = await axiosInstance.get(`AttMissionType/${id}`);
    const result = data.data;

    return result;
  };

  MissionTypeApis.Save = async (data) => {
    
    // const data = {
    //   id: Item.id,
    //   arName: Item.name,
    //   enName: Item.EnName,
    //   transportaion: Item.transportaion,
    //   reqInSameDay: Item.reqInSameDay,
    //   reqBeforeDays: Item.reqBeforeDays,
    //   reqAfterDays: Item.reqAfterDays,
    // };

    const result =
    data.id === 0
        ? await axiosInstance.post('AttMissionType', data)
        : await axiosInstance.put(`AttMissionType/${data.id}`, data);
    return result;
  };

  MissionTypeApis.Delete = async (id) => {
    

    const data = await axiosInstance.delete(`AttMissionType/${id}`);
    return data;
  };

  return MissionTypeApis;
};

export default MissionTypeData;
