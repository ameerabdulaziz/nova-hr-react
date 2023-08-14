import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Type from 'enl-styles/Typography.scss';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import PermContactCalendar from '@mui/icons-material/PermContactCalendar';
import CircularProgress from '@mui/material/CircularProgress';
import Bookmark from '@mui/icons-material/Bookmark';
import LocalPhone from '@mui/icons-material/LocalPhone';
import Email from '@mui/icons-material/Email';
import Smartphone from '@mui/icons-material/Smartphone';
import LocationOn from '@mui/icons-material/LocationOn';
import Work from '@mui/icons-material/Work';
import Language from '@mui/icons-material/Language';
import css from 'enl-styles/Form.scss';
import { injectIntl, FormattedMessage } from 'react-intl';
import { TextFieldRedux } from '../../../../../../app/components/Forms/ReduxFormMUI';
import FloatingPanel from '../../../../../../app/components/Panel/FloatingPanel';
import UserMenuData from '../../Setting/api/UserMenuData';
import EmployeeBankElementData from '../api/EmployeeBankElementData';
import { EditTable } from '../../../../Tables/demos';

import { toast } from 'react-hot-toast';
import {
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  Input,
} from '@mui/material';
import messages from './messages';
import useStyles from './contact-jss';

// validation functions
const required = (value) => (value == null ? 'Required' : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

function AddContactForm(props) {
  const { classes } = useStyles();

  const [bnkList, setbnkList] = useState([]);

  const [id, setid] = useState(1);
  const [employeeId, setemployeeId] = useState(0);
  const [bankId, setbankId] = useState(0);
  const [bnkAcc, setbnkAcc] = useState('');
  const [branchNo, setbranchNo] = useState('');
  const [iban, setiban] = useState('');
  const [bnkEmpCode, setbnkEmpCode] = useState('');
  const [swiftCode, setswiftCode] = useState('');
  const GetUserMenuLookup = useCallback(async () => {
    try {
      debugger;
      const data = await UserMenuData().GetUserMenuLookup('en');
      setbnkList(data.employees || []);
    } catch (err) {
      //toast.error(err);
    }
  }, []);

  useEffect(() => {
    GetUserMenuLookup();
  }, []);

  const anchorTable = [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'EmpBankId',
      label: 'code',
      type: 'text',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'elementName',
      label: 'govname',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'elementId',
      label: 'id',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'currencyName',
      label: 'city',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'currencyId',
      label: 'id',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
  ];

  const {
    reset,
    pristine,
    submitting,
    handleSubmit,
    onDrop,
    imgAvatar,
    processing,
    intl,
  } = props;
  const ref = useRef(null);
  let dropzoneRef;
  const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
  const fileSizeLimit = 300000;
  const imgPreview = (img) => {
    if (typeof img !== 'string' && img !== '') {
      return URL.createObjectURL(imgAvatar);
    }
    return img;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className={css.bodyForm}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6}>
              <Autocomplete
                id="ddlBnk"
                className={classes.field}
                options={bnkList}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  if (value !== null) {
                    setbankId(value.id);
                  } else {
                    setbankId(0);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    {...params}
                    name="bankId"
                    value={bankId}
                    label={intl.formatMessage(messages.title)}
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Field
                name="address"
                component={TextFieldRedux}
                placeholder={intl.formatMessage(messages.address)}
                label={intl.formatMessage(messages.address)}
                className={classes.field}
                value={bnkAcc ?? '0'}
                onChange={(e) => setbnkAcc(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <Field
                name="name"
                component={TextFieldRedux}
                placeholder={intl.formatMessage(messages.name)}
                label={intl.formatMessage(messages.name)}
                validate={required}
                required
                ref={ref}
                className={classes.field}
                value={branchNo ?? '0'}
                onChange={(e) => setbranchNo(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermContactCalendar />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Field
                name="title"
                component={TextFieldRedux}
                placeholder={intl.formatMessage(messages.title)}
                label={intl.formatMessage(messages.title)}
                className={classes.field}
                value={bnkEmpCode ?? '0'}
                onChange={(e) => setbnkEmpCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Bookmark />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Field
                name="phone"
                component={TextFieldRedux}
                placeholder={intl.formatMessage(messages.phone)}
                type="tel"
                label={intl.formatMessage(messages.phone)}
                className={classes.field}
                value={iban ?? '0'}
                onChange={(e) => setiban(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Field
                name="secondaryPhone"
                component={TextFieldRedux}
                placeholder={intl.formatMessage(messages.secondary_phone)}
                type="tel"
                label={intl.formatMessage(messages.secondary_phone)}
                className={classes.field}
                value={swiftCode ?? '0'}
                onChange={(e) => setswiftCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Smartphone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <EditTable
            anchorTable={anchorTable}
            title={id}
            API={EmployeeBankElementData(id)}
          />
        </section>
        <div className={css.buttonArea}>
          <p>
            Once you submit, its mean you have agreed with our &nbsp;
            <a href="/terms-conditions" target="_blank">
              terms &amp; conditions
            </a>
          </p>
          <div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={submitting || processing}
            >
              {processing && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              <FormattedMessage {...messages.submit} />
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={() => reset()}
            >
              <FormattedMessage {...messages.reset} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

AddContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  imgAvatar: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  processing: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

const AddContactFormRedux = reduxForm({
  form: 'addContact',
  enableReinitialize: true,
})(AddContactForm);

const AddContactInit = connect((state) => ({
  initialValues: state.contactFullstack.formValues || state.contact.formValues,
}))(AddContactFormRedux);

export default injectIntl(AddContactInit);
