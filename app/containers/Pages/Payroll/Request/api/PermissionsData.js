import axiosInstance from '../../api/axios';
const PermissionsData = (locale) => {
  const PermissionsApis = {};
  PermissionsApis.GetList = async () => {
    const data = await axiosInstance.get(`ReqPermission/GetList/${locale}`);
    const result = data.data;

    return result;
  };


  PermissionsApis.GetDataById = async (id,locale) => {
    const data = await axiosInstance.get(`ReqPermission/Get/${id}/${locale}`);
    const result = data.data;

    return result;
  };

  PermissionsApis.Save = async (data) => {
    const result = await axiosInstance.post('ReqPermission/Save', data)
        
    return result;
  };


  PermissionsApis.Delete = async (Item) => {
    const data = await axiosInstance.delete(`ReqPermission/Delete/${Item[0]}`);
    return data;
  };

  return PermissionsApis;
};

export default PermissionsData;
