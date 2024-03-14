/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
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

// const useStyles = makeStyles()(() => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

function EmployeeCourse(props) {

  // get employee data from url
  const empid  = DecryptUrl()
  const { intl } = props;

  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const [employeeList, setEmployeeList] = useState([]);
  const title = 'Employee Course'; //localStorage.getItem('MenuName');
  const description = brand.desc;
  console.log(description + '*' + title);
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const GetUserMenuLookup = useCallback(async () => {
    try {
      

      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employeedata || []);
    } catch (err) {
    }
  }, []);

  useEffect(() => {
    GetUserMenuLookup();
  }, []);

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
            <Grid item xs={1} sm={6}>
              <Autocomplete
                id="ddlEmp"
                options={employeeList}
                value={employee}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                    setEmployee(value );
                  
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="employee"
                    label={intl.formatMessage(messages.chooseEmp)}
                    margin="normal"
                  />
                )}
              />
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
