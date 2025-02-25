
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
    
    const MaptEmployee= data.data.employeeList.map((employee) => ({ ...employee, name: `${employee.id} - ${employee.name}` }))
    setemployeeList(MaptEmployee);
    const EmpNameList = MaptEmployee.map((employee) => employee.name);
     
    anchorTable[2].options = EmpNameList;
    anchorTable[2].initialValue = '';

    anchorTable[4].options = EmpNameList;
    anchorTable[4].initialValue = '';
    
    return { finaldata, anchorTable };
  };

  OrganizationManagerApis.Save = async (Item) => {
    
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
