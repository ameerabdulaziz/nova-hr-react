import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles()((theme) => ({
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

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

function TextFieldsFilled() {
  const {
    classes
  } = useStyles();
  const [dataState, setDataState] = useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = name => event => {
    setDataState({
      ...dataState,
      [name]: event.target.value,
    });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="filled-name"
        label="Name"
        className={classes.textField}
        value={dataState.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-uncontrolled"
        label="Uncontrolled"
        defaultValue="foo"
        className={classes.textField}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        required
        id="filled-required"
        label="Required"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        error
        id="filled-error"
        label="Error"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        disabled
        id="filled-disabled"
        label="Disabled"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-email-input"
        label="Email"
        className={classes.textField}
        type="email"
        name="email"
        // autoComplete="email"
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        // autoComplete="current-password"
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-read-only-input"
        label="Read Only"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-multiline-flexible"
        label="Multiline"
        multiline
        maxRows="4"
        value={dataState.multiline}
        onChange={handleChange('multiline')}
        className={classes.textField}
        margin="normal"
        helperText="hello"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-multiline-static"
        label="Multiline"
        multiline
        rows="4"
        defaultValue="Default Value"
        className={classes.textField}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-helperText"
        label="Helper text"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-with-placeholder"
        label="With placeholder"
        placeholder="Placeholder"
        className={classes.textField}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-textarea"
        label="Multiline Placeholder"
        placeholder="Placeholder"
        multiline
        className={classes.textField}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-number"
        label="Number"
        value={dataState.age}
        onChange={handleChange('age')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        className={classes.textField}
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
      <TextField
        id="filled-select-currency"
        select
        label="Select"
        className={classes.textField}
        value={dataState.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
        variant="filled"
        autoComplete='off'
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="filled-select-currency-native"
        select
        label="Native select"
        className={classes.textField}
        value={dataState.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
        variant="filled"
        autoComplete='off'
      >
        {currencies.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <TextField
        id="filled-full-width"
        label="Label"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        helperText="Full width!"
        fullWidth
        margin="normal"
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
        autoComplete='off'
      />
      <TextField
        id="filled-bare"
        className={classes.textField}
        defaultValue="Bare"
        margin="normal"
        variant="filled"
        autoComplete='off'
      />
    </form>
  );
}

export default TextFieldsFilled;
