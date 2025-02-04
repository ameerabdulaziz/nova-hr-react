import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import EmployeeDocumentsData from "../api/EmployeeDocumentsData";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../messages";
import Payrollmessages from "../../messages";
import PropTypes from "prop-types";
import GeneralListApis from "../../api/GeneralListApis";
import { PapperBlock } from "enl-components";
import useStyles from "../../Style";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import FileViewerPopup from "../../../../../components/Popup/fileViewerPopup";
import printJS from "print-js";
import { format } from "date-fns";
import { ServerURL } from "../../api/ServerConfig";
import SaveButton from "../../Component/SaveButton";
import PayRollLoader from "../../Component/PayRollLoader";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SITEMAP from "../../../../App/routes/sitemap";


function CreateAndEditEmployeeDocuments(props) {
  const [id, setid] = useState(0);
  const authState = useSelector((state) => state.authReducer);
  const { isHR } = authState.user;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [followDate, setFollowDate] = useState(null);
  const [note, setNote] = useState("");
  const [isPaperCopy, setIsPaperCopy] = useState(false);
  const [validImageTypes, setValidImageTypes] = useState([
    "image/jpg",
    "jpg",
    "image/jpeg",
    "jpeg",
    "image/png",
    "png",
    "image/apng",
    "apng",
    "image/webp",
    "webp",
    "image/svg+xml",
    "svg+xml",
  ]);
  const [validPDFTypes, setValidPDFTypes] = useState([
    "application/pdf",
    ".pdf",
    "pdf",
  ]);
  const { state } = useLocation();
  const ID = state?.id;
  const { intl } = props;
  const { classes, cx } = useStyles();
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [documentsList, setDocumentsList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileType, setUploadedFileType] = useState(null);
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [employeeName, setEmployeeName] = useState([]);
  const [employeeID, setEmployeeID] = useState(state?.employeeId);

  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
   // return  date && !DateError ? format(new Date(date), "yyyy-MM-dd") : ""
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);
      const data = {
        id: id,
        employeeId: employeeID,
        documentId: document.id ? document.id : "",
        documentUrl: "",
        isPaperCopy: isPaperCopy,
        startDate: dateFormatFun(startDate),
        endDate: dateFormatFun(endDate),
        followDate: dateFormatFun(followDate),
        notes: note.length !== 0 ? note : "",
        Image:
          uploadedFile && uploadedFile instanceof File ? uploadedFile : null,
      };

      if (inDate) {
        data.inDate = dateFormatFun(inDate);
      }

      if (outDate) {
        data.outDate = dateFormatFun(outDate);
      }

      let response = await EmployeeDocumentsData().Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.employee.EmployeeDocuments.route, {
          employeeId: employeeID,
        });
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const getdata = async () => {
    try {
      const documentsData = await GeneralListApis(locale).GetDocumentTypeList();
      const employees = await GeneralListApis(locale).GetEmployeeList();

      setDocumentsList(documentsData);
      setEmployeeName(
        employees.length !== 0 &&
          employeeID &&
          employees.find((item) => item.id === employeeID) !== undefined
          ? employees
              .find((item) => item.id === employeeID)
              ?.name.split("-")
              .pop()
          : ""
      );
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const getEditdata = async () => {
    try {
      setIsLoading(true);
      const data = await EmployeeDocumentsData().GetDataById(ID, locale);

      setEmployeeID(data?.employeeId);
      setid(data ? data.id : "");
      setStartDate(data ? data.startDate : null);
      setEndDate(data ? data.endDate : null);
      setFollowDate(data ? data.followDate : null);
      setNote(data && data.notes ? data.notes : "");
      setIsPaperCopy(data ? data.isPaperCopy : false);
      setInDate(data && data.inDate ? data.inDate : null);
      setOutDate(data && data.outDate ? data.outDate : null);
      setDocument(
        data &&
          data.documentId &&
          documentsList.find((item) => item.id === data.documentId) !==
            undefined
          ? documentsList.find((item) => item.id === data.documentId)
          : null
      );
      setUploadedFile(
        data && data.documentUrl ? ` ${ServerURL}${data.documentUrl} ` : ""
      );
      setUploadedFileType(
        data && data.documentUrl
          ? ` ${ServerURL}${data.documentUrl} `
              .split(/[#?]/)[0]
              .split(".")
              .pop()
              .trim()
          : null
      );
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // used to get data by id to edit it
  useEffect(() => {
    if (ID && documentsList.length !== 0) {
      getEditdata();
    }
  }, [ID, documentsList]);

  // used to pass employeeId if user click browser back button
  useEffect(() => {
    history.listen(() => {
      if (history.action === "POP") {
        history.push(SITEMAP.employee.EmployeeDocuments.route, {
          employeeId: employeeID,
        });
      }
    });
  }, []);

  function oncancel() {
    history.push(SITEMAP.employee.EmployeeDocuments.route, {
      employeeId: employeeID,
    });
  }

  const uploadFileFun = (e) => {
    // check if uploaded file is larger than 1MB
    if (e.target.files[0]) {
      if (e.target.files[0].size < 10000000) {
        if (validImageTypes.includes(e.target.files[0].type)) {
          setUploadedFileType(e.target.files[0].type);
        } else if (validPDFTypes.includes(e.target.files[0].type)) {
          setUploadedFileType(e.target.files[0].type);
        }

        setUploadedFile(e.target.files[0]);
      } else {
        toast.error(intl.formatMessage(messages.uploadFileErrorMes));
      }
    }
  };

  const handleClickOpen = (item) => {
    setOpenParentPopup(true);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  const printFun = () => {
    printJS({
      printable:
        uploadedFile && uploadedFile instanceof File
          ? URL.createObjectURL(uploadedFile)
          : uploadedFile,
      type: validImageTypes.includes(uploadedFileType)
        ? "image"
        : validPDFTypes.includes(uploadedFileType)
        ? "pdf"
        : "",
    });
  };


  useEffect(()=>{

      if(document && document.length !== 0 && startDate && ID === undefined)
    {

      let date = new Date(startDate)
      if(document.expirationPeriod)
      {
        setEndDate(date.setMonth(date.getMonth() + document.expirationPeriod))
      }
      else
      {
        setEndDate(null)
      }

      if(document.expirationFollow)
        {
          setFollowDate(date.setDate(date.getDate() - document.expirationFollow))
        }
        else
        {
          setFollowDate(null)
        }

    }

    if(startDate === null && ID === undefined)
    {
      setEndDate(null)
      setFollowDate(null)
    }

  },[document,startDate])

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          ID
            ? `${intl.formatMessage(
                messages.EditEmployeeDocument
              )}: ${employeeName}`
            : `${intl.formatMessage(
                messages.CreateEmployeeDocument
              )}: ${employeeName}`
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid
              item
              xs={12}
              md={8}
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
            >
              <Grid
                item
                xs={12}
                md={12}
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
                className={style.container}
              >
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlMenu"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    value={document !== null ? document : null}
                    options={documentsList.length != 0 ? documentsList : []}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setDocument(value);
                      } else {
                        setDocument(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="documentType"
                        label={intl.formatMessage(messages.documentType)}
                        margin="normal"
                        className={style.fieldsSty}
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isPaperCopy}
                        onChange={() => setIsPaperCopy(!isPaperCopy)}
                        color="primary"
                        className={style.BtnSty}
                      />
                    }
                    label={intl.formatMessage(messages.HardCopy)}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} md={12}>

                <Grid
                  item
                  xs={12}
                  md={12}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={4}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.startDate)}
                          value={startDate ? dayjs(startDate) : startDate}
                        className={classes.field}
                          onChange={(date) => {
                            setStartDate(date)
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`startDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`startDate`]: false
                              }))
                          }
                        }}
                        slotProps={{
                            textField: {
                                required: document?.isCheckExpireDate,
                              },
                            }}
                        />
                    </LocalizationProvider>
                  </Grid>

                <Grid item xs={12} md={4}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                      label={intl.formatMessage(messages.endDate)}
                        value={endDate ? dayjs(endDate) : endDate}
                      className={classes.field}
                        onChange={(date) => {
                          setEndDate(date)
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`endDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`endDate`]: false
                            }))
                        }
                      }}
                      slotProps={{
                          textField: {
                              required: document?.isCheckExpireDate,
                            },
                          }}
                      />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={4}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                      label={intl.formatMessage(messages.followDate)}
                        value={followDate ? dayjs(followDate) : followDate}
                      className={classes.field}
                        onChange={(date) => {
                          setFollowDate(date)
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`followDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`followDate`]: false
                            }))
                        }
                      }}
                      slotProps={{
                          textField: {
                              required: document?.isCheckExpireDate,
                            },
                          }}
                      />
                  </LocalizationProvider>
                </Grid>
                </Grid>

              </Grid>

              { id !== 0 && isHR && <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={intl.formatMessage(messages.outDate)}
                        value={outDate ? dayjs(outDate) : outDate}
                        className={classes.field}
                        onChange={(date) => {
                          setOutDate(date)
                        }}
                        onError={(error,value)=>{
                          if (error !== null) {
                            setDateError((prevState) => ({
                              ...prevState,
                              [`outDate`]: true
                            }));
                          } else  {
                            setDateError((prevState) => ({
                              ...prevState,
                              [`outDate`]: false
                            }));
                          }
                        }}
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={intl.formatMessage(messages.inDate)}
                        value={inDate ? dayjs(inDate) : inDate}
                        className={classes.field}
                        minDate={outDate ? dayjs(outDate) : undefined}
                        onChange={(date) => {
                          setInDate(date)
                        }}
                        onError={(error,value)=>{
                          if (error !== null) {
                            setDateError((prevState) => ({
                              ...prevState,
                              [`inDate`]: true
                            }));
                          } else  {
                            setDateError((prevState) => ({
                              ...prevState,
                              [`inDate`]: false
                            }));
                          }
                        }}
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>

              </Grid>}

              <Grid item xs={12}>
                <TextField
                  name="note"
                  id="note"
                  placeholder={intl.formatMessage(messages.notes)}
                  label={intl.formatMessage(messages.notes)}
                  className={`${classes.field} ${style.fieldsSty}`}
                  margin="normal"
                  variant="outlined"
                  value={note}
                  multiline
                  rows={1}
                  onChange={(e) => setNote(e.target.value)}
                  autoComplete='off'
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              container
              spacing={3}
              alignItems="flex-end"
              className={style.imgContainer}
              onClick={() => {
                if (uploadedFile) {
                  handleClickOpen();
                }
              }}
            >
              {validImageTypes.includes(uploadedFileType) ? (
                <img
                  src={
                    uploadedFile && uploadedFile instanceof File
                      ? URL.createObjectURL(uploadedFile)
                      : uploadedFile
                  }
                />
              ) : validPDFTypes.includes(uploadedFileType) ? (
                <object
                  data={
                    uploadedFile !== null && uploadedFile instanceof File
                      ? URL.createObjectURL(uploadedFile)
                      : uploadedFile
                  }
                  type="application/pdf"
                  width="330"
                  height="230"
                ></object>
              ) : null}
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item >
              <Button
                variant="contained"
                color="secondary"
                component="label"
                startIcon={<AddIcon/>}
              >
                <FormattedMessage {...Payrollmessages.Upload} />
                <input
                  type="file"
                  name="file"
                  className={`custom-file-input ${style.uploadBtnSty}`}
                  id="inputGroupFile"
                  onChange={(e) => {
                    uploadFileFun(e);
                  }}
                  accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml, application/pdf, .pdf"
                  required={
                    isPaperCopy
                      ? false
                      : uploadedFile !== null
                      ? false
                      : true
                  }
                />
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={!uploadedFile}
                onClick={() => printFun()}
              >
                <FormattedMessage {...Payrollmessages.Print} />
              </Button>
            </Grid>

            <Grid item>
              <SaveButton Id={id} />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={oncancel}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <FileViewerPopup
        handleClose={handleClose}
        open={openParentPopup}
        uploadedFileType={uploadedFileType}
        uploadedFile={uploadedFile}
        validImageTypes={validImageTypes}
        validPDFTypes={validPDFTypes}
      />
    </PayRollLoader>
  );
}

CreateAndEditEmployeeDocuments.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditEmployeeDocuments);
