import { Block, HourglassTop, PendingActions } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import CounterWidget from "../../../../../components/Counter/CounterWidget";
import useWidgetStyles from "../../../../../components/Widget/widget-jss";
import style from "../../../../../styles/styles.scss";
import PayRollLoader from "../../Component/PayRollLoader";
import PayrollTable from "../../Component/PayrollTable";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import payrollMessages from "../../messages";
import api from "../api/HRApplicationEvaluationData";
import RowDropdown from "../components/HRApplicationEvaluation/RowDropdown";
import messages from "../messages";

function HRApplicationEvaluation(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const { classes: widgetClass } = useWidgetStyles();
  const isInitialRender = useRef(true);

  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem("MenuName");
  const workFromList = [
    {
      id: 1,
      name: intl.formatMessage(messages.site),
    },
    {
      id: 2,
      name: intl.formatMessage(messages.home),
    },
  ];

  const [dateError, setDateError] = useState({});
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEvalPopupOpen, setIsEvalPopupOpen] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const [jobAdvList, setJobAdvList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [statusPopupList, setStatusPopupList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [graduationGradList, setGraduationGradList] = useState([]);
  const [technicalEmployeeList, setTechnicalEmployeeList] = useState([]);
  const [managerialLevelList, setManagerialLevelList] = useState([]);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchExistEmployeeData, setIsFetchExistEmployeeData] =
    useState(false);
  const [isEvaluateLoader, setIsEvaluateLoader] = useState(false);
  const [existEmployeeInfo, setExistEmployeeInfo] = useState(null);

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    Appliname: "",
    Idcardno: "",
    JobId: null,
    JobAdv: null,
    Status: 0,
    GenderId: null,
    Grauationst: null,
    Workfrom: null,
    Fromage: "",
    Toage: "",
  });

  const [extraData, setExtraData] = useState({
    accepted: 0,
    waiting: 0,
    dataBank: 0,
    rejected: 0,
    offer: 0,
    bList: 0,
    pending: 0,
  });

  const [popupState, setPopupState] = useState({
    appFirstStatus: null,
    reason: "",
    techEmpList: [],
    secStaff: null,
    notTechnicalReview: false,
    databnkjob: null,
  });
  const [evaluation, setEvaluation] = useState("");
  const [applicationId, setapplicationId] = useState("");

  const getFilterHighlights = () => {
    const highlights = [];

    const jobAdvertisement = getAutoCompleteValue(jobAdvList, formInfo.JobAdv);

    const status = getAutoCompleteValue(statusList, formInfo.Status);
    const gender = getAutoCompleteValue(genderList, formInfo.GenderId);
    const job = getAutoCompleteValue(jobList, formInfo.JobId);
    const graduationGrade = getAutoCompleteValue(
      graduationGradList,
      formInfo.Grauationst
    );
    const workFrom = getAutoCompleteValue(workFromList, formInfo.Workfrom);

    if (status) {
      highlights.push({
        label: intl.formatMessage(messages.status),
        value: status.name,
      });
    }

    if (gender) {
      highlights.push({
        label: intl.formatMessage(messages.gender),
        value: gender.name,
      });
    }

    if (job) {
      highlights.push({
        label: intl.formatMessage(messages.job),
        value: job.name,
      });
    }

    if (graduationGrade) {
      highlights.push({
        label: intl.formatMessage(messages.graduationGrade),
        value: graduationGrade.name,
      });
    }

    if (workFrom) {
      highlights.push({
        label: intl.formatMessage(messages.workFrom),
        value: workFrom.name,
      });
    }

    if (jobAdvertisement) {
      highlights.push({
        label: intl.formatMessage(messages.JobAdv),
        value: jobAdvertisement.name,
      });
    }

    if (formInfo.Fromage) {
      highlights.push({
        label: intl.formatMessage(messages.fromAge),
        value: formInfo.Fromage,
      });
    }

    if (formInfo.Toage) {
      highlights.push({
        label: intl.formatMessage(messages.toAge),
        value: formInfo.Toage,
      });
    }

    if (formInfo.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(formInfo.FromDate),
      });
    }

    if (formInfo.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(formInfo.ToDate),
      });
    }

    if (formInfo.Appliname) {
      highlights.push({
        label: intl.formatMessage(messages.applicantName),
        value: formInfo.Appliname,
      });
    }

    if (formInfo.Idcardno) {
      highlights.push({
        label: intl.formatMessage(messages.idNumber),
        value: formInfo.Idcardno,
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    setIsLoading(true);

    const formData = {
      ...formInfo,
      FromDate: formateDate(formInfo.FromDate),
      ToDate: formateDate(formInfo.ToDate),
    };

    try {
      const response = await api(locale).GetList(formData);

      if (response) {
        setTableData(response.dataList);
        setExtraData(response.totals);

        getFilterHighlights();
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobList();
      setJobList(jobs);

      const gender = await GeneralListApis(locale).GetGenderList();
      setGenderList(gender);

      const grads = await GeneralListApis(locale).GetGradeList();
      setGraduationGradList(grads);

      const popupStatus = await GeneralListApis(
        locale
      ).GetApplicationStatusList();
      setStatusPopupList(popupStatus);

      const managerialLevel = await GeneralListApis(
        locale
      ).GetManagerialLevelList();
      setManagerialLevelList(managerialLevel);

      const techLevel = await GeneralListApis(locale).GetTechLevelList();
      setTechnicalEmployeeList(techLevel);

      const appStatus = await GeneralListApis(locale).GetApplicationStatusList(
        true
      );
      setStatusList(appStatus);

      const jobAdv = await GeneralListApis(locale).GetJobAdvList();
      setJobAdvList(jobAdv);

      await fetchTableData();
    } catch (error) {
      setIsLoading(false);
    }
  }

  const fetchExistEmployeeData = async (id) => {
    setIsFetchExistEmployeeData(true);
    const row = tableData.find((item) => item.id === id);

    try {
      const response = await api(locale).CheckIfExistEmp(
        row.idcardNumber,
        row.email
      );
      setExistEmployeeInfo(response);
    } catch (error) {
      //
    } finally {
      setIsFetchExistEmployeeData(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onUpdateStatusBtnClick = (ids) => {
    setSelectedRowsId(ids);
    setIsPopupOpen(true);

    if (ids.length === 1) {
      fetchExistEmployeeData(ids[0]);

      const row = tableData.find((item) => item.id === ids[0]);

      if (row) {
        setPopupState({
          appFirstStatus: row.appFirstStatus ?? null,
          reason: row.reason ?? "",
          techEmpList: row.techEmpList ?? [],
          secStaff: row.secStaff ?? null,
          notTechnicalReview: row.notTechnicalReview ?? false,
          databnkjob: row.databnkjob ?? null,
        });
      }
    }
  };

  const onAiEvaluationBtnClick = async (id, isNewEvaluation) => {
    if (isNewEvaluation) setIsEvaluateLoader(true);
    else setIsLoading(true);

    try {
      const response = await api(locale).EvaluateJobApplication(
        id,
        isNewEvaluation ?? false
      );
      debugger;
      if (response) {
        setapplicationId(id);
        setEvaluation(response);
        setIsEvalPopupOpen(true);
      }
    } catch (error) {
      //
    } finally {
      if (isNewEvaluation) setIsEvaluateLoader(false);
      else setIsLoading(false);
    }
  };

  const onSendRejectMailBtnClick = async (id) => {
    setIsLoading(true);

    try {
      await api(locale).SendRejectionMail(id);
      toast.success(notif.sent);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);

      await fetchTableData();
    }
  };

  const columns = [
    {
      name: "empName",
      label: intl.formatMessage(messages.applicantName),
    },

    {
      name: "appDate",
      label: intl.formatMessage(messages.applicationDate),
    },

    {
      name: "jobName",
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: "hrStatus",
      label: intl.formatMessage(messages.hrStatus),
    },

    {
      name: "techStatus",
      label: intl.formatMessage(messages.technicalStatus),
    },

    {
      name: "secStatus",
      label: intl.formatMessage(messages.managerialStatus),
    },

    {
      name: "",
      label: "",
      options: {
        print: false,
        filter: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          if (!row) {
            return "";
          }

          return (
            <RowDropdown
              row={row}
              tableMeta={tableMeta}
              onUpdateStatusBtnClick={onUpdateStatusBtnClick}
              onAiEvaluationBtnClick={onAiEvaluationBtnClick}
              onSendRejectMailBtnClick={onSendRejectMailBtnClick}
            />
          );
        },
      },
    },
  ];

  const onToolBarIconClick = (rows) => {
    const ids = rows.map((item) => tableData[item.dataIndex]?.id);

    setSelectedRowsId(ids);
    setIsPopupOpen(true);
  };

  const options = {
    selectableRows: "multiple",
    customToolbarSelect: (selectedRows) => (
      <IconButton
        sx={{ mx: 2 }}
        onClick={() => onToolBarIconClick(selectedRows.data)}
      >
        <ManageAccountsIcon sx={{ fontSize: "25px" }} />
      </IconButton>
    ),
  };

  const onFormSubmit = (evt) => {
    if(evt)
    {
      evt.preventDefault();
    }

    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    fetchTableData();
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onAutoCompletePopupChange = (value, name) => {
    setPopupState((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onPopupInputChange = (evt) => {
    setPopupState((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ""),
    }));
  };

  const onPopupClose = () => {
    setIsPopupOpen(false);
    setExistEmployeeInfo(null);

    setPopupState({
      appFirstStatus: null,
      reason: "",
      techEmpList: [],
      secStaff: null,
      notTechnicalReview: false,
      databnkjob: null,
    });
  };
  const onEvalPopupClose = () => {
    setIsEvalPopupOpen(false);
  };

  const onPopupFormSubmit = async (evt) => {
    evt.preventDefault();
    onPopupClose();

    const body = {
      ids: selectedRowsId,
      appFirstStatus: popupState.appFirstStatus,
      notTechnicalReview: popupState.notTechnicalReview,
      reason: "",
    };

    if (popupState.appFirstStatus === 6) {
      body.databnkjob = popupState.databnkjob;
    }

    if (popupState.appFirstStatus === 1 || popupState.appFirstStatus === 3) {
      body.secStaff = popupState.secStaff;
      body.techEmpList = !popupState.notTechnicalReview
        ? popupState.techEmpList.map((item) => item.id)
        : [];
    }

    if (popupState.appFirstStatus !== 1) {
      body.reason = popupState.reason;
    }

    setIsLoading(true);

    try {
      await api(locale).SaveHR(body);
      toast.success(notif.updated);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      await fetchTableData();
    }
  };
  const onEvalPopupFormSubmit = async (evt) => {
    debugger;
    evt.preventDefault();

    setIsEvaluateLoader(true);
    const body = {
      id: 0,
      applicationId: applicationId,
      evaluation: evaluation,
    };
    try {
      debugger;
      const response = await api(locale).SaveAiEvaluation(body);

      if (response) {
        toast.error(response.statusText);
      } else {
        toast.success(notif.saved);
        onEvalPopupClose();
      }
    } catch (error) {
      //
    } finally {
      setIsEvaluateLoader(false);
    }
  };


   const clickCardsFun = (cardVal) => {
    
      let cardValObj = statusList.find((item) => item.name === cardVal)

      setFormInfo((prev) => ({
        ...prev,
        Status : cardValObj ? cardValObj.id : 0,
      }));
   }

   useEffect(()=>{

    if (isInitialRender.current) {
      // Skip this effect on the first render
      isInitialRender.current = false;
      return;
    }
    
    onFormSubmit()
   },[formInfo.Status])

  const replaceWordsWithMark = (text = '') => {
    const wordsToReplace = [
      'however',
      'rate',
      'evaluate',
      'overall',
      'therefore',
      'score',
      '\\d+ out of \\d+',
    ];

    // \\b is a word boundary in regular expressions. It matches the position between a word character (like letters and digits) and a non-word character (like spaces or punctuation). Using \\b ensures that we match whole words rather than substrings. For example, it will match "rate" but not "corporate".
    const regex = new RegExp(`\\b(${wordsToReplace.join('|')})\\b`, 'gi');

    // Split the text based on the regex
    const parts = text.trimStart().split(regex);

    // Create the result array by interleaving parts and matches
    const result = parts.map((part, index) => {
      // ensures that each part is checked against all the words/phrases, treating them as regular expressions.
      const isExist = wordsToReplace.some(word => new RegExp(`\\b${word}\\b`, 'i').test(part));
      return isExist ? <mark key={index}>{part}</mark> : <span>{part}</span>;
    });

    return result;
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Dialog
        open={isPopupOpen}
        onClose={onPopupClose}
        component="form"
        onSubmit={onPopupFormSubmit}
        PaperProps={{
          sx: (th) => ({
            [th.breakpoints.down("md")]: {
              width: "100%",
            },
            width: "70vw",
          }),
        }}
      >
        <DialogTitle>
          <FormattedMessage {...payrollMessages.Actions} />
        </DialogTitle>

        <DialogContent sx={{ pt: "10px !important" }}>
          <PayRollLoader isLoading={isFetchExistEmployeeData}>
            {existEmployeeInfo && (
              <Card className={classes.card} sx={{ mt: "0!important" }}>
                <CardContent>
                  <Typography>
                    {intl.formatMessage(
                      messages.employeeAlreadyExistInEmployeeList
                    )}
                  </Typography>
                  <Grid container mt={0} spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="employeeCode"
                        value={existEmployeeInfo.employeeCode}
                        label={intl.formatMessage(messages.employeeCode)}
                        fullWidth
                        variant="outlined"
                        disabled
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="employeeName"
                        value={existEmployeeInfo.employeeName}
                        label={intl.formatMessage(messages.employeeName)}
                        fullWidth
                        variant="outlined"
                        disabled
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="jobName"
                        value={existEmployeeInfo.jobName}
                        label={intl.formatMessage(messages.jobName)}
                        fullWidth
                        variant="outlined"
                        disabled
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="department"
                        value={existEmployeeInfo.department}
                        label={intl.formatMessage(messages.department)}
                        fullWidth
                        variant="outlined"
                        disabled
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="status"
                        value={existEmployeeInfo.status}
                        label={intl.formatMessage(messages.status)}
                        fullWidth
                        variant="outlined"
                        disabled
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

            <Grid container spacing={2} mt={existEmployeeInfo ? 2 : undefined}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={statusPopupList}
                  value={getAutoCompleteValue(
                    statusPopupList,
                    popupState.appFirstStatus
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) =>
                    onAutoCompletePopupChange(value, "appFirstStatus")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.status)}
                    />
                  )}
                />
              </Grid>

              {popupState.appFirstStatus === 6 && (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={jobList}
                    value={getAutoCompleteValue(jobList, popupState.databnkjob)}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) =>
                      onAutoCompletePopupChange(value, "databnkjob")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.jobName)}
                      />
                    )}
                  />
                </Grid>
              )}

              {(popupState.appFirstStatus === 1 ||
                popupState.appFirstStatus === 3) && (
                <>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      options={managerialLevelList}
                      value={getAutoCompleteValue(
                        managerialLevelList,
                        popupState.secStaff
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : "")}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) =>
                        onAutoCompletePopupChange(value, "secStaff")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={intl.formatMessage(messages.managerialLevel)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      options={technicalEmployeeList}
                      multiple
                      disableCloseOnSelect
                      disabled={popupState.notTechnicalReview}
                      className={`${style.AutocompleteMulSty} ${
                        locale === "ar" ? style.AutocompleteMulStyAR : null
                      }`}
                      value={popupState.techEmpList}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      getOptionLabel={(option) => (option ? option.name : "")}
                      onChange={(_, value) => {
                        setPopupState((prev) => ({
                          ...prev,
                          techEmpList: value,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          disabled={popupState.notTechnicalReview}
                          label={intl.formatMessage(messages.technical)}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12} md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={popupState.notTechnicalReview}
                      onChange={(evt) =>
                        setPopupState((prevFilters) => ({
                          ...prevFilters,
                          notTechnicalReview: evt.target.checked,
                        }))
                      }
                    />
                  }
                  label={intl.formatMessage(messages.managerNotReviewCV)}
                />
              </Grid>

              {popupState.appFirstStatus !== 1 && (
                <Grid item xs={12} md={12}>
                  <TextField
                    name="reason"
                    onChange={onPopupInputChange}
                    value={popupState.reason}
                    label={intl.formatMessage(messages.reason)}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={1}
                    required
                    autoComplete="off"
                  />
                </Grid>
              )}
            </Grid>
          </PayRollLoader>
        </DialogContent>

        <DialogActions>
          <Button onClick={onPopupClose}>
            {intl.formatMessage(payrollMessages.cancel)}
          </Button>

          <Button type="submit" variant="contained">
            {intl.formatMessage(messages.confirm)}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isEvalPopupOpen}
        onClose={onEvalPopupClose}
        component="form"
        onSubmit={onEvalPopupFormSubmit}
        PaperProps={{
          sx: (th) => ({
            [th.breakpoints.down("md")]: {
              width: "100%",
            },
            width: "70vw",
          }),
        }}
      >
        <DialogTitle>
          <FormattedMessage {...payrollMessages.AiEvaluationResult} />
        </DialogTitle>

        <DialogContent sx={{ pt: "10px !important" }}>
          <PayRollLoader isLoading={isEvaluateLoader}>
            <Grid container mt={0} spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography
                  sx={{
                    whiteSpace: 'pre-wrap',
                    border: '1px solid #ddd',
                    p: 2,
                    borderRadius: '5px'
                  }}
                >
                  {replaceWordsWithMark(evaluation)}
                </Typography>
              </Grid>
            </Grid>
          </PayRollLoader>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onEvalPopupClose()}>
            {intl.formatMessage(payrollMessages.cancel)}
          </Button>
          <Button
            onClick={() => onAiEvaluationBtnClick(applicationId, true)}
            variant="contained"
          >
            {intl.formatMessage(payrollMessages.evaluate)}
          </Button>
          <Button type="submit" variant="contained">
            {intl.formatMessage(messages.save)}
          </Button>
        </DialogActions>
      </Dialog>

      <PapperBlock whiteBg icon="border_color" title={pageTitle} desc="">
        <div className={widgetClass.rootCounterFull}>
          <Grid container spacing={2} mb={2}>
            <Grid item sm={6} md={3} 
              onClick={()=>{clickCardsFun(statusList?.[6]?.name)}}
              className={style.cardSty}
              >
              <CounterWidget
                color="secondary-main"
                start={0}
                end={extraData.pending}
                duration={3}
                title={intl.formatMessage(messages.pending)}
                
              >
                <PendingActions
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: '60px !important' }}
                  
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3} onClick={()=>{clickCardsFun(statusList?.[0]?.name)}} className={style.cardSty}>
              <CounterWidget
                color="secondary-main"
                start={0}
                end={extraData.accepted}
                duration={3}
                title={intl.formatMessage(messages.accepted)}
              >
                <HowToRegIcon
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: "60px !important" }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3} onClick={()=>{clickCardsFun(statusList?.[2]?.name)}} className={style.cardSty}>
              <CounterWidget
                color="secondary-main"
                start={0}
                end={extraData.waiting}
                duration={3}
                title={intl.formatMessage(messages.waitingList)}
              >
                <HourglassTop
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: "60px !important" }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3} onClick={()=>{clickCardsFun(statusList?.[5]?.name)}} className={style.cardSty}>
              <CounterWidget
                color="secondary-main"
                start={0}
                end={extraData.dataBank}
                duration={3}
                title={intl.formatMessage(messages.dataBank)}
              >
                <DocumentScannerIcon
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: "60px !important" }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3} onClick={()=>{clickCardsFun(statusList?.[3]?.name)}} className={style.cardSty}>
              <CounterWidget
                color="secondary-main"
                start={0}
                end={extraData.offer}
                duration={3}
                title={intl.formatMessage(messages.jobOffer)}
              >
                <SensorOccupiedIcon
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: "60px !important" }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3} onClick={()=>{clickCardsFun(statusList?.[1]?.name)}} className={style.cardSty}>
              <CounterWidget
                color="secondary-main"
                start={0}
                end={extraData.rejected}
                duration={3}
                title={intl.formatMessage(messages.rejected)}
              >
                <PersonOffIcon
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: "60px !important" }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3} onClick={()=>{clickCardsFun(statusList?.[4]?.name)}} className={style.cardSty}>
              <CounterWidget
                color="secondary-main"
                start={0}
                end={extraData.bList}
                duration={3}
                title={intl.formatMessage(messages.blackList)}
              >
                <Block
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: "60px !important" }}
                />
              </CounterWidget>
            </Grid>
          </Grid>
        </div>

        <form onSubmit={onFormSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={jobAdvList}
                    value={getAutoCompleteValue(jobAdvList, formInfo.JobAdv)}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) =>
                      onAutoCompleteChange(value, "JobAdv")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.JobAdv)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="Appliname"
                    onChange={onInputChange}
                    value={formInfo.Appliname}
                    label={intl.formatMessage(messages.applicantName)}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="Idcardno"
                    onChange={onNumericInputChange}
                    value={formInfo.Idcardno}
                    label={intl.formatMessage(messages.idNumber)}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={statusList}
                    value={getAutoCompleteValue(statusList, formInfo.Status)}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) =>
                      onAutoCompleteChange(value, "Status")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.status)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={intl.formatMessage(payrollMessages.fromdate)}
                      value={
                        formInfo.FromDate ? dayjs(formInfo.FromDate) : null
                      }
                      sx={{ width: "100%" }}
                      onChange={(date) => onDatePickerChange(date, "FromDate")}
                      onError={(error) => {
                        setDateError((prevState) => ({
                          ...prevState,
                          FromDate: error !== null,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={intl.formatMessage(payrollMessages.todate)}
                      value={formInfo.ToDate ? dayjs(formInfo.ToDate) : null}
                      sx={{ width: "100%" }}
                      onChange={(date) => onDatePickerChange(date, "ToDate")}
                      onError={(error) => {
                        setDateError((prevState) => ({
                          ...prevState,
                          ToDate: error !== null,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={jobList}
                    value={getAutoCompleteValue(jobList, formInfo.JobId)}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) =>
                      onAutoCompleteChange(value, "JobId")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.jobName)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={genderList}
                    value={getAutoCompleteValue(genderList, formInfo.GenderId)}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) =>
                      onAutoCompleteChange(value, "GenderId")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.gender)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={workFromList}
                    value={getAutoCompleteValue(
                      workFromList,
                      formInfo.Workfrom
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) =>
                      onAutoCompleteChange(value, "Workfrom")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.workFrom)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={graduationGradList}
                    value={getAutoCompleteValue(
                      graduationGradList,
                      formInfo.Grauationst
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) =>
                      onAutoCompleteChange(value, "Grauationst")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.graduationGrade)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="Fromage"
                    onChange={onNumericInputChange}
                    value={formInfo.Fromage}
                    label={intl.formatMessage(messages.fromAge)}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="Toage"
                    onChange={onNumericInputChange}
                    value={formInfo.Toage}
                    label={intl.formatMessage(messages.toAge)}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Button variant="contained" color="primary" type="submit">
                    {intl.formatMessage(payrollMessages.search)}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </PapperBlock>

      <PayrollTable
        isLoading={isLoading}
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
        options={options}
      />
    </PayRollLoader>
  );
}

HRApplicationEvaluation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HRApplicationEvaluation);
