import axiosInstance from '../../api/axios';
const DocumentData = () => {
  const DocumentApis = {};

  DocumentApis.GetList = async () => {
    // 
    const data = await axiosInstance.get('MdDocuments');
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      isCheckExpireDate: obj.isCheckExpireDate,
      expirationPeriod: obj.expirationPeriod,
      expirationFollow: obj.expirationFollow,
      edited: false,
    }));

    return finaldata;
  };

  DocumentApis.Save = async (Item) => {
    // 
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      isCheckExpireDate: Item.isCheckExpireDate,
      ExpirationPeriod: Item.ExpirationPeriod,
      ExpirationFollow: Item.ExpirationFollow,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('MdDocuments', data)
        : await axiosInstance.put(`MdDocuments/${Item.id}`, data);
    return result;
  };

  DocumentApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`MdDocuments/${Item.id}`);
    return data;
  };

  return DocumentApis;
};

export default DocumentData;
