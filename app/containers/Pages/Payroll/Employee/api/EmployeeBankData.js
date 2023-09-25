import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const EmployeeBankData = (probs) => {
  const lang = useSelector((state) => state.language.locale);
  const employeeid = probs;
  const [BList, setList] = useState([]);

  const EmployeeBankApis = {};
  EmployeeBankApis.GetUserMenuLookup = async () => {
    
    const data = await axiosInstance.get(`Menu/GetUserMenuLookup/${lang}`);

    return data.data;
  };
  EmployeeBankApis.GetList = async (anchorTable) => {
    

    const data = await axiosInstance.get(
      `EmpBank/GetAllData/${lang}/${employeeid}`
    );
    const result = data.data.empBankList;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      employeeId: obj.employeeId,
      bankId: obj.bankId,
      bankBranchNo: obj.bankBranchNo,
      iban: obj.iban,
      bnkEmpCode: obj.bnkEmpCode,
      bankName: obj.bankName,
      swiftCode: obj.swiftCode,
      edited: false,
    }));
    setList(data.data.bankList);
    const BankList = data.data.bankList.map((obj) => obj.name);

    console.log(BankList);
    anchorTable[1].options = BankList;
    anchorTable[1].initialValue = BankList[0];

    return { finaldata, anchorTable };
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

  EmployeeBankApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`EmpBank/${Item.id}`);
    return data;
  };

  return EmployeeBankApis;
};

export default EmployeeBankData;
