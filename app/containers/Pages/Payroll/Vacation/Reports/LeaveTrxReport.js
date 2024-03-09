import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import API from '../api/LeaveTrxReportData';
import messages from '../messages';
import payrollMessages from '../../messages';

import { format } from "date-fns";
import { toast } from "react-hot-toast";
import Payrollmessages from "../../messages";

function LeaveTrxReport(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);

  const [vacationsList, setVacationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    EmpStatusId: 1,
    OrganizationId: '',
    VacationId: [],
    InsertDate: false,
  });

  const [DateError, setDateError] = useState({});







  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: 'organizationName',
      label: <FormattedMessage {...messages.organization} />,
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
      name: "employeeCode",
      label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
      name: 'employeeName',
      label: <FormattedMessage {...messages.employeeName} />,
    },
    {
      name: 'hiringDate',
      label: <FormattedMessage {...messages.hiringDate} />,
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'vacationName',
      label: <FormattedMessage {...messages.vacationName} />,
    },
    {
      name: 'fromDate',
      label: <FormattedMessage {...messages.fromDate} />,
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'toDate',
      label: <FormattedMessage {...messages.toDate} />,
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
    {
      name: 'daysCount',
      label: <FormattedMessage {...messages.daysCount} />,
    },
    {
      name: 'dayEqual',
      label: <FormattedMessage {...messages.dayDeducedBy} />,
    },
    {
      name: 'trxDate',
      label: <FormattedMessage {...messages.registrationDate} />,
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },
  ];

  async function fetchData() {
    try {
      const Vacations = await GeneralListApis(locale).GetVacList();
      setVacationsList(Vacations);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const fetchTableData = async () => {

      // used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }


    try {
      setIsLoading(true);
      const formData = { ...formInfo };

      formData.VacationId = formData.VacationId.map((item) => item.id);
      formData.FromDate = formateDate(formData.FromDate);
      formData.ToDate = formateDate(formData.ToDate);

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTableData();
  }, []);

  const onSearchBtnClick = () => {
    fetchTableData();
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              DateError={DateError}
               setDateError={setDateError}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              options={vacationsList}
              multiple
              disableCloseOnSelect
              className={`${style.AutocompleteMulSty} ${
                locale === 'ar' ? style.AutocompleteMulStyAR : null
              }`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={formInfo.VacationId}
              renderOption={(optionProps, option, { selected }) => (
                <li {...optionProps} key={optionProps.id}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                    checkedIcon={<CheckBoxIcon fontSize='small' />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  VacationId: value,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.vacationType)}
                />
              )}
            />
          </Grid>

          <Grid item md={5}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <FormControlLabel
                control={<Checkbox />}
                onChange={(evt) => setFormInfo((prev) => ({
                  ...prev,
                  InsertDate: evt.target.checked,
                }))
                }
                checked={formInfo.InsertDate}
                label={intl.formatMessage(messages.filterOnRegistrationHistory)}
              />

              <Button
                variant='contained'
                size='medium'
                color='primary'
                onClick={onSearchBtnClick}
              >
                <FormattedMessage {...messages.search} />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        title=''
        data={tableData}
        columns={columns}
      />
    </PayRollLoader>
  );
}

LeaveTrxReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LeaveTrxReport);
