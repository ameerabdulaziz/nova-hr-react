import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const EmployeeAddressData = (probs) => {
  const lang = useSelector((state) => state.language.locale);
  const employeeid = probs;
  const [gList, setList] = useState([]);
  const [cList, setcityList] = useState([]);
  const EmployeeAddressApis = {};
  //   EmployeeAddressApis.GetUserMenuLookup = async () => {

  //     const data = await axiosInstance.get(`Menu/GetUserMenuLookup/${lang}`);

  //     return data.data;
  //   };
  EmployeeAddressApis.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(
      `EmpAddress/GetAllData/${lang}/${employeeid}`
    );
    const result = data.data.empAddressList;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      arAddress: obj.arAddress,
      enaddress: obj.enaddress,
      employeeId: obj.employeeId,
      governmentId: obj.governmentId,
      cityId: obj.cityId,
      govName: obj.govName,
      cityName: obj.cityName,
      edited: false,
    }));
    setList(data.data.governmentList);
    const govList = data.data.governmentList.map((obj) => obj.name);
    setcityList(data.data.cityList);
    const cityList = data.data.cityList.map((obj) => obj.name);
    console.log(govList);
    anchorTable[3].options = govList;
    anchorTable[3].initialValue = '';
    anchorTable[3].orignaldata = data.data.governmentList; // govList[0];
    anchorTable[5].options = cityList;
    anchorTable[5].initialValue = '';
    anchorTable[5].orignaldata = data.data.cityList; //cityList[0];

    return { finaldata, anchorTable };
  };

  EmployeeAddressApis.Save = async (Item) => {
    const govid = gList.find((ele) => ele.name === Item.govName).id;
    const cityid = cList.find((ele) => ele.name === Item.cityName).id;
    const data = {
      id: Item.id,
      employeeId: employeeid,
      arAddress: Item.arAddress,
      enaddress: Item.enaddress,
      governmentId: govid,
      cityId: cityid,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('EmpAddress', data)
        : await axiosInstance.put(`EmpAddress/${Item.id}`, data);
    return result;
  };

  EmployeeAddressApis.Delete = async (Item) => {
    //

    const data = await axiosInstance.delete(`EmpAddress/${Item.id}`);
    return data;
  };

  return EmployeeAddressApis;
};

export default EmployeeAddressData;
