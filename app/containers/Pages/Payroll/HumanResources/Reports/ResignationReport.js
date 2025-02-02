import { Print } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PayRollLoader from '../../Component/PayRollLoader';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/ResignationReportData';
import PrintableRow from '../components/ResignationReport/PrintableRow';
import messages from '../messages';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function ResignationReport(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [actionStatusList, setActionStatusList] = useState([]);
  const [resignList, setResignList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dateError, setDateError] = useState({});

  const [printRow, setPrintRow] = useState(null);
  const documentTitle = pageTitle + ' ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  const printDivRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,
    BranchId: branchId,
    statusId: null,
    resignReasonId: null,
  });

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    documentTitle,
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

  const onPrintBtnClick = async (id) => {
    setIsLoading(true);

    try {
      const response = await api(locale).print(id);
      setPrintRow(response);

      // TODO: Mohammed-Taysser - refactor it
      setTimeout(() => {
        printJS();
      }, 1);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      formInfo.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, formInfo.EmployeeId);
    const status = getAutoCompleteValue(statusList, formInfo.EmpStatusId);
    const company = getAutoCompleteValue(companyList, formInfo.BranchId);
    const resignReason = getAutoCompleteValue(
      resignList,
      formInfo.resignReasonId
    );
    const actionStatus = getAutoCompleteValue(
      actionStatusList,
      formInfo.statusId
    );

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (status) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (formInfo.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(formInfo.FromDate),
      });
    }

    if (resignReason) {
      highlights.push({
        label: intl.formatMessage(messages.resignReasonName),
        value: resignReason.name,
      });
    }

    if (actionStatus) {
      highlights.push({
        label: intl.formatMessage(messages.status),
        value: actionStatus.name,
      });
    }

    if (formInfo.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(formInfo.ToDate),
      });
    }

    setFilterHighlights(highlights);
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);

      const formData = {
        ...formInfo,
        FromDate: formateDate(formInfo.FromDate),
        ToDate: formateDate(formInfo.ToDate),
      };

      const dataApi = await api(locale).GetReport(formData);

      setTableData(dataApi);

      getFilterHighlights();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    setIsLoading(true);

    try {
      const actionStatus = await GeneralListApis(locale).GetActionByDocList(9);
      setActionStatusList(actionStatus);

      const resigns = await GeneralListApis(locale).GetResignReasonList();
      setResignList(resigns);

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
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
      label: intl.formatMessage(payrollMessages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },

    {
      name: 'date',
      label: intl.formatMessage(messages.resignationDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.resignationDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'lworkingDay',
      label: intl.formatMessage(messages.lastWorkingDay),
      options: {
        customBodyRender: (value) => formateDate(value),
      },
    },

    {
      name: 'resignReasonName',
      label: intl.formatMessage(messages.reason),
      options: {
        customBodyRender: (value) => (value ? (
          <div style={{ maxWidth: '200px', width: 'max-content' }}>
            {value}
          </div>
        ) : (
          ''
        )),
      },
    },

    {
      name: 'statusName',
      label: intl.formatMessage(payrollMessages.status),
    },

    {
      name: 'print',
      label: intl.formatMessage(payrollMessages.Print),
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (_, tableMeta) => (
          <IconButton onClick={() => onPrintBtnClick(tableMeta.rowData[0])}>
            <Print sx={{ fontSize: '1.2rem' }} />
          </IconButton>
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


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(!EmployeeId)
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
      }
      else
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
      }

      
      setFormInfo((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if(formInfo.BranchId !== "" && formInfo.EmployeeId === "")
    {      
      openMonthDateWithCompanyChangeFun(formInfo.BranchId)
    }

    if(formInfo.BranchId === "" && formInfo.EmployeeId !== "")
    {
      openMonthDateWithCompanyChangeFun(0, formInfo.EmployeeId)
    }

    if(formInfo.BranchId === "" && formInfo.EmployeeId === "")
    {
      setFormInfo((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[formInfo.BranchId, formInfo.EmployeeId])

  return (
    <PayRollLoader isLoading={isLoading}>
      <Box
        ref={printDivRef}
        sx={{
          display: 'none',
          '@media print': {
            display: 'block',
          },
          '@page': {
            margin: 4,
          },
        }}
      >
        {printRow && <PrintableRow rowData={printRow} />}
      </Box>

      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Search
                setsearchData={setFormInfo}
                searchData={formInfo}
                setIsLoading={setIsLoading}
                DateError={dateError}
                setDateError={setDateError}
                company={formInfo.BranchId}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={actionStatusList}
                value={getAutoCompleteValue(
                  actionStatusList,
                  formInfo.statusId
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'statusId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.status)}
                  />
                )}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={resignList}
                value={getAutoCompleteValue(
                  resignList,
                  formInfo.resignReasonId
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'resignReasonId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.resignReasonName)}
                  />
                )}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
            </Grid>

            <Grid item>
              <Button variant='contained' color='primary' type='submit'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=''
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoader>
  );
}

ResignationReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ResignationReport);
