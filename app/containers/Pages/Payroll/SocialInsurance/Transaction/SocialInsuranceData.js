import {
  Autocomplete,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import payrollMessages from '../../messages';
import api from '../api/SocialInsuranceData';
import messages from '../messages';

function SocialInsuranceData(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');
  const { classes } = useStyles();

  const [insuranceOfficeList, setInsuranceOfficeList] = useState([]);
  const [insuranceJobList, setInsuranceJobList] = useState([]);
  const [branchInsuranceList, setBranchInsuranceList] = useState([]);
  const [calculationTemplateList, setCalculationTemplateList] = useState([]);

  const [isInsured, setIsInsured] = useState(false);
  const [DateError, setDateError] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formInfo, setFormInfo] = useState({
    employeeId: '',
    HasAlternativeEmp: false,

    insNotes: '',
    showSpecialInsurance: false,

    ka3bDate: null,
    ka3bNo: '',

    c1inNo: '',
    c6inNo: '',
    c1inDate: null,
    c6inDate: null,
  });

  const [insuredState, setInsuredState] = useState({
    insuranceDate: null,
    socialInsuranceId: '',
    insuJobId: null,
    insuOfficeId: null,
    mainSalary: '',
    branchInsurance: null,
    insGrossSalary: '',
    mainSalaryNew: '',
    calculationTemplateId: null,
  });

  const handleEmpChange = useCallback((id, name) => {
    if (name == 'employeeId') {
      setFormInfo((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
    }
  }, []);

  const onInsuredNumericInputChange = (evt) => {
    setInsuredState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
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

      const insuranceTemplate = await api(
        locale
      ).SinsuranceCalculationTemplate();
      setCalculationTemplateList(insuranceTemplate);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const resetFields = () => {
    setIsInsured(false);

    setInsuredState({
      insuranceDate: null,
      socialInsuranceId: '',
      insuJobId: null,
      insuOfficeId: null,
      mainSalary: '',
      branchInsurance: null,
      insGrossSalary: '',
      mainSalaryNew: '',
      calculationTemplateId: null,
    });

    setFormInfo((prev) => ({
      ...prev,
      insNotes: '',
      showSpecialInsurance: false,
      ka3bDate: null,
      ka3bNo: '',
      c1inNo: '',
      c6inNo: '',
      c1inDate: null,
      c6inDate: null,
    }));
  };

  const GetEmployeeInfo = async () => {
    if (formInfo.employeeId) {
      try {
        setIsLoading(true);
        const response = await api(locale).GetSInsuranceEmployeeInfo(
          formInfo.employeeId
        );

        setIsInsured(response.isInsured ?? false);

        setInsuredState({
          insuranceDate: response.insuranceDate ?? null,
          socialInsuranceId: response.socialInsuranceId ?? '',
          insuJobId: response.insuJobId ?? null,
          insuOfficeId: response.insuOfficeId ?? null,
          mainSalary: response.mainSalary ?? '',
          branchInsurance: response.branchInsurance ?? null,
          insGrossSalary: response.insGrossSalary ?? '',
          mainSalaryNew: response.mainSalaryNew ?? '',
          calculationTemplateId: response.calculationTemplateId ?? null,
        });

        setFormInfo((prev) => ({
          ...prev,
          insNotes: response.insNotes ?? '',
          showSpecialInsurance: response.showSpecialInsurance ?? false,
          ka3bDate: response.ka3bDate ?? null,
          ka3bNo: response.ka3bNo ?? '',
          c1inNo: response.c1inNo ?? '',
          c6inNo: response.c6inNo ?? '',
          c1inDate: response.c1inDate ?? null,
          c6inDate: response.c6inDate ?? null,
        }));
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    } else {
      resetFields();
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

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

    if (insuredState.socialInsuranceId.length > 20) {
      errors.socialInsuranceId = intl.formatMessage(
        messages.socialInsuranceNumberMustBeLessThan20Number
      );
    } else {
      const { socialInsuranceId, ...reset } = errors;

      errors = reset;
    }

    if (Object.keys(errors).length === 0) {
      let formData = {
        ...formInfo,
        isInsured,
        calculationTemplateId: insuredState.calculationTemplateId,
      };

      setProcessing(true);
      setIsLoading(true);

      if (isInsured) {
        formData = { ...formData, ...insuredState };
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
        toast.error(errors[key]);
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
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={Title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={12}>
              <EmployeeData
                handleEmpChange={handleEmpChange}
                id={formInfo.employeeId}
              />
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card} sx={{ mt: '0!important' }}>
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
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={calculationTemplateList}
                        value={
                          calculationTemplateList.find(
                            (item) => item.id === insuredState.calculationTemplateId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setInsuredState((prev) => ({
                            ...prev,
                            calculationTemplateId:
                              value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            required={isInsured}
                            {...params}
                            label={intl.formatMessage(
                              messages.calculationTemplate
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='socialInsuranceId'
                        value={insuredState.socialInsuranceId}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.insuranceNumber)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={intl.formatMessage(messages.insuranceDate)}
                          value={
                            insuredState.insuranceDate
                              ? dayjs(insuredState.insuranceDate)
                              : null
                          }
                          className={classes.field}
                          disabled={!isInsured}
                          onChange={(date) => {
                            setInsuredState((prevFilters) => ({
                              ...prevFilters,
                              insuranceDate: date,
                            }));
                          }}
                          onError={(error, value) => {
                            if (error !== null) {
                              setDateError((prevState) => ({
                                ...prevState,
                                insuranceDate: true,
                              }));
                            } else {
                              setDateError((prevState) => ({
                                ...prevState,
                                insuranceDate: false,
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

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={insuranceOfficeList}
                        disabled={!isInsured}
                        value={
                          insuranceOfficeList.find(
                            (alt) => alt.id === insuredState.insuOfficeId
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
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
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setInsuredState((prev) => ({
                            ...prev,
                            insuJobId: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={intl.formatMessage(messages.insuranceJob)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='mainSalary'
                        value={insuredState.mainSalary}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.insuranceSalary)}
                        fullWidth
                        variant='outlined'
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
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
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
                        name='insGrossSalary'
                        value={insuredState.insGrossSalary}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.grossSalary)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='mainSalaryNew'
                        value={insuredState.mainSalaryNew}
                        disabled={!isInsured}
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.mainSalary)}
                        fullWidth
                        variant='outlined'
                        autoComplete='off'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card className={classes.card} sx={{ mt: '0!important' }}>
                    <CardContent>
                      <Grid
                        container
                        mb={3}
                        spacing={3}
                        alignItems='flex-start'
                        direction='row'
                      >
                        <Grid item xs={12} md={6}>
                          <TextField
                            name='c1inNo'
                            value={formInfo.c1inNo}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(
                              messages.c1IncomingNumber
                            )}
                            fullWidth
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label={intl.formatMessage(messages.c1DeliverDate)}
                              value={
                                formInfo.c1inDate
                                  ? dayjs(formInfo.c1inDate)
                                  : null
                              }
                              className={classes.field}
                              onChange={(date) => {
                                setFormInfo((prevFilters) => ({
                                  ...prevFilters,
                                  c1inDate: date,
                                }));
                              }}
                              onError={(error, value) => {
                                if (error !== null) {
                                  setDateError((prevState) => ({
                                    ...prevState,
                                    c1inDate: true,
                                  }));
                                } else {
                                  setDateError((prevState) => ({
                                    ...prevState,
                                    c1inDate: false,
                                  }));
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        spacing={3}
                        alignItems='flex-start'
                        direction='row'
                      >
                        <Grid item xs={12} md={6}>
                          <TextField
                            name='c6inNo'
                            value={formInfo.c6inNo}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(
                              messages.c6IncomingNumber
                            )}
                            fullWidth
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label={intl.formatMessage(messages.c6DeliverDate)}
                              value={
                                formInfo.c6inDate
                                  ? dayjs(formInfo.c6inDate)
                                  : null
                              }
                              className={classes.field}
                              onChange={(date) => {
                                setFormInfo((prevFilters) => ({
                                  ...prevFilters,
                                  c6inDate: date,
                                }));
                              }}
                              onError={(error, value) => {
                                if (error !== null) {
                                  setDateError((prevState) => ({
                                    ...prevState,
                                    c6inDate: true,
                                  }));
                                } else {
                                  setDateError((prevState) => ({
                                    ...prevState,
                                    c6inDate: false,
                                  }));
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card className={classes.card} sx={{ mt: '0!important' }}>
                    <CardContent>
                      <Grid
                        container
                        spacing={3}
                        alignItems='flex-start'
                        direction='row'
                      >
                        <Grid item xs={12} md={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label={intl.formatMessage(
                                messages.workLetterDate
                              )}
                              value={
                                formInfo.ka3bDate
                                  ? dayjs(formInfo.ka3bDate)
                                  : null
                              }
                              className={classes.field}
                              onChange={(date) => {
                                setFormInfo((prevFilters) => ({
                                  ...prevFilters,
                                  ka3bDate: date,
                                }));
                              }}
                              onError={(error, value) => {
                                if (error !== null) {
                                  setDateError((prevState) => ({
                                    ...prevState,
                                    ka3bDate: true,
                                  }));
                                } else {
                                  setDateError((prevState) => ({
                                    ...prevState,
                                    ka3bDate: false,
                                  }));
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            name='ka3bNo'
                            value={formInfo.ka3bNo}
                            onChange={onNumericInputChange}
                            label={intl.formatMessage(
                              messages.workLetterNumber
                            )}
                            fullWidth
                            variant='outlined'
                            autoComplete='off'
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='insNotes'
                value={formInfo.insNotes}
                onChange={onInputChange}
                label={intl.formatMessage(messages.hrNotes)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
                autoComplete='off'
              />
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

SocialInsuranceData.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SocialInsuranceData);
