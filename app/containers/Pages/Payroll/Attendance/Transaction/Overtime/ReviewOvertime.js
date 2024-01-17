import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../../Component/PayRollLoader';
import Search from '../../../Component/Search';
import useStyles from '../../../Style';
import GeneralListApis from '../../../api/GeneralListApis';
import payrollMessages from '../../../messages';
import api from '../../api/ReviewOvertimeData';
import messages from '../../messages';

function ReviewOvertime(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [isAccruedLeaveChecked, setIsAccruedLeaveChecked] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [updatedTableData, setUpdatedTableData] = useState({});
  const [formInfo, setFormInfo] = useState({
    shiftCode: null,
    OffVacCheck: false,

    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    EmpStatusId: 1,
    OrganizationId: '',
  });

  const fetchTableData = async () => {
    setIsLoading(true);

    const formData = { ...formInfo };
    setUpdatedTableData({});

    Object.keys(formData).forEach((key) => {
      formData[key] = formData[key] === null ? '' : formData[key];
    });

    try {
      const response = await api(locale).GetList(formData);
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const shifts = await GeneralListApis(locale).GetShiftList();
      setShiftList(shifts);

      const response = await api(locale).GetList({});
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (row, evt) => {
    const editRow = tableData[row];
    editRow[evt.target.name] = evt.target.value.replace(/[^\d]/g, '');

    setUpdatedTableData((prev) => ({ ...prev, [row]: editRow }));
  };

  const onCheckboxChange = (row, evt) => {
    const editRow = tableData[row];
    editRow[evt.target.name] = evt.target.checked;

    setUpdatedTableData((prev) => ({ ...prev, [row]: editRow }));
  };
  const onAccruedLeaveBtnClick = () => {
    const changedRows = tableData.map((item) => ({
      ...item,
      calcASRepVac: !isAccruedLeaveChecked,
    }));
    setIsAccruedLeaveChecked(!isAccruedLeaveChecked);

    setUpdatedTableData(changedRows);
  };

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
      },
    },

    {
      name: 'employeeId',
      label: intl.formatMessage(payrollMessages.employeeId),
      options: {
        filter: true,
      },
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },

    {
      name: 'shift',
      label: intl.formatMessage(messages.shift),
      options: {
        filter: true,
      },
    },

    {
      name: 'shiftDate',
      label: intl.formatMessage(messages.AttendanceDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
      },
    },

    {
      name: 'extraTime',
      label: intl.formatMessage(messages.overTime),
      options: {
        filter: true,
      },
    },

    {
      name: 'reqSerial',
      label: intl.formatMessage(messages.requestSerial),
      options: {
        filter: true,
      },
    },

    {
      name: 'overtimeVal',
      label: intl.formatMessage(messages.modifiedOvertime),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <TextField
              value={
                updatedTableData[tableMeta.rowIndex]?.overtimeVal
								?? tableData[tableMeta.rowIndex].overtimeVal
              }
              name='overtimeVal'
              className={classes.field}
              onChange={(evt) => onInputChange(tableMeta.rowIndex, evt)}
            />
          </>
        ),
      },
    },

    {
      name: 'calcASRepVac',
      label: intl.formatMessage(messages.accruedLeave),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <Checkbox
              checked={
                updatedTableData[tableMeta.rowIndex]?.calcASRepVac
								?? tableData[tableMeta.rowIndex].calcASRepVac
              }
              name='calcASRepVac'
              onChange={(evt) => onCheckboxChange(tableMeta.rowIndex, evt)}
            />
          </>
        ),
        customHeadLabelRender: (columnMeta) => (
          <Stack direction='row' alignItems='center' sx={{ cursor: 'pointer' }} onClick={onAccruedLeaveBtnClick}>
            <Checkbox checked={isAccruedLeaveChecked} />
            {columnMeta.label}
          </Stack>
        ),
      },
    },

    {
      name: 'repVacVal',
      label: intl.formatMessage(messages.accruedLeaveMin),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <TextField
              value={
                updatedTableData[tableMeta.rowIndex]?.repVacVal
								?? tableData[tableMeta.rowIndex].repVacVal
              }
              name='repVacVal'
              className={classes.field}
              onChange={(evt) => onInputChange(tableMeta.rowIndex, evt)}
            />
          </>
        ),
      },
    },
  ];

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: true,
    selectableRows: 'none',
    onSearchClose: () => {
      //  some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  const onSaveBtnClick = async () => {
    setIsLoading(true);

    const changedRows = Object.values(updatedTableData).map((item) => ({
      id: 0,
      employeeId: item.employeeId,
      shiftCode: item.shiftCode,
      shiftDate: item.shiftDate,
      overtimeVal: item.overtimeVal,
      extraTime: item.extraTime,
      calcAsrepVac: item.calcASRepVac,
      repVacVal: item.repVacVal,
      reqSerial: item.reqSerial,
      offVacCheck: formInfo.OffVacCheck,
    }));

    try {
      await api(locale).save(changedRows);

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                setIsLoading={setIsLoading}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={shiftList}
                value={
                  shiftList.find((item) => item?.id === formInfo.shiftCode)
									?? null
                }
                isOptionEqualToValue={(option, value) => option?.id === value?.id
                }
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'shiftCode')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.shiftName)}
                  />
                )}
              />
            </Grid>

            <Grid item md={3}>
              <FormControlLabel
                control={<Checkbox />}
                onChange={(evt) => setFormInfo((prev) => ({
                  ...prev,
                  OffVacCheck: evt.target.checked,
                }))
                }
                checked={formInfo.OffVacCheck}
                label={intl.formatMessage(messages.showWeekendOnly)}
              />
            </Grid>

            <Grid item md={12}>
              <Grid container>
                <Grid item md={2}>
                  <Button
                    variant='contained'
                    size='medium'
                    type='submit'
                    color='primary'
                  >
                    <FormattedMessage {...payrollMessages.search} />
                  </Button>
                </Grid>

                <Grid item md={2}>
                  <Button
                    variant='outlined'
                    size='medium'
                    color='primary'
                    onClick={onSaveBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PapperBlock>

        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title=''
            data={tableData}
            columns={columns}
            options={options}
          />
        </div>
      </form>
    </PayRollLoader>
  );
}

ReviewOvertime.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ReviewOvertime);
