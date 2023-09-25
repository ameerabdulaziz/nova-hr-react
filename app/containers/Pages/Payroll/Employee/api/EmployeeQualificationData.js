import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const EmployeeQualificationData = (probs) => {
  const lang = useSelector((state) => state.language.locale);
  const employeeid = probs;
  const [gList, setList] = useState([]);
  const [cList, setqualificationList] = useState([]);
  const EmployeeQualificationApis = {};
  EmployeeQualificationApis.GetUserMenuLookup = async () => {
    
    const data = await axiosInstance.get(`Menu/GetUserMenuLookup/${lang}`);

    return data.data;
  };
  EmployeeQualificationApis.GetList = async (anchorTable) => {
    

    const data = await axiosInstance.get(
      `EmpQualification/GetAllData/${lang}/${employeeid}`
    );
    const result = data.data.empQualificationList;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      qualificationDate: obj.qualificationDate,
      qualificationRelease: obj.qualificationRelease,
      membershipNo: obj.membershipNo,
      employeeId: obj.employeeId,
      gradeId: obj.gradeId,
      qualificationId: obj.qualificationId,
      gradeName: obj.gradeName,
      qualificationName: obj.qualificationName,
      edited: false,
    }));
    setList(data.data.gradeList);
    const grdList = data.data.gradeList.map((obj) => obj.name);
    setqualificationList(data.data.qualificationList);
    const qualificationList = data.data.qualificationList.map(
      (obj) => obj.name
    );
    console.log(grdList);
    anchorTable[4].options = grdList;
    anchorTable[4].initialValue = grdList[0];
    anchorTable[1].options = qualificationList;
    anchorTable[1].initialValue = qualificationList[0];

    return { finaldata, anchorTable };
  };

  EmployeeQualificationApis.Save = async (Item) => {
    const gradeid = gList.find((ele) => ele.name === Item.gradeName).id;
    const qualificationid = cList.find(
      (ele) => ele.name === Item.qualificationName
    ).id;
    const data = {
      id: Item.id,
      employeeId: employeeid,
      qualificationDate: Item.qualificationDate,
      qualificationRelease: Item.qualificationRelease,
      membershipNo: Item.membershipNo,
      gradeId: gradeid,
      qualificationId: qualificationid,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('EmpQualification', data)
        : await axiosInstance.put(`EmpQualification/${Item.id}`, data);
    return result;
  };

  EmployeeQualificationApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`EmpQualification/${Item.id}`);
    return data;
  };

  return EmployeeQualificationApis;
};

export default EmployeeQualificationData;
