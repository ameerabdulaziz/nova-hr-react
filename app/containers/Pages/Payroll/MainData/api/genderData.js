import axiosInstance from '../../api/axios';
const genderData = () => {
  const genderApis = {};

  genderApis.GetList = async () => {
    // 
    const data = await axiosInstance.get('MdGender');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      edited: false,
    }));

    return finaldata;
  };

  genderApis.Save = async (Item) => {
    // 
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('MdGender', data)
        : await axiosInstance.put(`MdGender/${Item.id}`, data);
    return result;
  };

  genderApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`MdGender/${Item.id}`);
    return data;
  };

  return genderApis;
};

export default genderData;
