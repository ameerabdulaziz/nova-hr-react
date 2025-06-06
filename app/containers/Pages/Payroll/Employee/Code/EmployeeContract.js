import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { useSelector } from "react-redux";
import GeneralListApis from "../../api/GeneralListApis";
import { Autocomplete, Card, CardContent } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import EmployeeContractData from "../api/EmployeeContractData";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import PayRollLoader from "../../Component/PayRollLoader";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DecryptUrl from "../../Component/DecryptUrl";
import ContractTypeData from '../../MainData/api/ContractTypeData';
import { useLocation } from "react-router-dom";
import EmployeeDataSmall from "../../Component/EmployeeDataSmall";

function EmployeeContract(props) {

  const location = useLocation();
  
  // get employee data from url
  const empid  = DecryptUrl() ?   DecryptUrl()  : location.state ? location.state : { id: 0, name: "" }
  const { intl, pristine } = props;


  const { classes } = useStyles();
  const title = localStorage.getItem("MenuName");
  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const [id, setid] = useState(0);
  const [isKinship, setisKinship] = useState(false);
  const [notHasMission, setnotHasMission] = useState(false);
  const [hasAlternativeEmp, sethasAlternativeEmp] = useState(false);
  const [contractStartDate, setcontractStartDate] = useState(null);
  const [contractEndDate, setcontractEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [hiringSourceId, sethiringSourceId] = useState("");
  const [hiringSourceList, sethiringSourceList] = useState([]);

  const [kinshipLinkId, setkinshipLinkId] = useState("");
  const [kinshipLinkList, setkinshipLinkList] = useState([]);

  const [kinshipEmpId, setkinshipEmpId] = useState("");
  const [kinshipEmpList, setkinshipEmpList] = useState([]);

  const [contractTypeId, setcontractTypeId] = useState(null);
  const [contractTypeList, setcontractTypeList] = useState([]);
  
  const locale = useSelector((state) => state.language.locale);

  const [employeeHiringDate, setEmployeeHiringDate] = useState(null);

  const [required, setRequired] = useState({ required: false });

  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
   // return  date && !DateError ? format(new Date(date), "yyyy-MM-dd") : ""
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    	// used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
        return;
      }

    try {
      setIsLoading(true);

      const data = {
        id: id,
        employeeId: employee.id,

        hiringSourceId: hiringSourceId.id ?? "",
        isKinship: isKinship,
        kinshipLinkId: kinshipLinkId.id ?? "",
        kinshipEmpId: kinshipEmpId.id ?? "",
        hasAlternativeEmp: hasAlternativeEmp,
        contractTypeId: contractTypeId?.id ?? "",
        contractStartDate: dateFormatFun(contractStartDate),
        contractEndDate: dateFormatFun(contractEndDate),
        notHasMission: notHasMission,
      };


      const dataApi = await EmployeeContractData(locale).Save(data);

      if (dataApi.status == 200) {
        if (id == 0) setid(dataApi.data.id);
        toast.success(notif.saved);
      } else {
        toast.error(dataApi.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const deletedata = async (e) => {
    try {
      setIsLoading(true);
      const dataApi = await EmployeeContractData(locale).Delete(id);
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
    sethiringSourceId("");
    setisKinship(false);
    setkinshipLinkId("");
    setkinshipEmpId("");
    sethasAlternativeEmp(false);
    setcontractTypeId(null);
    setcontractStartDate(null);
    setcontractEndDate(null);
    setnotHasMission(false);
  };
  const GetLookup = useCallback(async () => {
    try {
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setkinshipEmpList(employeedata || []);

      const HiringSourcedata = await GeneralListApis(
        locale
      ).GetHiringSourceList();
      sethiringSourceList(HiringSourcedata || []);

      const kinshipLinkdata = await GeneralListApis(
        locale
      ).GetkinshipLinkList();
      setkinshipLinkList(kinshipLinkdata || []);

      const ContractTypedata = await ContractTypeData(
        locale
      ).GetList();
      setcontractTypeList(ContractTypedata || []);

      //  const kinshipEmpdata = await GeneralListApis(locale).GetEmployeeList();
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
        const dataApi = await EmployeeContractData(locale).GetList(employee.id);

        if (dataApi.length > 0) {
          setid(dataApi[0].id);

          sethiringSourceId({
            id: dataApi[0].hiringSourceId,
            name: dataApi[0].hiringSourceName,
          });
          setisKinship(dataApi[0].isKinship);
          setkinshipLinkId({
            id: dataApi[0].kinshipLinkId,
            name: dataApi[0].kinshipLinkName,
          });
          setkinshipEmpId({
            id: dataApi[0].kinshipEmpId,
            name: dataApi[0].kinshipEmpName,
          });
          sethasAlternativeEmp(dataApi[0].hasAlternativeEmp);
          setcontractTypeId({
            id: dataApi[0].contractTypeId,
            name: dataApi[0].contractTypeName,
          });
          setcontractStartDate(dayjs(dataApi[0].contractStartDate));
          setcontractEndDate(dayjs(dataApi[0].contractEndDate));
          setnotHasMission(dataApi[0].notHasMission);
        } else clear();
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [employee]);


  const contractStartDateFun = (date) => {
    setcontractStartDate(date)

    const startDate = new Date(date);

    if(!contractTypeId)
    {
      startDate.setFullYear(startDate.getFullYear() + 1, startDate.getMonth() , startDate.getDate() - 1);

      setcontractEndDate(startDate)
    }

    if(contractTypeId)
    {
      if(contractTypeId.contractPeriod !== 0)
      {
        startDate.setMonth( startDate.getMonth() + contractTypeId.contractPeriod , startDate.getDate() - 1);
        setcontractEndDate(startDate)
      }
    }
  }

  const handleEmpChange = (id, name, empName, hiringDate) => {
    if (id) {
      setEmployeeHiringDate(hiringDate ?? null);
    }

    if (name === 'employeeId') {
      if (id) {
        setEmployee({ id: id, name: empName });
      }

      // used to disable add button when clear employee name combo-box
      if (id === '') {
        setEmployee({ id: 0, name: '' });
      }
    }
  };

  const getContractStartDateError = () => {
    if ((employeeHiringDate && dayjs(employeeHiringDate).isAfter(contractStartDate))) {
      return <span style={{ color: 'red' }}>
        {intl.formatMessage(messages.contractDateMustNotPrecedeTheAppointmentDate)}
      </span>;
    }

    return undefined;
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} mt={0} >
            <Grid item xs={12} lg={10} xl={7}>
              <EmployeeDataSmall handleEmpChange={handleEmpChange} id={empid && empid.id !== 0 ? empid.id : null} />
            </Grid>

          <Grid item xs={12} lg={10} xl={7}>
           <Card className={classes.card}>
            <CardContent>
             <Grid container spacing={3} alignItems="flex-start" direction="row">

            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                id="ddlhiringSourceId"
                options={hiringSourceList}
                value={hiringSourceId.length !== 0 ?{
                  id: hiringSourceId.id,
                  name: hiringSourceId.name,
                }: null}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  sethiringSourceId({
                    id: value !== null ? value.id : 0,
                    name: value !== null ? value.name : "",
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    //margin="normal"
                    required
                    {...params}
                    name="hiringSourceId"
                    label={intl.formatMessage(messages.hiringSource)}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                id="ddlcontractTypeId"
                required
                options={contractTypeList}
                value={contractTypeId?{
                  id: contractTypeId.id,
                  ...(locale === "en" ? {
                    enName: contractTypeId.name
                  } : {
                    name: contractTypeId.name
                  })
                }: null}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (
                  option ? locale === "en" ? option.enName : option.name : ""
                  )}
                onChange={(event, value) => {
                  if(value !== null)
                  {
                    setcontractTypeId({
                      id: value.id,
                      name: locale === "en" ?  value.enName  : value.name ,
                      contractPeriod: value.contractPeriod ,
                    });
                  }
                  else
                  {
                    setcontractTypeId(null)
                  }

                  setcontractStartDate(null)
                  setcontractEndDate(null)
                }}
                renderInput={(params) => (
                  <TextField
                    //margin="normal"

                    {...params}
                    name="contractTypeId"
                    label={intl.formatMessage(messages.contractType)}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={3.5} lg={3.2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label={intl.formatMessage(messages.contractStartDate)}
                  value={contractStartDate ? dayjs(contractStartDate) : contractStartDate}
                  className={classes.field}
                  minDate={employeeHiringDate ? dayjs(employeeHiringDate) : undefined}
                  disabled={!contractTypeId}
                  onChange={(date) => {
                    contractStartDateFun(date)
                  }}
                  onError={(error,value)=>{
                    if(error !== null)
                    {
                      setDateError((prevState) => ({
                          ...prevState,
                            [`contractStartDate`]: true
                        }))
                    }
                    else
                    {
                      setDateError((prevState) => ({
                          ...prevState,
                            [`contractStartDate`]: false
                        }))
                    }
                  }}
                  slotProps={{
                    textField: {
                      helperText: getContractStartDateError(),
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={3.5} lg={3.2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.contractEndDate)}
                          value={contractEndDate ? dayjs(contractEndDate) : contractEndDate}
                        className={classes.field}
                        minDate={contractStartDate}
                          onChange={(date) => {
                            setcontractEndDate(date)
                        }}
                        disabled={!contractTypeId || contractTypeId && contractTypeId.contractPeriod !== 0 ? true : false}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`contractEndDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`contractEndDate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>

            </Grid>              

             </Grid>
            </CardContent>          
            </Card>
          </Grid>

          <Grid  xs={12} lg={2} xl={5}></Grid>

            <Grid item xs={12} md={6} lg={3.5} xl={2} >
              <FormControlLabel
                control={
                  <Switch
                    checked={hasAlternativeEmp}
                    onChange={() => sethasAlternativeEmp(!hasAlternativeEmp)}
                    color="secondary"
                  />
                }
                label={intl.formatMessage(messages.hasAlternativeEmp)}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3.5} xl={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notHasMission}
                    onChange={() => setnotHasMission(!notHasMission)}
                    color="secondary"
                  />
                }
                label={intl.formatMessage(messages.notHasMission)}
              />
            </Grid>


                <Grid item xs={12} md={6} lg={3.5} xl={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isKinship}
                        onChange={() => {
                          setisKinship(!isKinship);
                          setRequired({ required: !isKinship });
                        }}
                        color="secondary"
                      />
                    }
                    label={intl.formatMessage(messages.isKinship)}
                  />
                </Grid>
                
                <Grid  xs={12} md={6} lg={1.5} xl={6}></Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <Autocomplete
                    id="ddkinshipLinkId"
                    required
                    options={kinshipLinkList}
                    value={kinshipLinkId.length !== 0 ?{
                      id: kinshipLinkId.id,
                      name: kinshipLinkId.name,
                    }: null}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" || option.id === value.id
                    }
                    {...required}
                    getOptionLabel={(option) => (option.name ? option.name : "")}
                    onChange={(event, value) => {
                      setkinshipLinkId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        //margin="normal"
                        {...required}
                        {...params}
                        name="kinshipLinkId"
                        label={intl.formatMessage(messages.kinshipLink)}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={7} lg={5} xl={4}>
                  <Autocomplete
                    id="ddlkinshipEmpId"
                    {...required}
                    options={kinshipEmpList}
                    value={kinshipEmpId.length !== 0 ?{
                      id: kinshipEmpId.id,
                      name: kinshipEmpId.name,
                    }: null}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 || value.id === "" || option.id === value.id
                    }
                    getOptionLabel={(option) => (option.name ? option.name : "")}
                    onChange={(event, value) => {
                      setkinshipEmpId({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : "",
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        //margin="normal"
                        {...required}
                        {...params}
                        name="kinshipEmpId"
                        label={intl.formatMessage(messages.kinshipEmp)}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>


            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={employee.id === 0}
                  >
                    <FormattedMessage {...Payrollmessages.save} />
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    type="button"
                    disabled={employee.id === 0 || pristine}
                    onClick={() => deletedata()}
                  >
                    <FormattedMessage {...Payrollmessages.delete} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
export default injectIntl(EmployeeContract);
