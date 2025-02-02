import { Autocomplete, Grid, TextField } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import StaffJobKPIData from '../api/StaffJobKPIData';
import messages from '../messages';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function StaffJobKPI(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();

      setEmployeeList(employees);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
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
      name: 'enKpidesc',
      label: 'enKpidesc',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'arKpidesc',
      label: 'arKpidesc',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
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
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <Grid container mt={3}>
          <Grid item xs={6}  lg={3}>
            <Autocomplete
              options={employeeList}
              value={employeeList.find((item) => item.id === employee?.id) ?? null}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => setEmployee(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.employeeName)}
                />
              )}
            />
          </Grid>
        </Grid>
      </PapperBlock>

      <div className={classes.root}>
        <EditTable
          anchorTable={anchorTable}
          title={employee?.name ?? ''}
          API={StaffJobKPIData(employee?.id ?? 0)}
        />
      </div>
    </PayRollLoader>
  );
}

StaffJobKPI.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(StaffJobKPI);
