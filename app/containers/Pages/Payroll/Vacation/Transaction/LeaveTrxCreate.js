import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import FileViewerPopup from "../../../../../components/Popup/fileViewerPopup";
import DecryptUrl from "../../Component/DecryptUrl";
import EmployeeData from "../../Component/EmployeeData";
import PayRollLoader from "../../Component/PayRollLoader";
import SaveButton from "../../Component/SaveButton";
import VacationBalancePopup from "../../Component/VacationBalance";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { ServerURL } from "../../api/ServerConfig";
import { formateDate } from "../../helpers";
import payrollMessages from "../../messages";
import api from "../api/LeaveTrxData";
import messages from "../messages";
import SITEMAP from "../../../../App/routes/sitemap";

function LeaveTrxCreate(props) {
  const { intl } = props;
  const validPDFTypes = ["application/pdf", ".pdf", "pdf"];
  const validImageTypes = [
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
  ];

  const empid = DecryptUrl();

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;

  const { classes } = useStyles();
  const history = useHistory();

  const [dateError, setDateError] = useState({});
  const [vacationsList, setVacationsList] = useState([]);
  const [alternativeEmployeeList, setAlternativeEmployeeList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isAttachmentPopupOpen, setIsAttachmentPopupOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: null,
    HasAlternativeEmp: false,

    vacDayChange: "",
    vacDocPath: "",
    ReplaceDate: "",
    alternativeTask: null,

    trxDate: dayjs(),
    fromDate: dayjs(),
    toDate: dayjs(),
    replaceDate: null,
    daysCount: "",
    tel: "",
    doc: null,
    vacReson: "",
    address: "",
    notes: "",
    exemptEntryRec: false,
    exemptLeaveRec: false,
    alternativeStaff: null,
    vacCode: null,
  });

  const selectedLeave = useMemo(() => {
    if (formInfo.vacCode) {
      return vacationsList.find((vac) => vac.id === formInfo.vacCode) ?? null;
    }

    return null;
  }, [formInfo.vacCode]);

  useEffect(() => {
    if (empid) {      
      setFormInfo((prev) => ({
        ...prev,
        employeeId: empid.id ?? null,
        fromDate: empid.shiftDate ?? new Date(),
        toDate: empid.shiftDate ?? new Date() ,
      }));
    }
  }, []);

  const handleChange = useCallback((id, name) => {
    if (name == "employeeId") {
      setFormInfo((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
    }

    if (name == "HasAlternativeEmp") {
      setFormInfo((prevFilters) => ({
        ...prevFilters,
        HasAlternativeEmp: id,
      }));
    }
  }, []);

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const vacationResponse = await api(locale).GetVacationType();
      setVacationsList(vacationResponse);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo({
          ...dataApi,
          vacation: {
            id: dataApi.vacCode,
            name: dataApi.vacationName,
          },
        });
        if (dataApi.vacDocPath) {
          setUploadedFile(`${ServerURL}Doc/VacDoc/${dataApi.vacDocPath}`);
        }
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const GetAlternativeEmployee = async () => {
    if (formInfo.employeeId) {
      try {
        setIsLoading(true);
        const alternativeEmployeeResponse = await GeneralListApis(
          locale
        ).GetAlternativeEmployeeList(formInfo.employeeId);
        setAlternativeEmployeeList(alternativeEmployeeResponse);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  };

  const calculateDaysCount = () => {
    const isValidDate =
      dayjs(formInfo.fromDate).isValid() && dayjs(formInfo.toDate).isValid();

    if (formInfo.toDate && formInfo.fromDate && isValidDate) {
      const obj = {
        // toDate: formInfo.toDate,
        // fromDate: formInfo.fromDate,
        daysCount: formInfo.daysCount,
      };

      /* if (formInfo.vacCode === 5 || selectedLeave?.haveReplacementDay) {
        obj.toDate = formInfo.fromDate;
      } else {
        const dateDiffTo = formateDate(formInfo.toDate);
        const dateDiffFrom = formateDate(formInfo.fromDate);

        const daysCount = dayjs(dateDiffTo).diff(dateDiffFrom, "days");

        obj.daysCount = daysCount >= 0 ? daysCount + 1 : 0;
      } */
        const dateDiffTo = formateDate(formInfo.toDate);
        const dateDiffFrom = formateDate(formInfo.fromDate);

        const daysCount = dayjs(dateDiffTo).diff(dateDiffFrom, "days");

        obj.daysCount = daysCount >= 0 ? daysCount + 1 : 0;

      setFormInfo((prev) => ({ ...prev, ...obj }));
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    GetAlternativeEmployee();
  }, [formInfo.employeeId]);

  useEffect(() => {
    calculateDaysCount();
  }, [formInfo.toDate, formInfo.fromDate, formInfo.vacCode]);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    let errors = {};

    const formData = {
      id,

      employeeId: formInfo.employeeId,
      HasAlternativeEmp: formInfo.HasAlternativeEmp,

      VacDayChange: formInfo.vacDayChange ?? "",
      vacDocPath: formInfo.vacDocPath,
      ReplaceDate: formInfo.ReplaceDate ?? "",
      alternativeTask: formInfo.alternativeTask ?? "",

      trxDate: formateDate(formInfo.trxDate),
      fromDate: formateDate(formInfo.fromDate),
      replaceDate: formateDate(formInfo.replaceDate),
      toDate: formateDate(formInfo.toDate),
      daysCount: formInfo.daysCount,
      tel: formInfo.tel,
      doc: formInfo.doc ?? "",
      vacReson: formInfo.vacReson,
      address: formInfo.address,
      notes: formInfo.notes,
      exemptEntryRec: Boolean(formInfo.exemptEntryRec),
      exemptLeaveRec: Boolean(formInfo.exemptLeaveRec),
      alternativeStaff: formInfo.alternativeStaff ?? "",
      vacCode: formInfo.vacCode ?? "",
    };

    //if (formInfo.vacCode !== 5) {
      formData.toDate = formateDate(formInfo.toDate);

      if (formInfo.fromDate && formInfo.toDate) {
        const isFromDateLessThanToDate =
          new Date(formInfo.fromDate) <= new Date(formInfo.toDate);

        if (isFromDateLessThanToDate) {
          const { date, ...reset } = errors;

          errors = reset;
        } else {
          errors.date = intl.formatMessage(messages.fromDateLessThanToDate);
        }
      }
    //}

    const currentVacation = vacationsList.find(
      (vac) => vac.id === formInfo.vacCode
    );

    if (currentVacation?.hasAttachFile) {
      if (!formInfo.vacDocPath) {
        if (formInfo.doc) {
          const { doc, ...reset } = errors;

          errors = reset;
        } else {
          errors.doc = intl.formatMessage(messages.attachmentIsRequire);
        }
      }
    }

    /* if (formInfo.vacCode === 5) {
      if (!(formInfo.daysCount > 0 && formInfo.daysCount < 1)) {
        const { daysCount, ...reset } = errors;

        errors = reset;
      } else {
        errors.daysCount = intl.formatMessage(messages.daysCountShouldBeBetween0And1);
      }
    } */

    if (Object.keys(errors).length === 0) {
      setProcessing(true);
      setIsLoading(true);

      try {
        await api(locale).save(formData);

        toast.success(notif.saved);
        history.push(SITEMAP.vacation.LeaveTrx.route);
      } catch (error) {
        //
      } finally {
        setProcessing(false);
        setIsLoading(false);
      }
    } else {
      Object.keys(errors).forEach((key) => {
        toast.error(JSON.stringify(errors[key]));
      });
    }
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

  const onCancelBtnClick = () => {
    history.push(SITEMAP.vacation.LeaveTrx.route);
  };

  const onVacationChange = (_, value) => {

    if (value) {
      const leave = vacationsList.find((vac) => vac.id === value.id) ?? null;

      setFormInfo((prev) => ({
        ...prev,
        vacCode: value.id,
      }));
      /* if (value.id === 5 || leave?.haveReplacementDay) {
        setFormInfo((prev) => ({
          ...prev,
          vacCode: value.id,
          toDate: prev.fromDate,
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          vacCode: value.id,
        }));
      } */
    } else {
      setFormInfo((prev) => ({
        ...prev,
        vacCode: null,
        toDate: null,
        daysCount: "",
      }));
    }
  };

  const onAttachmentPopupClose = () => {
    setIsAttachmentPopupOpen(false);
  };

  const onAttachmentPopupBtnClick = () => {
    setIsAttachmentPopupOpen(true);
  };

  const getAttachmentType = () => {
    // documentUrl
    if (uploadedFile && typeof uploadedFile === "string") {
      return uploadedFile?.split(".").pop().toLowerCase().trim();
    }

    if (uploadedFile instanceof File) {
      return uploadedFile.type;
    }

    return "pdf";
  };

  const onDocumentInputChange = (evt) => {
    // check if uploaded file is larger than 1MB
    if (evt.target.files[0]) {
      if (evt.target.files[0].size < 10000000) {
        setFormInfo((prev) => ({
          ...prev,
          doc: evt.target.files?.[0],
        }));
        setUploadedFile(evt.target.files[0]);
      } else {
        toast.error(intl.formatMessage(messages.uploadFileErrorMes));
      }
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock
        whiteBg
        icon="border_color"
        desc=""
        title={
          id === 0
            ? intl.formatMessage(messages.leaveTrxCreateTitle)
            : intl.formatMessage(messages.leaveTrxUpdateTitle)
        }
      >
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={10} lg={7}  xl={6}>
              <EmployeeData
                handleEmpChange={handleChange}
                id={formInfo.employeeId}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={5} xl={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={6} md={3} lg={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={intl.formatMessage(messages.fromDate)}
                          value={
                            formInfo.fromDate ? dayjs(formInfo.fromDate) : null
                          }
                          className={classes.field}
                          onChange={(date) => {
                            setFormInfo((prev) => ({
                              ...prev,
                              fromDate: date,
                            }));
                          }}
                          onError={(error, value) => {
                            if (error !== null) {
                              setDateError((prevState) => ({
                                ...prevState,
                                fromDate: true,
                              }));
                            } else {
                              setDateError((prevState) => ({
                                ...prevState,
                                fromDate: false,
                              }));
                            }
                          }}
                          slotProps={{
                            textField: {
                              required: true,
                            },
                          }}
                          disabled={empid ? true : false}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6} md={3} lg={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={intl.formatMessage(messages.toDate)}
                          value={
                            formInfo.toDate ? dayjs(formInfo.toDate) : null
                          }
                          className={classes.field}
                          onChange={(date) => {
                            setFormInfo((prev) => ({
                              ...prev,
                              toDate: date,
                            }));
                          }}
                          /* disabled={
                            formInfo.vacCode === 5 ||
                            selectedLeave?.haveReplacementDay
                          } */
                          onError={(error, value) => {
                            if (error !== null) {
                              setDateError((prevState) => ({
                                ...prevState,
                                toDate: true,
                              }));
                            } else {
                              setDateError((prevState) => ({
                                ...prevState,
                                toDate: false,
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

                    <Grid item xs={6} md={3} lg={6}>
                      <TextField
                        name="daysCount"
                        value={formInfo.daysCount}
                        /* disabled={formInfo.vacCode !== 5} */
                        onChange={(evt) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            daysCount: evt.target.value,
                          }));
                        }}
                        label={intl.formatMessage(messages.daysCount)}
                        type="number"
                        //inputProps={{ step: 0.1, min: 0, max: 1 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid>

                    {/* <Grid item xs={12} md={3}>
                      <TextField
                        name="dayDeducedBy"
                        value={formInfo.dayDeducedBy}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.dayDeducedBy)}
                        className={classes.field}
                        disabled
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid> */}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}  xl={10}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={intl.formatMessage(payrollMessages.date)}
                          value={
                            formInfo.trxDate ? dayjs(formInfo.trxDate) : null
                          }
                          className={classes.field}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              trxDate: date,
                            }));
                          }}
                          onError={(error, value) => {
                            if (error !== null) {
                              setDateError((prevState) => ({
                                ...prevState,
                                trxDate: true,
                              }));
                            } else {
                              setDateError((prevState) => ({
                                ...prevState,
                                trxDate: false,
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

                    <Grid item xs={12} md={4}  lg={6} xl={5}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                      >
                        <Autocomplete
                          value={
                            vacationsList.find(
                              (vac) => vac.id === formInfo.vacCode
                            ) ?? null
                          }
                          options={vacationsList}
                          getOptionLabel={(option) => option.name ?? ""}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          onChange={onVacationChange}
                          sx={{
                            width: "100%",
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="outlined"
                              required
                              {...params}
                              name="vacation"
                              label={intl.formatMessage(messages.vacationType)}
                            />
                          )}
                        />

                        <VacationBalancePopup
                          employeeId={formInfo.employeeId}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}  lg={6} xl={5}>
                      <Autocomplete
                        options={alternativeEmployeeList}
                        value={
                          alternativeEmployeeList.find(
                            (alt) => alt.id === formInfo.alternativeStaff
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : "")}
                        onChange={(_, value) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            alternativeStaff: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            required={formInfo.HasAlternativeEmp}
                            {...params}
                            label={intl.formatMessage(
                              messages.alternativeEmployee
                            )}
                          />
                        )}
                      />
                    </Grid>

                    {selectedLeave?.haveReplacementDay && (
                      <Grid item xs={12} md={4}  lg={6} xl={5}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label={intl.formatMessage(messages.replaceDate)}
                            value={
                              formInfo.replaceDate
                                ? dayjs(formInfo.replaceDate)
                                : null
                            }
                            className={classes.field}
                            onChange={(date) => {
                              setFormInfo((prevFilters) => ({
                                ...prevFilters,
                                replaceDate: date,
                              }));
                            }}
                            onError={(error, value) => {
                              if (error !== null) {
                                setDateError((prevState) => ({
                                  ...prevState,
                                  replaceDate: true,
                                }));
                              } else {
                                setDateError((prevState) => ({
                                  ...prevState,
                                  replaceDate: false,
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
                    )}

                    <Grid item>
                      <Stack direction="row" alignItems="center" gap={3}>
                        <div>
                          <input
                            accept="image/*, .pdf, .doc, .docx"
                            id="attachment-button-file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={onDocumentInputChange}
                          />
                          <label htmlFor="attachment-button-file">
                            <Button variant="contained" component="span">
                              <FormattedMessage
                                {...messages.uploadAttachment}
                              />
                            </Button>
                          </label>
                        </div>

                        {uploadedFile && (
                          <Button
                            variant="outlined"
                            component="span"
                            onClick={onAttachmentPopupBtnClick}
                          >
                            <FormattedMessage {...payrollMessages.preview} />
                          </Button>
                        )}
                      </Stack>

                      <FileViewerPopup
                        handleClose={onAttachmentPopupClose}
                        open={isAttachmentPopupOpen}
                        uploadedFileType={getAttachmentType()}
                        uploadedFile={uploadedFile}
                        validImageTypes={validImageTypes}
                        validPDFTypes={validPDFTypes}
                      />
                    </Grid>

                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        onChange={(evt) =>
                          setFormInfo((prev) => ({
                            ...prev,
                            exemptLeaveRec: evt.target.checked,
                          }))
                        }
                        checked={formInfo.exemptLeaveRec}
                        label={intl.formatMessage(messages.exemptLeaveRec)}
                      />
                    </Grid>

                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        onChange={(evt) =>
                          setFormInfo((prev) => ({
                            ...prev,
                            exemptEntryRec: evt.target.checked,
                          }))
                        }
                        checked={formInfo.exemptEntryRec}
                        label={intl.formatMessage(messages.exemptEntryRec)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12} xl={10}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={6}>
                      <TextField
                        name="tel"
                        value={formInfo.tel}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.telNumber)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="address"
                        value={formInfo.address}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.address)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="vacReson"
                        value={formInfo.vacReson}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.leaveReason)}
                        className={classes.field}
                        variant="outlined"
                        multiline
                        rows={1}
                        required
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="notes"
                        value={formInfo.notes}
                        onChange={onInputChange}
                        label={intl.formatMessage(payrollMessages.notes)}
                        className={classes.field}
                        variant="outlined"
                        multiline
                        rows={1}
                        autoComplete="off"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}></Grid>

            <Grid item  >
              <SaveButton Id={id} processing={processing} />
            </Grid>
            <Grid item  >
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={onCancelBtnClick}
              >
                <FormattedMessage {...payrollMessages.cancel} />
              </Button>
            </Grid>

          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

LeaveTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LeaveTrxCreate);
