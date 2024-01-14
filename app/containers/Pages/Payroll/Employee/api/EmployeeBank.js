import avatarApi from 'enl-api/images/avatars';

import axiosInstance from '../../api/axios';

import { useSelector, useDispatch } from 'react-redux';

const contactData = (props) => {
  const lang = props; // 'en'; //useSelector((state) => state.language.locale);
  //const employeeid = props;

  const EmployeeBankApis = {};
  EmployeeBankApis.GetBankLookup = async (employeeid) => {
    const data = await axiosInstance.get(
      `EmpBank/GetAllData/${lang}/${employeeid}`
    );

    return data.data.bankList;
  };
  EmployeeBankApis.GetList = async (employeeid) => {
    

    const data = await axiosInstance.get(
      `EmpBank/GetAllData/${lang}/${employeeid}`
    );
    const result = data.data.empBankList;
    const finaldata = result.map((obj) => ({
      key: obj.id,
      avatar: avatarApi[11],
      name: obj.bankName,
      bankBranchNo: obj.bankBranchNo,
      bnkEmpCode: obj.bnkEmpCode,
      swiftCode: obj.swiftCode,
      iban: obj.iban,
      bankId: obj.bankId,
      bnkAcc: obj.bnkAcc,
      employeeId: obj.employeeId,
      favorited: false,
    }));

    if (finaldata.length == 0) {
      const finaldata2 = [
        {
          key: 0,
          avatar: avatarApi[11],
          name: '',
          bankBranchNo: '',
          bnkEmpCode: '',
          swiftCode: '',
          iban: '',
          bankId: 0,
          bnkAcc: '',
          employeeId: employeeid,
          favorited: false,
        },
      ];
      return finaldata2;
    } else return finaldata;
  };

  EmployeeBankApis.Save = async (Item) => {
    const Bankid = BList.find((ele) => ele.name === Item.bankName).id;

    const data = {
      id: Item.id,
      employeeId: employeeid,
      bankId: Bankid,
      bankBranchNo: Item.bankBranchNo,
      iban: Item.iban,
      bnkEmpCode: Item.bnkEmpCode,
      bankName: Item.bankName,
      swiftCode: Item.swiftCode,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('EmpBank', data)
        : await axiosInstance.put(`EmpBank/${Item.id}`, data);
    return result;
  };

  EmployeeBankApis.SaveData = async (Item, details) => {
    
    var DetailsList = [];

    // for (let i = 0; i < details.length; i++) {
    //   penaltyDetailsList.push({
    //     elementId: data.penaltyTypeList.find(
    //       (ele) => ele.name === dataTable[i].PenaltyTypeName
    //     ).id,
    //     penaltyValue: details[i].PenaltyValue,
    //     empBankId: Item.id,
    //   });
    // }

    // const data = {
    //   id: Item.id,
    //   employeeId: employeeid,
    //   bankId: Bankid,
    //   bankBranchNo: Item.bankBranchNo,
    //   iban: Item.iban,
    //   bnkEmpCode: Item.bnkEmpCode,
    //   bankName: Item.bankName,
    //   swiftCode: Item.swiftCode,
    // };

    const result =
      Item.id === 0
        ? await axiosInstance.post('EmpBank', Item)
        : await axiosInstance.put(`EmpBank/${Item.id}`, Item);
    return result;
  };

  EmployeeBankApis.Delete = async (id) => {
    // 

    const data = await axiosInstance.delete(`EmpBank/${id}`);
    return data;
  };

  return EmployeeBankApis;
};

export default contactData;
