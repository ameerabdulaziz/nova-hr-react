import React, { Fragment, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles()((theme) => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)} 0`,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
    '& > div': {
      alignItems: 'center'
    }
  },
  textField: {
    flexBasis: 200,
  },
}));

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

function InputAdornments() {
  const {
    classes,
    cx
  } = useStyles();
  const [dataState, setDataState] = useState({
    amount: '',
    password: '',
    weight: 40,
    weightRange: '',
    showPassword: false
  });

  const handleChange = prop => event => {
    setDataState({
      ...dataState,
      [prop]: event.target.value
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    const { showPassword } = dataState;
    setDataState({
      ...dataState,
      showPassword: !showPassword
    });
  };

  return (
    <Fragment>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-start"
        direction="row"
        spacing={3}
      >
        <Grid
          item
          md={6}
          className={classes.demo}
        >
          <Typography variant="button" className={classes.divider}>Input Adornments</Typography>
          <Typography className={classes.divider}>TextField is composed of smaller components that you can leverage directly to significantly customize your form inputs.</Typography>
          <div className={classes.root}>
            <TextField
              variant="standard"
              label="With normal TextField"
              id="simple-start-adornment"
              className={cx(classes.margin, classes.textField)}
              autoComplete='off'
              InputProps={{
                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
              }} />
            <TextField
              variant="standard"
              select
              label="With Select"
              className={cx(classes.margin, classes.textField)}
              value={dataState.weightRange}
              onChange={handleChange('weightRange')}
              autoComplete='off'
              InputProps={{
                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
              }}>
              {ranges.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl variant="standard" fullWidth className={classes.margin}>
              <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
              <Input
                id="adornment-amount"
                value={dataState.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <FormControl
              variant="standard"
              className={cx(classes.margin, classes.withoutLabel, classes.textField)}
              aria-describedby="weight-helper-text">
              <Input
                id="adornment-weight2"
                value={dataState.weight}
                onChange={handleChange('weight')}
                endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                inputProps={{
                  'aria-label': 'Weight',
                }}
              />
              <FormHelperText id="weight-helper-text">Weight</FormHelperText>
            </FormControl>
            <FormControl variant="standard" className={cx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={dataState.showPassword ? 'text' : 'password'}
                value={dataState.password}
                onChange={handleChange('password')}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      size="large">
                      {dataState.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
              />
            </FormControl>
          </div>
        </Grid>
        <Grid
          item
          md={6}
          className={classes.demo}
        >
          <Typography variant="button" className={classes.divider}>With icon</Typography>
          <Typography className={classes.divider}>Icons can be specified as prepended or appended.</Typography>
          <FormControl variant="standard" className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={(
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )}
            />
          </FormControl>
          <TextField
            variant="standard"
            className={classes.margin}
            id="input-with-icon-textfield"
            label="TextField"
            autoComplete='off'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }} />
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField variant="standard" id="input-with-icon-grid" label="With a grid" autoComplete='off' />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default InputAdornments;
