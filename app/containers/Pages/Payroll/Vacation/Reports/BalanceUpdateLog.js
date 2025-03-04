import { Button, Grid } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import { formateDate, getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import API from '../api/BalanceUpdateLogData';
import messages from '../messages';
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function BalanceUpdateLog(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = localStorage.getItem('MenuName');

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: '',
    OrganizationId: '',
    EmpStatusId: 1,
    BranchId: branchId,
  });

   const [printFilterData, setPrintFilterData] = useState({
      FromDate: null,
      ToDate: null,
      Employee: '',
      EmpStatus: "",
      Organization: '',
      Branch: "",
    });

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [dateError, setDateError] = useState({});

  const getFilterHighlights = () => {
    const highlights = [];


    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.Organization),
        value: printFilterData.Organization.name,
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
        label: intl.formatMessage(messages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.company),
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

    setFilterHighlights(highlights);
  };

  const columns = [
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
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
      name: 'vacationName',
      label: intl.formatMessage(messages.vacationName),
    },
    {
      name: 'days',
      label: intl.formatMessage(messages.daysCount),
    },
    {
      name: 'trxDate',
      label: intl.formatMessage(messages.fromDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.fromDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: 'tRxDesc',
      label: intl.formatMessage(messages.description),
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
      name: 'vacBalance',
      label: intl.formatMessage(messages.Balance),
    },
    {
      name: 'oldbalance',
      label: intl.formatMessage(messages.oldBalance),
    },
    {
      name: 'notes',
      label: intl.formatMessage(messages.modificationReason),
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
  ];

  const fetchTableData = async () => {
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

      const dataApi = await API(locale).GetReport(formData);

      setTableData(dataApi);

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    try {
      setIsLoading(true);

      await fetchTableData();
    } catch (error) {
      setIsLoading(false);
    } finally {
      //
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onSearchBtnClick = () => {
    fetchTableData();
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

      setPrintFilterData((prev)=>({
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

      setPrintFilterData((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[formInfo.BranchId, formInfo.EmployeeId])

  

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={9} xl={7}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              DateError={dateError}
              setDateError={setDateError}
              company={formInfo.BranchId}
              setPrintFilterData={setPrintFilterData}
            />
          </Grid>

          <Grid item xs={12}></Grid>

          <Grid item >
            <Button
              variant='contained'
              color='primary'
              onClick={onSearchBtnClick}
            >
              {intl.formatMessage(messages.search)}
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        isLoading={isLoading}
        showLoader
        title=''
        data={tableData}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoaderInForms>
  );
}

BalanceUpdateLog.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(BalanceUpdateLog);
