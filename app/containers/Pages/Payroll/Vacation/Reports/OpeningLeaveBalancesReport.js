import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import GeneralListApis from '../../api/GeneralListApis';
import { getAutoCompleteValue } from '../../helpers';
import API from '../api/OpeningLeaveBalancesData';
import messages from '../messages';

function OpeningLeaveBalancesReport(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [tableData, setTableData] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Title = localStorage.getItem('MenuName');

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: '',
    OrganizationId: '',
    yearId: null,
    EmpStatusId: '',
    BranchId: branchId,
  });

    const [printFilterData, setPrintFilterData] = useState({
      Employee: '',
      EmpStatus: "",
      Organization: '',
      Branch: "",
      Year: null,
    });

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
      name: 'vacBalance',
      label: intl.formatMessage(messages.Balance),
    },
    {
      name: 'postedBal',
      label: intl.formatMessage(messages.postedBalance),
    },
  ];

  const getFilterHighlights = () => {
    const highlights = [];

    if (printFilterData.Year && printFilterData.Year.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: printFilterData.Year.name,
      });
    }

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

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    try {
      setIsLoading(true);

      const dataApi = await API(locale).GetReport(formInfo);

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

      const yearResponse = await GeneralListApis(locale).GetYears();
      setYearsList(yearResponse);


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
    let selectedYear

    try
    {
      if(yearsList.length !== 0)
      {
        if(!EmployeeId)
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
        }
        else
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
        }

        selectedYear = yearsList.find(item => item.id == OpenMonthData.yearId)
        
          setFormInfo((prev) => ({
            ...prev,
            yearId: selectedYear ? selectedYear.id : null,
          }));

          setPrintFilterData((prev)=>({
            ...prev,
            Year: selectedYear ? selectedYear : null,
          }))

      }
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if((formInfo.BranchId || formInfo.BranchId !== "") && (!formInfo.EmployeeId ||formInfo.EmployeeId === ""))
    {      
      openMonthDateWithCompanyChangeFun(formInfo.BranchId)
    }

    if((!formInfo.BranchId || formInfo.BranchId === "") && (formInfo.EmployeeId  || formInfo.EmployeeId !== ""))
    {
      openMonthDateWithCompanyChangeFun(0, formInfo.EmployeeId)
    }

    if((!formInfo.BranchId || formInfo.BranchId === "") && (!formInfo.EmployeeId || formInfo.EmployeeId === ""))
    {

      setFormInfo((prev) => ({
        ...prev,
        yearId: null,
      }));

      setPrintFilterData((prev)=>({
        ...prev,
        Year: null,
      }))
    }

  },[formInfo.BranchId, formInfo.EmployeeId,yearsList])


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={9} xl={6}>
            <Search
              setsearchData={setFormInfo}
              searchData={formInfo}
              setIsLoading={setIsLoading}
              notShowDate={true}
              company={formInfo.BranchId}
              setPrintFilterData={setPrintFilterData}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={2.3} xl={1.5}>
            <Autocomplete
              value={getAutoCompleteValue(yearsList, formInfo.yearId)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              options={yearsList}
              onChange={(_, value) => {
                setFormInfo((prev) => ({
                  ...prev,
                  yearId: value?.id ? value?.id : null,
                }));

                setPrintFilterData((prev)=>({
                  ...prev,
                  Year: value ? value : null,
                }))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.year)}
                />
              )}
            />
          </Grid>

          <Grid item md={2}>
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
        title=''
        data={tableData}
        filterHighlights={filterHighlights}
        columns={columns}
      />
    </PayRollLoaderInForms>
  );
}

OpeningLeaveBalancesReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OpeningLeaveBalancesReport);
