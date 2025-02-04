import {
  Autocomplete, Button, Grid, TextField, Tooltip
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import InsuranceFormPopUp from '../../Component/InsuranceFormPopUp';
import PayRollLoader from '../../Component/PayRollLoader';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import { getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import ApiData from '../api/InsuranceReportApisData';
import messages from '../messages';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function InsuranceNotifications(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const pageTitle = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    BranchId: branchId,
    InsStatusId: null,
  });

  const insuranceStatusList = [
    { id: null, name: intl.formatMessage(messages.all) },
    { id: 1, name: intl.formatMessage(messages.joinSocialInsurance) },
    { id: 0, name: intl.formatMessage(messages.existInsurance) },
  ];

  const [companyList, setCompanyList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [hrNotes, setHrNotes] = useState(false);
  const [rowIndexVal, setRowIndexVal] = useState('');

  const handleClickOpen = () => {
    setHrNotes(true);
  };

  const handleClose = () => {
    setHrNotes(false);
  };

  const getFilterHighlights = () => {
    const highlights = [];

    const company = getAutoCompleteValue(companyList, formInfo.BranchId);
    const status = getAutoCompleteValue(
      insuranceStatusList,
      formInfo.InsStatusId
    );

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.Company),
        value: company.name,
      });
    }

    if (status !== null) {
      highlights.push({
        label: intl.formatMessage(messages.InsuranceStatus),
        value: status.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const dataApi = await ApiData(locale).GetInsuranceFollowReport(formInfo);
      setData(dataApi);

      getFilterHighlights();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const branch = await GeneralListApis(locale).GetBranchList();
      setCompanyList(branch);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        display: false,
        print: false,
      },
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.EmpCode),
    },
    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.hiringDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'job',
      label: intl.formatMessage(messages.job),
    },
    {
      name: 'birthDate',
      label: intl.formatMessage(messages.birthDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.birthDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'notes',
      label: intl.formatMessage(messages.notes),
      options: {
        noWrap: true,
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.BranchName),
    },
    {
      name: 'insNotes',
      label: intl.formatMessage(messages.HrNotes),
      options: {
        filter: true,
        print: false,
        customBodyRender: (value, tableMeta) => (
          <div>
            <Tooltip title='Edit'>
              <span
                onClick={() => {
                  handleClickOpen();
                  setRowIndexVal(tableMeta.rowData[0]);
                }}
              >
                {value}
              </span>
            </Tooltip>
          </div>
        ),
      },
    },
  ];

  const createHrNotesFun = async (hrNoteVal) => {
    try {
      const response = await ApiData(locale).save(hrNoteVal, rowIndexVal);
      if (response.status == 200) {
        toast.success(notif.saved);
        setData([]);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Autocomplete
              options={companyList}
              value={getAutoCompleteValue(companyList, formInfo.BranchId)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onAutoCompleteChange(value, 'BranchId')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.Company)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Autocomplete
              options={insuranceStatusList}
              value={getAutoCompleteValue(
                insuranceStatusList,
                formInfo.InsStatusId
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onAutoCompleteChange(value, 'InsStatusId')
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.InsuranceStatus)}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Button variant='contained' color='primary' onClick={handleSearch}>
              {intl.formatMessage(payrollMessages.search)}
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=''
        data={data}
        columns={columns}
        filterHighlights={filterHighlights}
      />

      <InsuranceFormPopUp
        handleClose={handleClose}
        open={hrNotes}
        callFun={createHrNotesFun}
      />
    </PayRollLoader>
  );
}

InsuranceNotifications.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(InsuranceNotifications);
