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
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "./messages";
import axiosInstance from "../Payroll/api/axios";
import {
  login,
  loginSuccess,
  loginFailure,
  syncUser,
} from "../../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import SITEMAP from "../../App/routes/sitemap";
import { toast } from 'react-hot-toast';
import Payrollmessages from "../../Pages/Payroll/messages";

function Login(props) {
  const { classes } = useStyles();
  const Dispatcher = useDispatch();
  const title = brand.name + " - Login";
  const description = brand.desc;
  const [valueForm, setValueForm] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const { redirectTo } = queryString.parse(location.search);
  const submitForm = (values) => setValueForm(values);
  const Auth = useSelector((state) => state.authReducer.loggedIn);
  const { intl } = props;
  // used to check if user login before and try to open login page redirect him to /app
  // useEffect(() => {
  //   if (Auth === true &&  localStorage.getItem("Token")) {
  //     history.push(`/app`);
  //   }
  // }, []);

  async function fetchData() {
    if (valueForm) {
      try {

        if(valueForm.email.toLowerCase() === "admin" && valueForm.password == "123456") 
        {
          toast.error(intl.formatMessage(Payrollmessages.invalidUser));
        }
        else
        {
            Dispatcher(login());

            const data = {
              UserName: valueForm.email,
              Password: valueForm.password,
              RememberMe: valueForm.RememberMe ? true : false,
            };

            const res = await axiosInstance.post("Account/Login", data);
            debugger;

            if (res.data.token) {
              Dispatcher(loginSuccess());
              localStorage.setItem("Token", res.data.token);
              localStorage.setItem("IsStaticDashboard", res.data.isStaticDashboard);
              localStorage.setItem("IsHR", res.data.isHR);
              localStorage.setItem("userName", res.data.userName);
              localStorage.setItem("IsManagement", res.data.isManagement);
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
              localStorage.setItem("MenuName", "Dashboard");
              if (res.data.isHR)
                history.push(
                  redirectTo == null || redirectTo === SITEMAP.auth.Login.route
                  ? SITEMAP.global.AdminDashboard.route
                  : redirectTo
                );
              else if (res.data.isManagement)
                history.push(
                  redirectTo == null || redirectTo === SITEMAP.auth.Login.route
                  ? SITEMAP.global.ManagementDashboard.route
                  : redirectTo
                );
              else
                history.push(
                  redirectTo == null || redirectTo === SITEMAP.auth.Login.route
                  ? SITEMAP.global.EmployeeDashboard.route
                  : redirectTo
                );
            } else {
              if (res.data == "you must register this device first")
                Dispatcher(loginSuccess());
                history.push(SITEMAP.auth.Register.route);
            }

            //history.push('/app');
            //window.location.href = '/app';
      }
      } catch (error) {
        if (!error.response) Dispatcher(loginFailure(error.message));
        if (error.response.data.error)
          Dispatcher(loginFailure(error.response.data.error[0]));
        else Dispatcher(loginFailure(error.response.data["error"][0]));
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [valueForm]);

  // clear (Menu , MenuName ) from localStorage with delete ( Review ) session
  useEffect(() => {
    localStorage.removeItem("Menu");
    localStorage.removeItem("MenuName");
    sessionStorage.removeItem("Review");
  }, []);

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
                  <img
                    src={logo}
                    alt={brand.name}
                    style={{ width: 200, height: 50 }}
                  />
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

export default injectIntl(Login);
