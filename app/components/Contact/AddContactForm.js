import React, { useRef } from 'react';
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
import { TextFieldRedux } from '../Forms/ReduxFormMUI';
import messages from './messages';
import useStyles from './contact-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

function AddContactForm(props) {
  const { classes } = useStyles();
  const {
    reset,
    pristine,
    submitting,
    handleSubmit,
    onDrop,
    imgAvatar,
    processing,
    intl
  } = props;
  const ref = useRef(null);
  let dropzoneRef;
  const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
  const fileSizeLimit = 300000;
  const imgPreview = img => {
    if (typeof img !== 'string' && img !== '') {
      return URL.createObjectURL(imgAvatar);
    }
    return img;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className={css.bodyForm}>
          <div>
            <Typography className={Type.textCenter}>
              <FormattedMessage {...messages.upload} />
              &nbsp;(Max 100KB)
            </Typography>
            <Dropzone
              className={classes.hiddenDropzone}
              accept={acceptedFiles.join(',')}
              acceptClassName="stripes"
              onDrop={onDrop}
              maxSize={fileSizeLimit}
              ref={(node) => { dropzoneRef = node; }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
            <div className={classes.avatarWrap}>
              <Avatar
                alt="Avatar"
                className={classes.uploadAvatar}
                src={imgPreview(imgAvatar)}
              />
              <Tooltip id="tooltip-upload" title={intl.formatMessage(messages.upload)}>
                <IconButton
                  className={classes.buttonUpload}
                  component="button"
                  onClick={() => {
                    dropzoneRef.open();
                  }}
                  size="large">
                  <PhotoCamera />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div>
            <Field
              name="name"
              component={TextFieldRedux}
              placeholder={intl.formatMessage(messages.name)}
              label={intl.formatMessage(messages.name)}
              validate={required}
              required
              ref={ref}
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermContactCalendar />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <Field
              name="title"
              component={TextFieldRedux}
              placeholder={intl.formatMessage(messages.title)}
              label={intl.formatMessage(messages.title)}
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Bookmark />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <Field
              name="phone"
              component={TextFieldRedux}
              placeholder={intl.formatMessage(messages.phone)}
              type="tel"
              label={intl.formatMessage(messages.phone)}
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhone />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <Field
              name="secondaryPhone"
              component={TextFieldRedux}
              placeholder={intl.formatMessage(messages.secondary_phone)}
              type="tel"
              label={intl.formatMessage(messages.secondary_phone)}
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Smartphone />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <Field
              name="personalEmail"
              component={TextFieldRedux}
              placeholder={intl.formatMessage(messages.personal_email)}
              type="email"
              validate={email}
              label={intl.formatMessage(messages.personal_email)}
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <Field
              name="companyEmail"
              component={TextFieldRedux}
              placeholder={intl.formatMessage(messages.company_email)}
              type="email"
              validate={email}
              label={intl.formatMessage(messages.company_email)}
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <Field
              name="address"
              component={TextFieldRedux}
              placeholder={intl.formatMessage(messages.address)}
              label={intl.formatMessage(messages.address)}
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <Field
              name="website"
              component={TextFieldRedux}
              placeholder={intl.formatMessage(messages.website)}
              type="url"
              label={intl.formatMessage(messages.website)}
              className={classes.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </section>
        <div className={css.buttonArea}>
          <p>
            Once you submit, its mean you have agreed with our
            &nbsp;
            <a href="/terms-conditions" target="_blank">
              terms &amp; conditions
            </a>
          </p>
          <div>
            <Button variant="contained" color="secondary" type="submit" disabled={submitting || processing}>
              {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
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
  imgAvatar: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  processing: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired
};

const AddContactFormRedux = reduxForm({
  form: 'addContact',
  enableReinitialize: true,
})(AddContactForm);

const AddContactInit = connect(
  state => ({
    initialValues: state.contactFullstack.formValues || state.contact.formValues
  })
)(AddContactFormRedux);

export default injectIntl(AddContactInit);
