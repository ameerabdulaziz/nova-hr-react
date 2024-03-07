import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EmployeeCarData from "../api/EmployeeCarData";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { useSelector } from "react-redux";
import GeneralListApis from "../../api/GeneralListApis";
import { Autocomplete } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useStyles from "../../Style";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import PayRollLoader from "../../Component/PayRollLoader";
import style from '../../../../../styles/styles.scss'

function EmployeeCar(props) {

   // decode URL 
   let url = decodeURI(window.location.href)

   const isValidJSON = (str) => {
     try {
       JSON.parse(str);
       return true;
     } catch (e) {
       return false;
     }
   };
  
   const isValidEncode = str => {
     try {
       atob(str)
       return true;
     } catch (e) {
       return false;
     }
   };
  
   // get employee data from url
   const { empid } =  isValidEncode(url.split('/').at(-1)) && isValidJSON(atob(url.split('/').at(-1))) ?  JSON.parse(atob(url.split('/').at(-1))) : { id: 0, name: "" };
  
  const { intl, pristine } = props;

  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const [isLoading, setIsLoading] = useState(true);
  const title = localStorage.getItem("MenuName");
  const [id, setid] = useState();
  const [carModel, setcarModel] = useState("");
  const [manufactureYear, setmanufactureYear] = useState("");
  const [licenseNo, setlicenseNo] = useState("");
  const [trafficUnit, settrafficUnit] = useState("");
  const [hasLicense, sethasLicense] = useState(false);
  const [licenseGradeId, setlicenseGradeId] = useState({ id: 0, name: "" });
  const [gradelist, setgradelist] = useState([]);
  const [employeeList, setemployeeList] = useState([]);
  const [required, setRequired] = useState({ required: false });

  const trueBool = true;
  const { classes } = useStyles();
  // const { pristine, submitting, init } = props;
  const locale = useSelector((state) => state.language.locale);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const data = {
        id: id,
        employeeId: employee.id,
        carModel: carModel,
        manufactureYear: manufactureYear,
        licenseNo: licenseNo,
        trafficUnit: trafficUnit,
        hasLicense: hasLicense,
        licenseGradeId: licenseGradeId.id ?? "",
      };

      const dataApi = await EmployeeCarData().Save(data);
      if (dataApi.status == 200) {
        if (id == 0) setid(dataApi.data.id);

        toast.success(notif.saved);
      } else {
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const deletedata = async (e) => {
    try {
      setIsLoading(true);
      const dataApi = await EmployeeCarData().Delete(id);
      if (dataApi.status == 200) {
        clear();
        toast.error(notif.removed);
      } else {
        toast.error(dataApi.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const clear = (e) => {
    setid(0);
    setlicenseNo("");
    setlicenseGradeId({ id: 0, name: "" });
    sethasLicense(false);
    setcarModel("");
    setmanufactureYear("");
    settrafficUnit("");
    // setgradelist();
  };
  const GetLookup = useCallback(async () => {
    try {
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setemployeeList(employeedata || []);
      const LicenseGradedata = await GeneralListApis(
        locale
      ).GetLicenseGradeList();
      setgradelist(LicenseGradedata || []);

      //setEmployee(empid);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    GetLookup();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const dataApi = await EmployeeCarData(locale).GetList(employee.id);

        if (dataApi.length > 0) {
          setid(dataApi[0].id);
          settrafficUnit(dataApi[0].trafficUnit);
          setlicenseNo(dataApi[0].licenseNo);
          setmanufactureYear(dataApi[0].manufactureYear);
          setcarModel(dataApi[0].carModel);
          sethasLicense(dataApi[0].hasLicense);
          setlicenseGradeId({
            id: dataApi[0].licenseGradeId,
            name: dataApi[0].gradeName,
          });
          // { id: 0, name: '' }
          // setgradelist(dataApi[0].gradeList);
        } else {
          clear();
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    // if (!data.length) { fetchData(); }
  }, [employee.id]);
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
     
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlEmp"
                    options={employeeList}
                    value={{ id: employee.id, name: employee.name }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" || option.id === value.id
                    }
                    getOptionLabel={(option) => (option.name ? option.name : "")}
                    onChange={(event, value) => {
                      setEmployee({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="employee"
                        //  value={employee.id}
                        label={intl.formatMessage(messages.chooseEmp)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    id="carModel"
                    name="carModel"
                    value={carModel}
                    onChange={(e) => setcarModel(e.target.value)}
                    placeholder={intl.formatMessage(messages.carModel)}
                    label={intl.formatMessage(messages.carModel)}
                    // validate={required}
                    required
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    id="manufactureYear"
                    name="manufactureYear"
                    value={manufactureYear}
                    onChange={(e) => setmanufactureYear(e.target.value)}
                    placeholder={intl.formatMessage(messages.manufactureYear)}
                    label={intl.formatMessage(messages.manufactureYear)}
                    // validate={required}
                    required
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={hasLicense}
                        onChange={() => {
                          sethasLicense(!hasLicense);
                          setRequired({ required: !hasLicense });
                        }}
                        color="secondary"
                      />
                    }
                    label={intl.formatMessage(messages.hasLicense)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    id="licenseNo"
                    name="licenseNo"
                    value={licenseNo}
                    onChange={(e) => setlicenseNo(e.target.value)}
                    placeholder={intl.formatMessage(messages.licenseNo)}
                    label={intl.formatMessage(messages.licenseNo)}
                    // validate={required}
                    {...required}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    id="trafficUnit"
                    name="trafficUnit"
                    value={trafficUnit}
                    onChange={(e) => settrafficUnit(e.target.value)}
                    placeholder={intl.formatMessage(messages.trafficUnit)}
                    label={intl.formatMessage(messages.trafficUnit)}
                    // validate={required}
                    {...required}
                    className={classes.field}
                    variant="outlined"
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="ddlgrade"
                    options={gradelist}
                    value={{ id: licenseGradeId.id, name: licenseGradeId.name }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" || option.id === value.id
                    }
                    getOptionLabel={(option) => (option.name ? option.name : "")}
                    onChange={(event, value) => {
                      setlicenseGradeId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="licenseGrade"
                        label={intl.formatMessage(messages.licenseGrade)}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={employee.id === 0}
                    className={style.generalBtnStys}
                  >
                    <FormattedMessage {...Payrollmessages.save} />
                  </Button>
                  <Button
                    type="button"
                    disabled={employee.id === 0 || pristine}
                    onClick={() => deletedata()}
                    className={style.generalBtnStys}
                  >
                    <FormattedMessage {...Payrollmessages.delete} />
                  </Button>
                </Grid>
              </Grid>

            </form>
          
        </Grid>
      </Grid>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(EmployeeCar);
