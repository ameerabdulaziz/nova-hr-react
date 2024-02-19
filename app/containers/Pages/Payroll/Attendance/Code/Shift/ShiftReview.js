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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/ShiftEmployeeData";
import style from "../../../../../../../app/styles/styles.scss";
import Payrollmessages from "../../../messages";
import PayRollLoader from "../../../Component/PayRollLoader";

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
    try {
      setIsLoading(true);
      const dataApi = await ApiData(locale).GetEmpAttendance(
        fromdate,
        todate,
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
      },
    },
    {
      name: "weekDayName",
      label: <FormattedMessage {...Payrollmessages["weekDayName"]} />,
      options: {
        filter: false,
      },
    },
    {
      name: "shiftDate",
      label: <FormattedMessage {...Payrollmessages["date"]} />,
      options: {
        filter: false,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
      },
    },
    {
      name: "employeeName",
      label: <FormattedMessage {...Payrollmessages["employeeName"]} />,
      options: {
        filter: true,
      },
    },
    /* {
      name: "shiftCode",
      label: <FormattedMessage {...messages["shiftId"]} />,
      options: {
        filter: true,
      },
    }, */

    {
      name: "shiftName",
      label: <FormattedMessage {...messages["shiftName"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "timeIn",
      label: <FormattedMessage {...messages["timeIn"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "timeOut",
      label: <FormattedMessage {...messages["timeOut"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "lateMin",
      label: <FormattedMessage {...messages["lateMin"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "extraTime",
      label: <FormattedMessage {...messages["extraTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "lessTime",
      label: <FormattedMessage {...messages["lessTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "breakTime",
      label: <FormattedMessage {...messages["breakTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "vac",
      label: <FormattedMessage {...messages["vac"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },

    {
      name: "mission",
      label: <FormattedMessage {...messages["mission"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "per",
      label: <FormattedMessage {...messages["per"]} />,

      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "shiftVacancy",
      label: <FormattedMessage {...messages["shiftVacancy"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "absence",
      label: <FormattedMessage {...messages["absence"]} />,
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
    onRowsSelect: (curRowSelected, allRowsSelected) => {
      //alert(allRowsSelected.length);
    },
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
                  <Grid item xs={12} md={2}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label={intl.formatMessage(Payrollmessages.fromdate)}
                        value={fromdate}
                        onChange={(date) => {
                          if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                            if (!isNaN(new Date(date))) { 
                              setfromate(
                                date === null
                                  ? null
                                  : format(new Date(date), "yyyy-MM-dd")
                              );
                            }
                            else
                            {
                              setfromate(null);
                            }
                          }
                        }}
                        className={classes.field}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label={intl.formatMessage(Payrollmessages.todate)}
                        value={todate}
                        onChange={(date) => {
                          if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                            if (!isNaN(new Date(date))) { 
                            settodate(
                              date === null
                                ? null
                                : format(new Date(date), "yyyy-MM-dd")
                            );
                            }
                            else
                            {
                              settodate(null)
                            }
                          }
                        }}
                        className={classes.field}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                  <Grid item xs={12} md={3}>
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
