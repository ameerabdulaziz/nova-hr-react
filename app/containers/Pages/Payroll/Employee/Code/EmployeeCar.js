import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EmployeeCarData from '../api/EmployeeCarData';
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

function EmployeeCar() {
  const title = localStorage.getItem('MenuName');
  const [employee, setEmployee] = useState(0);
  const [id, setid] = useState(0);
  const [carModel, setcarModel] = useState('');
  const [manufactureYear, setmanufactureYear] = useState('');
  const [licenseNo, setlicenseNo] = useState('');
  const [trafficUnit, settrafficUnit] = useState('');
  const [hasLicense, sethasLicense] = useState('');
  const [licenseGradeId, setlicenseGradeId] = useState('');
  const [gradelist, setgradelist] = useState('');
  const trueBool = true;
  const { classes } = useStyles();
  // const { pristine, submitting, init } = props;
  const locale = useSelector((state) => state.language.locale);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: id,
      employeeId: employee,
      carModel: carModel,
      manufactureYear: manufactureYear,
      licenseNo: licenseNo,
      trafficUnit: trafficUnit,
      hasLicense: hasLicense,
      licenseGradeId: licenseGradeId,
    };

    const dataApi = await EmployeeCarData().Save(data);
  };
  const clear = (e) => {
    setlicenseNo();
    setlicenseGradeId();
    sethasLicense();
    setcarModel();
    setmanufactureYear();
    settrafficUnit();
    setgradelist();
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
      const dataApi = await EmployeeCarData().GetList();

      if (dataApi.length > 0) {
        setid(dataApi[0].id);
        settrafficUnit(dataApi[0].trafficUnit);
        setlicenseNo(dataApi[0].licenseNo);
        setmanufactureYear(dataApi[0].manufactureYear);
        setcarModel(dataApi[0].carModel);
        setmail(dataApi[0].email);
        setlicenseGradeId(dataApi[0].licenseGradeId);
        setgradelist(dataApi[0].gradeList);
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
                <TextField
                  id="carModel"
                  name="carModel"
                  value={carModel}
                  onChange={(e) => setcarModel(e.target.value)}
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
                  id="manufactureYear"
                  name="manufactureYear"
                  value={manufactureYear}
                  onChange={(e) => setmanufactureYear(e.target.value)}
                  placeholder="manufactureYear"
                  label="manufactureYear"
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
                      onChange={() => sethasLicense(!hasLicense)}
                      color="secondary"
                    />
                  }
                  label="Has License"
                />
              </div>

              <div>
                <TextField
                  id="licenseNo"
                  name="licenseNo"
                  value={licenseNo}
                  onChange={(e) => setlicenseNo(e.target.value)}
                  placeholder="work manufactureYear"
                  label="work manufactureYear"
                  // validate={required}
                  required
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
                <Autocomplete
                  id="licenseGradeId"
                  options={gradelist}
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
                      setlicenseGradeId(value.id);
                    } else {
                      setlicenseGradeId('');
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

export default EmployeeCar;
