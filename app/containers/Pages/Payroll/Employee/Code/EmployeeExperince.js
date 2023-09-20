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
import { toast } from 'react-hot-toast';
import EmployeeExperinceData from '../api/EmployeeExperinceData';
import GeneralListApis from '../../api/GeneralListApis';
import { Grid, TextField, Autocomplete } from '@mui/material';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function EmployeeExperince(props) {
  const { intl } = props;
  const [employee, setEmployee] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const title = 'Employee Experince'; //localStorage.getItem('MenuName');
  const description = brand.desc;
  console.log(description + '*' + title);
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const GetUserMenuLookup = useCallback(async () => {
    try {
      debugger;
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employeedata || []);
    } catch (err) {
      toast.error(err);
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
      name: 'companyName',
      label: 'companyname',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'fromDate',
      label: 'fromdate',
      type: 'date',
      initialValue: new Date(),
      width: 'auto',
      hidden: false,
    },
    {
      name: 'toDate',
      label: 'todate',
      width: 'auto',
      type: 'date',
      initialValue: new Date(),
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
      name: 'monthNo',
      label: 'monthno',
      type: 'number',
      width: 'auto',
      initialValue: 1,
      hidden: false,
    },
    {
      name: 'notes',
      label: 'note',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'employeeId',
      label: 'id',
      type: 'text',
      width: 'auto',
      initialValue: '',
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
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <div className={classes.root}>
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
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  if (value !== null) {
                    setEmployee(value.id);
                  } else {
                    setEmployee(0);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    {...params}
                    name="employee"
                    value={employee}
                    label={intl.formatMessage(messages.chooseEmp)}
                    margin="normal"
                  />
                )}
              />
            </Grid>
          </Grid>
          <EditTable
            anchorTable={anchorTable}
            title={employee}
            API={EmployeeExperinceData(employee)}
          />
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(EmployeeExperince);
