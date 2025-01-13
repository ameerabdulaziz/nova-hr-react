import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { ForgotForm } from 'enl-components';
import useStyles from '../../../components/Forms/user-jss';
import axiosInstance from '../Payroll/api/axios';
import {passwordForgetFailure,passwordForgetSuccess} from '../../../redux/actions/authActions';
import {  useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SITEMAP from '../../App/routes/sitemap';

function ForgotPassword() {
  const { classes } = useStyles();
  const title = brand.name + ' -Forgot Password';
  const description = brand.desc;
  const [valueForm, setValueForm] = useState(null);
  const history=useHistory();  
  const Dispatcher = useDispatch();
  const queryParams = new URLSearchParams(useLocation().search)
  const Email = queryParams.get("email");
  const Token = queryParams.get("token");
 

  const submitForm = (values) => setValueForm(values);

  async function fetchData() {
    if (valueForm) {
      
      try{
        
        var data = {Email:Email, Password:valueForm.password,ConfirmPassword:valueForm.confirmpassword,Token:Token}
          const res =  await axiosInstance.post('Account/ResetPassword',data) ;
          if(res.status==200) {
            history.push(SITEMAP.auth.Login.route);
          }
        }
        catch(error){
          
            Dispatcher(passwordForgetFailure(error.response.data[""][0]));
        }
    }
  }

  useEffect(() => {
    fetchData();
        //http://localhost:3000/ForgotPassword?email=admin@gmail.com&token=CfDJ8O3RNeakyWdFs5WpAH6g9IJXB9+u1jemQDEaNoj0teay+lUGwq1/uFULpWnArE9KAffQq+pa/rlUsttzEMogPkHbJzpwoU3hQPjNg1ZBtV2Wecr/GOrCSuxbn+GU1oYKJrjSC8a6YJ3rFoLBTH0tPN/qStERnAnIWXyqF3g2A6ADwIM/8cM3H04eboy+ERxoALWSb3Z+Ti/DbSe+sf2edYufM1msbZkCoTv4M9YDXauw
    
  }, [valueForm]);

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <ForgotForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
