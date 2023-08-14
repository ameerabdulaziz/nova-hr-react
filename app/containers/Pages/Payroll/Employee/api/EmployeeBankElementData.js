import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const EmployeeBankElementData = (probs) => {
  const lang = 'en'; //useSelector((state) => state.language.locale);
  const empBankId = probs;
  //   const [eList, setList] = useState([]);
  //   const [cList, setcurrencyList] = useState([]);
  const EmployeeBankElementApis = {};

  EmployeeBankElementApis.GetList = async () => {
    debugger;

    const data = await axiosInstance.get(
      `EmpBankElement/GetAllData/${lang}/${empBankId}`
    );
    const result = data.data.empBankElementList;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      empBankId: obj.empBankId,
      elementId: obj.elementId,
      currencyId: obj.currencyId,
      elementName: obj.elementName,
      currencyName: obj.currencyName,
      edited: false,
    }));
    // setList(data.data.elementList);
    // const elemList = data.data.elementList.map((obj) => obj.name);
    // setcurrencyList(data.data.currencyList);
    // const currencyList = data.data.currencyList.map((obj) => obj.name);
    // console.log(elemList);
    // anchorTable[2].options = elemList;
    // anchorTable[2].initialValue = elemList[0];
    // anchorTable[4].options = currencyList;
    // anchorTable[4].initialValue = currencyList[0];
    return finaldata;
    // return { finaldata, anchorTable };
  };

  EmployeeBankElementApis.Save = async (Item) => {
    const elementId = 1; // eList.find((ele) => ele.name === Item.elementName).id;
    const currencyId = 2; //cList.find((ele) => ele.name === Item.currencyName).id;
    const data = {
      id: Item.id,
      empBankId: empBankId,
      elementId: elementId,
      currencyId: currencyId,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('EmpBankElement', data)
        : await axiosInstance.put(`EmpBankElement/${Item.id}`, data);
    return result;
  };

  EmployeeBankElementApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`EmpBankElement/${Item.id}`);
    return data;
  };

  return EmployeeBankElementApis;
};

export default EmployeeBankElementData;
