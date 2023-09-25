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
import EmployeeContractData from '../api/EmployeeContractData';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';

function EmployeeContract(props) {
  const { intl, pristine } = props;
  const [processing, setprocessing] = useState(false);
  const [delprocessing, setdelprocessing] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { empid } = location.state ?? { id: 0, name: '' };
  const { classes } = useStyles();
  const title = localStorage.getItem('MenuName');
  const [employee, setEmployee] = useState(empid ?? { id: 0, name: '' });
  const [id, setid] = useState(0);
  const [hiringDate, sethiringDate] = useState('');
  const [isKinship, setisKinship] = useState(false);
  const [notHasMission, setnotHasMission] = useState(false);
  const [hasAlternativeEmp, sethasAlternativeEmp] = useState(false);
  const [contractStartDate, setcontractStartDate] = useState('');
  const [contractEndDate, setcontractEndDate] = useState('');

  const [jobId, setjobId] = useState({});
  const [jobList, setjobList] = useState([]);

  const [jobLevelId, setjobLevelId] = useState({});
  const [jobLevelList, setjobLevelList] = useState([]);

  const [hiringSourceId, sethiringSourceId] = useState({});
  const [hiringSourceList, sethiringSourceList] = useState([]);

  const [kinshipLinkId, setkinshipLinkId] = useState({});
  const [kinshipLinkList, setkinshipLinkList] = useState([]);

  const [kinshipEmpId, setkinshipEmpId] = useState({});
  const [kinshipEmpList, setkinshipEmpList] = useState([]);

  const [contractTypeId, setcontractTypeId] = useState({});
  const [contractTypeList, setcontractTypeList] = useState([]);

  const [ruleTemplateId, setruleTemplateId] = useState({});
  const [ruleTemplateList, setruleTemplateList] = useState([]);

  const [employeeList, setemployeeList] = useState([]);

  const locale = useSelector((state) => state.language.locale);

  const [progress, setProgress] = useState(false);
  const [required, setRequired] = useState({ required: false });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setprocessing(true);

      
      const data = {
        id: id,
        employeeId: employee.id,

        hiringSourceId: hiringSourceId.id ?? '',
        isKinship: isKinship,
        kinshipLinkId: kinshipLinkId.id ?? '',
        kinshipEmpId: kinshipEmpId.id ?? '',
        hasAlternativeEmp: hasAlternativeEmp,
        contractTypeId: contractTypeId.id ?? '',
        contractStartDate: contractStartDate,
        contractEndDate: contractEndDate,
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
      toast.error(notif.error);
    }
    setprocessing(false);
  };
  const deletedata = async (e) => {
    try {
      
      // e.preventDefault();

      setdelprocessing(true);
      const dataApi = await EmployeeContractData(locale).Delete(id);
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
    sethiringSourceId({});
    setisKinship(false);
    setkinshipLinkId({});
    setkinshipEmpId({});
    sethasAlternativeEmp(false);
    setcontractTypeId({});
    setcontractStartDate(format(new Date(), 'yyyy-MM-dd'));
    setcontractEndDate(format(new Date(), 'yyyy-MM-dd'));
    setnotHasMission(false);
  };
  const GetLookup = useCallback(async () => {
    try {
      
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setemployeeList(employeedata || []);
      setkinshipEmpList(employeedata || []);

      const HiringSourcedata = await GeneralListApis(
        locale
      ).GetHiringSourceList();
      sethiringSourceList(HiringSourcedata || []);

      const kinshipLinkdata = await GeneralListApis(
        locale
      ).GetkinshipLinkList();
      setkinshipLinkList(kinshipLinkdata || []);
      const ContractTypedata = await GeneralListApis(
        locale
      ).GetContractTypeList();
      setcontractTypeList(ContractTypedata || []);

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
        setcontractStartDate(dataApi[0].contractStartDate);
        setcontractEndDate(dataApi[0].contractEndDate);
        setnotHasMission(dataApi[0].notHasMission);
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
              options={employeeList}
              value={{ id: employee.id, name: employee.name }}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === '' || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : '')}
              onChange={(event, value) => {
                
                if (value !== null) {
                  setEmployee({
                    id: value.id,
                    name: value.name,
                  });
                } else {
                  setEmployee({
                    id: 0,
                    name: '',
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  {...params}
                  name="employee"
                  //  value={employee.id}
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
              <br />

              <div>
                <Autocomplete
                  id="ddlhiringSourceId"
                  required
                  options={hiringSourceList}
                  value={{
                    id: hiringSourceId.id,
                    name: hiringSourceId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    
                    if (value !== null) {
                      sethiringSourceId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      sethiringSourceId({
                        id: 0,
                        name: '',
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      //margin="normal"

                      {...params}
                      name="hiringSourceId"
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
              </div>

              <div>
                <Autocomplete
                  id="ddkinshipLinkId"
                  required
                  options={kinshipLinkList}
                  value={{
                    id: kinshipLinkId.id,
                    name: kinshipLinkId.name,
                  }}
                  {...required}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    
                    if (value !== null) {
                      setkinshipLinkId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setkinshipLinkId({
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
                      name="kinshipLinkId"
                      label={intl.formatMessage(messages.kinshipLink)}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />
              <div>
                <Autocomplete
                  id="ddlkinshipEmpId"
                  {...required}
                  options={kinshipEmpList}
                  value={{
                    id: kinshipEmpId.id,
                    name: kinshipEmpId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    
                    if (value !== null) {
                      setkinshipEmpId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setkinshipEmpId({
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
                      name="kinshipEmpId"
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
                      checked={hasAlternativeEmp}
                      onChange={() => sethasAlternativeEmp(!hasAlternativeEmp)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.hasAlternativeEmp)}
                />
              </div>

              <div>
                <Autocomplete
                  id="ddlcontractTypeId"
                  required
                  options={contractTypeList}
                  value={{
                    id: contractTypeId.id,
                    name: contractTypeId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    
                    if (value !== null) {
                      setcontractTypeId({
                        id: value.id,
                        name: value.name,
                      });
                    } else {
                      setcontractTypeId({
                        id: 0,
                        name: '',
                      });
                    }
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
              </div>
              <br />
              <div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label={intl.formatMessage(messages.contractStartDate)}
                    value={contractStartDate}
                    onChange={(date) => {
                      
                      setcontractStartDate(
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
                    label={intl.formatMessage(messages.contractEndDate)}
                    value={contractEndDate}
                    onChange={(date) => {
                      
                      setcontractEndDate(format(new Date(date), 'yyyy-MM-dd'));
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
                      checked={notHasMission}
                      onChange={() => setnotHasMission(!notHasMission)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.notHasMission)}
                />
              </div>

              <br />

              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={employee.id === 0 || processing || delprocessing}
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
                  disabled={employee.id === 0 || pristine || processing}
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
export default injectIntl(EmployeeContract);
