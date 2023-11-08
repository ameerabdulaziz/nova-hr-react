import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../api/GeneralListApis";

function AttendanceRatioReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [FromDate, setFromDate] = useState(null);
  const [Shift, setShift] = useState("");
  const [ShiftList, setShiftList] = useState([]);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });



  const handleSearch = async (e) => {

    if(FromDate !== null )
    {

    try {
      setIsLoading(true);
      let formData = {
        FromDate: FromDate,
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        shiftcode: Shift,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).AttendanceRatioReport(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }

  }
  else
  {
      toast.error(intl.formatMessage(messages.fromDateErrorMes));
  }
  };

  async function fetchData() {
    try {
      const shift = await GeneralListApis(locale).GetShiftList();

      setShiftList(shift);

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
        label: intl.formatMessage(Payrollmessages.id),
      options: {
        display: false,
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
      options: {
        filter: true,
      },
    },
    {
        name: "totalEmp",
        label: intl.formatMessage(messages.totalWorking),
        options: {
          filter: true,
        },
      },
      {
        name: "workingEmp",
        label: intl.formatMessage(messages.currentAttendance),
        options: {
          filter: true,
        },
      },
    {
      name: "diff",
      label: intl.formatMessage(messages.diff),
      options: {
        filter: true,
      },
    },

  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    selectableRows: "none",
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };



  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>

        <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(Payrollmessages.fromdate)}
                value={FromDate}
                onChange={(date) => {
                  if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                    if (!isNaN(new Date(date))) { 
                      setFromDate(  date === null ? null : format(new Date(date), "yyyy-MM-dd"),)
                    } 
                  } 
                }}
                className={classes.field}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined"   />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={10}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               notShowDate={true}
            ></Search>
          </Grid>

          <Grid item xs={12} md={2}>
            <Autocomplete
              id="shift"
              name="shift"
              options={ShiftList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setShift(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="shift"
                  label={intl.formatMessage(messages.shift)}
                />
              )}
            />
          </Grid>

          
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>

    </PayRollLoader>
  );
}

AttendanceRatioReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AttendanceRatioReport);
