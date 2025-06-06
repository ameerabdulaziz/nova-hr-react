import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import messages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/ShiftEmployeeData";
import style from "../../../../../../../app/styles/styles.scss";
import Payrollmessages from "../../../messages";
import PayRollLoader from "../../../Component/PayRollLoader";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { formateDate } from "../../../helpers";

function ShiftReview(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [dataList, setdataList] = useState([]);
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState("");
  const [EmployeeList, setEmployeeList] = useState([]);
  const [Organization, setOrganization] = useState("");
  const [OrganizationList, setOrganizationList] = useState([]);
  const [ShiftsList, setShiftsList] = useState([]);
  const [ShiftId, setShiftId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [DateError, setDateError] = useState({});


    // used to reformat date before send it to api
    const dateFormatFun = (date) => {
      return  date ? format(new Date(date), "yyyy-MM-dd") : ""
    }


  async function handleUpdate(selectedRows) {
    try {
      setIsLoading(true);
      let response = await ApiData(locale).ChangeShift(
        dataList[selectedRows.data[0].dataIndex].employeeId,
        ShiftId,
        dataList[selectedRows.data[0].dataIndex].shiftDate
      );
      if (response.status == 200) {
        toast.success(notif.saved);
        setShiftId("");
        handleSearch();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function Getookup() {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
      const shifts = await GeneralListApis(locale).GetShiftList();

      setShiftsList(shifts);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Getookup();
  }, []);

  const handleSearch = async (e) => {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) { 
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    if(fromdate && todate === null)
    {
      toast.error(intl.formatMessage(Payrollmessages.toDateErrMess));
      return;
    }

    try {
      setIsLoading(true);
      const dataApi = await ApiData(locale).GetEmpAttendance(
        dateFormatFun(fromdate),
        dateFormatFun(todate),
        employee,
        Organization,"",""
      );
      setdataList(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const CheckBox = (value) => {
    return (
      <div className={style.actionsSty}>
        {value ? (
          <CheckIcon style={{ color: "#3f51b5" }} />
        ) : (
          <CloseIcon style={{ color: "#717171" }} />
        )}
      </div>
    );
  };

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        customBodyRender: (value) => <pre>{value}</pre>,
      },
    },
    {
      name: "weekDayName",
      label: intl.formatMessage(Payrollmessages["weekDayName"]),
      options: {
        filter: false,
        customBodyRender: (value) => <pre>{value}</pre>,
      },
    },
    {
      name: "shiftDate",
      label: intl.formatMessage(Payrollmessages["date"]),
      options: {
        filter: false,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
      },
    },
    {
      name: "employeeName",
      label: intl.formatMessage(Payrollmessages["employeeName"]),
      options: {
        filter: true,
      },
    },
    /* {
      name: "shiftCode",
      label: intl.formatMessage(messages["shiftId"]),
      options: {
        filter: true,
      },
    }, */

    {
      name: "shiftName",
      label: intl.formatMessage(messages["shiftName"]),
      options: {
        filter: true,
      },
    },

    {
      name: "timeIn",
      label: intl.formatMessage(messages["timeIn"]),
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{formateDate(value, 'yyyy-MM-dd hh:mm:ss a')}</pre>),
      },
    },
    {
      name: "timeOut",
      label: intl.formatMessage(messages["timeOut"]),
      options: {
        customBodyRender: (value) => (<pre>{formateDate(value, 'yyyy-MM-dd hh:mm:ss a')}</pre>),
        filter: true,
      },
    },
    {
      name: "lateMin",
      label: intl.formatMessage(messages["lateMin"]),
      options: {
        filter: true,
      },
    },
    {
      name: "extraTime",
      label: intl.formatMessage(messages["extraTime"]),
      options: {
        filter: true,
      },
    },
    {
      name: "lessTime",
      label: intl.formatMessage(messages["lessTime"]),
      options: {
        filter: true,
      },
    },
    {
      name: "breakTime",
      label: intl.formatMessage(messages["breakTime"]),
      options: {
        filter: true,
      },
    },
    {
      name: "vac",
      label: intl.formatMessage(messages["vac"]),
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },

    {
      name: "mission",
      label: intl.formatMessage(messages["mission"]),
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "per",
      label: intl.formatMessage(messages["per"]),

      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "shiftVacancy",
      label: intl.formatMessage(messages["shiftVacancy"]),
      options: {
        filter: true,
      },
    },
    {
      name: "absence",
      label: intl.formatMessage(messages["absence"]),
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selection: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    selectableRows: "single",
    //textRowsSelected: false,
    //selectToolbarPlacement:'none',
    // onRowsSelect: (curRowSelected, allRowsSelected) => {
    //   //alert(allRowsSelected.length);
    // },
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <></>
    ),

    customToolbarSelect: (selectedRows) => (
      <div style={{ width: "80%" }}>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="shiftId"
              options={ShiftsList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              value={
                ShiftId ? ShiftsList.find((item) => item.id === ShiftId) : null
              }
              onChange={(event, value) => {
                setShiftId(value !== null ? value.id : 0);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="shiftId"
                  required
                  label={intl.formatMessage(messages.shiftName)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className="mr-6"
              onClick={() => handleUpdate(selectedRows)}
            >
              <FormattedMessage {...Payrollmessages.apply} />
            </Button>
          </Grid>
        </Grid>
      </div>
    ),
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
      
        <Grid container spacing={3} alignItems="flex-start" direction="row">
          <Grid item xs={12} md={12}>
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                >
                 
                  <Grid item xs={6} md={3} lg={2} xl={1.5}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(Payrollmessages.fromdate)}
                        value={fromdate ? dayjs(fromdate) : fromdate}
                        className={classes.field}
                          onChange={(date) => {
                            setfromate(date);
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`fromdate`]: true
                            }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`fromdate`]: false
                            }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

                <Grid item xs={6} md={3} lg={2} xl={1.5}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                      label={intl.formatMessage(Payrollmessages.todate)}
                      value={todate  ? dayjs(todate) : todate}
                      className={classes.field}
                        onChange={(date) => {
                          settodate(date);
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`todate`]: true
                          }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`todate`]: false
                          }))
                        }
                      }}s
                      />
                  </LocalizationProvider>
                </Grid>

                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Autocomplete
                      id="OrganizationId"
                      options={OrganizationList}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, value) => {
                        setOrganization(value == null ? "" : value.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="OrganizationId"
                          label={intl.formatMessage(
                            Payrollmessages.organizationName
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Autocomplete
                      id="employeeId"
                      options={EmployeeList}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, value) => {
                        setemployee(value == null ? "" : value.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="employeeId"
                          label={intl.formatMessage(
                            Payrollmessages.employeeName
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      onClick={handleSearch}
                    >
                      <FormattedMessage {...Payrollmessages.search} />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PapperBlock>
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={dataList}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}
ShiftReview.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ShiftReview);
