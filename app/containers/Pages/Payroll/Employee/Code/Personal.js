import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { PapperBlock } from "enl-components";
import EmployeeData from "../api/EmployeeData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { injectIntl, FormattedMessage } from "react-intl";

import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import useStyles from "../../Style";
import Dropzone from "react-dropzone";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../api/GeneralListApis";
import { format } from "date-fns";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Type from "enl-styles/Typography.scss";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Typography from "@mui/material/Typography";
import avatarApi from "enl-api/images/avatars";
import { useLocation } from "react-router-dom";
import PayRollLoader from "../../Component/PayRollLoader";

function Personal(props) {
  const history = useHistory();
  // const ref = useRef(null);
  const location = useLocation();

  const { empid } =
    location.state == null ? { id: 0, name: "" } : location.state;
  const id = location.state == null ? 0 : empid.id;
  let dropzoneRef;
  const [progress, setProgress] = useState(false);
  const { intl, pristine } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");

  const [employeeCode, setemployeeCode] = useState("");
  const [machineCode, setmachineCode] = useState("");
  const [eRPCode, seteRPCode] = useState("");
  const [reportTo, setreportTo] = useState({});
  const [reportToList, setreportToList] = useState([]);
  const [MachineCode, setMachineCode] = useState("");
  const [arName, setarName] = useState("");
  const [enName, setenName] = useState("");
  const [motherName, setmotherName] = useState("");
  const [organizationId, setorganizationId] = useState({});
  const [organizationList, setorganizationList] = useState([]);
  const [jobId, setjobId] = useState({});
  const [jobList, setjobList] = useState([]);
  const [jobLevelId, setjobLevelId] = useState({ id: 0, name: "" });
  const [jobLevelList, setjobLevelList] = useState([]);
  const [hiringDate, sethiringDate] = useState("");
  const [controlParameterId, setcontrolParameterId] = useState({});
  const [controlParameterList, setcontrolParameterList] = useState([]);
  const [identityTypeId, setidentityTypeId] = useState({});
  const [identityTypeList, setidentityTypeList] = useState([]);
  const [identityIssuingDate, setidentityIssuingDate] = useState("");
  const [identityExpiry, setidentityExpiry] = useState("");
  const [identityNumber, setidentityNumber] = useState("");
  const [identityIssuingAuth, setidentityIssuingAuth] = useState("");
  const [genderId, setgenderId] = useState({});
  const [genderList, setgenderList] = useState([]);

  const [nationalityId, setnationalityId] = useState({});
  const [nationalityList, setnationalityList] = useState([]);
  const [religionId, setreligionId] = useState({});
  const [religionList, setreligionList] = useState([]);
  const [birthDate, setbirthDate] = useState("");

  const [birthGovId, setbirthGovId] = useState({});
  const [birthGovList, setbirthGovList] = useState([]);

  const [birthCityId, setbirthCityId] = useState({});
  const [birthCityList, setbirthCityList] = useState([]);
  const [socialStatusId, setsocialStatusId] = useState({});
  const [socialStatusList, setsocialStatusList] = useState([]);
  const [sonNo, setsonNo] = useState(0);

  const [militaryStatusId, setmilitaryStatusId] = useState({});
  const [militaryStatusList, setmilitaryStatusList] = useState([]);
  const [isInsured, setisInsured] = useState(false);
  const [isSpecialNeeds, setisSpecialNeeds] = useState(false);
  const [isResident, setisResident] = useState(false);

  const [saluteId, setsaluteId] = useState({});
  const [saluteList, setsaluteList] = useState([]);
  const [statusId, setstatusId] = useState({});
  const [statusList, setstatusList] = useState([]);

  const locale = useSelector((state) => state.language.locale);

  const [required, setRequired] = useState({ required: false });
  const [img, setImg] = useState(avatarApi[9]);

  const [files] = useState([]);
  const acceptedFiles = ["image/jpeg", "image/png", "image/bmp"];
  const fileSizeLimit = 300000;
  const imgPreview = (img1) => {
    if (typeof img1 !== "string" && img1 !== "") {
      return URL.createObjectURL(img1);
    }
    return img1;
  };
  const onDrop = (filesVal) => {
    let oldFiles = files;
    const filesLimit = 2;
    oldFiles = oldFiles.concat(filesVal);
    if (oldFiles.length > filesLimit) {
      console.log("Cannot upload more than " + filesLimit + " items.");
    } else {
      setImg(filesVal[0]);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Employee/EmployeeList`);
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const data = {
        id: id ?? 0,
        employeeCode: employeeCode,
        eRPCode: eRPCode ?? "",
        machineCode: machineCode ?? "",
        reportTo: reportTo.id ?? "",
        machineCode: machineCode ?? "",
        arName: arName,
        enName: enName,
        motherName: motherName ?? "",
        organizationId: organizationId.id ?? "",
        jobId: jobId.id ?? "",
        jobLevelId: jobLevelId.id ?? "",
        hiringDate: hiringDate ?? "",
        controlParameterId: controlParameterId.id ?? "",
        identityTypeId: identityTypeId.id ?? "",
        identityIssuingDate: identityIssuingDate ?? "",
        identityExpiry: identityExpiry ?? "",
        identityNumber: identityNumber ?? "",
        identityIssuingAuth: identityIssuingAuth ?? "",
        genderId: genderId.id ?? "",
        nationalityId: nationalityId.id ?? "",
        religionId: religionId.id ?? "",
        birthDate: birthDate ?? "",
        birthGovId: birthGovId.id ?? "",
        birthCityId: birthCityId.id ?? "",
        socialStatusId: socialStatusId.id ?? "",
        sonNo: sonNo ?? "",
        militaryStatusId: militaryStatusId.id ?? "",
        //photoUrl: photoUrl,
        isInsured: isInsured ?? false,
        isSpecialNeeds: isSpecialNeeds ?? false,
        saluteId: saluteId.id ?? "",
        statusId: statusId.id ?? "",
        isResident: isResident ?? false,
        image: img == avatarApi[9] ? null : img,
        userId: 0,
      };

      const dataApi = await EmployeeData(locale).Saveform(data);
      if (dataApi.status == 200) {
        if (id == 0) setid(dataApi.id);
        toast.success(notif.saved);
      } else {
        toast.error(dataApi.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  //   const clear = (e) => {
  //     setid(0);
  //     setemployeeCode('');
  //     seteRPCode('');
  //     setmachineCode('');
  //     setreportTo({});
  //     setMachineCode('');
  //     setarName('');
  //     setenName('');
  //     setmotherName('');
  //     setorganizationId({});
  //     setjobId({});
  //     setjobLevelId({});
  //     sethiringDate(format(new Date(), 'yyyy-MM-dd'));
  //     setcontrolParameterId({});
  //     setidentityTypeId({});
  //     setidentityIssuingDate(format(new Date(), 'yyyy-MM-dd'));
  //     setidentityExpiry(format(new Date(), 'yyyy-MM-dd'));
  //     setidentityNumber('');
  //     setidentityIssuingAuth('');
  //     setgenderId({});
  //     setnationalityId({});
  //     setreligionId({});
  //     setbirthDate('');
  //     setbirthGovId({});
  //     setbirthCityId({});
  //     setsocialStatusId({});
  //     setsonNo('');
  //     setmilitaryStatusId({});
  //     setisInsured(false);
  //     setisSpecialNeeds(false);
  //     setsaluteId({});
  //     setstatusId({});
  //     setisResident(false);
  //     setImg(avatarApi[9]);
  //   };

  useEffect(() => {
    async function fetchData() {
      try {
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
        if (id > 0) {
          const dataApi = await EmployeeData(locale).GetList(id);

          if (dataApi) {
            // setid(dataApi.id);
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
            setstatusId({
              id: dataApi.statusId,
              name: dataApi.statusName,
            });
            setisResident(dataApi.isResident);
            let empimg =
              dataApi.photo == null
                ? avatarApi[9]
                : `data:image/jpeg;base64,${dataApi.photo}`;
            setImg(empimg);
          }
          //else clear();
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
    // if (employee > 0);
    fetchData();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={0}>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="empcode"
                      name="empcode"
                      type="number"
                      value={employeeCode}
                      onChange={(e) => setemployeeCode(e.target.value)}
                      label={intl.formatMessage(messages.employeeCode)}
                      className={classes.field}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="machineCode"
                      type="number"
                      name="machineCode"
                      value={machineCode}
                      onChange={(e) => setmachineCode(e.target.value)}
                      label={intl.formatMessage(messages.machineCode)}
                      className={classes.field}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="eRPCode"
                      name="eRPCode"
                      value={eRPCode}
                      onChange={(e) => {
                        seteRPCode(e.target.value);
                      }}
                      label={intl.formatMessage(messages.eRPCode)}
                      className={classes.field}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      required
                      control={
                        <Switch
                          checked={isInsured}
                          onChange={() => {
                            setisInsured(!isInsured);
                            setRequired({ required: !isInsured });
                          }}
                          color="secondary"
                        />
                      }
                      label={intl.formatMessage(messages.isinsured)}
                    />
                  </Grid>
                </Grid>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      disabled
                      id="ddlstatusId"
                      options={statusList || []}
                      value={{
                        id: statusId.id,
                        name: statusId.name,
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, value) => {
                        setstatusId({
                          id: value !== null ? value.id : 0,
                          name: value !== null ? value.name : "",
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="statusId"
                          // required
                          label={intl.formatMessage(messages.status)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        name="hdate"
                        label={intl.formatMessage(messages.hiringDate)}
                        value={hiringDate}
                        onChange={(date) => {
                          sethiringDate(format(new Date(date), "yyyy-MM-dd"));
                        }}
                        className={classes.field}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      // required
                      control={
                        <Switch
                          checked={isSpecialNeeds}
                          onChange={() => {
                            setisSpecialNeeds(!isSpecialNeeds);
                          }}
                          color="secondary"
                        />
                      }
                      label={intl.formatMessage(messages.isSpecialNeeds)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      // required
                      control={
                        <Switch
                          checked={isResident}
                          onChange={() => {
                            setisResident(!isResident);
                          }}
                          color="secondary"
                        />
                      }
                      label={intl.formatMessage(messages.isResident)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs container spacing={2} direction="row">
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="arname"
                      required
                      name="arname"
                      value={arName}
                      onChange={(e) => setarName(e.target.value)}
                      label={intl.formatMessage(messages.arname)}
                      className={classes.field}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="enname"
                      name="enname"
                      required
                      value={enName}
                      onChange={(e) => setenName(e.target.value)}
                      label={intl.formatMessage(messages.enname)}
                      className={classes.field}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <div sx={{ height: 128 }}>
                <Typography className={Type.textCenter}>
                  <FormattedMessage {...messages.upload} />
                  &nbsp;(Max 100KB)
                </Typography>
                <Dropzone
                  className={classes.hiddenDropzone}
                  accept={acceptedFiles.join(",")}
                  acceptClassName="stripes"
                  onDrop={onDrop}
                  // maxSize={fileSizeLimit}
                  ref={(node) => {
                    dropzoneRef = node;
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>
                <div className={classes.avatarWrap}>
                  <Avatar
                    alt="Avatar"
                    className={classes.uploadAvatar}
                    src={imgPreview(img)}
                  />
                  <Tooltip
                    id="tooltip-upload"
                    title={intl.formatMessage(messages.upload)}
                  >
                    <IconButton
                      className={classes.buttonUpload}
                      component="button"
                      onClick={() => {
                        dropzoneRef.open();
                      }}
                      size="large"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={2} alignItems="flex-start" direction="row">
            <Grid item xs={10} md={12}>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlidentityType"
                    required
                    options={identityTypeList || []}
                    value={{
                      id: identityTypeId.id,
                      name: identityTypeId.name,
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    onChange={(event, value) => {
                      setidentityTypeId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
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
                    onChange={(e) => setidentityIssuingAuth(e.target.value)}
                    label={intl.formatMessage(messages.identityIssuingAuth)}
                    className={classes.field}
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="identityNumber"
                    name="identityNumber"
                    value={identityNumber}
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: 14,
                        min: 14,
                      },
                    }}
                    onChange={(e) => setidentityNumber(e.target.value)}
                    label={intl.formatMessage(messages.identitynumber)}
                    className={classes.field}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                      label={intl.formatMessage(messages.identityIssuingDate)}
                      value={identityIssuingDate}
                      required
                      onChange={(date) => {
                        setidentityIssuingDate(
                          format(new Date(date), "yyyy-MM-dd")
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
                      required
                      value={identityExpiry}
                      onChange={(date) => {
                        setidentityExpiry(format(new Date(date), "yyyy-MM-dd"));
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
            <Grid item xs={12} md={12}>
              <hr />
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
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setgenderId({
                    id: value !== null ? value.id : 0,
                    name: value !== null ? value.name : "",
                  });
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
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setnationalityId({
                    id: value !== null ? value.id : 0,
                    name: value !== null ? value.name : "",
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="nationality"
                    //  required
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
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setreligionId({
                    id: value !== null ? value.id : 0,
                    name: value !== null ? value.name : "",
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="religionId"
                    //   required
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
                    setbirthDate(format(new Date(date), "yyyy-MM-dd"));
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
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setbirthGovId({
                    id: value !== null ? value.id : 0,
                    name: value !== null ? value.name : "",
                  });
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
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setbirthCityId({
                    id: value !== null ? value.id : 0,
                    name: value !== null ? value.name : "",
                  });
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
                onChange={(e) => setmotherName(e.target.value)}
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
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    onChange={(event, value) => {
                      setsocialStatusId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
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
                    type="number"
                    label={intl.formatMessage(messages.sonNo)}
                    className={classes.field}
                    variant="outlined"
                    onChange={(e) => setsonNo(e.target.value)}
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
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    onChange={(event, value) => {
                      setmilitaryStatusId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
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
                <Grid item xs={12} md={12}>
                  <hr />
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
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    onChange={(event, value) => {
                      setorganizationId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
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
                    id="ddlcontrolParameterId"
                    options={controlParameterList || []}
                    value={{
                      id: controlParameterId.id,
                      name: controlParameterId.name,
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    onChange={(event, value) => {
                      setcontrolParameterId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="controlParameterId"
                        required
                        label={intl.formatMessage(messages.controlParameter)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddljobid"
                    required
                    options={jobList || []}
                    value={{ id: jobId.id, name: jobId.name }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    onChange={(event, value) => {
                      setjobId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
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
                </Grid>{" "}
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddljobLevelId"
                    options={jobLevelList || []}
                    value={{ id: jobLevelId.id, name: jobLevelId.name }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    onChange={(event, value) => {
                      setjobLevelId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
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
            <Grid item xs={12} md={12}>
              <hr />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button variant="contained" color="secondary" type="submit">
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button type="button" onClick={() => oncancel()}>
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
export default injectIntl(Personal);
