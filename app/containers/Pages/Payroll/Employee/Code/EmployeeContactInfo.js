import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EmployeeContactInfoData from '../api/EmployeeContactInfoData';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import UserMenuData from '../../Setting/api/UserMenuData';
import { Autocomplete } from '@mui/material';
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

function EmployeeContactInfo(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');
  const [employee, setEmployee] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [id, setid] = useState(0);
  const [telPhone, settelPhone] = useState('');
  const [mobile, setmobile] = useState('');
  const [workMobile, setworkMobile] = useState('');
  const [relativesPhoneNo, setrelativesPhoneNo] = useState('');
  const [mail, setmail] = useState('');
  const [workEmail, setworkEmail] = useState('');
  const trueBool = true;
  const { classes } = useStyles();
  // const { pristine, submitting, init } = props;
  const locale = useSelector((state) => state.language.locale);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: id,
      employeeId: employee,
      telPhone: TelPhone,
      mobile: Mobile,
      workMobile: WorkMobile,
      relativesPhoneNo: relativesPhoneNo,
      email: mail,
      workEmail: WorkEmail,
    };

    const dataApi = await EmployeeContactInfoData().Save(data);
  };
  const clear = (e) => {
    settelPhone();
    setmobile();
    setworkMobile();
    setrelativesPhoneNo();
    setmail();
    setworkEmail();
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
      const dataApi = await EmployeeContactInfoData().GetList();

      if (dataApi.length > 0) {
        setid(dataApi[0].id);
        setrelativesPhoneNo(dataApi[0].relativesPhoneNo);
        setworkMobile(dataApi[0].workMobile);
        setmobile(dataApi[0].mobile);
        settelPhone(dataApi[0].telPhone);
        setmail(dataApi[0].email);
        setworkEmail(dataApi[0].workEmail);
      }
    }
    fetchData();
    // if (!data.length) { fetchData(); }
  }, []);
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
                <TextField
                  id="telPhone"
                  name="telPhone"
                  value={telPhone}
                  onChange={(e) => settelPhone(e.target.value)}
                  placeholder="Telephone"
                  label="Telephone"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                  placeholder="mobile"
                  label="mobile"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  id="workMobile"
                  name="workMobile"
                  value={workMobile}
                  onChange={(e) => setworkMobile(e.target.value)}
                  placeholder="work Mobile"
                  label="work Mobile"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  id="relativesPhoneNo"
                  name="relativesPhoneNo"
                  value={relativesPhoneNo}
                  onChange={(e) => setrelativesPhoneNo(e.target.value)}
                  placeholder="relatives Phone No"
                  label="relatives Phone No"
                  // validate={required}
                  required
                  className={classes.field}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  type="email"
                  error={email === 'Invalid email'}
                  id="mail"
                  name="mail"
                  value={mail}
                  onChange={(e) => setmail(e.target.value)}
                  placeholder="Email"
                  label="Email"
                  required
                  // validate={[required, email]}
                  className={classes.field}
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  type="email"
                  error={email === 'Invalid email'}
                  id="workEmail"
                  name="workEmail"
                  value={workEmail}
                  onChange={(e) => setmail(e.target.value)}
                  placeholder="work Email"
                  label="work Email"
                  required
                  // validate={[required, email]}
                  className={classes.field}
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
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

export default injectIntl(EmployeeContactInfo);
