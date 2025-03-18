import React, { useEffect, useState, useCallback } from "react";
import ApiData from "../api/PenaltyTransData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete
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
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function PenaltyTransReport(props) {
  const { intl } = props;
  const location = useLocation();
  const { StatusId , IsSubmitted, IsDeleted, todayDateKey } = location.state ?? 0;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [Penalty, setPenalty] = useState("");
  const [PenaltyList, setPenaltyList] = useState([]);
  const [Status, setStatus] = useState("");
  const [Deleted, setDeleted] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
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

  const deleteList = [
    { id: null, name: "All" },
    { id: true, name: "Deleted" },
    { id: false, name: "Not Deleted" },
  ];

  const penaltyStatusList = [
    { id: null, name: "All" },
    { id: 1, name: "Pending" },
    { id: 2, name: "Approved" },
    { id: 3, name: "Rejected" },
  ];

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const penalty = getAutoCompleteValue(PenaltyList, Penalty);
    const rewordStatus = getAutoCompleteValue(penaltyStatusList, Status);
    const deleted = getAutoCompleteValue(deleteList, Deleted);

    if (deleted) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.delete),
        value: deleted.name,
      });
    }

    if (rewordStatus) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: rewordStatus.name,
      });
    }

    if (penalty) {
      highlights.push({
        label: intl.formatMessage(messages.penaltyName),
        value: penalty.name,
      });
    }

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
        PenaltyId: Penalty,
        StatusId: Status,
        IsDeleted: Deleted,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
      };

      // used if i redirect from dashboard page
      if(StatusId && IsSubmitted && IsDeleted === false)
        {
          formData.StatusId = StatusId
          formData.IsSubmitted = IsSubmitted
          formData.IsDeleted = IsDeleted
        }

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

  async function fetchData() {
    try {
      const penalties = await GeneralListApis(locale).GetPenaltyList(locale);
      setPenaltyList(penalties);

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
      label: intl.formatMessage(payrollMessages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: "date",
      label: intl.formatMessage(messages.date),
      options: getDateColumnOptions(
        intl.formatMessage(messages.date),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: "yearName",
      label: intl.formatMessage(messages.yearName),
      options: {
        filter: true,
      },
    },
    {
      name: "monthName",
      label: intl.formatMessage(messages.monthName),
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
      name: "superEmployeeName",
      label: intl.formatMessage(messages.superEmployeeName),
      options: {
        filter: true,
      },
    },
    {
      name: "penaltyName",
      label: intl.formatMessage(messages.penaltyName),
      options: {
        filter: true,
      },
    },
    {
      name: "elementName",
      label: intl.formatMessage(messages.elementName),
      options: {
        filter: true,
      },
    },
    {
      name: "value",
      label: intl.formatMessage(messages.value),
      options: {
        filter: true,
      },
    },
    {
      name: "note",
      label: intl.formatMessage(messages.note),
      options: {
        customBodyRender: (value) => (value ? <div style={{ maxWidth: '200px', width: 'max-content' }}>{value}</div> : '')
      },
    },
    {
      name: "step",
      label: intl.formatMessage(payrollMessages.step),
      options: {
        filter: true,
      },
    },
    {
      name: "status",
      label: intl.formatMessage(payrollMessages.status),
      options: {
        filter: true,
      },
    },
    {
      name: "approvedEmp",
      label: intl.formatMessage(payrollMessages.approvedEmp),
      options: {
        filter: true,
      },
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

      
      setsearchData((prev)=>({
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
     // used if i redirect from dashboard page
     if(todayDateKey)
     {
      setsearchData((prev)=>({
        ...prev,
        FromDate: new Date(),
        ToDate: new Date(),
      }))

      setPrintFilterData((prev)=>({
        ...prev,
        FromDate: new Date(),
        ToDate: new Date(),
      }))
     }
     else
     {
       if(searchData.BranchId !== "" && searchData.EmployeeId === "")
       {      
         openMonthDateWithCompanyChangeFun(searchData.BranchId)
       }
   
       if(searchData.BranchId === "" && searchData.EmployeeId !== "")
       {
         openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
       }
     }

    if(searchData.BranchId === "" && searchData.EmployeeId === "")
    {
      setsearchData((prev)=>({
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

  },[searchData.BranchId, searchData.EmployeeId,todayDateKey])

  

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={11} lg={9} xl={7}>
          <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={DateError}
              setDateError={setDateError}
              company={searchData.BranchId}
              setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>
          <Grid item xs={6} md={4} lg={3} xl={3}>
            <Autocomplete
              id="PenaltyId"
              options={PenaltyList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setPenalty(value == null ? null : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="PenaltyId"
                  required
                  label={intl.formatMessage(messages.penaltyName)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={4} lg={4.5} xl={2}>
            <Autocomplete
              id="StatusList"
              options={penaltyStatusList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) =>
                setStatus(
                  value === null ? "" : value.id == null ? "" : value.id
                )
              }
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="StatusList"
                  label={intl.formatMessage(payrollMessages.status)}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3} xl={2.5}>
            <Autocomplete
              id="DeleteList"
              options={deleteList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setDeleted(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="DeleteList"
                  label={intl.formatMessage(payrollMessages.delete)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2} lg={1.5}>
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

PenaltyTransReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(PenaltyTransReport);
