import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import brand from "enl-api/dummy/brand";
import logo from "enl-images/logo.png";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import { injectIntl, FormattedMessage } from "react-intl";
import { closeMsgAction } from "enl-redux/actions/authActions";
import MessagesForm from "./MessagesForm";
import messages from "./messages";
import useStyles from "./user-jss";
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import axiosInstance from "../../containers/Pages/Payroll/api/axios";
import { useHistory, NavLink } from "react-router-dom";

// validation functions
const required = (value) => (value === null ? "Required" : undefined);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const { classes, cx } = useStyles();
  const { pristine, submitting, intl, messagesAuth, closeMsg, loading } = props;
  const [valueForm, setValueForm] = useState({ hd: "", key: "" });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    if (valueForm.key) {
      const res = await axiosInstance.get(
        `Registeration/SaveKey?OurK=${valueForm.key}`
      );
      if (res.data == "Operation executed Succesfully, you must restart IIS") {
        toast.success(res.data);
        history.push(`/login`);
      }
      else
      {
        toast.error(res.data);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("Registeration/GetHD");

      setValueForm((prevFilters) => ({
        ...prevFilters,
        hd: res.data,
      }));
    }
    fetchData();
  }, []);

  return (
    <Paper className={classes.sideWrap}>
      <Grid container spacing={4} alignItems="flex-start" direction="row">
        <Grid item xs={12} md={12}>
          <div className={classes.topBar}>
            <Typography variant="h4" className={classes.title}>
              <FormattedMessage {...messages.register} />
            </Typography>
            <Button
              size="small"
              className={classes.buttonLink}
              component={LinkBtn}
              to="/login"
            >
              <Icon className={cx(classes.icon, classes.signArrow)}>
                arrow_forward
              </Icon>
              <FormattedMessage {...messages.toAccount} />
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} md={12}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl variant="standard" className={classes.formControl}>
                <TextField
                  id="hd"
                  name="hd"
                  value={valueForm.hd}
                  label={intl.formatMessage(messages.hd)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete="off"
                  required
                  disabled
                />
              </FormControl>
            </div>
            <div>
              <FormControl variant="standard" className={classes.formControl}>
                <TextField
                  id="key"
                  name="key"
                  value={valueForm.key}
                  onChange={(e) => {
                    debugger;
                    setValueForm((prevFilters) => ({
                      ...prevFilters,
                      key: e.target.value,
                    }));
                  }}
                  label={intl.formatMessage(messages.key)}
                  className={classes.field}
                  variant="outlined"
                  autoComplete="off"
                  required
                />
              </FormControl>
            </div>

            <div className={classes.btnArea}>
              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                color="primary"
                type="submit"
              >
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                <FormattedMessage {...messages.loginButtonContinue} />
                {!loading && (
                  <ArrowForward
                    className={cx(
                      classes.rightIcon,
                      classes.iconSmall,
                      classes.signArrow
                    )}
                    disabled={submitting || pristine}
                  />
                )}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  messagesAuth: PropTypes.string,
  closeMsg: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

RegisterForm.defaultProps = {
  messagesAuth: null,
};

const RegisterFormReduxed = reduxForm({
  form: "registerForm",
  enableReinitialize: true,
})(RegisterForm);

const mapDispatchToProps = {
  closeMsg: closeMsgAction,
};

const mapStateToProps = (state) => ({
  messagesAuth: state.authReducer.message,
  loading: state.authReducer.loading,
});

const RegisterFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormReduxed);

export default injectIntl(RegisterFormMapped);
