import React, { useEffect, useState, useCallback } from "react";
import ApiData from "../api/EmployeeReportsApiData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";

import { toast } from 'react-hot-toast';
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function followStaffContracts(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
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


  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);


  const getFilterHighlights = () => {
    const highlights = [];

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
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
        label: intl.formatMessage(payrollMessages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
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

 

  const handleSearch = async (e) => {

     // used to stop call api if user select wrong date
     if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);
      var formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmpStatusId: searchData.EmpStatusId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).GetReport(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

 

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.organization),
      options: {
        filter: true,
      },
    },

    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
      options: {
        filter: true,
      },
    },

    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },
    {
      name: "contractStartDate",
      label: intl.formatMessage(messages.contractStartDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.contractStartDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: "contractEndDate",
      label: intl.formatMessage(messages.contractEndDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.contractEndDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
  ];


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

      
      setSearchData((prev)=>({
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
    if(searchData.BranchId !== "" && searchData.EmployeeId === "")
    {      
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId !== "")
    {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId === "")
    {
      setSearchData((prev)=>({
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

  },[searchData.BranchId, searchData.EmployeeId])

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <Grid container spacing={2}>
          <Grid item xs={12} md={10} lg={9} xl={7.5}>
            <Search
               setsearchData={setSearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               DateError={DateError}
              setDateError={setDateError}
              company={searchData.BranchId}
              setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>
    

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={data}
        filterHighlights={filterHighlights}
        columns={columns}
      />

    </PayRollLoaderInForms>
  );
}

followStaffContracts.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(followStaffContracts);
