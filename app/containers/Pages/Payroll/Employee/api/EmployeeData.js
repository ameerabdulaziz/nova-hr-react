import axiosInstance from '../../api/axios';

function getFormData(fdObject = {}) {
  return Object.entries(fdObject).reduce(
    (fdInstance, [fdObjectKey, fdObjectValue]) => {
      if (Array.isArray(fdObjectValue)) {
        fdObjectValue.forEach((arrayItem, index) => {
          if (typeof arrayItem === 'object') {
            Object.keys(arrayItem).forEach((key) => {
              fdInstance.append(
                `${fdObjectKey}[${index}].${key}`,
                arrayItem[key]
              );
            });
          } else {
            fdInstance.append(`${fdObjectKey}[${index}]`, arrayItem);
          }
        });
      } else {
        fdInstance.append(fdObjectKey, fdObjectValue);
      }
      return fdInstance;
    },
    new FormData()
  );
}

const EmployeeData = (locale) => {
  const Apis = {};

  Apis.GetList = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpEmployee/GetModel/${employeeId}/${locale}`
    );
    const result = data.data;
    return result;
  };

  Apis.checkEmpCodeExist = async (code) => {
    const data = await axiosInstance.get(
      `EmpEmployee/checkEmpCodeExist?empcode=${code}`
    );

    return data.data;
  };

  Apis.checkUserNameExist = async (employeeId, username) => {
    const data = await axiosInstance.get(
      `EmpEmployee/checkUserNameExist/${employeeId}/${username}`
    );

    return data.data;
  };

  Apis.checkEmpWorkEmailExist = async (id, email) => {
    const data = await axiosInstance.get(
      `EmpEmployee/checkEmpEmailExist/${id}/${email}`
    );

    return data.data;
  };

  Apis.checkEmpIdentityNumberExist = async (id, number) => {
    const data = await axiosInstance.get(
      `EmpEmployee/checkEmpIdentityNoExist/${locale}/${id}/${number}`
    );

    return data.data;
  };

  Apis.GetBranchList = async () => {
    const data = await axiosInstance.get(`EmpEmployee/GetBranchList/${locale}`);
    const result = data.data;
    return result;
  };

  Apis.Saveform = async (data) => {
    const result = await axiosInstance.post(
      'EmpEmployee/Save',
      getFormData(data)
    );
    return result;
  };

  Apis.Save = async (data) => {
    const result =			data.id === 0
			  ? await axiosInstance.post('EmpEmployee', data)
			  : await axiosInstance.put(`EmpEmployee/${data.id}`, data);
    return result;
  };
  Apis.Delete = async (id) => {
    const data = await axiosInstance.delete(`EmpEmployee/${id}`);
    return data;
  };
  return Apis;
};

export default EmployeeData;
