import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/logo.png';
import Type from 'enl-styles/Typography.scss';
import { injectIntl, FormattedMessage } from 'react-intl';
import { closeMsgAction } from 'enl-redux/actions/authActions';
import { TextFieldRedux } from './ReduxFormMUI';
import MessagesForm from './MessagesForm';
import messages from './messages';
import useStyles from './user-jss';



function ForgotForm(props) {
  const { classes, cx } = useStyles();
  const {
    handleSubmit,
    pristine,
    submitting,
    intl,
    messagesAuth,
    closeMsg
  } = props;

  return (
    <section>
      <div className={Type.textCenter}>
        <NavLink to="/" className={cx(classes.brand, classes.centerFlex)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </div>
      <Paper className={classes.paperWrap}>
        <Typography variant="h4" className={cx(classes.title, Type.textCenter)} gutterBottom>
          <FormattedMessage {...messages.resetTitle} />
        </Typography>
        
        <section className={classes.formWrap}>
          {
            messagesAuth !== null || ''
              ? (
                <MessagesForm
                  variant={messagesAuth === 'LINK.PASSWORD_RESET.SENT' ? 'success' : 'error'}
                  className={classes.msgUser}
                  message={messagesAuth === 'LINK.PASSWORD_RESET.SENT' ? 'Reset link has been sent to Your\'e email' : messagesAuth}
                  onClose={closeMsg}
                />
              )
              : ''
          }
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl variant="standard" className={classes.formControl}>
                <Field
                type="password"
                  name="password"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.password)}
                  label={intl.formatMessage(messages.password)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl variant="standard" className={classes.formControl}>
                <Field
                type="password"
                  name="confirmpassword"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.confirmpassword)}
                  label={intl.formatMessage(messages.confirmpassword)}
                  required
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" type="submit">
                <FormattedMessage {...messages.forgotButton} />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    </section>
  );
}

ForgotForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  messagesAuth: PropTypes.string,
  closeMsg: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

ForgotForm.defaultProps = {
  messagesAuth: null
};

const ForgotFormReduxed = reduxForm({
  form: 'ForgotForm',
  enableReinitialize: true,
})(ForgotForm);

const mapDispatchToProps = {
  closeMsg: closeMsgAction
};

const mapStateToProps = state => ({
  messagesAuth: state.authReducer.message
});

const ForgotFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotFormReduxed);

export default injectIntl(ForgotFormMapped);
