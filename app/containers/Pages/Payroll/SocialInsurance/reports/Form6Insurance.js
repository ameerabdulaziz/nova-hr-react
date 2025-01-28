import { Print } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, {
  useEffect, useMemo, useRef, useState
} from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import SITEMAP, { DOMAIN_NAME } from '../../../../App/routes/sitemap';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import useStyles from '../../Style';
import { formateDate, formatNumber } from '../../helpers';
import payrollMessages from '../../messages';
import InsuranceReportForm6 from '../../reports-templates/InsuranceReportForm6';
import api from '../api/Form2InsuranceData';
import messages from '../messages';

function Form6Insurance(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const isScreenSmall = useMediaQuery('(max-width:900px)');

  const [selectedRowsIndex, setSelectedRowsIndex] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [dateError, setDateError] = useState({});
  const [officeList, setOfficeList] = useState([]);
  const [extraData, setExtraData] = useState({
    total: 0,
    totalMainSalary: 0,
    totalVarSalary: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    InsuranceOrg: '',
    InsOffice: '',
    ToDate: new Date(),
    InsDate: 'false',
    OrderInsNo: 'false',
    HiringDate: 'false',
  });

  const printDivRef = useRef(null);

  const DOCUMENT_TITLE = 'Insurance Report Form 6 - ' + formateDate(new Date(), 'yyyy-MM-dd hh_mm_ss');

  const fetchTableData = async () => {
    try {
      setIsLoading(true);

      const formData = {
        ...formInfo,
        ToDate: formateDate(formInfo.ToDate),
      };

      if (formInfo.InsDate === 'true') {
        formData.HiringDate = 'false';
      } else {
        formData.HiringDate = 'true';
      }

      const { list, ...response } = await api(locale).GetList(formData);
      setTableData(list);
      setExtraData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    try {
      const organizations = await api(locale).GetSInsuranceOrgnization();
      setOrganizationList(organizations);

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

  const columns = [
    {
      name: 'socialInsuranceID',
      label: intl.formatMessage(messages.insuranceNumber),
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(messages.employeeId),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'job',
      label: intl.formatMessage(messages.job),
    },

    {
      name: 'gender',
      label: intl.formatMessage(messages.gender),
    },

    {
      name: 'birthDate',
      label: intl.formatMessage(messages.birthDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },

    {
      name: 'insuranceDate',
      label: intl.formatMessage(messages.insuranceDate),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },

    {
      name: 'mainSalary',
      label: intl.formatMessage(messages.insuranceSalary),
      options: {
        customBodyRender: (value) => (value ? <pre>{formatNumber(value)}</pre> : ''),
      },
    },

    {
      name: 'insGrossSalary',
      label: intl.formatMessage(messages.grossSalary),
      options: {
        customBodyRender: (value) => (value ? <pre>{formatNumber(value)}</pre> : ''),
      },
    },

    {
      name: 'mainSalaryNew',
      label: intl.formatMessage(messages.basicSalary),
      options: {
        customBodyRender: (value) => (value ? <pre>{formatNumber(value)}</pre> : ''),
      },
    },
  ];

  const printJS = useReactToPrint({
    documentTitle: DOCUMENT_TITLE,
    content: () => printDivRef?.current,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
    },
    onPrintError: () => {
      setIsLoading(false);
    },
  });

  const onPrintBtnClick = async () => {
    printJS();
  };

  const onPreviewBtnClick = async () => {
    if (!formInfo.InsuranceOrg || formInfo.InsuranceOrg.length === 0) {
      toast.error(intl.formatMessage(messages.orgnizationErrMess));
      return;
    }

    sessionStorage.setItem(
      'Review',
      JSON.stringify({
        formInfo,
        SelectedRows: selectedRowsIndex,
      })
    );

    const url = `/${DOMAIN_NAME}${SITEMAP.socialInsurance.Form6InsuranceReview.route}`;

    window.open(url, '_blank')?.focus();
  };

  const options = {
    print: false,
    selectableRows: 'multiple',
    onRowSelectionChange: (rowsSelectedIndexes) => {
      setSelectedRowsIndex(rowsSelectedIndexes);
    },
    rowsSelected: selectedRowsIndex,
    customToolbarSelect: () => (
      <IconButton sx={{ mx: 2 }} onClick={onPrintBtnClick}>
        <PrintIcon sx={{ fontSize: '25px' }} />
      </IconButton>
    ),
    customToolbar: () => (
      <Tooltip
        placement='top'
        title={intl.formatMessage(payrollMessages.Print)}
      >
        <IconButton onClick={onPrintBtnClick}>
          {isLoading ? (
            <CircularProgress size={15} />
          ) : (
            <Print sx={{ fontSize: '1.2rem' }} />
          )}
        </IconButton>
      </Tooltip>
    ),
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    fetchTableData();
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const printData = useMemo(() => {
    if (selectedRowsIndex.length > 0) {
      const rows = selectedRowsIndex.map((row) => tableData[row]);
      return rows;
    }

    return tableData;
  }, [selectedRowsIndex, tableData]);

  return (
    <PayRollLoader isLoading={isLoading}>
      <Box
        ref={printDivRef}
        sx={{
          height: '0px',
          visibility: 'hidden',
          direction: 'ltr',
          ...(locale === 'en' ? { textAlign: 'right', direction: 'rtl' } : {}),
          '@media print': {
            height: '100%',
            visibility: 'visible',
          },
          'p.MuiTypography-root, .MuiTableCell-root': {
            fontSize: '15px',
          },
        }}
      >
        {printData.map((employee) => (
          <InsuranceReportForm6 key={employee.id} employee={employee} />
        ))}
      </Box>

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container mt={0} mb={5} spacing={2}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                options={organizationList}
                value={
                  organizationList.find(
                    (item) => item.id === formInfo.InsuranceOrg
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'InsuranceOrg')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.organizationName)}
                  />
                )}
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
                onChange={(_, value) => onAutoCompleteChange(value, 'InsOffice')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.insuranceOffice)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={intl.formatMessage(messages.toDate)}
                          value={
                            formInfo.ToDate ? dayjs(formInfo.ToDate) : null
                          }
                          className={classes.field}
                          onChange={(date) => onDatePickerChange(date, 'ToDate')
                          }
                          onError={(error, value) => {
                            if (error !== null) {
                              setDateError((prevState) => ({
                                ...prevState,
                                ToDate: true,
                              }));
                            } else {
                              setDateError((prevState) => ({
                                ...prevState,
                                ToDate: false,
                              }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item>
                      <RadioGroup
                        row
                        value={formInfo.InsDate}
                        onChange={(evt) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            InsDate: evt.target.value,
                          }));
                        }}
                      >
                        <FormControlLabel
                          value='true'
                          control={<Radio />}
                          label={intl.formatMessage(messages.hiringDate)}
                        />
                        <FormControlLabel
                          value='false'
                          control={<Radio />}
                          label={intl.formatMessage(messages.insuranceDate)}
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <FormControl>
                <RadioGroup
                  row
                  value={formInfo.OrderInsNo}
                  onChange={(evt) => {
                    setFormInfo((prev) => ({
                      ...prev,
                      OrderInsNo: evt.target.value,
                    }));
                  }}
                >
                  <FormControlLabel
                    value='true'
                    control={<Radio />}
                    label={`${intl.formatMessage(
                      messages.orderBy
                    )} ${intl.formatMessage(messages.insuranceNumber)}`}
                  />
                  <FormControlLabel
                    value='false'
                    control={<Radio />}
                    label={`${intl.formatMessage(
                      messages.orderBy
                    )} ${intl.formatMessage(messages.insuranceDate)}`}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>
                    <FormattedMessage {...payrollMessages.search} />
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={onPrintBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.Print} />
                  </Button>
                </Grid>

                {/* used to check if the screen size less than 900 (mobile) hide the button */}
                {!isScreenSmall && (
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={onPreviewBtnClick}
                    >
                      <FormattedMessage {...payrollMessages.review} />
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Card className={classes.card}>
            <CardContent>
              <Grid container justifyContent='space-around' spacing={2}>
                <Grid item xs={4} textAlign='center'>
                  <Typography>{formatNumber(extraData.total) ?? 0}</Typography>
                  <Typography variant='subtitle1'>
                    <FormattedMessage {...messages.totalFixed} />
                  </Typography>
                </Grid>

                {/* <Grid item xs={4} textAlign='center'>
                  <Typography>{extraData.total ?? 0}</Typography>
                  <Typography variant='subtitle1'>
                    <FormattedMessage {...messages.totalVariable} />
                  </Typography>
                </Grid> */}

                <Grid item xs={4} textAlign='center'>
                  <Typography>{formatNumber(extraData.total) ?? 0}</Typography>
                  <Typography variant='subtitle1'>
                    <FormattedMessage {...payrollMessages.total} />
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </PapperBlock>

      <PayrollTable
        title=''
        data={tableData}
        columns={columns}
        options={options}
      />
    </PayRollLoader>
  );
}

Form6Insurance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Form6Insurance);
