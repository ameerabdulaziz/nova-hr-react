import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EmployeeSalaryData from '../api/EmployeeSalaryData';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import UserMenuData from '../../Setting/api/UserMenuData';
// validation functions
//const required = (value) => (value == null ? 'Required' : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: '100%',
    marginBottom: 20,
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
}));

function EmployeeSalary() {
  const title = localStorage.getItem('MenuName');
  const [employee, setEmployee] = useState(0);
  const [id, setid] = useState(0);
  const [isBnkTransfer, setisBnkTransfer] = useState('');
  const [taxable, settaxable] = useState('');
  const [isConsultant, setisConsultant] = useState('');
  const [isHours, setisHours] = useState('');
  const [hourPrice, sethourPrice] = useState('');
  const [isNotApplyAttRule, setisNotApplyAttRule] = useState('');
  const [isMoneyOvertime, setisMoneyOvertime] = useState('');
  const [isVacationOvertime, setisVacationOvertime] = useState('');
  const [salaryTemplateId, setsalaryTemplateId] = useState('');
  const [hasMonthlyBouns, sethasMonthlyBouns] = useState('');
  const [hasTransfereAllowance, sethasTransfereAllowance] = useState('');
  const [salaryTemplatelist, setsalaryTemplatelist] = useState([]);

  const trueBool = true;
  const { classes } = useStyles();
  // const { pristine, submitting, init } = props;
  const locale = useSelector((state) => state.language.locale);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      salaryTemplateId: salaryTemplateId,
      hasMonthlyBouns: hasMonthlyBouns,
      hasTransfereAllowance: hasTransfereAllowance,
    };

    const dataApi = await EmployeeSalaryData().Save(data);
  };
  const clear = (e) => {
    setisBnkTransfer();
    settaxable();
    setisConsultant();
    setisHours();
    sethourPrice();
    setisNotApplyAttRule();
    setisMoneyOvertime();
    setisVacationOvertime();
    setsalaryTemplateId();
    sethasMonthlyBouns();
    hasTransfereAllowance();
  };
  const GetUserMenuLookup = useCallback(async () => {
    try {
      debugger;
      const data = await UserMenuData().GetUserMenuLookup(locale);
      setEmployeeList(data.employees || []);
    } catch (err) {
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    GetUserMenuLookup();
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const dataApi = await EmployeeSalaryData().GetList();

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
        setsalaryTemplateId(dataApi[0].salaryTemplateId);
        sethasMonthlyBouns(dataApi[0].hasMonthlyBouns);
        sethasTransfereAllowance(dataApi[0].hasTransfereAllowance);
        setsalaryTemplatelist(dataApi[0].salaryTemplatelist);
      }
    }
    fetchData();
    // if (!data.length) { fetchData(); }
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
                  label="Is Bank Transfer"
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
                  label="Taxable"
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
                  label="Has License"
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={isHours}
                      onChange={() => setisHours(!isHours)}
                      color="secondary"
                    />
                  }
                  label="Is Hours"
                />
              </div>
              <div>
                <TextField
                  id="hourPrice"
                  name="hourPrice"
                  value={hourPrice}
                  onChange={(e) => setlicenseNo(e.target.value)}
                  placeholder="Hour Price"
                  label="Hour Price"
                  // validate={required}
                  required
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
                  label="Is Hours"
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
                  label="Is Hours"
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
                  label="Is Money Overtime"
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
                  label="Is Vacation Overtime"
                />
              </div>
              <div>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={hasMonthlyBouns}
                      onChange={() => setisVacationOvertime(!hasMonthlyBouns)}
                      color="secondary"
                    />
                  }
                  label="Has Monthly Bouns"
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
                  label="Has Transfere Allowance"
                />
              </div>

              <div>
                <Autocomplete
                  id="salaryTemplateId"
                  options={salaryTemplatelist}
                  getOptionLabel={
                    (option) =>
                      // option.title
                      option ? option.name : ''
                    // locale=="en"?option.enName:option.arName
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
                      setsalaryTemplateId(value.id);
                    } else {
                      setsalaryTemplateId('');
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      // variant="standard"
                      {...params}
                      name="licenseGradeIdchk"
                      value={licenseGradeId}
                      label="License Grade"
                      margin="normal"
                      required
                    />
                  )}
                />
              </div>

              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  //disabled={submitting}
                >
                  Submit
                </Button>
                <Button type="reset" onClick={clear}>
                  Reset
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default EmployeeSalary;
