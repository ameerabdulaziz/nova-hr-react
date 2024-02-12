import {
  Autocomplete,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import EmployeeData from "../../Component/EmployeeData";
import PayRollLoader from "../../Component/PayRollLoader";
import SaveButton from "../../Component/SaveButton";
import useStyles from "../../Style";
import api from "../api/SocialInsuranceData";
import messages from "../messages";

function SocialInsuranceData(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem("MenuName");
  const { classes } = useStyles();

  const [insuranceOfficeList, setInsuranceOfficeList] = useState([]);
  const [insuranceJobList, setInsuranceJobList] = useState([]);
  const [branchInsuranceList, setBranchInsuranceList] = useState([]);

  const [isCalculateInsurance, setIsCalculateInsurance] = useState(false);
  const [isInsured, setIsInsured] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formInfo, setFormInfo] = useState({
    employeeId: "",
    HasAlternativeEmp: false,

    insNotes: "",
    showSpecialInsurance: false,

    ka3bDate: null,
    ka3bNo: "",

    c1inNo: "",
    c6inNo: "",
    c1inDate: null,
    c6inDate: null,
  });

  const [insuredState, setInsuredState] = useState({
    insuranceDate: null,
    socialInsuranceId: "",
    insuJobId: null,
    insuOfficeId: null,
    mainSalary: "",
    branchInsurance: null,
    insGrossSalary: "",
    mainSalaryNew: "",
  });
  const [fixedShareState, setFixedShareState] = useState({
    empFixedShare: "",
    compFixedShare: "",
  });

  const handleEmpChange = useCallback((id, name) => {
    if (name == "employeeId")
    setFormInfo((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
  }, []);

  const onInsuredNumericInputChange = (evt) => {
    setInsuredState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ""),
    }));
  };

  const onFixedShareNumericInputChange = (evt) => {
    setFixedShareState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ""),
    }));
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const office = await api(locale).GetSInsuranceOffices();
      setInsuranceOfficeList(office);

      const jobs = await api(locale).GetSInsuranceJob();
      setInsuranceJobList(jobs);

      const organizations = await api(locale).GetSInsuranceOrgnization();
      setBranchInsuranceList(organizations);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const GetEmployeeInfo = async () => {
    if (formInfo.employeeId) {
      try {
        setIsLoading(true);
        const response = await api(locale).GetSInsuranceEmployeeInfo(
          formInfo.employeeId
        );

        setIsInsured(response.isInsured);
        setIsCalculateInsurance(response.calcSifromEmpRecordValue);

        setInsuredState({
          insuranceDate: response.insuranceDate,
          socialInsuranceId: response.socialInsuranceId,
          insuJobId: response.insuJobId,
          insuOfficeId: response.insuOfficeId,
          mainSalary: response.mainSalary,
          branchInsurance: response.branchInsurance,
          insGrossSalary: response.insGrossSalary,
          mainSalaryNew: response.mainSalaryNew,
        });

        setFixedShareState({
          empFixedShare: response.empFixedShare,
          compFixedShare: response.compFixedShare,
        });

        setFormInfo((prev) => ({
          ...prev,
          insNotes: response.insNotes,
          showSpecialInsurance: response.showSpecialInsurance,
          ka3bDate: response.ka3bDate,
          ka3bNo: response.ka3bNo,
          c1inNo: response.c1inNo,
          c6inNo: response.c6inNo,
          c1inDate: response.c1inDate,
          c6inDate: response.c6inDate,
        }));
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    let errors = {};

    if (formInfo.c1inNo || formInfo.c6inNo) {
      if (insuredState.socialInsuranceId) {
        const { insuranceNumber, ...reset } = errors;

        errors = reset;
      } else {
        errors.insuranceNumber = intl.formatMessage(
          messages.insuranceNumberIsRequire
        );
      }
    }

    if (Object.keys(errors).length === 0) {
      let formData = {
        ...formInfo,
        isInsured,
        calcSifromEmpRecordValue: isCalculateInsurance,
      };

      setProcessing(true);
      setIsLoading(true);

      if (isCalculateInsurance) {
        formData = { ...formData, ...fixedShareState };
      }

      try {
        await api(locale).save(formData);

        toast.success(notif.saved);
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

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    GetEmployeeInfo();
  }, [formInfo.employeeId]);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ""),
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" desc="" title={Title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={12}>
              <EmployeeData handleEmpChange={handleEmpChange} id={formInfo.employeeId} />
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12}>
                      <TextField
                        name="insNotes"
                        value={formInfo.insNotes}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.hrNotes)}
                        className={classes.field}
                        variant="outlined"
                        multiline
                        rows={1}
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isInsured}
                        onChange={(evt) => setIsInsured(evt.target.checked)}
                      />
                    }
                    label={intl.formatMessage(messages.insured)}
                  />

                  <Grid
                    container
                    spacing={3}
                    mt={0}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name="socialInsuranceId"
                        value={insuredState.socialInsuranceId}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.insuranceNumber)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.insuranceDate)}
                          value={insuredState.insuranceDate}
                          disabled={!isInsured}
                          onChange={(date) => {
                            setInsuredState((prevFilters) => ({
                              ...prevFilters,
                              insuranceDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              required
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={insuranceOfficeList}
                        disabled={!isInsured}
                        value={
                          insuranceOfficeList.find(
                            (alt) => alt.id === insuredState.insuOfficeId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : "")}
                        onChange={(_, value) => {
                          setInsuredState((prev) => ({
                            ...prev,
                            insuOfficeId: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.insuranceOffice)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={insuranceJobList}
                        disabled={!isInsured}
                        value={
                          insuranceJobList.find(
                            (alt) => alt.id === insuredState.insuJobId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : "")}
                        onChange={(_, value) => {
                          setInsuredState((prev) => ({
                            ...prev,
                            insuJobId: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.insuranceJob)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name="mainSalary"
                        value={insuredState.mainSalary}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.insuranceSalary)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={branchInsuranceList}
                        disabled={!isInsured}
                        value={
                          branchInsuranceList.find(
                            (alt) => alt.id === insuredState.branchInsurance
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : "")}
                        onChange={(_, value) => {
                          setInsuredState((prev) => ({
                            ...prev,
                            branchInsurance: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label={intl.formatMessage(messages.branchInsurance)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name="insGrossSalary"
                        value={insuredState.insGrossSalary}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.grossSalary)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name="mainSalaryNew"
                        value={insuredState.mainSalaryNew}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.mainSalary)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isCalculateInsurance}
                        onChange={(evt) =>
                          setIsCalculateInsurance(evt.target.checked)
                        }
                      />
                    }
                    label={intl.formatMessage(
                      messages.calculateInsuranceFromTheFollowingValue
                    )}
                  />

                  <Grid
                    my={0}
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name="empFixedShare"
                        value={fixedShareState.empFixedShare}
                        required
                        disabled={!isCalculateInsurance}
                        onChange={onFixedShareNumericInputChange}
                        label={intl.formatMessage(messages.employeeFixedShare)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name="compFixedShare"
                        value={fixedShareState.compFixedShare}
                        required
                        disabled={!isCalculateInsurance}
                        onChange={onFixedShareNumericInputChange}
                        label={intl.formatMessage(messages.companyFixedShare)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>

                  <Typography mt={3} color="gray">
                    <FormattedMessage
                      {...messages.percentageInsuranceSalaryMessage}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    mb={3}
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name="c1inNo"
                        value={formInfo.c1inNo}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.c1IncomingNumber)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.c1DeliverDate)}
                          value={formInfo.c1inDate}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              c1inDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name="c6inNo"
                        value={formInfo.c6inNo}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.c6IncomingNumber)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.c6DeliverDate)}
                          value={formInfo.c6inDate}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              c6inDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
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
                          label={intl.formatMessage(messages.workLetterDate)}
                          value={formInfo.ka3bDate}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              ka3bDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name="ka3bNo"
                        value={formInfo.ka3bNo}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.workLetterNumber)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <SaveButton processing={processing} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(SocialInsuranceData);
