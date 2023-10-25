import {
  Autocomplete,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
import api from '../api/MedicalInsuranceData';
import messages from '../messages';

function MedicalInsuranceData(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');
  const { classes } = useStyles();

  const [companyList, setCompanyList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [hasMedicalCert, setHasMedicalCert] = useState(false);
  const [hasPrivateInsurance, setHasPrivateInsurance] = useState(false);
  const [hasGovernmentInsurance, setHasGovernmentInsurance] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    employeeId: '',
    medInsNotes: '',
  });

  const [governmentInsuranceState, setGovernmentMedicalState] = useState({
    govMedCareEnd: null,
    govMediCardNumber: '',
  });

  const [certState, setCertState] = useState({
    medCertExpDate: null,
    medCertIssueDate: null,
  });

  const [privateInsuranceState, setPrivateMedicalState] = useState({
    privlMedCareNumber: '',
    medInsuCatId: '',
    medCareEndDate: null,
    familyMedcare: '',
    insuCompanyId: null
  });

  const handleEmpChange = useCallback((id, name) => {
    if (name === 'employeeId') {
      setFormInfo((prevFilters) => ({
        ...prevFilters,
        employeeId: id,
      }));
    }
  }, []);

  const onGovernmentNumericInputChange = (evt) => {
    setGovernmentMedicalState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onPrivateNumericInputChange = (evt) => {
    setPrivateMedicalState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const company = await api(locale).GetMinsuranceCompany();
      setCompanyList(company);

      const category = await api(locale).GetMinsuranceCategory();
      setCategoryList(category);
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
        const response = await api(locale).GetEmployeeById(
          formInfo.employeeId
        );

        setHasGovernmentInsurance(response.govMedicallyInsured);
        setHasPrivateInsurance(response.privMedCareInsured);
        setHasMedicalCert(response.hasMedCert);

        setGovernmentMedicalState({
          govMedCareEnd: response.govMedCareEnd,
          govMediCardNumber: response.govMediCardNumber,
        });

        setCertState({
          medCertIssueDate: response.medCertIssueDate,
          medCertExpDate: response.medCertExpDate,
        });

        setPrivateMedicalState({
          privlMedCareNumber: response.privlMedCareNumber,
          medInsuCatId: response.medInsuCatId,
          medCareEndDate: response.medCareEndDate,
          familyMedcare: response.familyMedcare,
          insuCompanyId: response.insuCompanyId,
        });

        setFormInfo((prev) => ({
          ...prev,
          medInsNotes: response.medInsNotes,
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

    let formData = {
      ...formInfo,
      govMedicallyInsured: hasGovernmentInsurance,
      privMedCareInsured: hasPrivateInsurance,
      hasMedCert: hasMedicalCert,
    };

    setIsLoading(true);

    if (hasPrivateInsurance) {
      formData = { ...formData, ...privateInsuranceState };
    }

    if (hasMedicalCert) {
      formData = { ...formData, ...certState };
    }

    if (hasGovernmentInsurance) {
      formData = { ...formData, ...governmentInsuranceState };
    }

    try {
      await api(locale).Save(formData);

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
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
                        name="medInsNotes"
                        value={formInfo.medInsNotes}
                        required
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.hrNotes)}
                        className={classes.field}
                        variant="outlined"
                        multiline
                        rows={1}
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
                        checked={hasGovernmentInsurance}
                        onChange={(evt) => setHasGovernmentInsurance(evt.target.checked)}
                      />
                    }
                    label={intl.formatMessage(messages.governmentMedicalInsurance)}
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
                        name="govMediCardNumber"
                        value={governmentInsuranceState.govMediCardNumber}
                        disabled={!hasGovernmentInsurance}
                        required
                        onChange={onGovernmentNumericInputChange}
                        label={intl.formatMessage(messages.medicalCardNumber)}
                        className={classes.field}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.cardExpireDate)}
                          value={governmentInsuranceState.govMedCareEnd}
                          disabled={!hasGovernmentInsurance}
                          onChange={(date) => {
                            setGovernmentMedicalState((prevFilters) => ({
                              ...prevFilters,
                              govMedCareEnd: date,
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
                        checked={hasPrivateInsurance}
                        onChange={(evt) => setHasPrivateInsurance(evt.target.checked)}
                      />
                    }
                    label={intl.formatMessage(messages.privateMedicalInsurance)}
                  />

                  <Grid
                    container
                    spacing={3}
                    mt={0}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={companyList}
                        value={
                          companyList.find((item) => item.id === privateInsuranceState.insuCompanyId) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setPrivateMedicalState((prev) => ({
                            ...prev,
                            insuCompanyId: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={intl.formatMessage(messages.insuranceCompany)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={categoryList}
                        value={
                          categoryList.find((item) => item.id === privateInsuranceState.medInsuCatId) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setPrivateMedicalState((prev) => ({
                            ...prev,
                            medInsuCatId: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={intl.formatMessage(messages.insuranceCategory)}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name="privlMedCareNumber"
                        value={privateInsuranceState.privlMedCareNumber}
                        disabled={!hasPrivateInsurance}
                        required
                        onChange={onPrivateNumericInputChange}
                        label={intl.formatMessage(messages.medicalCardNumber)}
                        className={classes.field}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.medicalEndDate)}
                          value={privateInsuranceState.medCareEndDate}
                          disabled={!hasPrivateInsurance}
                          onChange={(date) => {
                            setPrivateMedicalState((prevFilters) => ({
                              ...prevFilters,
                              medCareEndDate: date,
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
                      <TextField
                        name="familyMedcare"
                        value={privateInsuranceState.familyMedcare}
                        disabled={!hasPrivateInsurance}
                        required
                        onChange={onPrivateNumericInputChange}
                        label={intl.formatMessage(messages.familyCount)}
                        className={classes.field}
                        variant="outlined"
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
                        checked={hasMedicalCert}
                        onChange={(evt) => setHasMedicalCert(evt.target.checked)}
                      />
                    }
                    label={intl.formatMessage(messages.medicalCert)}
                  />

                  <Grid
                    container
                    spacing={3}
                    mt={0}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.certificateIssuedDate)}
                          value={certState.medCertIssueDate}
                          disabled={!hasMedicalCert}
                          onChange={(date) => {
                            setCertState((prevFilters) => ({
                              ...prevFilters,
                              medCertIssueDate: date,
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
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.certificateExpireDate)}
                          value={certState.medCertExpDate}
                          disabled={!hasMedicalCert}
                          onChange={(date) => {
                            setCertState((prevFilters) => ({
                              ...prevFilters,
                              medCertExpDate: date,
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

                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <SaveButton processing={isLoading} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

MedicalInsuranceData.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(MedicalInsuranceData);
