import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import messages from "./messages";
import payrollMessages from "../messages";
import GeneralListApis from "../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../Component/Search";
import ApiData from "./api/LogReportData";
import PayRollLoaderInForms from "../Component/PayRollLoaderInForms";
import { toast } from "react-hot-toast";
import SimplifiedPayrollTable from "../Component/SimplifiedPayrollTable";
import { formateDate, getAutoCompleteValue } from "../helpers";

function LogReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName"); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    UserId: "",
  });


  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const user = getAutoCompleteValue(usersList, searchData.UserId);


    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (user) {
        highlights.push({
          // label: "user Name",
          label: intl.formatMessage(messages.username),
          value: user.name,
        });
      }

    if (searchData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(searchData.FromDate),
      });
    }

    if (searchData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(searchData.ToDate),
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
    
    if(searchData.UserId !== "")
    {

        try {
        setIsLoading(true);

        let formData = {
            FromDate: formateDate(searchData.FromDate),
            ToDate: formateDate(searchData.ToDate),
            EmployeeId: searchData.EmployeeId,
            UserId: searchData.UserId,
        };
        Object.keys(formData).forEach((key) => {
            formData[key] = formData[key] === null ? "" : formData[key];
        });
        
        const dataApi = await ApiData(locale).LogReport(formData);

        setdata(dataApi);

        getFilterHighlights();
        } catch (err) {
        } finally {
        setIsLoading(false);
        }
    }
    else
    {
        toast.error(intl.formatMessage(messages.filterMess));
    }
  };

  async function fetchData() {
    try {

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const users = await GeneralListApis(locale).GetEmployeeList();
      setUsersList(users);

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
      options: {
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "userId",
      label: intl.formatMessage(messages.userId),
    },
    {
      name: "userName",
      label: intl.formatMessage(messages.username),
    },
    {
        name: "employeeId",
        label: intl.formatMessage(payrollMessages.employeeCode),
    },
    {
        name: "employeeName",
        label: intl.formatMessage(messages.employeeName),
    },
    {
      name: "trxDate",
      label: intl.formatMessage(payrollMessages.date),
    },
    {
        name: "action",
        label: intl.formatMessage(messages.Action),
    },
  ];

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <Grid container spacing={2}>
          <Grid item xs={12}  md={4} xl={3}> 
            <Autocomplete
              id="usersList"
              options={usersList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                  setsearchData((prevFilters) => ({
                      ...prevFilters,
                      UserId: value === null ? "" : value.id ,
                    }))
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="users"
                  required
                  label={intl.formatMessage(messages.username)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={8}  xl={7}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={DateError}
              setDateError={setDateError}
              notShowCompany={true}
              notShowOrganization={true}
              notShowStatus={true}
            ></Search>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

        <SimplifiedPayrollTable
          title=""
          data={data}
          columns={columns}
          filterHighlights={filterHighlights}
        />
    </PayRollLoaderInForms>
  );
}

LogReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(LogReport);
