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
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import React, { useEffect, useState,useCallback } from "react";
import { toast } from "react-hot-toast";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import FileViewerPopup from "../../../../../components/Popup/fileViewerPopup";
import EmployeeData from "../../Component/EmployeeData";
import GovernmentVacationPopup from "../../Component/GovernmentVacationPopup";
import PayRollLoader from "../../Component/PayRollLoader";
import SaveButton from "../../Component/SaveButton";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import Payrollmessages from "../../messages";
import { ServerURL } from "../../api/ServerConfig";
import PropTypes from 'prop-types';
import api from "../api/GovernmentSickLeaveData";
import messages from "../messages";

function GovernmentSickLeaveCreate(props) {
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
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const { classes } = useStyles();
  const history = useHistory();

  const [vacationsList, setVacationsList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [alternativeEmployeeList, setAlternativeEmployeeList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isAttachmentPopupOpen, setIsAttachmentPopupOpen] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,
    employeeId: "",
    HasAlternativeEmp: false,

    yearId: null,
    monthId: null,

    VacDayChange: '',
    vacDocPath: null,
    ReplaceDate: '',
    alternativeTask: null,

    trxDate: null,
    fromDate: null,
    toDate: null,
    daysCount: "",
    dayDeducedBy: "",
    tel: "",
    doc: null,
    vacReson: "",
    address: "",
    notes: "",
    deductAnual: false,
    alternativeStaff: null,
    vacCode: null,
  });

  const handleChange = useCallback((id,name) => {
    if(name=="employeeId")
    setFormInfo((prevFilters) => ({
      ...prevFilters,
      employeeId: id,
    }));

    if(name=="HasAlternativeEmp")
    setFormInfo((prevFilters) => ({
      ...prevFilters,
      HasAlternativeEmp: id,
    }));
    
  }, []);

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const vacationResponse = await GeneralListApis(
        locale
      ).GetGovernmentSickVacList();
      setVacationsList(vacationResponse);

      const yearResponse = await GeneralListApis(locale).GetYears();
      setYearsList(yearResponse);

      const monthResponse = await GeneralListApis(locale).GetMonths();
      setMonthsList(monthResponse);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo(dataApi);
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
    if (formInfo.toDate && formInfo.fromDate) {
      const obj = {
        toDate: formInfo.toDate,
        fromDate: formInfo.fromDate,
        daysCount: formInfo.daysCount,
      };

      if (formInfo.vacCode === 5) {
        obj.toDate = formInfo.fromDate;
        obj.daysCount = 0.5;
      } else {
        const dateDiffTo = new Date(formInfo.toDate).getTime();
        const dateDiffFrom = new Date(formInfo.fromDate).getTime();

        const timeDiff = dateDiffTo - dateDiffFrom;

        const daysCount = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        obj.daysCount = timeDiff >= 0 ? daysCount + 1 : 0;
      }

      setFormInfo((prev) => ({ ...prev, ...obj }));
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    calculateDaysCount();
  }, [formInfo.toDate, formInfo.fromDate]);

  useEffect(() => {
    GetAlternativeEmployee();
  }, [formInfo.employeeId]);

  const formateDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd") : null;

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    let errors = {};

    const formData = { ...formInfo };

    if (formInfo.vacCode !== 5) {
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
    }

    if (formInfo.vacCode === 5) {
      if (!formInfo.vacDocPath) {
        if (formInfo.doc) {
          const { attachment, ...reset } = errors;

          errors = reset;
        } else {
          errors.attachment = intl.formatMessage(messages.attachmentIsRequire);
        }
      }
    }

    if (Object.keys(errors).length === 0) {
      formData.trxDate = formateDate(formData.trxDate);
      formData.fromDate = formateDate(formData.fromDate);
      formData.toDate = formateDate(formData.toDate);

      setProcessing(true);
      setIsLoading(true);

      try {
        await api(locale).save({
          id,
          employeeId: formData.employeeId,
          HasAlternativeEmp: formData.HasAlternativeEmp,

          yearId: formData.yearId ?? '',
          monthId: formData.monthId ?? '',

          VacDayChange: formData.VacDayChange ?? '',
          vacDocPath: formData.vacDocPath,
          ReplaceDate: formData.ReplaceDate ?? '',
          alternativeTask: formData.alternativeTask,

          trxDate: formData.trxDate,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          daysCount: formData.daysCount,
          dayDeducedBy: formData.dayDeducedBy,
          tel: formData.tel,
          doc: formData.doc,
          vacReson: formData.vacReson,
          address: formData.address,
          notes: formData.notes,
          deductAnual: formData.deductAnual,
          alternativeStaff: formData.alternativeStaff ?? '',
          vacCode: formData.vacCode,
        });

        toast.success(notif.saved);
        history.push("/app/Pages/vac/GovernmentSickLeave");
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
    history.push("/app/Pages/vac/GovernmentSickLeave");
  };

  const onVacationChange = (_, value) => {
    if (value) {
      if (value.id === 5) {
        setFormInfo((prev) => ({
          ...prev,
          vacCode: value.id,
          toDate: prev.fromDate,
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          vacCode: value.id,
          toDate: null,
          daysCount: "",
        }));
      }
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

  const onDocumentInputChange = evt => {
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
            ? intl.formatMessage(messages.GovernmentSickLeaveCreateTitle)
            : intl.formatMessage(messages.GovernmentSickLeaveUpdateTitle)
        }
      >
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={12}>
              <EmployeeData handleEmpChange={handleChange} id={formInfo.employeeId} />
            </Grid>

            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(Payrollmessages.date)}
                          value={formInfo.trxDate}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              trxDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} required />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={4}>
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
                          fullWidth
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              name="vacCode"
                              label={intl.formatMessage(messages.vacationType)}
                            />
                          )}
                        />

                        <GovernmentVacationPopup
                          vacationId={formInfo.vacCode}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
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
                            required={formInfo.HasAlternativeEmp}
                            {...params}
                            label={intl.formatMessage(
                              messages.alternativeEmployee
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <Autocomplete
                        value={
                          monthsList.find(
                            (month) => month.id === formInfo.monthId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : "")}
                        options={monthsList}
                        onChange={(_, value) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            monthId: value?.id,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required={formInfo.HasAlternativeEmp}
                            {...params}
                            label={intl.formatMessage(messages.Month)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <Autocomplete
                        value={
                          yearsList.find(
                            (year) => year.id === formInfo.yearId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : "")}
                        options={yearsList}
                        onChange={(_, value) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            yearId: value?.id,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required={formInfo.HasAlternativeEmp}
                            {...params}
                            label={intl.formatMessage(messages.year)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack direction="row" alignItems="center" spacing={2}>
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
                            component="span"
                            onClick={onAttachmentPopupBtnClick}
                          >
                            <FormattedMessage {...Payrollmessages.preview} />
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

                    <Grid item md={3}>
                      <FormControlLabel
                        control={<Checkbox />}
                        onChange={(evt) =>
                          setFormInfo((prev) => ({
                            ...prev,
                            deductAnual: evt.target.checked,
                          }))
                        }
                        checked={formInfo.deductAnual}
                        label={intl.formatMessage(messages.reducedFromAnnual)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.fromdate)}
                          value={formInfo.fromDate}
                          maxDate={
                            formInfo.vacCode !== 5 ? formInfo.toDate : null
                          }
                          onChange={(date) => {
                            setFormInfo((prev) => ({
                              ...prev,
                              fromDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} required />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.todate)}
                          value={formInfo.toDate}
                          disabled={formInfo.vacCode === 5}
                          onChange={(date) => {
                            setFormInfo((prev) => ({
                              ...prev,
                              toDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} required />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name="daysCount"
                        value={formInfo.daysCount}
                        disabled
                        label={intl.formatMessage(messages.daysCount)}
                        className={classes.field}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name="dayDeducedBy"
                        value={formInfo.dayDeducedBy}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.dayDeducedBy)}
                        className={classes.field}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
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
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="address"
                        value={formInfo.address}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.address)}
                        className={classes.field}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="vacReson"
                        multiline
                        rows={3}
                        value={formInfo.vacReson}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.leaveReason)}
                        className={classes.field}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name="notes"
                        multiline
                        rows={3}
                        value={formInfo.notes}
                        onChange={onInputChange}
                        label={intl.formatMessage(Payrollmessages.notes)}
                        className={classes.field}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={1}>
              <SaveButton Id={id} processing={processing} />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={onCancelBtnClick}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

GovernmentSickLeaveCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(GovernmentSickLeaveCreate);
