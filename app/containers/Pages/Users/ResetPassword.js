import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { ResetForm } from 'enl-components';
import useStyles from '../../../components/Forms/user-jss';
import axiosInstance from '../Payroll/api/axios';
import {passwordForgetFailure,passwordForgetSuccess} from '../../../redux/actions/authActions';
import {  useDispatch } from 'react-redux';

function ResetPassword() {
  const { classes } = useStyles();
  const title = brand.name + ' - Reset Password';
  const description = brand.desc;
  const [valueForm, setValueForm] = useState(null);

  const Dispatcher = useDispatch();
  const submitForm = (values) => setValueForm(values);

  async function fetchData() {
    if (valueForm) {
      
      try{
          const res =  await axiosInstance.post('Account/ForgotPassword?Email='+valueForm.email) ;
          if(res.status==200) {
            Dispatcher(passwordForgetSuccess());
          }
        }
        catch(error){
          if(!error.response)
            Dispatcher(passwordForgetFailure(error));
          if(error.response.data.error)
            Dispatcher(passwordForgetFailure(error.response.data.error[0]));
          else
            Dispatcher(passwordForgetFailure(error.response.data["error"][0]));
            }
    }
  }

  useEffect(() => {
    fetchData();
    
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
          <ResetForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
