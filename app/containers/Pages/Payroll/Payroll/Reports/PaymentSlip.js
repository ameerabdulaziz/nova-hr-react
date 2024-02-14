import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography, Stack, Avatar
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/PaymentSlipData';
import PaymentReportItem from '../components/PaymentSlip/PaymentReportItem';
import messages from '../messages';

function PaymentSlip(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');
  const DOCUMENT_TITLE = 'Payment Slip - ' + format(new Date(), 'yyyy-MM-dd hh_mm_ss');

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const company = useSelector((state) => state.authReducer.companyInfo);

  const [isLoading, setIsLoading] = useState(true);

  const printDivRef = useRef(null);

  const onBeforeGetContent = () => {
    setIsLoading(true);
  };

  const onAfterPrint = () => {
    setIsLoading(false);
  };

  const onPrintError = () => {
    setIsLoading(false);
  };

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    onBeforeGetContent,
    onAfterPrint,
    onPrintError,
    documentTitle: DOCUMENT_TITLE,
  });

  const [companyList, setCompanyList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);
  const [paymentSlipReport, setPaymentSlipReport] = useState([]);

  const insuranceList = [
    {
      id: 1,
      name: intl.formatMessage(messages.insured),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.unInsured),
    },
  ];

  const salaryValuesList = [
    {
      id: 1,
      name: intl.formatMessage(messages.positive),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.negative),
    },
  ];

  const salaryTypesList = [
    {
      id: 1,
      name: intl.formatMessage(messages.bank),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.cash),
    },
  ];

  const [formInfo, setFormInfo] = useState({
    templateId: null,
    branchId,
    currenyId: null,
    yearId: null,
    monthId: null,
    isShowStopedEmp: false,
    isInsured: null,
    isBankTransfere: null,
    isPostiveVal: null,
    isShowCompInsurance: false,
    isShowRefElements: false,
    isShowEffectElements: false,
    notes: '',

    employeeId: null,
    EmpStatusId: 1,
    OrganizationId: '',
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const companies = await GeneralListApis(locale).GetBranchList();
      setCompanyList(companies);

      const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplate);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const currency = await GeneralListApis(locale).MdCurrency();
      setCurrencyList(currency);

      if (branchId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          branchId,
          0
        );

        setFormInfo((prev) => ({
          ...prev,
          monthId: response.monthId,
          yearId: response.yearId,
        }));
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchReportInfo() {
    setIsLoading(true);

    try {
      const response = await api(locale).GetPaymentSlipReport(formInfo);
      setPaymentSlipReport(response);

      setTimeout(() => {
        printJS();
      }, 10);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchReportInfo();
  };

  async function onCompanyAutocompleteChange(value) {
    setIsLoading(true);

    setFormInfo((prev) => ({
      ...prev,
      branchId: value !== null ? value.id : null,
    }));

    try {
      const response = await GeneralListApis(locale).getOpenMonth(
        value !== null ? value.id : 0,
        0
      );

      setFormInfo((prev) => ({
        ...prev,
        monthId: response.monthId,
        yearId: response.yearId,
      }));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleEmpChange = useCallback(async (id, name) => {
    if (name === 'employeeId') {
      setFormInfo((prev) => ({
        ...prev,
        employeeId: id,
      }));
    }
  }, []);

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  const itemFormInfo = useMemo(
    () => ({
      notes: formInfo.notes,
      companyName: getAutoCompleteValue(companyList, formInfo.branchId)?.name ?? '',
      showReferenceElements: formInfo.isShowRefElements,
      isShowEffectElements: formInfo.isShowEffectElements,
    }),
    [formInfo, companyList]
  );

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: '16px!important' }}>
            <Typography variant='h6'>{title}</Typography>

            <Grid container mt={0} spacing={3}>
              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={companyList}
                  value={getAutoCompleteValue(companyList, formInfo.branchId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onCompanyAutocompleteChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.company)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={payTemplateList}
                  value={getAutoCompleteValue(
                    payTemplateList,
                    formInfo.templateId
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'templateId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.template)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={yearList}
                  value={getAutoCompleteValue(yearList, formInfo.yearId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'yearId')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.year)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={monthList}
                  value={getAutoCompleteValue(monthList, formInfo.monthId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'monthId')
                  }
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
                  options={insuranceList}
                  value={getAutoCompleteValue(
                    insuranceList,
                    formInfo.isInsured
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'isInsured')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.insurance)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={salaryTypesList}
                  value={getAutoCompleteValue(
                    salaryTypesList,
                    formInfo.isBankTransfere
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'isBankTransfere')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.salaryType)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={salaryValuesList}
                  value={getAutoCompleteValue(
                    salaryValuesList,
                    formInfo.isPostiveVal
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'isPostiveVal')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.salaryValue)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={currencyList}
                  value={getAutoCompleteValue(currencyList, formInfo.currenyId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'currenyId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.currency)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formInfo.isShowCompInsurance}
                      name='isShowCompInsurance'
                      onChange={onCheckboxChange}
                    />
                  }
                  label={intl.formatMessage(messages.showSICompanyShare)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formInfo.isShowStopedEmp}
                      name='isShowStopedEmp'
                      onChange={onCheckboxChange}
                    />
                  }
                  label={intl.formatMessage(messages.showStopped)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formInfo.isShowRefElements}
                      name='isShowRefElements'
                      onChange={onCheckboxChange}
                    />
                  }
                  label={intl.formatMessage(messages.displayReferenceElements)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formInfo.isShowEffectElements}
                      name='isShowEffectElements'
                      onChange={onCheckboxChange}
                    />
                  }
                  label={intl.formatMessage(messages.displayOriginalValues)}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <EmployeeData
                  handleEmpChange={handleEmpChange}
                  id={formInfo.employeeId}
                  branchId={formInfo.branchId}
                  required={false}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name='notes'
                  value={formInfo.notes}
                  label={intl.formatMessage(payrollMessages.notes)}
                  onChange={onInputChange}
                  fullWidth
                  variant='outlined'
                  rows={1}
                  multiline
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant='contained' color='primary' type='submit'>
                  <FormattedMessage {...payrollMessages.Print} />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>

      <Box
        ref={printDivRef}
        sx={{
          display: 'none',
          px: 4,
          pt: 4,
          '@media print': {
            display: 'block',
            direction: 'ltr',
          },
          'p.MuiTypography-root': {
            fontSize: '10px',
          },
          '.MuiTableCell-root': {
            fontSize: '10px',
          },
        }}
      >
        <Stack spacing={2} mb={2}>
          <div>
            <img src={company?.logo} alt='' height={45} />
          </div>
        </Stack>

        {paymentSlipReport.map((item, index) => (
          <Box
            key={index}
            sx={{
              pageBreakInside: 'avoid',
            }}
          >
            <PaymentReportItem item={item} formInfo={itemFormInfo} />
          </Box>
        ))}
      </Box>
    </PayRollLoader>
  );
}

PaymentSlip.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PaymentSlip);
