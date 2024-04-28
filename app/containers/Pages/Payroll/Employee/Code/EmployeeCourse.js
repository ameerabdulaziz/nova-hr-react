/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import messages from '../messages';
import { EditTable } from '../../../../Tables/demos';
import useStyles from '../../Style';
import { toast } from 'react-hot-toast';
import EmployeeCourseData from '../api/EmployeeCourseData';
import GeneralListApis from '../../api/GeneralListApis';
import { CrudTable, Notification } from 'enl-components';
import { Grid, TextField, Autocomplete } from '@mui/material';
import DecryptUrl from "../../Component/DecryptUrl";
import { useLocation } from 'react-router';
import EmployeeData from '../../Component/EmployeeData';

// const useStyles = makeStyles()(() => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

function EmployeeCourse(props) {

  const location = useLocation();

  // get employee data from url
    const empid  = DecryptUrl() ?   DecryptUrl()  : location.state ? location.state : null
  const { intl } = props;

  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const title =  localStorage.getItem('MenuName');
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);


  const anchorTable = [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'courseName',
      label: 'course',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },
    {
      name: 'startDate',
      label: 'startdate',
      type: 'date',
      initialValue: new Date(),
      width: 'auto',
      hidden: false,
    },
    {
      name: 'endDate',
      label: 'enddate',
      width: 'auto',
      type: 'date',
      initialValue: new Date(),
      hidden: false,
    },
    {
      name: 'notes',
      label: 'note',
      type: 'text',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'courseId',
      label: 'id',
      type: 'text',
      width: 'auto',
      hidden: true,
    },

    {
      name: 'employeeId',
      label: 'id',
      type: 'text',
      width: 'auto',
      hidden: true,
    },
    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
  ];

  const handleEmpChange = (id, name, empName) => {
    if (name == "employeeId")
    {
      if (id && empName) {
        setEmployee({ id: id, name: empName })
      }
    }
    // used to disable add button when clear employee name compobox
    if(id === "")
    {
      setEmployee({ id: 0, name: "" })
    }
  };

  return (
    <div>
      
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
       
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
            //justifyContent="center"
          >
            <Grid item xs={12} md={12}>
              <EmployeeData handleEmpChange={handleEmpChange}  id={empid && empid.id !== 0 ? empid.id : null} ></EmployeeData>
            </Grid>

          </Grid>
          </PapperBlock>
          <EditTable
            anchorTable={anchorTable}
            title={employee.name}
            API={EmployeeCourseData(employee.id)}
            addBtnLock={JSON.stringify(employee) === JSON.stringify({ id: 0, name: "" })}
          />
    </div>
  );
}

export default injectIntl(EmployeeCourse);
