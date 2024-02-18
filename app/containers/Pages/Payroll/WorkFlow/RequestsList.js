import React, { useEffect, useState } from "react";
import ApiData from "./api/WorkFlowData";
import { useSelector } from "react-redux";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import Details from "@mui/icons-material/List";
import Payrollmessages from "../messages";
import missionmessages from "../Attendance/messages";
import hrmessages from "../HumanResources/messages";
import paymessages from "../Payroll/messages";
import vacmessages from "../vacation/messages";

import messages from "./messages";
import style from "../../../../../app/styles/styles.scss";
import IconButton from "@mui/material/IconButton";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import useStyles from "../Style";
import { PapperBlock } from "enl-components";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import GeneralListApis from "../api/GeneralListApis";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { format } from "date-fns";
import PayRollLoader from "../Component/PayRollLoader";
import PayrollTable from "../Component/PayrollTable";
import NotePopup from "./NotePopup";
import WFExecutionList from "./WFExecutionList";
import { useLocation } from "react-router-dom";

function RequestsList(props) {
  debugger;
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [cols, setCols] = useState([]);

  const [Document, setDocument] = useState(
    location.pathname == "/app/Pages/Att/PermissionApproval"
      ? 1
      : location.pathname == "/app/Pages/Att/MissionApproval"
      ? 2
      : location.pathname == "/app/Pages/vac/VacApproval"
      ? 3
      : location.pathname == "/app/Pages/HR/PenaltyApproval"
      ? 4
      : location.pathname == "/app/Pages/HR/RewardsApproval"
      ? 5
      : location.pathname == "/app/Pages/Payroll/LoanApproval"
      ? 7
      : location.pathname == "/app/Pages/HR/UniformApproval"
      ? 8
      : 0
  );
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState(null);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openNotePopup, setopenNotePopup] = useState(false);
  const [openExecutionPoup, setExecutionPoup] = useState(false);
  const [Note, setNote] = useState(false);
  const [ExecutionId, setExecutionId] = useState("");
  const [Action, setAction] = useState("");

  const handleExecutionPoup = (id) => {
    debugger;
    setExecutionId(id);
    setExecutionPoup(true);
  };
  const handleOpenNotePoup = (id, Action) => {
    debugger;
    setopenNotePopup(true);
    setNote("");
    setExecutionId(id);
    setAction(Action);
  };

  const handleCloseNotePoup = () => {
    setopenNotePopup(false);
  };
  const handleCloseExecutionPoup = () => {
    setExecutionPoup(false);
  };

  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      debugger;
      const dataApi = await ApiData(locale).Getrequests(
        Document,
        employee,
        fromdate,
        todate
      );
      setdata(dataApi);
      dataApi.map((item) => setCols(Object.keys(item)));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function RequestAction() {
    try {
      debugger;
      setIsLoading(true);
      let response = await ApiData(locale).ExecuteWorkFlow(
        ExecutionId,
        Action,
        Note
      );

      if (response.status == 200) {
        toast.success(notif.saved);
        handleSearch();
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchData() {
    try {
      /* const Documents = await GeneralListApis(locale).GetDocumentList(locale);
      setDocumentList(Documents);
      setDocument({
        documentId: Documents[0].id,
        documentName: Documents[0].name,
      }); */
      debugger;
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
      var documentId = 0;
      if (location.pathname == "/app/Pages/Att/PermissionApproval")
        documentId = 1;
      else if (location.pathname == "/app/Pages/Att/MissionApproval")
        documentId = 2;
      else if (location.pathname == "/app/Pages/vac/VacApproval")
        documentId = 3;
      else if (location.pathname == "/app/Pages/HR/PenaltyApproval")
        documentId = 4;
      else if (location.pathname == "/app/Pages/HR/RewardsApproval")
        documentId = 5;
      else if (location.pathname == "/app/Pages/Payroll/LoanApproval")
        documentId = 7;
      else if (location.pathname == "/app/Pages/HR/UniformApproval")
        documentId = 8;
      else documentId = 0;

      const dataApi = await ApiData(locale).Getrequests(
        documentId,
        employee,
        fromdate,
        todate
      );
      setdata(dataApi);
      setDocument(documentId);
      if (dataApi && dataApi.length > 0)
        dataApi.map((item) => setCols(Object.keys(item)));
      else setCols([]);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [Title]);

  const columns =
    cols.length !== 0
      ? cols.map((item) => ({
          name: item,
          label:
            Document == 1 || Document == 2 ? (
              <FormattedMessage {...missionmessages[item]} />
            ) : Document == 4 || Document == 5 || Document == 8 ? (
              <FormattedMessage {...hrmessages[item]} />
            ) : Document == 7 ? (
              <FormattedMessage {...paymessages[item]} />
            ) : (
              <FormattedMessage {...vacmessages[item]} />
            ),
          options: {
            filter: true,
          },
        }))
      : [];
  const action = {
    name: "Actions",
    options: {
      filter: false,

      customBodyRender: (value, tableMeta) => {
        console.log("tableMeta =", tableMeta);
        return (
          <div className={style.actionsSty}>
            <IconButton
              color="success" /* #2196f3 */
              aria-label="Approve"
              size="large"
              onClick={() => handleOpenNotePoup(tableMeta.rowData[0], 2)}
            >
              <DoneOutlineRoundedIcon />
            </IconButton>

            <IconButton
              color="error"
              aria-label="Reject"
              size="large"
              onClick={() => handleOpenNotePoup(tableMeta.rowData[0], 3)}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              color="success"
              aria-label="Details"
              size="large"
              onClick={() => handleExecutionPoup(tableMeta.rowData[0])}
            >
              <Details />
            </IconButton>
          </div>
        );
      },
    },
  };

  if (columns.length > 0) columns.push(action);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={fromdate}
                  onChange={(date) => {
                    if (
                      Object.prototype.toString.call(new Date(date)) ===
                      "[object Date]"
                    ) {
                      if (!isNaN(new Date(date))) {
                        setfromate(
                          date === null
                            ? null
                            : format(new Date(date), "yyyy-MM-dd")
                        );
                      } else {
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
                    if (
                      Object.prototype.toString.call(new Date(date)) ===
                      "[object Date]"
                    ) {
                      if (!isNaN(new Date(date))) {
                        settodate(
                          date === null
                            ? null
                            : format(new Date(date), "yyyy-MM-dd")
                        );
                      } else {
                        settodate(null);
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
                id="employeeId"
                options={EmployeeList}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setemployee(value == null ? null : value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="employeeId"
                    required
                    label={intl.formatMessage(Payrollmessages.employeeName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={1}>
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

          <PayrollTable title="" data={data} columns={columns} />
          <NotePopup
            handleClose={handleCloseNotePoup}
            open={openNotePopup}
            callFun={RequestAction}
            Note={Note}
            setNote={setNote}
            Action={Action}
          />
          <WFExecutionList
            handleClose={handleCloseExecutionPoup}
            open={openExecutionPoup}
            ExecutionId={ExecutionId}
          />
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

RequestsList.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(RequestsList);
