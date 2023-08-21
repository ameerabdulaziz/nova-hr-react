import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EmployeeCarData from '../api/EmployeeCarData';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { useSelector, useDispatch } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import { Autocomplete } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useStyles from '../../Style';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { injectIntl, FormattedMessage } from 'react-intl';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

function EmployeeCar(props) {
  const { intl, pristine } = props;
  const [processing, setprocessing] = useState(false);
  const [delprocessing, setdelprocessing] = useState(false);
  const [progress, setProgress] = useState(false);
  const title = localStorage.getItem('MenuName');
  const [employee, setEmployee] = useState(0);
  const [id, setid] = useState(0);
  const [carModel, setcarModel] = useState('');
  const [manufactureYear, setmanufactureYear] = useState('');
  const [licenseNo, setlicenseNo] = useState('');
  const [trafficUnit, settrafficUnit] = useState('');
  const [hasLicense, sethasLicense] = useState('');
  const [licenseGradeId, setlicenseGradeId] = useState({});
  const [gradelist, setgradelist] = useState('');
  const [employeeList, setemployeeList] = useState([]);
  const [required, setRequired] = useState({ required: false });

  const trueBool = true;
  const { classes } = useStyles();
  // const { pristine, submitting, init } = props;
  const locale = useSelector((state) => state.language.locale);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setprocessing(true);
      debugger;
      const data = {
        id: id,
        employeeId: employee,
        carModel: carModel,
        manufactureYear: manufactureYear,
        licenseNo: licenseNo,
        trafficUnit: trafficUnit,
        hasLicense: hasLicense,
        licenseGradeId: licenseGradeId.id ?? '',
      };

      const dataApi = await EmployeeCarData().Save(data);
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
      setdelprocessing(true);
      const dataApi = await EmployeeCarData().Delete(id);
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
    setlicenseNo('');
    setlicenseGradeId({});
    sethasLicense('');
    setcarModel('');
    setmanufactureYear('');
    settrafficUnit('');
    // setgradelist();
  };
  const GetLookup = useCallback(async () => {
    try {
      debugger;
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setemployeeList(employeedata || []);
      const LicenseGradedata = await GeneralListApis(
        locale
      ).GetLicenseGradeList();
      setgradelist(LicenseGradedata || []);
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
      // You can await here
      const dataApi = await EmployeeCarData(locale).GetList(employee);

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
      setProgress(false);
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
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
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
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
                <FormControlLabel
                  required
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
              </div>
              <div>
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
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div>
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
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <br />
              <div>
                <Autocomplete
                  id="ddlgrade"
                  options={gradelist}
                  value={{ id: licenseGradeId.id, name: licenseGradeId.name }}
                  getOptionLabel={(option) => (option.name ? option.name : '')}
                  onChange={(event, value) => {
                    debugger;
                    if (value !== null) {
                      setlicenseGradeId((prevFilters) => ({
                        ...prevFilters,
                        id: value.id,
                        name: value.name,
                      }));
                    } else {
                      setlicenseGradeId((prevFilters) => ({
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
                      name="licenseGrade"
                      label={intl.formatMessage(messages.licenseGrade)}
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <br />
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
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default injectIntl(EmployeeCar);
