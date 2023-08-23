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
  const [employeeCode, setemployeeCode] = useState();
  const [machineCode, setmachineCode] = useState();
  const [eRPCode, seteRPCode] = useState();
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
  const [socialStatusId, setsocialStatusId] = useState();
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
        eRPCode: eRPCode,
        machineCode: machineCode,
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
    seteRPCode('');
    setmachineCode('');
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

      const ControlParameterdata = await GeneralListApis(
        locale
      ).GetControlParameterList();
      setcontrolParameterList(ControlParameterdata || []);

      const identityTypedata = await GeneralListApis(
        locale
      ).GetIdentityTypeList();
      setidentityTypeList(identityTypedata || []);

      const Genderdata = await GeneralListApis(locale).GetGenderList();
      setgenderList(Genderdata || []);

      const Nationalitydata = await GeneralListApis(
        locale
      ).GetNationalityList();
      setnationalityList(Nationalitydata || []);

      const religiondata = await GeneralListApis(locale).GetReligionList();
      setreligionList(religiondata || []);

      const BirthGovdata = await GeneralListApis(locale).GetGovList();
      setbirthGovList(BirthGovdata || []);

      const BirthCitydata = await GeneralListApis(locale).GetCityList();
      setbirthCityList(BirthCitydata || []);

      const socialStatusdata = await GeneralListApis(
        locale
      ).GetSocialStatusList();
      setsocialStatusList(socialStatusdata || []);

      const MilitaryStatusdata = await GeneralListApis(
        locale
      ).GetMilitaryStatusList();
      setmilitaryStatusList(MilitaryStatusdata || []);

      const Salutedata = await GeneralListApis(locale).GetSaluteList();
      setsaluteId(Salutedata || []);

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
        setemployeeCode(dataApi[0].employeeCode);
        sereRPCode(dataApi.eRPCode);
        setmachineCode(dataApi[0].machineCode);
        setreportTo({
          id: dataApi[0].reportTo,
          name: dataApi[0].reportToName,
        });
        setMachineCode(dataApi.MachineCode);
        setarName(dataApi[0].arName);
        setenName(dataApi[0].enName);
        setmotherName(dataApi[0].motherName);
        setorganizationId({
          id: dataApi[0].organizationId,
          name: dataApi[0].hiringSourceName,
        });
        setjobId({
          id: dataApi[0].jobId,
          name: dataApi[0].jobName,
        });
        setjobLevelId({
          id: dataApi[0].jobLevelId,
          name: dataApi[0].jobLevelName,
        });
        sethiringDate(dataApi[0].hiringDate);
        setcontrolParameterId({
          id: dataApi[0].controlParameterId,
          name: dataApi[0].controlParameterName,
        });
        setidentityTypeId({
          id: dataApi[0].identityTypeId,
          name: dataApi[0].identityTypeName,
        });
        setidentityIssuingDate(dataApi[0].identityIssuingDate);
        setidentityExpiry(dataApi[0].identityExpiry);
        setidentityNumber(dataApi[0].identityNumber);
        setidentityIssuingAuth(dataApi[0].identityIssuingAuth);
        setgenderId({
          id: dataApi[0].genderId,
          name: dataApi[0].genderName,
        });
        setnationalityId({
          id: dataApi[0].nationalityId,
          name: dataApi[0].nationalityName,
        });
        setreligionId({
          id: dataApi[0].religionId,
          name: dataApi[0].religionName,
        });
        setbirthDate(dataApi[0].birthDate);
        setbirthGovId({
          id: dataApi[0].birthGovId,
          name: dataApi[0].birthGovName,
        });
        setbirthCityId({
          id: dataApi[0].birthCityId,
          name: dataApi[0].birthCityName,
        });
        setsocialStatusId({
          id: dataApi[0].socialStatusId,
          name: dataApi[0].socialStatusName,
        });
        setsonNo(dataApi[0].sonNo);
        setmilitaryStatusId({
          id: dataApi[0].militaryStatusId,
          name: dataApi[0].militaryStatusName,
        });
        setisInsured(dataApi[0].isInsured);
        setisSpecialNeeds(dataApi[0].isSpecialNeeds);
        setsaluteId({
          id: dataApi[0].saluteId,
          name: dataApi[0].saluteName,
        });
        setstatusId(dataApi[0].statusId);
      } else clear();

      setProgress(false);
    }
    fetchData();
  }, [employee]);
  return (
    <div>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          id == 0
            ? intl.formatMessage(messages.createRewardTitle)
            : intl.formatMessage(messages.updateRewardTitle)
        }
        desc={''}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
              <TextField
                id="empcode"
                name="empcode"
                value={employeeCode}
                onChange={(e) => setemployeeCode(e.value)}
                label={intl.formatMessage(messages.employeeCode)}
                className={classes.field}
                variant="outlined"
              />
              <TextField
                id="machineCode"
                name="machineCode"
                value={machineCode}
                onChange={(e) => setmachineCode(e.value)}
                label={intl.formatMessage(messages.employeeCode)}
                className={classes.field}
                variant="outlined"
              />
              <TextField
                id="eRPCode"
                name="eRPCode"
                value={eRPCode}
                onChange={(e) => seteRPCode(e.value)}
                label={intl.formatMessage(messages.employeeCode)}
                className={classes.field}
                variant="outlined"
              />
              <TextField
                id="arname"
                name="arname"
                value={arName}
                onChange={(e) => setarName(e.value)}
                label={intl.formatMessage(messages.arName)}
                className={classes.field}
                variant="outlined"
              />
              <TextField
                id="enname"
                name="enname"
                value={enName}
                onChange={(e) => setenName(e.value)}
                label={intl.formatMessage(messages.enName)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Autocomplete
                id="identityType"
                options={identityTypeList}
                value={{ id: data.identityTypeId, name: data.identityTypeName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(event, value) => {
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
                    variant="outlined"
                    {...params}
                    name="yearId"
                    required
                    label={intl.formatMessage(messages.bnkEmpCode)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="identityNumber"
                name="identityNumber"
                value={identityNumber}
                onChange={(e) => setidentityNumber(e.value)}
                label={intl.formatMessage(messages.identitynumber)}
                className={classes.field}
                variant="outlined"
              />
              <TextField
                id="identityIssuingAuth"
                name="identityIssuingAuth"
                value={identityIssuingAuth}
                onChange={(e) => setidentityNumber(e.value)}
                label={intl.formatMessage(messages.identitynumber)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}></Grid>

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
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label={intl.formatMessage(messages.identitynumber)}
                        value={identityExpiry}
                        onChange={(date) => {
                          debugger;
                          setidentityExpiry(
                            format(new Date(date), 'yyyy-MM-dd')
                          );
                        }}
                        className={classes.field}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      id="GenderId"
                      options={genderList}
                      value={{
                        id: data.genderId,
                        name: data.genderName,
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === '' ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
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
                          variant="outlined"
                          {...params}
                          name="GenderId"
                          required
                          label={intl.formatMessage(messages.hasLicense)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      id="NationalityId"
                      options={nationalityList}
                      value={{
                        id: data.nationalityId,
                        name: data.nationalityName,
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === '' ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
                        if (value !== null) {
                          setnationalityId({
                            id: value.id,
                            name: value.name,
                          });
                        } else {
                          setnationalityId({
                            id: 0,
                            name: '',
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="nationality"
                          required
                          label={intl.formatMessage(messages.hasLicense)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}></Grid>
                  <Grid item xs={6} md={2}>
                    <Autocomplete
                      id="ddlreligionId"
                      options={religionList}
                      value={{
                        id: data.religionId,
                        name: data.religionName,
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === '' ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
                        if (value !== null) {
                          setreligionId({
                            id: value.id,
                            name: value.name,
                          });
                        } else {
                          setreligionId({
                            id: 0,
                            name: '',
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="religionId"
                          required
                          label={intl.formatMessage(messages.hasLicense)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <TextField
                      id="motherName"
                      name="motherName"
                      value={motherName}
                      label={intl.formatMessage(messages.bankBranchNo)}
                      className={classes.field}
                      variant="outlined"
                      onChange={(e) => setmotherName(e.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label={intl.formatMessage(messages.contractType)}
                        value={birthDate}
                        onChange={(date) => {
                          debugger;
                          setbirthDate(format(new Date(date), 'yyyy-MM-dd'));
                        }}
                        className={classes.field}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Autocomplete
                      id="ddlbirthGovId"
                      options={birthGovList}
                      value={{
                        id: data.birthGovId,
                        name: data.birthGovName,
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === '' ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
                        if (value !== null) {
                          setbirthGovId({
                            id: value.id,
                            name: value.name,
                          });
                        } else {
                          setbirthGovId({
                            id: 0,
                            name: '',
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="birthGovId"
                          required
                          label={intl.formatMessage(messages.hasLicense)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Autocomplete
                      id="ddlbirthcityId"
                      options={birthCityId}
                      value={{
                        id: data.birthCityId,
                        name: data.birthCityName,
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === '' ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
                        if (value !== null) {
                          setbirthCityId({
                            id: value.id,
                            name: value.name,
                          });
                        } else {
                          setbirthCityId({
                            id: 0,
                            name: '',
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="birthcityId"
                          required
                          label={intl.formatMessage(messages.hasLicense)}
                        />
                      )}
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
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      id="ddlsocialStatusId"
                      options={socialStatusList}
                      value={{
                        id: data.socialStatusId,
                        name: data.socialStatusName,
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === '' ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
                        if (value !== null) {
                          setsocialStatusId({
                            id: value.id,
                            name: value.name,
                          });
                        } else {
                          setsocialStatusId({
                            id: 0,
                            name: '',
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="socialStatusId"
                          required
                          label={intl.formatMessage(messages.status)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      id="ddlmilitaryStatusId"
                      options={militaryStatusList}
                      value={{
                        id: data.militaryStatusId,
                        name: data.militaryStatusName,
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === '' ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
                        if (value !== null) {
                          setmilitaryStatusId({
                            id: value.id,
                            name: value.name,
                          });
                        } else {
                          setmilitaryStatusId({
                            id: 0,
                            name: '',
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="militaryStatusId"
                          required
                          label={intl.formatMessage(messages.status)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      id="sonNo"
                      name="sonNo"
                      value={sonNo}
                      label={intl.formatMessage(messages.organization)}
                      className={classes.field}
                      variant="outlined"
                      onChange={(e) => setsonNo(e.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      id="ddljobid"
                      options={jobList}
                      value={{ id: jobId, name: jobName }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === '' ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
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
                          variant="outlined"
                          {...params}
                          name="jobid"
                          required
                          label={intl.formatMessage(messages.job)}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              id="ddljobLevelId"
              options={jobLevelList}
              value={{ id: jobLevelId, name: jobLevelName }}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === '' || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : '')}
              onChange={(event, value) => {
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
                  variant="outlined"
                  {...params}
                  name="jobLevelId"
                  required
                  label={intl.formatMessage(messages.joblevel)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="jobnature"
              name="jobnature"
              // value={data.elementName}
              label={intl.formatMessage(messages.jobname)}
              className={classes.field}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="jobtype"
              name="jobtype"
              //value={data.value}
              label={intl.formatMessage(messages.job)}
              required
              className={classes.field}
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            //notes
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              id="note"
              name="note"
              value={data.note}
              onChange={(e) => handleChange(e)}
              label={intl.formatMessage(messages.note)}
              className={classes.field}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={1}>
            <Button
              variant="contained"
              type="submit"
              size="medium"
              color="primary"
            >
              <FormattedMessage {...Payrollmessages.save} />
            </Button>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={oncancel}
            >
              <FormattedMessage {...Payrollmessages.cancel} />
            </Button>
          </Grid>
        </form>
      </PapperBlock>
    </div>
  );
}
export default injectIntl(Employee);
