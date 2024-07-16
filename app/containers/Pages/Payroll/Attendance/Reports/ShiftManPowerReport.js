import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";
import { formateDate, getAutoCompleteValue, getCheckboxIcon } from '../../helpers';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function ShiftManPowerReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [ShiftList, setShiftList] = useState([]);
  const [Shift, setShift] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    OrganizationId: ""
  });
  const [date, setDate] = useState(null);

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const selectedShift = getAutoCompleteValue(ShiftList, Shift);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.organizationName),
        value: organization.name,
      });
    }

    if (selectedShift) {
      highlights.push({
        label: intl.formatMessage(messages.shift),
        value: selectedShift.name,
      });
    }

    if (date) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.date),
        value: formateDate(date),
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

     // used to stop call api if user select wrong date
     if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

      if(Shift.length !== 0 && date )
      {
        try {
          setIsLoading(true);
          let formData = {
            OrganizationId: searchData.OrganizationId,
            ShiftId:  Shift,
            Date: formateDate(date)
              };
          Object.keys(formData).forEach((key) => {
            formData[key] = formData[key] === null ? "" : formData[key];
          });

          const dataApi = await ApiData(locale).ShiftManPowerReportApi(formData);
          setdata(dataApi);

        getFilterHighlights();
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
    }
    else
    {
      // toast.error("You must to choose Date and shift");
      toast.error(intl.formatMessage(messages.dateAndShiftErrMes));
    }
  };

  async function fetchData() {
    try {
      const shift = await GeneralListApis(locale).GetShiftList();

      setShiftList(shift);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
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
        print: false,
        download: false,
      },
    },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
    },
    {
      name: "jobName",
      label: intl.formatMessage(messages.job),
    },
    {
      name: "isAttend",
      label: intl.formatMessage(messages.attend),
      options: {
        filter: false,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },    
  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               DateError={DateError}
              setDateError={setDateError}
              notShowCompany={true}
              notShowEmployeeName={true}
              notShowStatus={true}
              notShowDate={true}
            ></Search>
          </Grid>

          <Grid item xs={12} md={3}>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                 label={intl.formatMessage(Payrollmessages.date)}
                  value={date  ? dayjs(date) : date}
                  className={classes.field}
                    onChange={(date) => {
                      setDate(date)
                  }}
                  onError={(error,value)=>{
                    if(error !== null)
                    {
                      setDateError((prevState) => ({
                        ...prevState,
                          [`date`]: true
                      }))
                    }
                    else
                    {
                      setDateError((prevState) => ({
                        ...prevState,
                          [`date`]: false
                      }))
                    }
                  }}
                  />
              </LocalizationProvider>
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

        <PayrollTable
          title=""
          data={data}
          columns={columns}
          filterHighlights={filterHighlights}
        />
    </PayRollLoader>
  );
}

ShiftManPowerReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(ShiftManPowerReport);
