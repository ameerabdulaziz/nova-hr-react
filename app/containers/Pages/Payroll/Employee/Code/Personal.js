import React, { useState, useEffect } from "react";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
import EmployeeCreationFeedback from "../component/Personal/EmployeeCreationFeedback";
import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DecryptUrl from "../../Component/DecryptUrl";
import { extractBirthDayFromIdentityNumber, formateDate, validateEmail } from "../../helpers";

function Personal(props) {
  const history = useHistory();
  // const ref = useRef(null);
  const location = useLocation();

  const authState = useSelector((state) => state.authReducer);

  // get employee data from route state or url
  const empid  = location.state ? location.state.empid : DecryptUrl()
  const id = empid?.id ?? 0;


  let dropzoneRef;
  const [progress, setProgress] = useState(false);
  const { intl, pristine } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");

  const [employeeCode, setemployeeCode] = useState("");
  const [checkEmployeeCode, setCheckEmployeeCode] = useState(true);
  const [machineCode, setmachineCode] = useState("");
  const [eRPCode, seteRPCode] = useState("");
  const [reportTo, setreportTo] = useState(null);
  const [reportToList, setreportToList] = useState([]);
  const [arName, setarName] = useState("");
  const [enName, setenName] = useState("");
  const [motherName, setmotherName] = useState("");
  const [organizationId, setorganizationId] = useState(null);
  const [organizationList, setorganizationList] = useState([]);
  const [jobId, setjobId] = useState(null);
  const [jobList, setjobList] = useState([]);
  const [jobLevelId, setjobLevelId] = useState(null);
  const [jobLevelList, setjobLevelList] = useState([]);
  const [hiringDate, sethiringDate] = useState(new Date());
  const [controlParameterId, setcontrolParameterId] = useState(null);
  const [controlParameterList, setcontrolParameterList] = useState([]);
  const [identityTypeId, setidentityTypeId] = useState(null);
  const [identityTypeList, setidentityTypeList] = useState([]);
  const [identityIssuingDate, setidentityIssuingDate] = useState(null);
  const [identityExpiry, setidentityExpiry] = useState(null);
  const [identityNumber, setidentityNumber] = useState("");
  const [identityIssuingAuth, setidentityIssuingAuth] = useState("");
  const [genderId, setgenderId] = useState(null);
  const [genderList, setgenderList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [userName, setUserName] = useState('');
  const [nickName, setNickName] = useState('');

  const [nationalityId, setnationalityId] = useState(null);
  const [nationalityList, setnationalityList] = useState([]);
  const [religionId, setreligionId] = useState(null);
  const [religionList, setreligionList] = useState([]);
  const [birthDate, setbirthDate] = useState(null);
  const [workEmail, setWorkEmail] = useState('');
  const [isHR, setIsHR] = useState(false);
  // const [hrBranchList, setHrBranchList] = useState([])

  const [birthGovId, setbirthGovId] = useState(null);
  const [birthGovList, setbirthGovList] = useState([]);

  const [birthCityId, setbirthCityId] = useState(null);
  const [birthCityList, setbirthCityList] = useState([]);
  const [socialStatusId, setsocialStatusId] = useState(null);
  const [socialStatusList, setsocialStatusList] = useState([]);
  const [sonNo, setsonNo] = useState('');

  const [militaryStatusId, setmilitaryStatusId] = useState(null);
  const [militaryStatusList, setmilitaryStatusList] = useState([]);
  const [isInsured, setisInsured] = useState(false);
  const [isSpecialNeeds, setisSpecialNeeds] = useState(false);
  const [isResident, setisResident] = useState(false);

  const [saluteId, setsaluteId] = useState(null);
  const [saluteList, setsaluteList] = useState([]);
  const [statusId, setstatusId] = useState(null);
  const [statusList, setstatusList] = useState([]);

  const locale = useSelector((state) => state.language.locale);

  const [isEmployeeCreatedOpen, setIsEmployeeCreatedOpen] = useState(false);
  const [checkEmployeeIdentityNumber, setCheckEmployeeIdentityNumber] = useState(true);
  const [checkEmployeeWorkEmail, setCheckEmployeeWorkEmail] = useState(true);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isIdentityNumberExist, setIsIdentityNumberExist] = useState(false);
  const [checkEmployeeUsername, setCheckEmployeeUsername] = useState(true);
  const [isUsernameExist, setIsUsernameExist] = useState(false);

  const [img, setImg] = useState(avatarApi[9]);

  const [DateError, setDateError] = useState({});

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

  const fetchEmployeeCode = async (code) => {
    setIsLoading(true);

    try {
      const response = await EmployeeData(locale).checkEmpCodeExist(code);

      const isEqual = response === parseInt(code, 10);

      if (!isEqual) {
        toast.success(intl.formatMessage(messages.employeeCodeAlreadyExistReplacedWithNewCode));
        setemployeeCode(response);
        setCheckEmployeeCode(false);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (employeeCode) {
      if (checkEmployeeCode) {
        const timeoutId = setTimeout(() => {
          fetchEmployeeCode(employeeCode);
        }, 1000);

        return () => {
          clearTimeout(timeoutId);
        };
      }

      setCheckEmployeeCode(true);
    }
  }, [employeeCode]);

  const fetchEmployeeUsername = async (username) => {
    setIsLoading(true);

    try {
      const response = await EmployeeData(locale).checkUserNameExist(id, username);

      if (!response) {
        toast.error(intl.formatMessage(messages.usernameAlreadyExist));
        setIsUsernameExist(false);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userName) {
      if (checkEmployeeUsername) {
        const timeoutId = setTimeout(() => {
          fetchEmployeeUsername(userName);
        }, 1000);

        return () => {
          clearTimeout(timeoutId);
        };
      }

      setCheckEmployeeUsername(true);
    }
  }, [userName]);

  const fetchEmployeeIdentityNumber = async (number) => {
    setIsLoading(true);

    try {
      const response = await EmployeeData(locale).checkEmpIdentityNumberExist(id, number);
      setIsIdentityNumberExist(!response);

      if (!response) {
        toast.error(intl.formatMessage(messages.identityNumberAlreadyExist));
        setCheckEmployeeIdentityNumber(false);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // extract birthday from identity number
    // 1. check if identity number is 14 characters
    // 2. check if birth date is empty
    // 3. check if id is 0 (means create new employee)
    // 4. check if valid length is 14 (14 is the length of a valid identity number)
    if (
      identityNumber.length === 14
      && !birthDate
      && id === 0
      && !!identityTypeId?.validLength
      && parseInt(identityTypeId.validLength, 10) === 14
    ) {
      setbirthDate(extractBirthDayFromIdentityNumber(identityNumber));
    }

    // Check if identity number is not exsit
    if (identityNumber && identityTypeId?.validLength !== 0 && identityNumber.length === identityTypeId?.validLength) {
      if (checkEmployeeIdentityNumber) {
        const timeoutId = setTimeout(() => {
          fetchEmployeeIdentityNumber(identityNumber);
        }, 1000);

        return () => {
          clearTimeout(timeoutId);
        };
      }

      setCheckEmployeeIdentityNumber(true);
    } else {
      setIsIdentityNumberExist(false);
    }
  }, [identityNumber]);

  const fetchEmployeeWorkEmail = async (email) => {
    setIsLoading(true);

    try {
      const response = await EmployeeData(locale).checkEmpWorkEmailExist(id, email);

      setIsEmailExist(!response);

      if (!response) {
        toast.error(intl.formatMessage(messages.emailAlreadyExist));
        setCheckEmployeeWorkEmail(false);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (workEmail) {
      if (checkEmployeeWorkEmail && validateEmail(workEmail)) {
        const timeoutId = setTimeout(() => {
          fetchEmployeeWorkEmail(workEmail);
          if (id === 0 && userName === '') {
            setUserName(workEmail.split('@')[0]);
          }
        }, 1000);

        return () => {
          clearTimeout(timeoutId);
        };
      }

      setCheckEmployeeWorkEmail(true);
    }
  }, [workEmail]);


    // used to reformat date before send it to api
  const dateFormatFun = (date) => {
    return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidIdentityNumber = identityNumber.length === (identityTypeId?.validLength ?? 0);

    if (!isValidIdentityNumber && identityTypeId?.validLength !== 0) {
      toast.error(`${intl.formatMessage(messages.identitynumberShouldBe)} ${identityTypeId?.validLength} ${locale === 'en' ? 'Number' : 'رقم'}`);
      return;
    }

    if (isEmailExist) {
      toast.error(intl.formatMessage(messages.emailAlreadyExist));
      return;
    }

    if (isIdentityNumberExist) {
      toast.error(intl.formatMessage(messages.identityNumberAlreadyExist));
      return;
    }

    if (isUsernameExist) {
      toast.error(intl.formatMessage(messages.usernameAlreadyExist));
      return;
    }

    if (arName.split(' ').length === 1 || enName.split(' ').length === 1) {
      toast.error(intl.formatMessage(messages.employeeNameShouldNotBeOneWord));
      return;
    }

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);

      const data = {
        id: id ?? 0,
        employeeCode,
        eRPCode: eRPCode ?? "",
        machineCode: machineCode ?? "",
        reportTo: reportTo?.id ?? "",
        arName,
        enName,
        userName,
        motherName: motherName ?? "",
        organizationId: organizationId?.id ?? "",
        jobId: jobId?.id ?? "",
        jobLevelId: jobLevelId?.id ?? "",
        hiringDate: dateFormatFun(hiringDate) ,
        controlParameterId: controlParameterId?.id ?? "",
        identityTypeId: identityTypeId?.id ?? "",
        identityIssuingDate: dateFormatFun(identityIssuingDate),
        identityExpiry: dateFormatFun(identityExpiry),
        identityNumber: identityNumber ?? "",
        identityIssuingAuth: identityIssuingAuth ?? "",
        genderId: genderId?.id ?? "",
        nationalityId: nationalityId?.id ?? "",
        religionId: religionId?.id ?? "",
        birthDate: dateFormatFun(birthDate),
        birthGovId: birthGovId?.id ?? "",
        birthCityId: birthCityId?.id ?? "",
        socialStatusId: socialStatusId?.id ?? "",
        sonNo: sonNo ?? "",
        militaryStatusId: militaryStatusId?.id ?? "",
        //photoUrl: photoUrl,
        isInsured: isInsured ?? false,
        isSpecialNeeds: isSpecialNeeds ?? false,
        saluteId: saluteId?.id ?? "",
        statusId: statusId?.id ?? "",
        isResident: isResident ?? false,
        image: img === avatarApi[9] ? null : img,
        userId: 0,
        workEmail,
        isHr: isHR,
        nickName,
        // hrBranchList: isHR ? hrBranchList.map(item => item.id) : []
      };


      await EmployeeData(locale).Saveform(data);

      if (id === 0) {
        setIsEmployeeCreatedOpen(true);
      } else {
        toast.success(notif.saved);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const resetFields = () => {
    setarName('');
    setbirthCityId(null);
    setbirthDate(null);
    setbirthGovId(null);
    setCheckEmployeeCode(false);
    setcontrolParameterId(null);
    setemployeeCode('');
    setenName('');
    seteRPCode('');
    setgenderId(null);
    sethiringDate(null);
    // setHrBranchList([]);
    setidentityExpiry(null);
    setidentityIssuingAuth('');
    setidentityIssuingDate(null);
    setidentityNumber('');
    setidentityTypeId(null);
    setImg(avatarApi[9]);
    setIsHR(false);
    setisInsured(false);
    setisResident(false);
    setisSpecialNeeds(false);
    setjobId(null);
    setjobLevelId(null);
    setmachineCode('');
    setmilitaryStatusId(null);
    setmotherName('');
    setnationalityId(null);
    setorganizationId(null);
    setreligionId(null);
    setreportTo(null);
    setsaluteId(null);
    setsocialStatusId(null);
    setsonNo('');
    setstatusId(null);
    setWorkEmail('');
    setUserName('');
    setNickName('');
  };

  const onEmployeeCreatedClose = () => {
    resetFields();
    setIsEmployeeCreatedOpen(false);
  };

  const onEmployeeCreatedConfirm = () => {
    history.push('/app/Pages/Employee/EmployeeList');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          employeedata,
          Jobdata,
          Jobleveldata,
          organizationdata,
          ControlParameterdata,
          identityTypedata,
          Genderdata,
          Nationalitydata,
          religiondata,
          BirthGovdata,
          BirthCitydata,
          socialStatusdata,
          MilitaryStatusdata,
          Salutedata,
          Statusdata,
          branches
        ] = await Promise.all([
          GeneralListApis(locale).GetEmployeeList(),
          GeneralListApis(locale).GetJobList(),
          GeneralListApis(locale).GetJobLevelList(),
          GeneralListApis(locale).GetDepartmentList(),
          GeneralListApis(locale).GetControlParameterList(),
          GeneralListApis(locale).GetIdentityType(),
          GeneralListApis(locale).GetGenderList(),
          GeneralListApis(locale).GetNationalityList(),
          GeneralListApis(locale).GetReligionList(),
          GeneralListApis(locale).GetGovernmentList(),
          GeneralListApis(locale).GetCityList(),
          GeneralListApis(locale).GetSocialStatusList(),
          GeneralListApis(locale).GetMilitaryStatusList(),
          GeneralListApis(locale).GetSaluteList(),
          GeneralListApis(locale).GetEmpStatusList(),
          EmployeeData(locale).GetBranchList(),
        ]);

        setBranchList(branches || []);

        setreportToList(employeedata || []);

        setjobList(Jobdata || []);

        setjobLevelList(Jobleveldata || []);

        setorganizationList(organizationdata || []);

        setcontrolParameterList(ControlParameterdata || []);

        setidentityTypeList(identityTypedata || []);

        setgenderList(Genderdata || []);

        setnationalityList(Nationalitydata || []);

        setreligionList(religiondata || []);

        setbirthGovList(BirthGovdata || []);

        setbirthCityList(BirthCitydata || []);

        setsocialStatusList(socialStatusdata || []);

        setmilitaryStatusList(MilitaryStatusdata || []);

        setsaluteList(Salutedata || []);

        setstatusList(Statusdata || []);

        if (id > 0) {
          const dataApi = await EmployeeData(locale).GetList(id);

          if (dataApi) {
            setCheckEmployeeCode(false);
            setCheckEmployeeIdentityNumber(false);
            setCheckEmployeeWorkEmail(false);
            setCheckEmployeeUsername(false);

            // setid(dataApi.id);
            setUserName(dataApi.userName ?? '');
            setNickName(dataApi.nickName ?? '');
            setemployeeCode(dataApi.employeeCode ?? '');
            setWorkEmail(dataApi.workEmail ?? '');
            // setHrBranchList(dataApi.hrBranchList ?? []);
            setIsHR(dataApi.isHr);
            seteRPCode(dataApi.eRPCode ?? '');
            setmachineCode(dataApi.machineCode ?? '');
            setreportTo(dataApi.reportTo ? {
              id: dataApi.reportTo,
              name: dataApi.reportToName,
            } : null);
            setarName(dataApi.arName ?? '');
            setenName(dataApi.enName ?? '');
            setmotherName(dataApi.motherName ?? '');
            setorganizationId(dataApi.organizationId ? {
              id: dataApi.organizationId,
              name: dataApi.organizationName,
            } : null);
            setjobId(dataApi.jobId ? {
              id: dataApi.jobId,
              name: dataApi.jobName,
            } : null);
            setjobLevelId(dataApi.jobLevelId ? {
              id: dataApi.jobLevelId,
              name: dataApi.jobLevelName,
            } : null);
            sethiringDate(dataApi.hiringDate);
            setcontrolParameterId(dataApi.controlParameterId ? {
              id: dataApi.controlParameterId,
              name: dataApi.controlParameterName,
            } : null);
            const identityType = identityTypedata.find(item => item.id === dataApi.identityTypeId);
            setidentityTypeId(dataApi.identityTypeId && identityType ? identityType : null);
            setidentityIssuingDate(dataApi.identityIssuingDate);
            setidentityExpiry(dataApi.identityExpiry);
            setidentityNumber(dataApi.identityNumber ?? '');
            setidentityIssuingAuth(dataApi.identityIssuingAuth ?? '');
            setgenderId( dataApi.genderId ? {
              id: dataApi.genderId,
              name: dataApi.genderName,
            } : null);
            setnationalityId(dataApi.nationalityId ? {
              id: dataApi.nationalityId,
              name: dataApi.nationalityName,
            } : null);
            setreligionId(dataApi.religionId ? {
              id: dataApi.religionId,
              name: dataApi.religionName,
            } : null);
            setbirthDate(dataApi.birthDate);
            setbirthGovId(dataApi.birthGovId ? {
              id: dataApi.birthGovId,
              name: dataApi.birthGovName,
            } : null);
            setbirthCityId(dataApi.birthCityId ?{
              id: dataApi.birthCityId,
              name: dataApi.birthCityName,
            } : null);
            setsocialStatusId(dataApi.socialStatusId ? {
              id: dataApi.socialStatusId,
              name: dataApi.socialStatusName,
            } : null);
            setsonNo(dataApi.sonNo ?? '');
            setmilitaryStatusId(dataApi.militaryStatusId ? {
              id: dataApi.militaryStatusId,
              name: dataApi.militaryStatusName,
            } : null);
            setisInsured(dataApi.isInsured);
            setisSpecialNeeds(dataApi.isSpecialNeeds);
            setsaluteId(dataApi.saluteId ? {
              id: dataApi.saluteId,
              name: dataApi.saluteName,
            } : null);
            setstatusId(dataApi.statusId ? {
              id: dataApi.statusId,
              name: dataApi.statusName,
            } : null);
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

  const sanitizeEmployeeNameInput = (value) => value.replace(/[^a-zA-Z0-9\u0600-\u06FF\s]+/g, '')

  return (
    <PayRollLoader isLoading={isLoading}>

      <EmployeeCreationFeedback
        isOpen={isEmployeeCreatedOpen}
        onClose={onEmployeeCreatedClose}
        onConfirm={onEmployeeCreatedConfirm}
      />

      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={10} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="arname"
                    required
                    name="arname"
                    value={arName}
                    onChange={(e) => setarName(sanitizeEmployeeNameInput(e.target.value))}
                    label={intl.formatMessage(messages.arname)}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="enname"
                    name="enname"
                    required
                    value={enName}
                    onChange={(e) => setenName(sanitizeEmployeeNameInput(e.target.value))}
                    label={intl.formatMessage(messages.enname)}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="nickName"
                    name="nickName"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    label={intl.formatMessage(messages.nickName)}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    id="empcode"
                    name="empcode"
                    type="number"
                    value={employeeCode}
                    disabled={id !== 0}
                    required
                    onChange={id !== 0 ? undefined :(e) => setemployeeCode(e.target.value)}
                    label={intl.formatMessage(messages.employeeCode)}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
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
                    autoComplete='off'
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
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    disabled
                    id="ddlstatusId"
                    options={statusList || []} 
                    value={statusId}
                    renderOption={(optionProps, option) => {
                      return (
                        <li {...optionProps} key={option.id}>
                          {option.name}
                        </li>
                      );
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
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                       name="hdate"
                       label={intl.formatMessage(messages.hiringDate)}
                       value={hiringDate  ? dayjs(hiringDate) : hiringDate}
                      className={classes.field}
                        onChange={(date) => {
                          sethiringDate(date)
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`hiringDate`]: true
                          }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`hiringDate`]: false
                          }))
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
                    options={reportToList}
                    value={reportTo}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => setreportTo({
                      id: value !== null ? value.id : 0,
                      name: value !== null ? value.name : '',
                    })}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.reportto)}
                      />
                    )}
                  />
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
                    options={identityTypeList || []}
                    value={identityTypeId}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
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
                        validLength: value !== null ? value.validLength : 0,
                        expiredPeriod : value !== null ? value.expiredPeriod : 0,
                      });
                      if (identityIssuingDate && value && value?.expiredPeriod !== 0) {
                        const expireDate = moment(formateDate(identityIssuingDate)).add(value?.expiredPeriod ?? 0, 'y');

                        setidentityExpiry(expireDate.format('YYYY-MM-DD'));
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
                    onChange={(e) => setidentityIssuingAuth(e.target.value)}
                    label={intl.formatMessage(messages.identityIssuingAuth)}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    id="identityNumber"
                    name="identityNumber"
                    value={identityNumber}
                    onChange={(e) => setidentityNumber(e.target.value)}
                    label={intl.formatMessage(messages.identitynumber)}
                    className={classes.field}
                    variant="outlined"
                    required
                    autoComplete='off'
                  />
                </Grid>

                

                  <Grid item xs={12} md={3}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.identityIssuingDate)}
                        value={identityIssuingDate ? dayjs(identityIssuingDate) : identityIssuingDate}
                        className={classes.field}
                          onChange={(date) => {
                            setidentityIssuingDate(date)


                            if (identityTypeId?.expiredPeriod && identityTypeId?.expiredPeriod !== 0) {
                              if(date)
                              {
                                const expireDate = moment(formateDate(date)).add(identityTypeId?.expiredPeriod ?? 0, 'y');
                                setidentityExpiry(expireDate.format('YYYY-MM-DD'));
                              }
                              else
                              {
                                setidentityExpiry(null);
                              }
                            }
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`identityIssuingDate`]: true
                            }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`identityIssuingDate`]: false
                            }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>



                <Grid item xs={12} md={3}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                      label={intl.formatMessage(messages.identityExpiry)}
                      disabled={identityTypeId && identityTypeId?.expiredPeriod !== 0} 
                      value={identityExpiry ? dayjs(identityExpiry) : identityExpiry}
                      className={classes.field}
                        onChange={(date) => {
                          setidentityExpiry(date)
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`identityExpiry`]: true
                          }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`identityExpiry`]: false
                          }))
                        }
                      }}
                      />
                  </LocalizationProvider>
                </Grid>


              </Grid>
            </Grid>

            <Grid item xs={12} md={12}>
              <hr />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                id="ddlGenderId"
                options={genderList || []}
                value={genderId}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
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
            <Grid item xs={12} md={3}>
              <Autocomplete
                id="ddlNationalityId"
                options={nationalityList || []}
                value={nationalityId}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
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
            <Grid item xs={6} md={3}>
              <Autocomplete
                id="ddlreligionId"
                options={religionList || []}
                value={religionId}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
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


                <Grid item xs={12} md={3}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                      label={intl.formatMessage(messages.birthDate)}
                      value={birthDate ? dayjs(birthDate) : birthDate}
                      className={classes.field}
                        onChange={(date) => {
                          setbirthDate(date)
                      }}

                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`birthDate`]: true
                            }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`birthDate`]: false
                            }))
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
              <TextField
                name="workEmail"
                type="email"
                value={workEmail}
                required
                onChange={(e) => {
                  setWorkEmail(e.target.value);
                }}
                label={intl.formatMessage(messages.workEmail)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name="userName"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                label={intl.formatMessage(messages.userName)}
                fullWidth
                disabled={ id && id !== 0 }
                variant="outlined"
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <Autocomplete
                id="ddlbirthGovId"
                options={birthGovList || []}
                value={birthGovId}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
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
                    label={intl.formatMessage(messages.gov)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <Autocomplete
                id="ddlbirthcityId"
                options={birthCityList || []}
                value={birthCityId}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
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
                    label={intl.formatMessage(messages.city)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                id="motherName"
                name="motherName"
                value={motherName}
                label={intl.formatMessage(messages.motherName)}
                className={classes.field}
                variant="outlined"
                onChange={(e) => setmotherName(e.target.value)}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                id="ddlsocialStatusId"
                options={socialStatusList || []}
                value={socialStatusId}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
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
                    label={intl.formatMessage(messages.socialStatus)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                id="sonNo"
                name="sonNo"
                value={sonNo}
                type="number"
                label={intl.formatMessage(messages.sonNo)}
                className={classes.field}
                variant="outlined"
                onChange={(e) => setsonNo(e.target.value)}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                id="ddlmilitaryStatusId"
                options={militaryStatusList || []}
                value={militaryStatusId}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
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
                    label={intl.formatMessage(messages.militaryStatus)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={12}>
                  <hr />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    id="ddlorganization"
                    options={organizationList || []}
                    value={organizationId}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
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

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    id="ddlcontrolParameterId"
                    options={controlParameterList || []}
                    value={controlParameterId}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
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
                        label={intl.formatMessage(messages.controlParameter)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    id="ddljobid"
                    required
                    options={jobList || []}
                    value={jobId}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
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
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    id="ddljobLevelId"
                    options={jobLevelList || []}
                    value={jobLevelId}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
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
                        label={intl.formatMessage(messages.joblevel)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <hr />
                </Grid>

                <Grid item xs={12}>
                  <Grid container direction="row" spacing={1}>
                    {/* <Grid item xs={12} md={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isInsured}
                            onChange={() => {
                              setisInsured(!isInsured);
                            }}
                            color="secondary"
                          />
                        }
                        label={intl.formatMessage(messages.isinsured)}
                      />
                    </Grid> */}

                    {authState.user.isHR && <Grid item xs={12} md={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isHR}
                            name='isHR'
                            onChange={(evt) => setIsHR(evt.target.checked)}
                          />
                        }
                        label={intl.formatMessage(messages.isHR)}
                      />
                    </Grid>}

                    <Grid item xs={12} md={3}>
                      <FormControlLabel
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
                </Grid>

                {/* {authState.user.isHR && <>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      options={branchList}
                      multiple
                      disabled={!isHR}
                      disableCloseOnSelect
                      className={`${style.AutocompleteMulSty} ${
                        locale === 'ar' ? style.AutocompleteMulStyAR : null
                      }`}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      value={hrBranchList}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      getOptionLabel={(option) => (option ? option.name : '')}
                      onChange={(_, value) => setHrBranchList(value) }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          disabled={!isHR}
                          label={intl.formatMessage(messages.branches)}
                        />
                      )}
                    />
                  </Grid>
                </>} */}

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
