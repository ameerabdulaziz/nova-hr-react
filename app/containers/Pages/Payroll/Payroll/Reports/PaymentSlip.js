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
  Typography, Stack
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
import EmployeeDataSmall from '../../Component/EmployeeDataSmall';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/PaymentSlipData';
import PaymentReportItem from '../components/PaymentSlip/PaymentReportItem';
import messages from '../messages';
import SITEMAP, { DOMAIN_NAME } from '../../../../App/routes/sitemap';

function PaymentSlip(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');
  const DOCUMENT_TITLE = 'Payment Slip - ' + format(new Date(), 'yyyy-MM-dd hh_mm_ss');

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const company = useSelector((state) => state.authReducer.companyInfo);

  const [isLoading, setIsLoading] = useState(true);
  const [btnType, setBtnType] = useState();

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
    templateId: 1,
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

  async function fetchReportInfo(btnType) {
    setIsLoading(true);
    setBtnType(btnType)

    try {
      const response = await api(locale).GetPaymentSlipReport(formInfo);
      setPaymentSlipReport(response);

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (paymentSlipReport.length !== 0 && btnType === "print") {
      printJS();
    }
  }, [paymentSlipReport])



  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = (evt, btnType) => {
    evt.preventDefault();

    fetchReportInfo(btnType);
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



  const reviewDetailsFun = () => {
    fetchReportInfo("review");
  }


  useEffect(() => {
    if (paymentSlipReport.length !== 0 && btnType === "review") {
      sessionStorage.setItem('Review', JSON.stringify({
        paymentSlipReport: paymentSlipReport,
        itemFormInfo: itemFormInfo,
      }));


      window.open(`${DOMAIN_NAME}${SITEMAP.payroll.PaymentSlipReview.route}`, "_blank")?.focus();

    }
  }, [paymentSlipReport])


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <form onSubmit={(e) => onFormSubmit(e, "print")}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: '16px!important' }}>
            <Typography variant='h6'>{title}</Typography>

            <Grid container mt={2} >

              <Grid container spacing={2} md={12} xl={8}>
                <Grid item xs={12} md={4} lg={4} xl={4}>
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
                        //required
                        label={intl.formatMessage(messages.company)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
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

                <Grid item xs={12} md={4} lg={3}>
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

                <Grid item xs={12} md={4} lg={2}>
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

                <Grid item xs={12} md={4} lg={3} xl={4}>
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

                <Grid item xs={12} md={4} lg={3} xl={4}>
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

                <Grid item xs={6} md={3} lg={2} xl={2}>
                  <Grid item >
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
                </Grid>

                <Grid item xs={6} md={3} lg={2} xl={2}>
                  <Grid item >
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
                </Grid>

              </Grid>
              <Grid item sm={0} xl={0.5}></Grid>

              <Grid container spacing={2} mt={1} xs={12} lg={8} xl={6}>

                <Grid item xs={12} md={6} >
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

                <Grid item xs={12} md={6} >
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

                <Grid item xs={12} md={6} >
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

                <Grid item xs={12} md={6} >
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

              </Grid>
              <Grid item sm={0} md={4} xl={6}></Grid>

              <Grid item xs={12} lg={10.5} xl={8} mt={1} >
                <EmployeeDataSmall
                  handleEmpChange={handleEmpChange}
                  id={formInfo.employeeId}
                  branchId={formInfo.branchId}
                  required={false}
                  IsSecuredData={true}
                />
              </Grid>
            
              <Grid item xs={12} lg={10.5} xl={8} mt={2}  >
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

              <Grid item mt={2} xs={12}>
                <Grid container spacing={3}>
              <Grid item >
                <Button variant='contained' color='primary' type='submit'>
                  <FormattedMessage {...payrollMessages.Print} />
                </Button>
              </Grid>

              <Grid item >
                <Button variant='contained' color='primary'
                  onClick={() => {
                    reviewDetailsFun()
                  }}
                >
                  <FormattedMessage {...payrollMessages.review} />
                </Button>
              </Grid>
                </Grid>
              </Grid>


            </Grid>
          </CardContent>
        </Card>
      </form>

      <Box
        ref={printDivRef}
        sx={{
          height: "0px",
          visibility: "hidden",
          px: 4,
          pt: 4,
          '@media print': {
            height: "100%",
            visibility: "visible",
            direction: 'ltr',
          },
          'p.MuiTypography-root, .MuiTableCell-root': {
            fontSize: '7px',
            color: '#000',
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

    </PayRollLoaderInForms>
  );
}

PaymentSlip.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PaymentSlip);
