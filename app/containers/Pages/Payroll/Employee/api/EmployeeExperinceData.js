import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const EmployeeExperinceData = (probs) => {
  const lang = useSelector((state) => state.language.locale);
  const employeeid = probs;
  const EmployeeExperinceApis = {};
  EmployeeExperinceApis.GetUserMenuLookup = async () => {
    debugger;
    const data = await axiosInstance.get(`Menu/GetUserMenuLookup/${lang}`);

    return data.data;
  };
  EmployeeExperinceApis.GetList = async () => {
    debugger;

    const data = await axiosInstance.get(`EmpExperince/GetAll/${employeeid}`);
    const result = data.data;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      employeeId: obj.employeeId,
      companyName: obj.companyName,
      startDate: obj.startDate,
      endDate: obj.endDate,
      fromDate: obj.fromDate,
      toDate: obj.toDate,
      notes: obj.notes,
      monthNo: obj.monthNo,

      edited: false,
    }));

    return finaldata;
  };

  EmployeeExperinceApis.Save = async (Item) => {
    const data = {
      id: Item.id,
      employeeId: employeeid,
      companyName: Item.companyName,
      startDate: Item.startDate,
      endDate: Item.endDate,
      fromDate: Item.fromDate,
      toDate: Item.toDate,
      notes: Item.notes,
      monthNo: Item.monthNo,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('EmpExperince', data)
        : await axiosInstance.put(`EmpExperince/${Item.id}`, data);
    return result;
  };

  EmployeeExperinceApis.Delete = async (Item) => {
    // debugger;

    const data = await axiosInstance.delete(`EmpExperince/${Item.id}`);
    return data;
  };

  return EmployeeExperinceApis;
};

export default EmployeeExperinceData;
