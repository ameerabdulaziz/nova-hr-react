import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
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
import InsuranceFormPopUp from '../../Component/InsuranceFormPopUp';
import PayRollLoader from '../../Component/PayRollLoader';
import Search from '../../Component/Search';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/SocialInsuranceReportData';
import messages from '../messages';

function SocialInsuranceReport(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hrNotesRowId, setHrNotesRowId] = useState('');
  const [isHRNotesPopupOpen, setIsHRNotesPopupOpen] = useState(false);

  const [officeList, setOfficeList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const ageList = [
    {
      label: intl.formatMessage(messages.all),
      value: null,
    },
    {
      label: intl.formatMessage(messages.lessThan60),
      value: 2,
    },
    {
      label: intl.formatMessage(messages['60AndUp']),
      value: 1,
    },
  ];

  const Title = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    OrganizationId: null,
    EmpStatusId: 1,

    InsOffice: '',
    YearId: '',
    YearName: '',
    MonthId: '',
    age: null,

    ThreeMonths: false,
    IsInsured: false,
  });

  const onHRNotesClick = (rowId) => {
    setHrNotesRowId(rowId);
    setIsHRNotesPopupOpen(true);
  };

  const closeHRNotesPopup = () => {
    setIsHRNotesPopupOpen(false);
  };

  const columns = [
    {
      name: 'id',
      options: {
        display: false,
      },
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organizationName),
      options: {
        filter: true,
      },
    },
    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeId),
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
      name: 'birthDate',
      label: intl.formatMessage(messages.birthDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'staffAge',
      label: intl.formatMessage(messages.employeeAgeAtEndOfMonth),
      options: {
        filter: true,
      },
    },
    {
      name: 'hiringDate',
      label: intl.formatMessage(messages.hiringDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'insuOffice',
      label: intl.formatMessage(messages.insuranceOffice),
      options: {
        filter: true,
      },
    },
    {
      name: 'socialInsuranceID',
      label: intl.formatMessage(messages.socialInsuranceID),
      options: {
        filter: true,
      },
    },
    {
      name: 'insuranceDate',
      label: intl.formatMessage(messages.insuranceDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'insuJobName',
      label: intl.formatMessage(messages.insuranceJob),
      options: {
        filter: true,
      },
    },
    {
      name: 'srcNotes',
      label: intl.formatMessage(messages.hrNotes),
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => (
          <Tooltip
            placement='top'
            title={intl.formatMessage(payrollMessages.edit)}
            onClick={() => onHRNotesClick(tableMeta.rowData[0])}
          >
            <span>{value}</span>
          </Tooltip>
        ),
      },
    },
    {
      name: 'c1inNo',
      label: intl.formatMessage(messages.c1IncomingNumber),
      options: {
        filter: true,
      },
    },
    {
      name: 'c1inDate',
      label: intl.formatMessage(messages.c1DeliverDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'c6inNo',
      label: intl.formatMessage(messages.c6IncomingNumber),
      options: {
        filter: true,
      },
    },
    {
      name: 'c6inDate',
      label: intl.formatMessage(messages.c6DeliverDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'ka3bDate',
      label: intl.formatMessage(messages.workLetterDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
      },
    },
    {
      name: 'ka3bNo',
      label: intl.formatMessage(messages.workLetterNumber),
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: false,
    selectableRows: 'none',
    serverSide: true,
    onSearchClose: () => {
      // some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const office = await api(locale).GetSInsuranceOffices();
      setOfficeList(office);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const formData = {
        ...formInfo,
      };

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? '' : formData[key];
      });

      const dataApi = await api(locale).GetReport(formData);

      setTableData(dataApi);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const createHRNotes = async (notes) => {
    try {
      setIsLoading(true);
      const formData = {
        id: hrNotesRowId,
        notes,
      };

      await api(locale).AddHRNotes(formData);

      toast.success(notif.saved);

      fetchTableData();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <InsuranceFormPopUp
        handleClose={closeHRNotesPopup}
        open={isHRNotesPopupOpen}
        callFun={createHRNotes}
      />

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                notShowDate={true}
                setIsLoading={setIsLoading}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={officeList}
                value={
                  officeList.find((item) => item.id === formInfo.InsOffice) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    InsOffice: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.insuranceOffice)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={yearList}
                value={
                  yearList.find((item) => item.id === formInfo.YearId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    YearId: value !== null ? value.id : null,
                    YearName: value !== null ? value.name : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Autocomplete
                options={monthsList}
                value={
                  monthsList.find((item) => item.id === formInfo.MonthId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    MonthId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.month)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={ageList}
                value={
                  ageList.find((item) => item.value === formInfo.age) ?? null
                }
                isOptionEqualToValue={(option, value) => option.value === value.value
                }
                getOptionLabel={(option) => (option ? option.label : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    age: value?.value,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.age)}
                  />
                )}
              />
            </Grid>

            <Grid item md={12}>
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formInfo.IsInsured}
                        onChange={(evt) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            IsInsured: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.onlyInsured)}
                  />
                </Grid>

                <Grid item md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formInfo.ThreeMonths}
                        onChange={(evt) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            ThreeMonths: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.hiredFromAtLeast3Months)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <Button variant='contained' type='submit'>
                <FormattedMessage {...payrollMessages.search} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=''
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

SocialInsuranceReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SocialInsuranceReport);
