/* eslint-disable operator-linebreak */
/* eslint-disable no-debugger */
import axiosInstance from '../../api/axios';
import React, {useState } from 'react';

const OrganizationManagerData = (locale) => {
  const OrganizationManagerApis = {};
  const [employeeList, setemployeeList] = useState([]);

  OrganizationManagerApis.GetList = async (anchorTable) => {
    const data = await axiosInstance.get(`MdOrganization/GetOrganizationManger/${locale}`);
   
    const finaldata = data.data.organizations.map((obj) => ({
      id: obj.id,      
      name: obj.name,
      employeeId: obj.employeeId,
      employeeName: obj.employeeName,
      newEmployeeId: "",
      newEmployeeName: "",
      edited: false,
    }));
    

    setemployeeList(data.data.employeeList);  
    const EmpNameList = data.data.employeeList.map((obj) => obj.name);
    
    anchorTable[2].options = EmpNameList;
    anchorTable[2].initialValue = '';

    anchorTable[4].options = EmpNameList;
    anchorTable[4].initialValue = '';
    
    return { finaldata, anchorTable };
  };

  OrganizationManagerApis.Save = async (Item) => {
    debugger;
    const EmpId = employeeList.find((ele) => ele.name === Item.newEmployeeName).id;
    
    const data = {
      id: Item.id,
      name:Item.name,
      newEmployeeId: EmpId,
    };

    const result = await axiosInstance.post('MdOrganization/SaveOrganizationManger', data)
    return result;
  };

 
  return OrganizationManagerApis;
};

export default OrganizationManagerData;
