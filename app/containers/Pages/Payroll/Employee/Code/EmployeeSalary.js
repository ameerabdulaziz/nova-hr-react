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
import EmployeeSalaryData from '../api/EmployeeSalaryData';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

function EmployeeSalary(props) {
  const { intl, pristine } = props;
  const [processing, setprocessing] = useState(false);
  const [delprocessing, setdelprocessing] = useState(false);
  const [progress, setProgress] = useState(false);
  const { classes } = useStyles();
  const title = localStorage.getItem('MenuName');
  const [employee, setEmployee] = useState(0);
  const [id, setid] = useState(0);
  const [isBnkTransfer, setisBnkTransfer] = useState(false);
  const [taxable, settaxable] = useState(false);
  const [isConsultant, setisConsultant] = useState(false);
  const [isHours, setisHours] = useState(false);
  const [hourPrice, sethourPrice] = useState('');
  const [isNotApplyAttRule, setisNotApplyAttRule] = useState(false);
  const [isMoneyOvertime, setisMoneyOvertime] = useState(false);
  const [isVacationOvertime, setisVacationOvertime] = useState(false);
  const [salaryStructureId, setsalaryStructureId] = useState({});
  const [salaryStructurelist, setsalaryStructurelist] = useState([]);
  const [incentiveFrom, setincentiveFrom] = useState({});
  const [hasMonthlyBouns, sethasMonthlyBouns] = useState(false);
  const [hasTransfereAllowance, sethasTransfereAllowance] = useState(false);
  const [employeeList, setemployeeList] = useState([]);
  const [required, setRequired] = useState({ required: false });

  const locale = useSelector((state) => state.language.locale);
  let centiveFromname0 = locale == 'en' ? 'From first day' : 'من أول يوم تعيين';
  let centiveFromname3 = locale == 'en' ? 'After 3 months' : 'بعد 3 شهور';
  let centiveFromname6 = locale == 'en' ? 'After 6 months' : 'بعد 6 شهور';
  const incentiveFromlist = [
    { id: 0, name: centiveFromname0 },
    { id: 3, name: centiveFromname3 },
    { id: 6, name: centiveFromname6 },
  ];

  //const [incentiveFromlist, setincentiveFromlist] = useState([]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setprocessing(true);

      debugger;
      const data = {
        id: id,
        employeeId: employee,
        isBnkTransfer: isBnkTransfer,
        taxable: taxable,
        isConsultant: isConsultant,
        isHours: isHours,
        hourPrice: hourPrice,
        isNotApplyAttRule: isNotApplyAttRule,
        isMoneyOvertime: isMoneyOvertime,
        isVacationOvertime: isVacationOvertime,
        salaryStructureId: salaryStructureId.id ?? '',
        incentiveFrom: incentiveFrom.id ?? '',
        hasMonthlyBouns: hasMonthlyBouns,
        hasTransfereAllowance: hasTransfereAllowance,
      };

      const dataApi = await EmployeeSalaryData().Save(data);
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
      const dataApi = await EmployeeSalaryData().Delete(id);
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
    setisBnkTransfer(false);
    settaxable(false);
    setisConsultant(false);
    setisHours(false);
    sethourPrice('');
    setisNotApplyAttRule(false);
    setisMoneyOvertime(false);
    setisVacationOvertime(false);
    setsalaryStructureId({});
    setincentiveFrom({});
    sethasMonthlyBouns(false);
    sethasTransfereAllowance(false);
  };
  const GetLookup = useCallback(async () => {
    try {
      debugger;
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setemployeeList(employeedata || []);

      const salaryStructuredata = await GeneralListApis(
        locale
      ).GetSalaryStructureList();
      setsalaryStructurelist(salaryStructuredata || []);
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
      const dataApi = await EmployeeSalaryData(locale).GetList(employee);

      if (dataApi.length > 0) {
        setid(dataApi[0].id);
        setisBnkTransfer(dataApi[0].isBnkTransfer);
        settaxable(dataApi[0].taxable);
        setisConsultant(dataApi[0].isConsultant);
        setisHours(dataApi[0].isHours);
        sethourPrice(dataApi[0].hourPrice);
        setisNotApplyAttRule(dataApi[0].isNotApplyAttRule);
        setisMoneyOvertime(dataApi[0].isMoneyOvertime);
        setisVacationOvertime(dataApi[0].isVacationOvertime);
        sethasMonthlyBouns(dataApi[0].hasMonthlyBouns);
        sethasTransfereAllowance(dataApi[0].hasTransfereAllowance);
        setsalaryStructureId({
          id: dataApi[0].salaryStructureId,
          name: dataApi[0].salaryStructureName,
        });
        setincentiveFrom({
          id: dataApi[0].incentiveFrom,
          name: dataApi[0].incentiveFromName,
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
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={isBnkTransfer}
                      onChange={() => setisBnkTransfer(!isBnkTransfer)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.isBnkTransfer)}
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={taxable}
                      onChange={() => settaxable(!taxable)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.taxable)}
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={isConsultant}
                      onChange={() => setisConsultant(!isConsultant)}
                      color="secondary"
                    />
                  }
                  label="is Consultant"
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={isHours}
                      onChange={() => {
                        setisHours(!isHours);
                        setRequired({ required: !isHours });
                      }}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.isHours)}
                />
              </div>
              <div>
                <TextField
                  id="hourPricetxt"
                  name="hourPricetxt"
                  value={hourPrice}
                  onChange={(e) => sethourPrice(e.target.value)}
                  placeholder={intl.formatMessage(messages.hourPrice)}
                  label={intl.formatMessage(messages.hourPrice)}
                  {...required}
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={isNotApplyAttRule}
                      onChange={() => setisNotApplyAttRule(!isNotApplyAttRule)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.isNotApplyAttRule)}
                />
              </div>

              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={isMoneyOvertime}
                      onChange={() => setisMoneyOvertime(!isMoneyOvertime)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.isMoneyOvertime)}
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={isVacationOvertime}
                      onChange={() =>
                        setisVacationOvertime(!isVacationOvertime)
                      }
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.isVacationOvertime)}
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={hasMonthlyBouns}
                      onChange={() => sethasMonthlyBouns(!hasMonthlyBouns)}
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.hasMonthlyBouns)}
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={hasTransfereAllowance}
                      onChange={() =>
                        sethasTransfereAllowance(!hasTransfereAllowance)
                      }
                      color="secondary"
                    />
                  }
                  label={intl.formatMessage(messages.hasTransfereAllowance)}
                />
              </div>
              <br />
              <div>
                <Autocomplete
                  id="ddlsalaryStructureId"
                  required
                  options={salaryStructurelist}
                  value={{
                    id: salaryStructureId.id,
                    name: salaryStructureId.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setsalaryStructureId((prevFilters) => ({
                        ...prevFilters,
                        id: value.id,
                        name: value.name,
                      }));
                    } else {
                      setsalaryStructureId((prevFilters) => ({
                        ...prevFilters,
                        id: 0,
                        name: '',
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      //margin="normal"

                      {...params}
                      name="salaryStructureId"
                      label={intl.formatMessage(messages.salaryStructure)}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />
              <div>
                <Autocomplete
                  id="ddlincentiveFrom"
                  options={incentiveFromlist}
                  value={{
                    id: incentiveFrom.id,
                    name: incentiveFrom.name,
                  }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setincentiveFrom((prevFilters) => ({
                        ...prevFilters,
                        id: value.id,
                        name: value.name,
                      }));
                    } else {
                      setincentiveFrom((prevFilters) => ({
                        ...prevFilters,
                        id: 0,
                        name: '',
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="incentiveFrom"
                      label={intl.formatMessage(messages.incentiveFrom)}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <br />

              <div>
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
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default injectIntl(EmployeeSalary);
