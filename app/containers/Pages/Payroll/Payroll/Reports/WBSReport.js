import {
    Autocomplete,
    Button,
    Grid,
    Stack,
    TextField,
  } from '@mui/material';
  import { PapperBlock } from 'enl-components';
  import PropTypes from 'prop-types';
  import React, { useEffect, useState } from 'react';
  import { injectIntl } from 'react-intl';
  import { useSelector } from 'react-redux';
  import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
  import PayrollTable from '../../Component/PayrollTable';
  import GeneralListApis from '../../api/GeneralListApis';
  import { formatNumber, formateDate, getAutoCompleteValue } from '../../helpers';
  import payrollMessages from '../../messages';
  import api from '../api/WBSData';
  import messages from '../messages';
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { format } from "date-fns";
  
  function WBSReport(props) {
    const { intl } = props;
    const locale = useSelector((state) => state.language.locale);
    const { branchId = null } = useSelector((state) => state.authReducer.user);
    const pageTitle = localStorage.getItem('MenuName');
    const [departmentList, setDepartmentList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [payTemplateList, setPayTemplateList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [filterHighlights, setFilterHighlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [DateError, setDateError] = useState({});
    const [formInfo, setFormInfo] = useState({
      BankId: "",
      OrganizationId: "",
      PayTemplateId: 1,
      BranchId: branchId,
      fromDate: new Date(),
      toDate: new Date(),
    });

     // used to reformat date before send it to api
        const dateFormatFun = (date) => {
         return  date ? format(new Date(date), "yyyy-MM-dd") : ""
      }
  
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
        label: intl.formatMessage(messages.organization),
      },
  
      {
        name: 'employeeCode',
        label: intl.formatMessage(messages.employeeCode),
      },
  
      {
        name: 'employeeName',
        label: intl.formatMessage(payrollMessages.employeeName),
      },
  
      {
        name: '',
        // label: "year / month",
        label: intl.formatMessage(messages.monthYear),
        options: {
          customBodyRender: (value, tableMeta) => <div> {
            tableData[tableMeta.rowIndex] &&  tableData[tableMeta.rowIndex].month && tableData[tableMeta.rowIndex]?.year ?
              `${tableData[tableMeta.rowIndex].month} / ${tableData[tableMeta.rowIndex].year}`
              : ""
            } </div>,
        },
      },
  
      {
        name: 'netSal',
        label: intl.formatMessage(messages.netSalary),
        options: {
          filter: true,
          customBodyRender: (value) => <pre> {formatNumber(value)} </pre>,
        },
      },
  
      {
        name: 'payTemplateName',
        // label: "pay Template Name",
        label: intl.formatMessage(messages.payTemplate),
      },
  
      {
        name: 'bnk_name',
        label: intl.formatMessage(messages.bankName),
      },
    ];
  
    const getFilterHighlights = () => {
      const highlights = [];
  
      const company = getAutoCompleteValue(companyList, formInfo.BranchId);
      const template = getAutoCompleteValue(payTemplateList, formInfo.PayTemplateId);
      const department = getAutoCompleteValue(departmentList, formInfo.OrganizationId);
      const bank = getAutoCompleteValue(bankList, formInfo.BankId);

    
      if (template) {
        highlights.push({
          label: intl.formatMessage(messages.template),
          value: template.name,
        });
      }
  
      if (department) {
        highlights.push({
          label: intl.formatMessage(messages.department),
          value: department.name,
        });
      }
  
      if (bank) {
        highlights.push({
          label: intl.formatMessage(messages.bank),
          value: bank.name,
        });
      }
    
      if (company) {
        highlights.push({
          label: intl.formatMessage(messages.company),
          value: company.name,
        });
      }
  
      setFilterHighlights(highlights);
    };
  
    async function fetchNeededData() {
      setIsLoading(true);
  
      try {
        const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
        setPayTemplateList(payTemplate);
    
        const department = await GeneralListApis(locale).GetDepartmentList(branchId);
        setDepartmentList(department);
  
        const bank = await GeneralListApis(locale).GetBankList();
        setBankList(bank);
    
        const company = await GeneralListApis(locale).GetBranchList();
        setCompanyList(company);
    
        if (branchId) {
          const response = await GeneralListApis(locale).getOpenMonth(
            branchId,
            0
          );
  
          setFormInfo((prev) => ({
            ...prev,
            fromDate: response.fromDateAtt,
            toDate: response.todateAtt,
          }));
        }
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  
    const fetchTableData = async () => {
      setIsLoading(true);

      // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }
    
      const params = {
        BankId: formInfo.BankId ? formInfo.BankId : "",
        PayTemplateId: formInfo.PayTemplateId ? formInfo.PayTemplateId : "",
        BranchId: formInfo.BranchId ? formInfo.BranchId :"",
        OrganizationId: formInfo.OrganizationId ? formInfo.OrganizationId :"",
        FromDate: dateFormatFun(formInfo.fromDate),
        ToDate: dateFormatFun(formInfo.toDate),
      };
  
      try {
        const response = await api(locale).GetReportList(formInfo?.PayTemplateId, params);
        setTableData(response);
  
        getFilterHighlights();
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchNeededData();
    }, []);
  
    const onFormSubmit = (evt) => {
      evt.preventDefault();
  
      fetchTableData();
    };
  
    const onAutoCompleteChange = (value, name) => {
      setFormInfo((prev) => ({
        ...prev,
        [name]: value !== null ? value.id : null,
      }));
    };
  
  
    async function onCompanyAutocompleteChange(value) {
      setIsLoading(true);
  
      setFormInfo((prev) => ({
        ...prev,
        BranchId: value !== null ? value.id : null,
        OrganizationId: null,
      }));
  
      try {
        const response = await GeneralListApis(locale).getOpenMonth(
          value !== null ? value.id : 0,
          0
        );

        console.log("response =", response);
        
  
  
        const organizations = await GeneralListApis(locale).GetDepartmentList(value ? value.id : null);
        setDepartmentList(organizations)
  
        setFormInfo((prev) => ({
          ...prev,
          fromDate: response ? response.fromDateAtt : null,
          toDate: response ? response.todateAtt : null,
        }));
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  
    return (
      <PayRollLoaderInForms isLoading={isLoading}>
        <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
          <form onSubmit={onFormSubmit}>
            <Grid container mt={0} spacing={3}>
              <Grid container item spacing={3} lg={7}>

               <Grid item xs={12} md={6} >
                <Autocomplete
                  options={bankList}
                  value={getAutoCompleteValue(bankList, formInfo.BankId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'BankId')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.bank)}
                    />
                  )}
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={payTemplateList}
                  value={getAutoCompleteValue(
                    payTemplateList,
                    formInfo.PayTemplateId
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'PayTemplateId')
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
  
              <Grid item xs={12} md={6}>
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
                  onChange={(_, value) => onCompanyAutocompleteChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.company)}
                    />
                  )}
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={departmentList}
                  value={getAutoCompleteValue(
                    departmentList,
                    formInfo.OrganizationId
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'OrganizationId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(payrollMessages.organizationName)}
                    />
                  )}
                />
              </Grid>

              </Grid>

              <Grid container item spacing={3} lg={2}>

                <Grid item xs={12} > 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                       label={intl.formatMessage(payrollMessages.fromdate)}
                        value={formInfo.fromDate ? dayjs(formInfo.fromDate) : formInfo.fromDate}
                    //   className={classes.field}
                        onChange={(date) => {
                          // handleChange("fromDate", date);
                          setFormInfo((prev) => ({
                            ...prev,
                            fromDate: date !== null ? date : null,
                          }));
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`FromDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`FromDate`]: false
                            }))
                        }
                      }}
                      />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} > 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                       label={intl.formatMessage(payrollMessages.todate)}
                        value={formInfo.toDate ? dayjs(formInfo.toDate) : formInfo.toDate}
                    //   className={classes.field}
                        onChange={(date) => {
                          // handleChange("fromDate", date);
                          setFormInfo((prev) => ({
                            ...prev,
                            toDate: date !== null ? date : null,
                          }));
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`ToDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`ToDate`]: false
                            }))
                        }
                      }}
                      />
                  </LocalizationProvider>
               </Grid>    

              </Grid>


  
              {/* <Grid item xs={12} md={3}>
                <Autocomplete
                  options={currencyList}
                  value={getAutoCompleteValue(currencyList, formInfo.CurrencyId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'CurrencyId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.currency)}
                    />
                  )}
                />
              </Grid> */}
  
              {/* <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid> */}
  
              {/* <Grid item xs={12} md={3}>
                <Autocomplete
                  options={exportList}
                  value={getAutoCompleteValue(exportList, exportInfo.template)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onExportAutoCompleteChange(value, 'template')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.exportTemplate)}
                    />
                  )}
                />
              </Grid> */}
  
              {/* <Grid item xs={12} md={4}>
                <FormGroup>
                  <FormControlLabel 
                    control={
                      <Checkbox  
                        onChange={(e) =>{
                          setFormInfo((prev) => ({
                            ...prev,
                            exportSectionAndCode: e.target.checked,
                          }))
                        }}
                      />
                  } 
                    label={intl.formatMessage(messages.exportSectionAndCode)} />
                </FormGroup>
              </Grid> */}
  

              <Grid item xs={12}>
                <Stack spacing={2} direction='row'>
                  <Button variant='contained' color='primary' type='submit'>
                    {intl.formatMessage(payrollMessages.search)}
                  </Button>
  
                  {/* <Button
                    variant='contained'
                    color='primary'
                    onClick={onExportBtnClick}
                  >
                    {intl.formatMessage(messages.export)}
                  </Button> */}
  
                </Stack>
              </Grid>
            </Grid>
          </form>
        </PapperBlock>
  
        <PayrollTable title='' data={tableData} columns={columns} filterHighlights={filterHighlights} />
      </PayRollLoaderInForms>
    );
  }
  
  WBSReport.propTypes = {
    intl: PropTypes.object.isRequired,
  };
  
  export default injectIntl(WBSReport);
  