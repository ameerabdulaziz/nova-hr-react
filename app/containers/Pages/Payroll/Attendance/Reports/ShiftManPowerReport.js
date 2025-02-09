import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import { Button, Grid, Autocomplete, TextField } from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { toast } from "react-hot-toast";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import {
  formateDate,
  getAutoCompleteValue,
  getCheckboxIcon,
} from "../../helpers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function ShiftManPowerReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [ShiftList, setShiftList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [Shift, setShift] = useState("");
  const [organization, setorganization] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [DateError, setDateError] = useState({});
  const [search, setSearch] = useState(1);

  const handleSearch = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    if (date) {
      try {
        setIsLoading(true);
        setSearch(1);
        let formData = {
          OrganizationId: organization,
          ShiftId: Shift,
          Date: formateDate(date),
        };
        Object.keys(formData).forEach((key) => {
          formData[key] = formData[key] === null ? "" : formData[key];
        });

        const dataApi = await ApiData(locale).getAttByDate(formData);
        setdata(dataApi);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    } else {
      // toast.error("You must to choose Date and shift");
      toast.error(intl.formatMessage(messages.dateAndShiftErrMes));
    }
  };
  const handleTotalSearch = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }
    if (date) {
      try {
        setIsLoading(true);
        setSearch(2);
        let formData = {
          OrganizationId: organization,
          ShiftId: Shift,
          Date: formateDate(date),
        };
        Object.keys(formData).forEach((key) => {
          formData[key] = formData[key] === null ? "" : formData[key];
        });

        const dataApi = await ApiData(locale).getShiftManPower(formData);
        setdata(dataApi);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    } else {
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

  const Totalcolumns = [
    {
      name: "shiftId",
      label: intl.formatMessage(messages.shiftCode),
    },
    {
      name: "shiftName",
      label: intl.formatMessage(messages.shift),
    },
    {
      name: "organizationId",
      label: intl.formatMessage(messages.orgid),
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
    },
    {
      name: "planedAtt",
      label: intl.formatMessage(messages.planedAtt),
    },
    {
      name: "actualAtt",
      label: intl.formatMessage(messages.actualAtt),
    },
  ];
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
      name: "shiftCode",
      label: intl.formatMessage(messages.shiftCode),
    },
    {
      name: "shiftName",
      label: intl.formatMessage(messages.shift),
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
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4.5} xl={3.5}>
            <Autocomplete
              id="organizationId"
              options={organizationList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setorganization(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="OrganizationId"
                  label={intl.formatMessage(Payrollmessages.organizationName)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={5} lg={3.5} xl={2.5}>
            <Autocomplete
              id="shift"
              name="shift"
              options={ShiftList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setShift(value == null ? "" : value.id == null ? "" : value.id);
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

          <Grid item xs={6} md={3} lg={2.5} xl={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={intl.formatMessage(Payrollmessages.date)}
                value={date ? dayjs(date) : date}
                className={classes.field}
                onChange={(date) => {
                  setDate(date);
                }}
                onError={(error, value) => {
                  if (error !== null) {
                    setDateError((prevState) => ({
                      ...prevState,
                      [`date`]: true,
                    }));
                  } else {
                    setDateError((prevState) => ({
                      ...prevState,
                      [`date`]: false,
                    }));
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} >
            <Grid container spacing={3}>
          <Grid item >
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...messages.detailsSearch} />
            </Button>
          </Grid>
          <Grid item >
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleTotalSearch}
            >
              <FormattedMessage {...messages.totalSearch} />
            </Button>
          </Grid>
            </Grid>
          </Grid>


          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={data}
        columns={search == 1 ? columns : Totalcolumns}
      />
    </PayRollLoaderInForms>
  );
}

ShiftManPowerReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(ShiftManPowerReport);
