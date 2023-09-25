import axiosInstance from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const EmployeeCourseData = (probs) => {
  const lang = useSelector((state) => state.language.locale);
  const employeeid = probs;
  const [cList, setList] = useState([]);

  const EmployeeCourseApis = {};
  EmployeeCourseApis.GetUserMenuLookup = async () => {
    
    const data = await axiosInstance.get(`Menu/GetUserMenuLookup/${lang}`);

    return data.data;
  };
  EmployeeCourseApis.GetList = async (anchorTable) => {
    

    const data = await axiosInstance.get(
      `EmpCourses/GetAllData/${lang}/${employeeid}`
    );
    const result = data.data.empCourseList;
    const finaldata = result.map((obj) => ({
      id: obj.id,
      employeeId: obj.employeeId,
      courseId: obj.courseId,
      startDate: obj.startDate,
      endDate: obj.endDate,
      notes: obj.notes,
      courseName: obj.courseName,
      edited: false,
    }));
    setList(data.data.courseList);
    const courseList = data.data.courseList.map((obj) => obj.name);

    console.log(courseList);
    anchorTable[1].options = courseList;
    anchorTable[1].initialValue = courseList[0];

    return { finaldata, anchorTable };
  };

  EmployeeCourseApis.Save = async (Item) => {
    const courseid = cList.find((ele) => ele.name === Item.courseName).id;

    const data = {
      id: Item.id,
      employeeId: employeeid,
      courseId: courseid,
      startDate: Item.startDate,
      endDate: Item.endDate,
      notes: Item.notes,
    };

    const result =
      Item.id === 0
        ? await axiosInstance.post('EmpCourses', data)
        : await axiosInstance.put(`EmpCourses/${Item.id}`, data);
    return result;
  };

  EmployeeCourseApis.Delete = async (Item) => {
    // 

    const data = await axiosInstance.delete(`EmpCourses/${Item.id}`);
    return data;
  };

  return EmployeeCourseApis;
};

export default EmployeeCourseData;
