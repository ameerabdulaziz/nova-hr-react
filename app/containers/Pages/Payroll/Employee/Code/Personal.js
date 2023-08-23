import React, { useState, useEffect, useCallback } from 'react';

import { PapperBlock } from 'enl-components';
import EmployeeData from '../api/EmployeeData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';

import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
} from '@mui/material';
import useStyles from '../../Style';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from 'date-fns';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
function Personal(props) {
  const { intl, pristine } = props;
  const [processing, setprocessing] = useState(false);
  const [delprocessing, setdelprocessing] = useState(false);

  const { classes } = useStyles();
  const title = localStorage.getItem('MenuName');
  const [employee, setEmployee] = useState(0);
  const [id, setid] = useState(0);
  const [employeeCode, setemployeeCode] = useState('');
  const [machineCode, setmachineCode] = useState('');
  const [eRPCode, seteRPCode] = useState('');
  const [reportTo, setreportTo] = useState({});
  const [reportToList, setreportToList] = useState([]);
  const [MachineCode, setMachineCode] = useState('');
  const [arName, setarName] = useState('');
  const [enName, setenName] = useState('');
  const [motherName, setmotherName] = useState('');
  const [organizationId, setorganizationId] = useState({});
  const [organizationList, setorganizationList] = useState([]);
  const [jobId, setjobId] = useState({});
  const [jobList, setjobList] = useState([]);
  const [jobLevelId, setjobLevelId] = useState({ id: 0, name: '' });
  const [jobLevelList, setjobLevelList] = useState([]);
  const [hiringDate, sethiringDate] = useState('');
  const [controlParameterId, setcontrolParameterId] = useState({});
  const [controlParameterList, setcontrolParameterList] = useState([]);
  const [identityTypeId, setidentityTypeId] = useState({});
  const [identityTypeList, setidentityTypeList] = useState([]);
  const [identityIssuingDate, setidentityIssuingDate] = useState('');
  const [identityExpiry, setidentityExpiry] = useState('');
  const [identityNumber, setidentityNumber] = useState('');
  const [identityIssuingAuth, setidentityIssuingAuth] = useState('');
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

  const [isInsured, setisInsured] = useState(false);
  const [isSpecialNeeds, setisSpecialNeeds] = useState(false);
  const [isResident, setisResident] = useState(false);

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
        if (id == 0) setid(dataApi.id);
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
    setisResident(false);
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

      const BirthGovdata = await GeneralListApis(locale).GetGovernmentList();
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
      setsaluteList(Salutedata || []);
      const Statusdata = await GeneralListApis(locale).GetEmpStatusList();
      setstatusList(Statusdata || []);
      setEmployee(14);
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
      if (dataApi) {
        setid(dataApi.id);
        setemployeeCode(dataApi.employeeCode);
        seteRPCode(dataApi.eRPCode);
        setmachineCode(dataApi.machineCode);
        setreportTo({
          id: dataApi.reportTo,
          name: dataApi.reportToName,
        });
        setMachineCode(dataApi.MachineCode);
        setarName(dataApi.arName);
        setenName(dataApi.enName);
        setmotherName(dataApi.motherName);
        setorganizationId({
          id: dataApi.organizationId,
          name: dataApi.organizationName,
        });
        setjobId({
          id: dataApi.jobId,
          name: dataApi.jobName,
        });
        setjobLevelId({
          id: dataApi.jobLevelId,
          name: dataApi.jobLevelName,
        });
        sethiringDate(dataApi.hiringDate);
        setcontrolParameterId({
          id: dataApi.controlParameterId,
          name: dataApi.controlParameterName,
        });
        setidentityTypeId({
          id: dataApi.identityTypeId,
          name: dataApi.identityTypeName,
        });
        setidentityIssuingDate(dataApi.identityIssuingDate);
        setidentityExpiry(dataApi.identityExpiry);
        setidentityNumber(dataApi.identityNumber);
        setidentityIssuingAuth(dataApi.identityIssuingAuth);
        setgenderId({
          id: dataApi.genderId,
          name: dataApi.genderName,
        });
        setnationalityId({
          id: dataApi.nationalityId,
          name: dataApi.nationalityName,
        });
        setreligionId({
          id: dataApi.religionId,
          name: dataApi.religionName,
        });
        setbirthDate(dataApi.birthDate);
        setbirthGovId({
          id: dataApi.birthGovId,
          name: dataApi.birthGovName,
        });
        setbirthCityId({
          id: dataApi.birthCityId,
          name: dataApi.birthCityName,
        });
        setsocialStatusId({
          id: dataApi.socialStatusId,
          name: dataApi.socialStatusName,
        });
        setsonNo(dataApi.sonNo);
        setmilitaryStatusId({
          id: dataApi.militaryStatusId,
          name: dataApi.militaryStatusName,
        });
        setisInsured(dataApi.isInsured);
        setisSpecialNeeds(dataApi.isSpecialNeeds);
        setsaluteId({
          id: dataApi.saluteId,
          name: dataApi.saluteName,
        });
        setstatusId(dataApi.statusId);
        setisResident(dataApi.isResident);
      } else clear();

      setProgress(false);
    }
    if (employee > 0);
    fetchData();
  }, [employee]);
  return (
    <div>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={title}
        //   id == 0
        //     ? 'Create' //intl.formatMessage(messages.createRewardTitle)
        //     : 'update' //intl.formatMessage(messages.updateRewardTitle)
        // }
        desc={''}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={2}>
              <TextField
                id="empcode"
                name="empcode"
                value={employeeCode}
                onChange={(e) => setemployeeCode(e.value)}
                label={intl.formatMessage(messages.employeeCode)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="machineCode"
                name="machineCode"
                value={machineCode}
                onChange={(e) => setmachineCode(e.value)}
                label={intl.formatMessage(messages.machineCode)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="eRPCode"
                name="eRPCode"
                value={eRPCode}
                onChange={(e) => seteRPCode(e.value)}
                label={intl.formatMessage(messages.eRPCode)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                id="ddlstatusId"
                options={statusList || []}
                value={{
                  id: statusId.id,
                  name: statusId.name,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(event, value) => {
                  if (value !== null) {
                    setstatusId({
                      id: value.id,
                      name: value.name,
                    });
                  } else {
                    setstatusId({
                      id: 0,
                      name: '',
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="statusId"
                    required
                    label={intl.formatMessage(messages.status)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
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
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                required
                control={
                  <Switch
                    checked={isResident}
                    onChange={() => {
                      sethasLicense(!isResident);
                      setRequired({ required: !isResident });
                    }}
                    color="secondary"
                  />
                }
                label={intl.formatMessage(messages.isResident)}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={4}>
                  <TextField
                    id="arname"
                    name="arname"
                    value={arName}
                    onChange={(e) => setarName(e.value)}
                    label={intl.formatMessage(messages.arname)}
                    className={classes.field}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="enname"
                    name="enname"
                    value={enName}
                    onChange={(e) => setenName(e.value)}
                    label={intl.formatMessage(messages.enname)}
                    className={classes.field}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    required
                    control={
                      <Switch
                        checked={isSpecialNeeds}
                        onChange={() => {
                          sethasLicense(!isSpecialNeeds);
                          setRequired({ required: !isSpecialNeeds });
                        }}
                        color="secondary"
                      />
                    }
                    label={intl.formatMessage(messages.isSpecialNeeds)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlidentityType"
                    options={identityTypeList || []}
                    value={{
                      id: identityTypeId.id,
                      name: identityTypeId.name,
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
                        name="identityType"
                        required
                        label={intl.formatMessage(messages.identityType)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="identityIssuingAuth"
                    name="identityIssuingAuth"
                    value={identityIssuingAuth}
                    onChange={(e) => setidentityIssuingAuth(e.value)}
                    label={intl.formatMessage(messages.identityIssuingAuth)}
                    className={classes.field}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="identityNumber"
                    name="identityNumber"
                    value={identityNumber}
                    onChange={(e) => setidentityNumber(e.value)}
                    label={intl.formatMessage(messages.identitynumber)}
                    className={classes.field}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
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
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                id="ddlGenderId"
                options={genderList || []}
                value={{
                  id: genderId.id,
                  name: genderId.name,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
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
                    label={intl.formatMessage(messages.gender)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                id="ddlNationalityId"
                options={nationalityList || []}
                value={{
                  id: nationalityId.id,
                  name: nationalityId.name,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
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
                    label={intl.formatMessage(messages.nationality)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Autocomplete
                id="ddlreligionId"
                options={religionList || []}
                value={{
                  id: religionId.id,
                  name: religionId.name,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
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
                    label={intl.formatMessage(messages.religion)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={6} md={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.birthDate)}
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
                options={birthGovList || []}
                value={{
                  id: birthGovId.id,
                  name: birthGovId.name,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
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
                    label={intl.formatMessage(messages.gov)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Autocomplete
                id="ddlbirthcityId"
                options={birthCityList || []}
                value={{
                  id: birthCityId.id,
                  name: birthCityId.name,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
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
                    label={intl.formatMessage(messages.city)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="motherName"
                name="motherName"
                value={motherName}
                label={intl.formatMessage(messages.motherName)}
                className={classes.field}
                variant="outlined"
                onChange={(e) => setmotherName(e.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlsocialStatusId"
                    options={socialStatusList || []}
                    value={{
                      id: socialStatusId.id,
                      name: socialStatusId.name,
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
                        label={intl.formatMessage(messages.socialStatus)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    id="sonNo"
                    name="sonNo"
                    value={sonNo}
                    label={intl.formatMessage(messages.sonNo)}
                    className={classes.field}
                    variant="outlined"
                    onChange={(e) => setsonNo(e.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Autocomplete
                    id="ddlmilitaryStatusId"
                    options={militaryStatusList || []}
                    value={{
                      id: militaryStatusId.id,
                      name: militaryStatusId.name,
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
                        label={intl.formatMessage(messages.militaryStatus)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    required
                    control={
                      <Switch
                        checked={isInsured}
                        onChange={() => {
                          sethasLicense(!isInsured);
                          setRequired({ required: !isInsured });
                        }}
                        color="secondary"
                      />
                    }
                    label={intl.formatMessage(messages.isinsured)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlorganization"
                    options={organizationList || []}
                    value={{
                      id: organizationId.id,
                      name: organizationId.name,
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
                        variant="outlined"
                        {...params}
                        name="organizationId"
                        required
                        label={intl.formatMessage(messages.organization)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddljobid"
                    options={jobList || []}
                    value={{ id: jobId.id, name: jobId.name }}
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
                </Grid>{' '}
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddljobLevelId"
                    options={jobLevelList || []}
                    value={{ id: jobLevelId.id, name: jobLevelId.name }}
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
              </Grid>
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
          </Grid>
        </form>
      </PapperBlock>
    </div>
  );
}
export default injectIntl(Personal);
