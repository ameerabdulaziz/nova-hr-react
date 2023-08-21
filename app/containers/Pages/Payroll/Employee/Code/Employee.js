import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import { Autocomplete } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import messages from '../messages';
import Payrollmessages from '../../messages';
import useStyles from '../../Style';
import { injectIntl, FormattedMessage } from 'react-intl';
import EmployeeData from '../api/EmployeeData';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';

function Employee(props) {
  const { intl, pristine } = props;
  const [processing, setprocessing] = useState(false);
  const [delprocessing, setdelprocessing] = useState(false);

  const { classes } = useStyles();
  const title = localStorage.getItem('MenuName');
  const [employee, setEmployee] = useState(0);
  const [id, setid] = useState(0);
  const [employeeCode, setemployeeCode] = useState(false);
  const [reportTo, setreportTo] = useState({});
  const [reportToList, setreportToList] = useState([]);
  const [MachineCode, setMachineCode] = useState();
  const [arName, setarName] = useState();
  const [enName, setenName] = useState();
  const [motherName, setmotherName] = useState();
  const [organizationId, setorganizationId] = useState({});
  const [organizationList, setorganizationList] = useState([]);
  const [jobId, setjobId] = useState({});
  const [jobList, setjobList] = useState([]);
  const [jobLevelId, setjobLevelId] = useState({});
  const [jobLevelList, setjobLevelList] = useState([]);
  const [hiringDate, sethiringDate] = useState('');
  const [controlParameterId, setcontrolParameterId] = useState({});
  const [controlParameterList, setcontrolParameterList] = useState([]);
  const [identityTypeId, setidentityTypeId] = useState({});
  const [identityTypeList, setidentityTypeList] = useState([]);
  const [identityIssuingDate, setidentityIssuingDate] = useState('');
  const [identityExpiry, setidentityExpiry] = useState('');
  const [identityNumber, setidentityNumber] = useState();
  const [identityIssuingAuth, setidentityIssuingAuth] = useState();
  const [genderId, setgenderId] = useState({});
  const [genderList, setgenderList] = useState([]);

  const [nationalityId, setnationalityId] = useState({});
  const [nationalityList, setnationalityList] = useState([]);
  const [religionId, setreligionId] = useState({});
  const [religionList, setreligionList] = useState([]);
  const [birthDate, setbirthDate] = useState('');

  const [birthGovId, setbirthGovId] = useState({});
  const [birthGovList, setbirthGovList] = useState([]);

  const [birthCityId, setbirthCityId] = useState({});
  const [birthCityList, setbirthCityList] = useState([]);
  const [socialStatusId, setsocialStatusId] = useState({});
  const [socialStatusList, setsocialStatusList] = useState([]);
  const [sonNo, setsonNo] = useState(0);

  const [militaryStatusId, setmilitaryStatusId] = useState({});
  const [militaryStatusList, setmilitaryStatusList] = useState([]);
  const [photoUrl, setphotoUrl] = useState();

  const [isInsured, setisInsured] = useState();
  const [isSpecialNeeds, setisSpecialNeeds] = useState();
  const [isResident, setisResident] = useState();

  const [saluteId, setsaluteId] = useState({});
  const [saluteList, setsaluteList] = useState([]);
  const [statusId, setstatusId] = useState({});
  const [statusList, setstatusList] = useState([]);

  const locale = useSelector((state) => state.language.locale);

  const [progress, setProgress] = useState(false);
  const [required, setRequired] = useState({ required: false });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setprocessing(true);

      debugger;
      const data = {
        id: id,
        employeeCode: employeeCode,
        reportTo: reportTo.id ?? '',
        machineCode: machineCode,
        arName: arName,
        enName: enName,
        motherName: motherName,
        organizationId: organizationId.id ?? '',
        jobId: jobId.id,
        jobLevelId: jobLevelId.id ?? '',
        hiringDate: hiringDate,
        controlParameterId: controlParameterId.id ?? '',
        identityTypeId: identityTypeId.id ?? '',
        identityIssuingDate: identityIssuingDate,
        identityExpiry: identityExpiry,
        identityNumber: identityNumber,
        identityIssuingAuth: identityIssuingAuth,
        genderId: genderId.id,
        nationalityId: nationalityId.id,
        religionId: religionId.id,
        birthDate: birthDate,
        birthGovId: birthGovId.id,
        birthCityId: birthCityId.id,
        socialStatusId: socialStatusId.id,
        sonNo: sonNo,
        militaryStatusId: militaryStatusId.id,
        photoUrl: photoUrl,
        isInsured: isInsured,
        isSpecialNeeds: isSpecialNeeds,
        saluteId: saluteId.id,
        statusId: statusId.id,
      };

      const dataApi = await EmployeeData(locale).Save(data);
      if (dataApi.status == 200) {
        if (id == 0) setid(dataApi.data.id);
        toast.success(notif.saved);
      } else {
        toast.error(dataApi.statusText);
      }
    } catch (err) {
      toast.error(notif.error);
    }
    setprocessing(false);
  };
  const deletedata = async (e) => {
    try {
      debugger;
      // e.preventDefault();

      setdelprocessing(true);
      const dataApi = await EmployeeData(locale).Delete(id);
      if (dataApi.status == 200) {
        clear();
        toast.error(notif.removed);
      } else {
        toast.error(dataApi.statusText);
      }
    } catch (err) {
      toast.error(notif.error);
    }
    setdelprocessing(false);
  };
  const clear = (e) => {
    setid(0);
    setemployeeCode('');
    setreportTo({});
    setMachineCode('');
    setarName('');
    setenName('');
    setmotherName('');
    setorganizationId({});
    setjobId({});
    setjobLevelId({});
    sethiringDate(format(new Date(), 'yyyy-MM-dd'));
    setcontrolParameterId({});
    setidentityTypeId({});
    setidentityIssuingDate(format(new Date(), 'yyyy-MM-dd'));
    setidentityExpiry(format(new Date(), 'yyyy-MM-dd'));
    setidentityNumber('');
    setidentityIssuingAuth('');
    setgenderId({});
    setnationalityId({});
    setreligionId({});
    setbirthDate('');
    setbirthGovId({});
    setbirthCityId({});
    setsocialStatusId({});
    setsonNo('');
    setmilitaryStatusId({});
    setisInsured(false);
    setisSpecialNeeds(false);
    setsaluteId({});
    setstatusId({});
  };
  const GetLookup = useCallback(async () => {
    try {
      debugger;
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setreportToList(employeedata || []);
      const Jobdata = await GeneralListApis(locale).GetJobList();
      setjobList(Jobdata || []);

      const Jobleveldata = await GeneralListApis(locale).GetJobLevelList();
      setjobLevelList(Jobleveldata || []);

      const organizationdata = await GeneralListApis(
        locale
      ).GetDepartmentList();
      setorganizationList(organizationdata || []);

      const kinshipLinkdata = await GeneralListApis(
        locale
      ).GetcontrolParameterList();
      setcontrolParameterList(kinshipLinkdata || []);
      const identityTypedata = await GeneralListApis(
        locale
      ).GetidentityTypeList();
      setidentityTypeList(identityTypedata || []);

      //  const kinshipEmpdata = await GeneralListApis(locale).GetEmployeeList();
    } catch (err) {
      toast.error(err);
    }
  }, []);
  useEffect(() => {
    GetLookup();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setProgress(true);
      const dataApi = await EmployeeData(locale).GetList(employee);
      debugger;
      if (dataApi.length > 0) {
        setid(dataApi[0].id);
        setjobId({
          id: dataApi[0].jobId,
          name: dataApi[0].jobName,
        });
        setjobLevelId({
          id: dataApi[0].jobLevelId,
          name: dataApi[0].jobLevelName,
        });
        sethiringDate(dataApi[0].hiringDate);
        setorganizationId({
          id: dataApi[0].organizationId,
          name: dataApi[0].hiringSourceName,
        });
        setemployeeCode(dataApi[0].employeeCode);
        setcontrolParameterId({
          id: dataApi[0].controlParameterId,
          name: dataApi[0].kinshipLinkName,
        });
        setreportTo({
          id: dataApi[0].reportTo,
          name: dataApi[0].kinshipEmpName,
        });
        setenName(dataApi[0].enName);
        setidentityTypeId({
          id: dataApi[0].identityTypeId,
          name: dataApi[0].identityTypeName,
        });
        setidentityIssuingDate(dataApi[0].identityIssuingDate);
        setidentityExpiry(dataApi[0].identityExpiry);
        setarName(dataApi[0].arName);
        setgenderId({
          id: dataApi[0].genderId,
          name: dataApi[0].genderName,
        });
      } else clear();

      setProgress(false);
    }
    fetchData();
  }, [employee]);
  return (
    <div>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              {title}
            </Typography>

            <Autocomplete
              id="ddlEmp"
              required
              options={employeeList}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                if (value !== null) {
                  setEmployee(value.id);
                } else {
                  setEmployee(0);
                }
              }}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  name="employee"
                  value={employee}
                  label={intl.formatMessage(messages.chooseEmp)}
                  margin="normal"
                />
              )}
            />
            {progress && (
              <div>
                {' '}
                <LinearProgress />
                <br />
                <LinearProgress color="secondary" />
                <br />
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <br />

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label={intl.formatMessage(messages.hiringDate)}
                    value={hiringDate}
                    onChange={(date) => {
                      debugger;
                      sethiringDate(format(new Date(date), 'yyyy-MM-dd'));
                    }}
                    className={classes.field}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <br />
              <div>
                <Autocomplete
                  id="ddljobId"
                  required
                  options={jobList}
                  value={{
                    id: jobId.id,
                    name: jobId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setjobId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setjobId({
                        id: 0,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      //margin="normal"

                      {...params}
                      name="jobId"
                      label={intl.formatMessage(messages.job)}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />
              <div>
                <Autocomplete
                  id="ddlJoblevelId"
                  required
                  options={jobLevelList}
                  value={{
                    id: jobLevelId.id,
                    name: jobLevelId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setjobLevelId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setjobLevelId({
                        id: 0,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      //margin="normal"

                      {...params}
                      name="JobLevelId"
                      label={intl.formatMessage(messages.joblevel)}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />
              <div>
                <Autocomplete
                  id="ddlorganizationId"
                  required
                  options={organizationList}
                  value={{
                    id: organizationId.id,
                    name: organizationId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setorganizationId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setorganizationId({
                        id: 0,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      //margin="normal"

                      {...params}
                      name="organizationId"
                      label={intl.formatMessage(messages.hiringSource)}
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={employeeCode}
                      onChange={() => {
                        setemployeeCode(!employeeCode);
                        setRequired({ required: !employeeCode });
                      }}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.employeeCode)}
                />
              </div>

              <div>
                <Autocomplete
                  id="ddcontrolParameterId"
                  required
                  options={controlParameterList}
                  value={{
                    id: controlParameterId.id,
                    name: controlParameterId.name,
                  }}
                  {...required}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setcontrolParameterId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setcontrolParameterId({
                        id: 0,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      //margin="normal"
                      {...required}
                      {...params}
                      name="controlParameterId"
                      label={intl.formatMessage(messages.kinshipLink)}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />
              <div>
                <Autocomplete
                  id="ddlreportTo"
                  {...required}
                  options={reportToList}
                  value={{
                    id: reportTo.id,
                    name: reportTo.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setreportTo({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setreportTo({
                        id: 0,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      //margin="normal"
                      {...required}
                      {...params}
                      name="reportTo"
                      label={intl.formatMessage(messages.kinshipEmp)}
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={enName}
                      onChange={() => setenName(!enName)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.enName)}
                />
              </div>

              <div>
                <Autocomplete
                  id="ddlidentityTypeId"
                  required
                  options={identityTypeList}
                  value={{
                    id: identityTypeId.id,
                    name: identityTypeId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setidentityTypeId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setidentityTypeId({
                        id: 0,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      //margin="normal"

                      {...params}
                      name="identityTypeId"
                      label={intl.formatMessage(messages.identityType)}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />
              <div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label={intl.formatMessage(messages.identityIssuingDate)}
                    value={identityIssuingDate}
                    onChange={(date) => {
                      debugger;
                      setidentityIssuingDate(
                        format(new Date(date), 'yyyy-MM-dd')
                      );
                    }}
                    className={classes.field}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <br />
              <div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label={intl.formatMessage(messages.identityExpiry)}
                    value={identityExpiry}
                    onChange={(date) => {
                      debugger;
                      setidentityExpiry(format(new Date(date), 'yyyy-MM-dd'));
                    }}
                    className={classes.field}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>

              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={arName}
                      onChange={() => setarName(!arName)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.arName)}
                />
              </div>

              <div>
                <Autocomplete
                  id="ddlgenderId"
                  options={genderList || []}
                  value={{
                    id: genderId.id,
                    name: genderId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setgenderId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setgenderId({
                        id: 0,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="genderId"
                      label={intl.formatMessage(messages.gender)}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />

              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={employee === 0 || processing || delprocessing}
                >
                  {processing && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                  <FormattedMessage {...Payrollmessages.save} />
                </Button>
                <Button
                  type="button"
                  disabled={employee === 0 || pristine || processing}
                  onClick={() => deletedata()}
                >
                  {delprocessing && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                  <FormattedMessage {...Payrollmessages.delete} />
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default injectIntl(Employee);
