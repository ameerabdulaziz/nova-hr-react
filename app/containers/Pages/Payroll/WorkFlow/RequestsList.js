import React, { useEffect, useState } from "react";
import ApiData from "./api/WorkFlowData";
import { useSelector } from "react-redux";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import Details from "@mui/icons-material/List";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Payrollmessages from "../messages";
import missionmessages from "../Attendance/messages";
import hrmessages from "../HumanResources/messages";
import paymessages from "../Payroll/messages";
import vacmessages from "../Vacation/messages";
import trainingmessages from "../Training/messages";
import Icon from "@mui/material/Icon";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import PayRollLoaderInForms from "../Component/PayRollLoaderInForms";
import SimplifiedPayrollTable from "../Component/SimplifiedPayrollTable";
import NotePopup from "./NotePopup";
import WFExecutionList from "./WFExecutionList";
import { useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ServerURL } from "../api/ServerConfig";
import { useHistory } from "react-router-dom";
import { getCheckboxIcon } from "../helpers";
import { formateDate } from "../helpers";
import SITEMAP from "../../../App/routes/sitemap";

function RequestsList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const history = useHistory();
  const location = useLocation();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [cols, setCols] = useState([]);

  const [Document, setDocument] = useState(
    location.pathname == SITEMAP.attendance.PermissionApproval.route
      ? 1
      : location.pathname == SITEMAP.attendance.MissionApproval.route
      ? 2
      : location.pathname == SITEMAP.vacation.VacApproval.route
      ? 3
      : location.pathname == SITEMAP.humanResources.PenaltyApproval.route
      ? 4
      : location.pathname == SITEMAP.humanResources.RewardsApproval.route
      ? 5
      : location.pathname == SITEMAP.payroll.LoanApproval.route
      ? 6
      : location.pathname == SITEMAP.attendance.OvertimeApproval.route
      ? 7
      : location.pathname == SITEMAP.humanResources.UniformApproval.route
      ? 8
      : location.pathname == SITEMAP.humanResources.ResignApproval.route
      ? 9
      : location.pathname == SITEMAP.humanResources.CustodyApproval.route
      ? 9
      : location.pathname == SITEMAP.humanResources.DocumentApproval.route
      ? 10
      : location.pathname == SITEMAP.attendance.ShiftSwapApproval.route
      ? 11
      : location.pathname == SITEMAP.training.FunctionApproval.route
      ? 12
      : location.pathname == SITEMAP.training.TrainingApproval.route
      ? 13
      : location.pathname == SITEMAP.attendance.ForgotFingerprintApproval.route
      ? 14
      : location.pathname == SITEMAP.humanResources.TransferRequestApproval.route
      ? 15
      : 0
  );
  const [fromdate, setfromate] = useState();
  const [todate, settodate] = useState();
  const [employee, setemployee] = useState(null);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openNotePopup, setopenNotePopup] = useState(false);
  const [openExecutionPoup, setExecutionPoup] = useState(false);
  const [ExecutionId, setExecutionId] = useState("");
  const [ActionsTypeList, setActionsTypeList] = useState([]);
  const [postDate, setPostDate] = useState({
    executionId: [],
    actionTypeId: 0,
    note: "",
    docId: Document,
    itemsCount: 0,
    itemSerial: "",
    executionDate: null,
    isUpdateOverTime: false,
    factor: null,
    calcAsrepVac: null,
    employeeId: null,
    resignReasonId: null,
    resignReasonName: null,
    lworkingDay: null,
    trainingId: 0,
  });
  const [DateError, setDateError] = useState({});

  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  const handleExecutionPoup = (Id) => {
    setExecutionId(Id);
    setExecutionPoup(true);
  };
  const handleOpenNotePoup = (
    id,
    Action,
    executionDate,
    isUpdateOverTime,
    calcAsrepVac,
    factor,
    employeeId,
    ResignReasonId,
    resignReasonName,
    LworkingDay,
    trainingId
  ) => {
    setPostDate({
      executionId: id,
      actionTypeId: Action,
      note: "",
      docId: Document,
      itemsCount: 0,
      itemSerial: "",
      executionDate: executionDate,
      isUpdateOverTime: isUpdateOverTime,
      factor: factor,
      calcAsrepVac: calcAsrepVac,
      employeeId: employeeId,
      resignReasonId: ResignReasonId,
      resignReasonName: resignReasonName,
      lworkingDay: LworkingDay,
      trainingId: trainingId,
    });
    setopenNotePopup(true);
  };

  const handleCloseNotePoup = () => {
    setopenNotePopup(false);
  };
  const handleCloseExecutionPoup = () => {
    setExecutionPoup(false);
  };
  async function handleAction(selectedRows, ActionId) {
    try {
      const Ids = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        Ids.push(data[selectedRows.data[i].dataIndex].executionId);
      }

      if (Ids.length > 0) {
        handleOpenNotePoup(Ids, ActionId);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);
      let Fromdate = dateFormatFun(fromdate);
      let Todate = dateFormatFun(todate);
      const dataApi = await ApiData(locale).Getrequests(
        Document,
        employee,
        Fromdate,
        Todate,
        location.pathname == SITEMAP.humanResources.CustodyApproval.route ? true : false
      );
      setdata(dataApi);
      if (dataApi && dataApi.length > 0) {
        var data = Object.keys(dataApi[0]).filter((item) => item != "actions");
        // used to remove executionId from table
        /* if (Document === 3) {
          const index = data.indexOf("executionId");
          data.splice(index, 1);
        }
 */
        setCols(data);
      } else setCols([]);
      fetchData();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function RequestAction() {
    try {
      setIsLoading(true);

      if (
        postDate.docId == 13 &&
        (postDate.trainingId == "" || postDate.trainingId == null)
      )
        history.push(SITEMAP.training.TrTrainingTrxListCreate.route, {
          postDate: postDate,
        });
      else {
        let response = await ApiData(locale).ExecuteWorkFlow(postDate);
        if (response.status == 200) {
          toast.success(notif.saved);
          if (postDate.docId == 9 && postDate.actionTypeId == 8)
            history.push(SITEMAP.employee.EmployeeData.route, {
              id: postDate.employeeId,
              resignReasonId: postDate.resignReasonId,
              resignReasonName: postDate.resignReasonName,
              lworkingDay: postDate.lworkingDay,
            });
          else handleSearch();
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchData() {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
      var documentId = 0;
      if (location.pathname == SITEMAP.attendance.PermissionApproval.route)
        documentId = 1;
      else if (location.pathname == SITEMAP.attendance.MissionApproval.route)
        documentId = 2;
      else if (location.pathname == SITEMAP.vacation.VacApproval.route)
        documentId = 3;
      else if (location.pathname == SITEMAP.humanResources.PenaltyApproval.route)
        documentId = 4;
      else if (location.pathname == SITEMAP.humanResources.RewardsApproval.route)
        documentId = 5;
      else if (location.pathname == SITEMAP.attendance.OvertimeApproval.route)
        documentId = 6;
      else if (location.pathname == SITEMAP.payroll.LoanApproval.route)
        documentId = 7;
      else if (location.pathname == SITEMAP.humanResources.UniformApproval.route)
        documentId = 8;
      else if (location.pathname == SITEMAP.humanResources.ResignApproval.route)
        documentId = 9;
      else if (location.pathname == SITEMAP.humanResources.CustodyApproval.route)
        documentId = 9;
      else if (location.pathname == SITEMAP.humanResources.DocumentApproval.route)
        documentId = 10;
      else if (location.pathname == SITEMAP.attendance.ShiftSwapApproval.route)
        documentId = 11;
      else if (location.pathname == SITEMAP.training.FunctionApproval.route)
        documentId = 12;
      else if (location.pathname == SITEMAP.training.TrainingApproval.route)
        documentId = 13;
      else if (location.pathname == SITEMAP.attendance.ForgotFingerprintApproval.route)
        documentId = 14;
      else if (location.pathname == SITEMAP.humanResources.TransferRequestApproval.route)
        documentId = 15;
      else documentId = 0;

      let Fromdate = dateFormatFun(fromdate);
      let Todate = dateFormatFun(todate);

      const dataApi = await ApiData(locale).Getrequests(
        documentId,
        employee,
        Fromdate,
        Todate,
        location.pathname == SITEMAP.humanResources.CustodyApproval.route ? true : false
      );

      setdata(dataApi);
      setDocument(documentId);
      if (dataApi && dataApi.length > 0) {
        const result = await GeneralListApis(locale).GetActionByDocList(
          documentId
        );
        setActionsTypeList(result);
        var data = Object.keys(dataApi[0]).filter((item) => item != "actions");
        /*  // used to remove executionId from table
        if(documentId === 3)
        {
          const index = data.indexOf("executionId");
          data.splice(index, 1);
        } */
        setCols(data);
      } else setCols([]);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  // clear filter on first load
  useEffect(() => {
    setfromate();
    settodate();
    setemployee(null);
  }, [Title]);

  // call api on first load
  useEffect(() => {
    if (!fromdate && !todate && !employee) {
      fetchData();
    }
  }, [fromdate, todate, employee, Title]);

  const columns =
    cols.length !== 0
      ? cols
          .filter((item) => item !== "vacDocPath")
          .map((item) => ({
            name: item,
            label:
              Document == 1 ||
              Document == 2 ||
              Document == 6 ||
              Document == 11 ||
              Document == 14 ? (
                <FormattedMessage {...missionmessages[item]} />
              ) : Document == 4 ||
                Document == 5 ||
                Document == 8 ||
                Document == 9 ||
                Document == 10 ||
                Document == 15 ? (
                <FormattedMessage {...hrmessages[item]} />
              ) : Document == 7 ? (
                <FormattedMessage {...paymessages[item]} />
              ) : Document == 3 ? (
                <FormattedMessage {...vacmessages[item]} />
              ) : Document == 12 || Document == 13 ? (
                <FormattedMessage {...trainingmessages[item]} />
              ) : (
                <FormattedMessage {...Payrollmessages[item]} />
              ),
            options: {
              ...(item.toLowerCase()?.includes("notes") && {
                setCellHeaderProps: () => ({
                  style: {
                    minWidth: "300px", maxWidth: "300px"
                  },
                }),
              }),
              // setCellProps: () => ({
              //   style: { minWidth: "800px", maxWidth: "800px" },
              // }),
              filter: true,
              display: item.toLowerCase()?.includes("id") ? false : true,
              customBodyRender: (value) =>
                (value == true || value == false) && value != "" ? (
                  getCheckboxIcon(value)
                ) : item?.toLowerCase()?.includes("date") &&
                  !item?.toLowerCase()?.includes("time") ? (
                  <pre>{formateDate(value)}</pre>
                ) 
                : item === "notes" ? <div style={{minWidth:"250px", lineHeight:"25px"}}>{value}</div>
                : item === "value" && Document === 4 ? <div>X</div>
                : (
                 <pre> {value} </pre>
                ),
            },
          }))
      : [];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selectableRows: "multiple",
    customToolbarSelect: (selectedRows) => (
      <div>
        {Document != 11 && Document != 9 && Document != 10 ? (
          <Grid container spacing={1} alignItems="flex-start" direction="row">
            {ActionsTypeList &&
              ActionsTypeList.length > 0 &&
              ActionsTypeList.map((row) => {
                return (
                  <Grid item xs={12} md={6}>
                    <Tooltip title={row.name} cursor="pointer" className="mr-6">
                      <IconButton
                        color="success"
                        aria-label={row.name}
                        size="large"
                        onClick={() => handleAction(selectedRows, row.id)}
                      >
                        <Icon>{row.icon}</Icon>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                );
              })}
          </Grid>
        ) : (
          ""
        )}
      </div>
    ),
  };

  const action = {
    name: "Actions",
    options: {
      filter: false,

      customBodyRender: (value, tableMeta) => {
        let filterdrow = null;
        if (tableMeta && data && data.length > 0)
          filterdrow = data.filter(
            (i) => i.executionId == tableMeta.rowData[0]
          );
        return (
          <div className={style.actionsSty}>
            <Tooltip
              title={intl.formatMessage(Payrollmessages.details)}
              cursor="pointer"
              className="mr-6"
            >
              <IconButton
                color="success"
                aria-label="Details"
                size="large"
                onClick={() => handleExecutionPoup(tableMeta.rowData[0])}
              >
                <Icon>{<Details />}</Icon>
              </IconButton>
            </Tooltip>

            {filterdrow &&
              filterdrow.length > 0 &&
              filterdrow[0].actions.length !== 0 &&
              filterdrow[0].actions.map((row) => {
                return (
                  <Tooltip title={row.name} cursor="pointer" className="mr-6">
                    <IconButton
                      color="success"
                      aria-label={row.name}
                      size="large"
                      onClick={() =>
                        handleOpenNotePoup(
                          [tableMeta.rowData[0]],
                          row.id,
                          Document == 10 ? tableMeta.rowData[3] : null,
                          Document == 6 ? true : false,
                          Document == 6 ? tableMeta.rowData[8] : null,
                          Document == 6 ? tableMeta.rowData[9] : null,
                          Document == 9 ? tableMeta.rowData[3] : null,
                          Document == 9 ? tableMeta.rowData[5] : null,
                          Document == 9 ? tableMeta.rowData[6] : null,
                          Document == 9 ? tableMeta.rowData[7] : null,
                          Document == 13 ? tableMeta.rowData[7] : null
                        )
                      }
                    >
                      <Icon>{row.icon}</Icon>
                    </IconButton>
                  </Tooltip>
                );
              })}
          </div>
        );
      },
    },
  };

  if (Document === 3 && columns.length > 0) {
    columns.push({
      name: "vacDocPath",
      label: intl.formatMessage(Payrollmessages.attachment),
      options: {
        filter: false,
        print: false,
        download: false,
        customBodyRender: (value) => {
          if (!value) {
            return "";
          }

          return (
            <a
              href={`${ServerURL}Doc/VacDoc/${value}`}
              target="_blank"
              rel="noreferrer"
            >
              <Tooltip
                placement="bottom"
                title={intl.formatMessage(Payrollmessages.preview)}
              >
                <span>
                  <IconButton>
                    <VisibilityIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </span>
              </Tooltip>
            </a>
          );
        },
      },
    });
  }

  if (columns.length > 0) columns.push(action);

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <div>
          <Grid container spacing={3}>
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.fromdate)}
                  value={fromdate ? dayjs(fromdate) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setfromate(date);
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`fromdate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`fromdate`]: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={4} lg={3} xl={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(Payrollmessages.todate)}
                  value={todate ? dayjs(todate) : null}
                  className={classes.field}
                  onChange={(date) => {
                    settodate(date);
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`todate`]: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        [`todate`]: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
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

          <NotePopup
            handleClose={handleCloseNotePoup}
            open={openNotePopup}
            callFun={RequestAction}
            postDate={postDate}
            setPostDate={setPostDate}
            isCustody={
              location.pathname == SITEMAP.humanResources.CustodyApproval.route
                ? true
                : false
            }
          />
          <WFExecutionList
            handleClose={handleCloseExecutionPoup}
            open={openExecutionPoup}
            ExecutionId={ExecutionId}
          />
        </div>
      </PapperBlock>

      <SimplifiedPayrollTable title="" data={data} columns={columns} options={options} />
    </PayRollLoaderInForms>
  );
}

RequestsList.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(RequestsList);
