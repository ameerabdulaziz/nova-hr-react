import {
  Autocomplete,
  Backdrop,
  Box,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import EmployeeData from '../../Component/EmployeeData';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
// import api from '../api/SInsuranceOrgnizationData';
import messages from '../messages';

function SocialInsuranceData(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const Title = localStorage.getItem('MenuName');
  const { classes } = useStyles();
  const history = useHistory();

  const [governmentList, setGovernmentList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [insuranceOfficeList, setInsuranceOfficeList] = useState([]);
  const [insuranceJobList, setInsuranceJobList] = useState([]);
  const [branchInsuranceList, setBranchInsuranceList] = useState([]);

  const [
    isCalculateInsuranceFromTheFollowingValue,
    setIsCalculateInsuranceFromTheFollowingValue,
  ] = useState(false);
  const [isInsured, setIsInsured] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: '',
    employeeName: '',
    hiringDate: null,
    job: '',
    organization: '',
    HasAlternativeEmp: false,

    hrNotes: '',
    showSpecialInsurance: false,

    workLetterDate: null,
    workLetterNumber: '',

    c1IncomingNumber: '',
    c6IncomingNumber: '',
    c1DeliverDate: null,
    c6DeliverDate: null,
  });

  const [insuredState, setInsuredState] = useState({
    insuranceDate: null,
    insuranceNumber: '',
    insuranceJob: null,
    insuranceOffice: null,
    insuranceSalary: '',
    branchInsurance: null,
    grossSalary: '',
    mainSalary: '',
  });
  const [fixedShareState, setFixedShareState] = useState({
    employeeFixedShare: '',
    companyFixedShare: '',
  });

  const onInsuredNumericInputChange = (evt) => {
    setInsuredState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onFixedShareNumericInputChange = (evt) => {
    setFixedShareState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const government = await GeneralListApis(locale).GetGovernmentList();
      setGovernmentList(government);

      // const region = await api(locale).GetSinsuranceRegion();
      // setRegionList(region);

      // const office = await api(locale).GetSinsuranceOffices();
      // setInsuranceOfficeList(office);

      // if (id !== 0) {
      //   const dataApi = await api(locale).GetById(id);
      //   setFormInfo(dataApi[0]);
      // }
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    let formData = { ...formInfo };

    setProcessing(true);
    setIsLoading(true);

    if (isInsured) {
      formData = { ...formData, ...insuredState };
    }

    if (isCalculateInsuranceFromTheFollowingValue) {
      formData = { ...formData, ...fixedShareState };
    }

    console.log(insuredState);
    console.log(fixedShareState);
    console.log(formData);

    try {
      // if (id !== 0) {
      //   await api(locale).update(id, formData);
      // } else {
      //   await api(locale).save(formData);
      // }

      toast.success(notif.saved);
    } catch (error) {
      toast.error(JSON.stringify(error.response.data ?? error));
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

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
    <Box
      sx={{
        zIndex: 100,
        position: 'relative',
      }}
    >
      <Backdrop
        sx={{
          color: 'primary.main',
          zIndex: 10,
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.69)',
        }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <PapperBlock whiteBg icon='border_color' desc='' title={Title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={12}>
              <EmployeeData data={formInfo} setdata={setFormInfo} />
            </Grid>

            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12}>
                      <TextField
                        name='hrNotes'
                        value={formInfo.hrNotes}
                        required
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.hrNotes)}
                        className={classes.field}
                        variant='outlined'
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
                      <TextField
                        name='insuranceNumber'
                        value={insuredState.insuranceNumber}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.insuranceNumber)}
                        className={classes.field}
                        variant='outlined'
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
                              variant='outlined'
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
                            (alt) => alt.id === insuredState.insuranceOffice
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setInsuredState((prev) => ({
                            ...prev,
                            insuranceOffice: value !== null ? value.id : null,
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
                            (alt) => alt.id === insuredState.insuranceJob
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setInsuredState((prev) => ({
                            ...prev,
                            insuranceJob: value !== null ? value.id : null,
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
                        name='insuranceSalary'
                        value={insuredState.insuranceSalary}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.insuranceSalary)}
                        className={classes.field}
                        variant='outlined'
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
                        name='grossSalary'
                        value={insuredState.grossSalary}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.grossSalary)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='mainSalary'
                        value={insuredState.mainSalary}
                        disabled={!isInsured}
                        required
                        onChange={onInsuredNumericInputChange}
                        label={intl.formatMessage(messages.mainSalary)}
                        className={classes.field}
                        variant='outlined'
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
                        checked={isCalculateInsuranceFromTheFollowingValue}
                        onChange={(evt) => setIsCalculateInsuranceFromTheFollowingValue(
                          evt.target.checked
                        )
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
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name='employeeFixedShare'
                        value={fixedShareState.employeeFixedShare}
                        required
                        disabled={!isCalculateInsuranceFromTheFollowingValue}
                        onChange={onFixedShareNumericInputChange}
                        label={intl.formatMessage(messages.employeeFixedShare)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='companyFixedShare'
                        value={fixedShareState.companyFixedShare}
                        required
                        disabled={!isCalculateInsuranceFromTheFollowingValue}
                        onChange={onFixedShareNumericInputChange}
                        label={intl.formatMessage(messages.companyFixedShare)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>

                  <Typography mt={3} color='gray'>
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
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name='c1IncomingNumber'
                        value={formInfo.c1IncomingNumber}
                        required
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.c1IncomingNumber)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.c1DeliverDate)}
                          value={formInfo.c1DeliverDate}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              c1DeliverDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='outlined'
                              required
                            />
                          )}
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
                    <Grid item xs={12} md={3}>
                      <TextField
                        name='c6IncomingNumber'
                        value={formInfo.c6IncomingNumber}
                        required
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.c6IncomingNumber)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.c6DeliverDate)}
                          value={formInfo.c6DeliverDate}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              c6DeliverDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='outlined'
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
                  <Grid
                    container
                    spacing={3}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label={intl.formatMessage(messages.workLetterDate)}
                          value={formInfo.workLetterDate}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              workLetterDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='outlined'
                              required
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='workLetterNumber'
                        value={formInfo.workLetterNumber}
                        required
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.workLetterNumber)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <SaveButton Id={id} processing={processing} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </Box>
  );
}

export default injectIntl(SocialInsuranceData);
