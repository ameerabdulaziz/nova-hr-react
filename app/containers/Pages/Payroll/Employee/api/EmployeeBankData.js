import avatarApi from 'enl-api/images/avatars';
import axiosInstance from '../../api/axios';

const EmployeeBankData = (lang) => {
  const EmployeeBankApis = {};

  EmployeeBankApis.GetBankLookup = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpBank/GetAllData/${lang}/${employeeId}`
    );

    return data.data.bankList;
  };
  EmployeeBankApis.GetList = async (employeeId) => {
    const data = await axiosInstance.get(
      `EmpBank/GetAllData/${lang}/${employeeId}`
    );

    const finaldata = data.data.empBankList;

    if (finaldata.length === 0) {
      return [
        {
          employeeId,
          key: 0,
          name: '',
          avatar: avatarApi[11],
          bankId: null,
          bnkAcc: '',
          bankBranchNo: '',
          iban: '',
          bnkEmpCode: '',
          swiftCode: '',
          empEmpBankElement: [],
        },
      ];
    }

    return finaldata;
  };

  EmployeeBankApis.SaveData = async (body) => {
    const result = await axiosInstance.post('EmpBank/save', body);

    return result;
  };

  EmployeeBankApis.Delete = async (id) => {
    const data = await axiosInstance.delete(`EmpBank/${id}`);

    return data;
  };

  return EmployeeBankApis;
};

export default EmployeeBankData;
