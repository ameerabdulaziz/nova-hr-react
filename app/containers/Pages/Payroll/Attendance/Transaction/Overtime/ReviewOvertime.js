import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../../Component/PayRollLoader';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import Search from '../../../Component/Search';
import useStyles from '../../../Style';
import GeneralListApis from '../../../api/GeneralListApis';
import { formateDate, getAutoCompleteValue } from '../../../helpers';
import payrollMessages from '../../../messages';
import api from '../../api/ReviewOvertimeData';
import messages from '../../messages';
import { getDateColumnOptions } from '../../../Component/PayrollTable/utils.payroll-table';

function ReviewOvertime(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [isAccruedLeaveChecked, setIsAccruedLeaveChecked] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [updatedTableData, setUpdatedTableData] = useState({});

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [DateError, setDateError] = useState({});
  const [formInfo, setFormInfo] = useState({
    shiftCode: null,
    VacCheck: false,
    FromDate: new Date(),
    ToDate: new Date(),
    EmployeeId: '',
    EmpStatusId: 1,
    OrganizationId: '',
    BranchId: '',
  });

  const [printFilterData, setPrintFilterData] = useState({
       FromDate: new Date(),
       ToDate: new Date(),
       Employee: '',
       EmpStatus: "",
       Organization: '',
       Branch: "",
     });


  const getFilterHighlights = () => {
    const highlights = [];

    const shift = getAutoCompleteValue(shiftList, formInfo.shiftCode);

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: printFilterData.Organization.name,
      });
    }

    if (shift) {
      highlights.push({
        label: intl.formatMessage(messages.shiftName),
        value: shift.name,
      });
    }

    if (printFilterData.Employee && printFilterData.Employee.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: printFilterData.Employee.name,
      });
    }

    if (printFilterData.EmpStatus && printFilterData.EmpStatus.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: printFilterData.Branch.name,
      });
    }

    if (printFilterData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
         value: formateDate(printFilterData.FromDate),
      });
    }

    if (printFilterData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(printFilterData.ToDate),
      });
    }

    if (formInfo.VacCheck) {
      highlights.push({
        label: intl.formatMessage(messages.showWeekendOnly),
        value: formInfo.VacCheck
          ? intl.formatMessage(payrollMessages.yes)
          : intl.formatMessage(payrollMessages.no),
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    setIsLoading(true);

    const formData = {
      ...formInfo,
      FromDate: formateDate(formInfo.FromDate),
      ToDate: formateDate(formInfo.ToDate),
    };

    setUpdatedTableData({});

    try {
      const response = await api(locale).GetList(formData);
      setTableData(response);

      getFilterHighlights();
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
        filter: false,
        display: false,
        download: false,
        print: false,
      },
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(payrollMessages.employeeCode),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'shift',
      label: intl.formatMessage(messages.shift),
    },

    {
      name: 'shiftDate',
      label: intl.formatMessage(messages.attendanceDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.attendanceDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'extraTime',
      label: intl.formatMessage(messages.overTime),
    },

    {
      name: 'reqSerial',
      label: intl.formatMessage(messages.requestSerial),
    },

    {
      name: 'overtimeVal',
      label: intl.formatMessage(messages.modifiedOvertime),
      options: {
        sort: false,
        noFormatOnPrint: true,
        customBodyRender: (value, tableMeta) => (
          <TextField
            value={
              updatedTableData[tableMeta.rowIndex] ? 
                updatedTableData[tableMeta.rowIndex].overtimeVal
                : tableData[tableMeta.rowIndex] ?
                    tableData[tableMeta.rowIndex].overtimeVal
                    : ""
            }
            name='overtimeVal'
            className={classes.field}
            onChange={(evt) => onInputChange(tableMeta.rowIndex, evt)}
            autoComplete='off'
          />
        ),
      },
    },

    {
      name: 'calcASRepVac',
      label: intl.formatMessage(messages.accruedLeave),
      options: {
        noFormatOnPrint: true,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <Checkbox
            checked={
              updatedTableData[tableMeta.rowIndex] ?
                updatedTableData[tableMeta.rowIndex].calcASRepVac
                : tableData[tableMeta.rowIndex] ? 
                    tableData[tableMeta.rowIndex].calcASRepVac 
                    : false
            }
            name='calcASRepVac'
            onChange={(evt) => onCheckboxChange(tableMeta.rowIndex, evt)}
          />
        ),
        customHeadLabelRender: (columnMeta) => (
          <Stack
            direction='row'
            alignItems='center'
            sx={{ cursor: 'pointer' }}
            onClick={onAccruedLeaveBtnClick}
          >
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
        noFormatOnPrint: true,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <TextField
            value={
              updatedTableData[tableMeta.rowIndex] ?
                updatedTableData[tableMeta.rowIndex].repVacVal
                : tableData[tableMeta.rowIndex] ?
                    tableData[tableMeta.rowIndex].repVacVal 
                    : ""
            }
            name='repVacVal'
            className={classes.field}
            onChange={(evt) => onInputChange(tableMeta.rowIndex, evt)}
            autoComplete='off'
          />
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
      VacCheck: formInfo.VacCheck,
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
        <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={7} xl={6}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                setIsLoading={setIsLoading}
                DateError={DateError}
                setDateError={setDateError}
                setPrintFilterData={setPrintFilterData}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2.5} xl={2}>
              <Autocomplete
                options={shiftList}
                value={getAutoCompleteValue(shiftList, formInfo.shiftCode)}
                isOptionEqualToValue={(option, value) => option?.id === value?.id
                }
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'shiftCode')
                }
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.shiftName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={2.5} xl={2}>
              <FormControlLabel
                control={<Checkbox />}
                onChange={(evt) => setFormInfo((prev) => ({
                  ...prev,
                  VacCheck: evt.target.checked,
                }))
                }
                checked={formInfo.VacCheck}
                label={intl.formatMessage(messages.showWeekendOnly)}
              />
            </Grid>

            <Grid item md={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant='contained' type='submit' color='primary'>
                    {intl.formatMessage(payrollMessages.search)}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={onSaveBtnClick}
                  >
                    {intl.formatMessage(payrollMessages.save)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PapperBlock>

        <SimplifiedPayrollTable
          isLoading={isLoading}
          filterHighlights={filterHighlights}
          title={pageTitle}
          data={tableData}
          columns={columns}
        />
      </form>
    </PayRollLoader>
  );
}

ReviewOvertime.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ReviewOvertime);
