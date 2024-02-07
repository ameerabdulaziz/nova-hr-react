import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import { useHistory, NavLink, useLocation } from "react-router-dom";
import { LoginForm, SelectLanguage } from "enl-components";
import logo from "enl-images/Loginlogo.png";
import ArrowBack from "@mui/icons-material/ArrowBack";
import useStyles from "enl-components/Forms/user-jss";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import axiosInstance from "../Payroll/api/axios";
import {
  login,
  loginSuccess,
  loginFailure,
  syncUser,
} from "../../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import queryString from "query-string";

function Login() {
  const { classes } = useStyles();
  const Dispatcher = useDispatch();
  const title = brand.name + " - Login";
  const description = brand.desc;
  const [valueForm, setValueForm] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const { redirectTo } = queryString.parse(location.search);
  const submitForm = (values) => setValueForm(values);

  async function fetchData() {
    if (valueForm) {
      try {
        Dispatcher(login());

        const data = {
          UserName: valueForm.email,
          Password: valueForm.password,
          RememberMe: valueForm.RememberMe ? true : false,
        };

        const res = await axiosInstance.post("Account/Login", data);
        Dispatcher(loginSuccess());

        localStorage.setItem("Token", res.data.token);
        let user = {
          id: res.data.id,
          email: res.data.email,
          name: res.data.userName,
          token: res.data.token,
          avatar: null, //'/images/avatars/pp_boy4.jpg',
          title: "Administrator",
          status: "online",
          displayName: res.data.userName,
          isHR: res.data.isHR,
          isManagement: res.data.isManagement,
          isSuper: res.data.isSuper,
          arName: res.data.arName,
          enName: res.data.enName,
          photoURL: res.data.photo,
          branchId: res.data.branchId,
        };
        Dispatcher(syncUser(user));
        debugger;
        if (res.data.isHR)
          history.push(redirectTo == null ? "/app" : redirectTo);
        else if (res.data.isManagement)
          history.push(
            redirectTo == null ? "/app/ManagementDashboard/" : redirectTo
          );
        else
        history.push(
          redirectTo == null ? "/app/EmployeeDashboard/" : redirectTo
        );

        //history.push('/app');
        //window.location.href = '/app';
      } catch (error) {
        if (!error.response) Dispatcher(loginFailure(error));
        if (error.response.data.error)
          Dispatcher(loginFailure(error.response.data.error[0]));
        else Dispatcher(loginFailure(error.response.data["error"][0]));
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [valueForm]);

  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.containerSide}>
        <Hidden mdDown>
          <div className={classes.opening}>
            {/* style={{ background: "rgb(63, 81, 181)"}} */}
            <div className={classes.openingWrap}>
              <div className={classes.openingHead}>
                <NavLink to="/" className={classes.brand}>
                <img src={logo} alt={brand.name}  style={{ width:200,height:50  }} />
            {/* {brand.name} */}
                </NavLink>
              </div>
              <Typography variant="h3" component="h1" gutterBottom>
                <FormattedMessage {...messages.welcomeTitle} />
                &nbsp;
                {brand.name}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                className={classes.subpening}
              >
                <FormattedMessage {...messages.welcomeSubtitle} />
              </Typography>
            </div>
            <div className={classes.openingFooter}>
              <div className={classes.lang}>
                <SelectLanguage />
              </div>
            </div>
          </div>
        </Hidden>
        <div className={classes.sideFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

export default Login;
