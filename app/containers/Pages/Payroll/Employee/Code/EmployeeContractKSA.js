import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import { useSelector } from "react-redux";
import GeneralListApis from "../../api/GeneralListApis";
import { Autocomplete } from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import EmployeeContractKSAData from "../api/EmployeeContractKSAData";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import PayRollLoader from "../../Component/PayRollLoader";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DecryptUrl from "../../Component/DecryptUrl";
import ContractTypeData from '../../MainData/api/ContractTypeData';
import { useLocation } from "react-router-dom";
import EmployeeData from "../../Component/EmployeeData";

function EmployeeContract2(props) {

  const location = useLocation();
  
  // get employee data from url
  const empid  = DecryptUrl() ?   DecryptUrl()  : location.state ? location.state : { id: 0, name: "" }
  const { intl, pristine } = props;


  const { classes } = useStyles();
  const title = localStorage.getItem("MenuName");
  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const [id, setid] = useState(0);
  const [contractStartDate, setcontractStartDate] = useState(null);
  const [contractEndDate, setcontractEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hiringSourceId, sethiringSourceId] = useState("");
  const [hiringSourceList, sethiringSourceList] = useState([]);
  const [contractTypeId, setcontractTypeId] = useState(null);
  const [contractTypeList, setcontractTypeList] = useState([]);
  const [employeeHiringDate, setEmployeeHiringDate] = useState(null);
  const [DateError, setDateError] = useState({});
  const [guarantorList, setGuarantorList] = useState([]);
  const [guarantor, setGuarantor] = useState("");
  const [AccruedLeaveBalance, setAccruedLeaveBalance] = useState("");
  const [StartDateOfWork, setStartDateOfWork] = useState(null);
  const [BorderNumber, setBorderNumber] = useState("");
  const [BorderNumberStartDate, setBorderNumberStartDate] = useState(null);
  const [BorderNumberEndDate, setBorderNumberEndDate] = useState(null);
  const [ResidenceNumber, setResidenceNumber] = useState("");
  const [ResidenceNumberStartDate, setResidenceNumberStartDate] = useState(null);
  const [ResidenceNumberEndDate, setResidenceNumberEndDate] = useState(null);
  const locale = useSelector((state) => state.language.locale);

  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
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
        GuarantorId: guarantor.id ?? "",
        VacBalance: AccruedLeaveBalance ?? "",
        StartWorkingDate: dateFormatFun(StartDateOfWork),
        BorderNumber: BorderNumber ?? "",
        BorderIssuingDate: dateFormatFun(BorderNumberStartDate),
        BorderExpiry: dateFormatFun(BorderNumberEndDate),
        ResidencyNumber: ResidenceNumber ?? "",
        ResidencyIssuingDate: dateFormatFun(ResidenceNumberStartDate),
        ResidencyExpiry: dateFormatFun(ResidenceNumberEndDate),
        contractTypeId: contractTypeId?.id ?? "",
        contractStartDate: dateFormatFun(contractStartDate),
        contractEndDate: dateFormatFun(contractEndDate),
      };

      const dataApi = await EmployeeContractKSAData(locale).Save(data);

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
      const dataApi = await EmployeeContractKSAData(locale).Delete(id);
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
    setGuarantor("")
    setAccruedLeaveBalance("")
    setcontractTypeId(null);
    setcontractStartDate(null);
    setcontractEndDate(null);
    setStartDateOfWork(null)
    setBorderNumber("")
    setBorderNumberStartDate(null)
    setBorderNumberEndDate(null)
    setResidenceNumber("")
    setResidenceNumberStartDate(null)
    setResidenceNumberEndDate(null)
  };
  const GetLookup = useCallback(async () => {
    try {

        const guarantorData = await GeneralListApis(locale).GetGuarantorList();
        setGuarantorList(guarantorData || []);

        const HiringSourcedata = await GeneralListApis(
          locale
        ).GetHiringSourceList();
        sethiringSourceList(HiringSourcedata || []);

        const ContractTypedata = await ContractTypeData(
          locale
        ).GetList();
        setcontractTypeList(ContractTypedata || []);

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    GetLookup();
  }, []);


  async function fetchData() {
    try 
    {

      setIsLoading(true);
      const dataApi = await EmployeeContractKSAData(locale).GetList(employee.id);

      if (Object.keys(dataApi).length > 0) 
        {

          setid(dataApi.id);

          sethiringSourceId(
            dataApi.hiringSourceId && dataApi.hiringSourceName ?
            {
            id: dataApi.hiringSourceId,
            name: dataApi.hiringSourceName,
            }
            : ""
            );
          
          setcontractTypeId(
            dataApi.contractTypeId && dataApi.contractTypeName ?
            {
            id: dataApi.contractTypeId,
            name: dataApi.contractTypeName,
            } 
            : ""
            );
          setcontractStartDate(dataApi.contractStartDate ? dayjs(dataApi.contractStartDate) : null);
          setcontractEndDate(dataApi.contractEndDate ? dayjs(dataApi.contractEndDate) : null);



          setGuarantor(
            dataApi.guarantorId && dataApi.guarantorName ?
            {
            id: dataApi.guarantorId,
            name: dataApi.guarantorName,
            }
            : ""
          )
          setAccruedLeaveBalance( dataApi.vacBalance)
          setStartDateOfWork(dataApi.startWorkingDate ? dayjs(dataApi.startWorkingDate) : null)
          setBorderNumber(dataApi.borderNumber)
          setBorderNumberStartDate(dataApi.borderIssuingDate ? dayjs(dataApi.borderIssuingDate) : null)
          setBorderNumberEndDate(dataApi.borderExpiry ? dayjs(dataApi.borderExpiry) : null)
          setResidenceNumber(dataApi.residencyNumber)
          setResidenceNumberStartDate(dataApi.residencyIssuingDate ? dayjs(dataApi.residencyIssuingDate) : null)
          setResidenceNumberEndDate(dataApi.residencyExpiry ? dayjs(dataApi.residencyExpiry) : null)

        } 
        else 
        {
          clear();
        }
    } catch (e) {
      } finally {
        setIsLoading(false);
      }
  }

  useEffect(() => {
    if(employee && employee.id !== 0)
    {
      fetchData();
    }
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
            <Grid item xs={12}>
              <EmployeeData handleEmpChange={handleEmpChange} id={empid && empid.id !== 0 ? empid.id : null} />
            </Grid>

            <Grid item xs={12} md={3}>
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
                    required
                    {...params}
                    name="hiringSourceId"
                    label={intl.formatMessage(messages.hiringSource)}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                id="guarantor"
                required
                options={guarantorList}
                value={guarantor.length !== 0 ?{
                  id: guarantor.id,
                  name: guarantor.name,
                }: null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) =>(
                  option  ? option.name : ""
              )
              }
              renderOption={(props, option) => {
                  return (
                  <li {...props} key={option.id}>
                      {option.name}
                  </li>
                  );
              }}
              onChange={(event, value) => {
                if (value !== null) {
                  setGuarantor(value);
                } else {
                  setGuarantor("");
                }
              }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="guarantor"
                    label={intl.formatMessage(messages.guarantor)}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>

              <TextField
                name='AccruedLeaveBalance'
                type="number"
                value={AccruedLeaveBalance}
                onChange={(e)=>{
                  setAccruedLeaveBalance(e.target.value)
                }}
                label={intl.formatMessage(messages.AccruedLeaveBalance)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid container item spacing={3} >
              <Grid item xs={12} md={3}>
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
                      {...params}
                      name="contractTypeId"
                      label={intl.formatMessage(messages.contractType)}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
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

              <Grid item xs={12} md={3}>
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

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label={intl.formatMessage(messages.StartDateOfWork)}
                      value={StartDateOfWork ? dayjs(StartDateOfWork) : StartDateOfWork}
                    className={classes.field}
                      onChange={(date) => {
                        setStartDateOfWork(date)
                    }}
                    onError={(error,value)=>{
                      if(error !== null)
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`StartDateOfWork`]: true
                          }))
                      }
                      else
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`StartDateOfWork`]: false
                          }))
                      }
                    }}
                    />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid container item spacing={3} >
              <Grid item xs={12} md={3}>
                <TextField
                  name='BorderNumber'
                  type="number"
                  value={BorderNumber}
                  onChange={(e)=>{
                    setBorderNumber(e.target.value)
                  }}
                  label={intl.formatMessage(messages.BorderNumber)}
                  fullWidth
                  variant='outlined'
                  autoComplete='off'
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    label={intl.formatMessage(messages.startDate)}
                    value={BorderNumberStartDate ? dayjs(BorderNumberStartDate) : BorderNumberStartDate}
                    className={classes.field}
                    onChange={(date) => {
                      setBorderNumberStartDate(date)
                    }}
                    onError={(error,value)=>{
                      if(error !== null)
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`BorderNumberStartDate`]: true
                          }))
                      }
                      else
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`BorderNumberStartDate`]: false
                          }))
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label={intl.formatMessage(messages.endDate)}
                      value={BorderNumberEndDate ? dayjs(BorderNumberEndDate) : BorderNumberEndDate}
                    className={classes.field}
                    minDate={contractStartDate}
                      onChange={(date) => {
                        setBorderNumberEndDate(date)
                    }}
                    onError={(error,value)=>{
                      if(error !== null)
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`BorderNumberEndDate`]: true
                          }))
                      }
                      else
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`BorderNumberEndDate`]: false
                          }))
                      }
                    }}
                    />
                </LocalizationProvider>
              </Grid>

            </Grid>


            <Grid container item spacing={3} >
              <Grid item xs={12} md={3}>
                <TextField
                      name='ResidenceNumber'
                      type="number"
                      value={ResidenceNumber}
                      onChange={(e)=>{
                        setResidenceNumber(e.target.value)
                      }}
                      // label="address"
                      // label="Residence number"
                      label={intl.formatMessage(messages.ResidenceNumber)}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
              </Grid>

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    label={intl.formatMessage(messages.startDate)}
                    value={ResidenceNumberStartDate ? dayjs(ResidenceNumberStartDate) : ResidenceNumberStartDate}
                    className={classes.field}
                    onChange={(date) => {
                      setResidenceNumberStartDate(date)
                    }}
                    onError={(error,value)=>{
                      if(error !== null)
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`ResidenceNumberStartDate`]: true
                          }))
                      }
                      else
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`ResidenceNumberStartDate`]: false
                          }))
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label={intl.formatMessage(messages.endDate)}
                      value={ResidenceNumberEndDate ? dayjs(ResidenceNumberEndDate) : ResidenceNumberEndDate}
                    className={classes.field}
                    minDate={contractStartDate}
                      onChange={(date) => {
                        setResidenceNumberEndDate(date)
                    }}
                    onError={(error,value)=>{
                      if(error !== null)
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`ResidenceNumberEndDate`]: true
                          }))
                      }
                      else
                      {
                        setDateError((prevState) => ({
                            ...prevState,
                              [`ResidenceNumberEndDate`]: false
                          }))
                      }
                    }}
                    />
                </LocalizationProvider>
              </Grid>
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
export default injectIntl(EmployeeContract2);
