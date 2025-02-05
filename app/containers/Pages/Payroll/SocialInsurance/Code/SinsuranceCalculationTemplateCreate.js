import React, { useEffect, useState } from 'react';
import SinsuranceCalculationTemplateData from '../api/SinsuranceCalculationTemplateData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss'
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../../components/Tables/messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import { PapperBlock } from 'enl-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveButton from '../../Component/SaveButton';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import { useHistory, useLocation } from 'react-router-dom';
import SITEMAP from '../../../../App/routes/sitemap';
import {
    Button,
    Grid,
    TextField,
  } from "@mui/material";




function SinsuranceCalculationTemplateCreate(props) {
    const { intl } = props;
    const history = useHistory(); 
    const { state } = useLocation()
    const  ID  = state?.id

  // const [id, setid] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [processing ,setProcessing] = useState(false)

  const [formData, setFormData] = useState({
    id: 0,
    enName: "",
    arName: "",
    companyShare: "",
    employeeShare: "",
    newSalaryLimit: "",
    salaryLimit: "",
    isPercentage: false,
  });





  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true)
    setIsLoading(true);


    const data = {
      id: formData.id,
      name: formData.arName,
      EnName: formData.enName,
      salaryLimit: formData.salaryLimit,
      companyShare: formData.companyShare,
      employeeShare: formData.employeeShare,
      newSalaryLimit: formData.newSalaryLimit,
      isPercentage: formData.isPercentage,
    };



    try {
      let response = await SinsuranceCalculationTemplateData().Save(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(SITEMAP.socialInsurance.SinsuranceCalculationTemplate.route);
      }
    } catch (err) {
      //      
    } finally {
      setProcessing(false)
      setIsLoading(false);
    }
    
  };
 



const getEditdata =  async () => {

  try {
    setIsLoading(true);
    const data =  await SinsuranceCalculationTemplateData().GetDataById(ID);
  
    setFormData((prev)=>({
      ...prev,
      id: data.id,
      enName: data.enName,
      arName: data.arName,
      companyShare: data.companyShare,
      employeeShare: data.employeeShare,
      newSalaryLimit: data.newSalaryLimit,
      salaryLimit: data.salaryLimit,
      isPercentage: data.isPercentage ?? false,
  }))
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }

};


useEffect(() => {
  if(ID)
  {
    getEditdata()
  }
  }, [ID]);


  const onChangeFieldFun = (name,val) => {
    setFormData((prev)=>({
        ...prev,
        [name]: val
    }))
  }


  function oncancel(){
    history.push(SITEMAP.socialInsurance.SinsuranceCalculationTemplate.route);
  }


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" 
        title={ID ?  
                   intl.formatMessage(messages.EditInsuranceCalculationTemplate)
                 :  
                   intl.formatMessage(messages.CreatInsuranceCalculationTemplate)
              } 
          desc={""}>
            <form onSubmit={handleSubmit}>

            <Grid
              container
              spacing={3}
              mt={0}
              alignItems="flex-start"
              direction="row">
            
                <Grid item xs={12} >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}  xl={3} > 
                            <TextField
                                name="arName"
                                id="arName"
                                placeholder={intl.formatMessage(Payrollmessages.arName) }
                                label={intl.formatMessage(Payrollmessages.arName)}
                                fullWidth
                                variant="outlined"
                                value={formData.arName}
                                onChange={(e) => onChangeFieldFun("arName", e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={4} xl={3} > 
                            <TextField
                                name="enName"
                                id="enName"
                                placeholder={intl.formatMessage(Payrollmessages.enName) }
                                label={intl.formatMessage(Payrollmessages.enName)}
                                fullWidth
                                variant="outlined"
                                value={formData.enName}
                                onChange={(e) => onChangeFieldFun("enName", e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Grid>

                    </Grid>

                    <Grid
                        container
                        spacing={3}
                        mt={0}
                        alignItems="flex-start"
                        direction="row">

                        <Grid item xs={12} md={2}  xl={1} > 
                            <TextField
                                name="salaryLimit"
                                id="salaryLimit"
                                placeholder={intl.formatMessage(messages.salaryLimit) }
                                label={intl.formatMessage(messages.salaryLimit)}
                                fullWidth
                                variant="outlined"
                                type='number'
                                value={formData.salaryLimit}
                                onChange={(e) => onChangeFieldFun("salaryLimit", e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={2}  xl={1}  > 
                            <TextField
                                name="companyShare"
                                id="companyShare"
                                placeholder={intl.formatMessage(messages.companyShare) }
                                label={intl.formatMessage(messages.companyShare)}
                                fullWidth
                                variant="outlined"
                                type='number'
                                value={formData.companyShare}
                                onChange={(e) => onChangeFieldFun("companyShare", e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={2}  xl={1}  > 
                            <TextField
                                name="employeeShare"
                                id="employeeShare"
                                placeholder={intl.formatMessage(messages.employeeShare) }
                                label={intl.formatMessage(messages.employeeShare)}
                                fullWidth
                                variant="outlined"
                                type='number'
                                value={formData.employeeShare}
                                onChange={(e) => onChangeFieldFun("employeeShare", e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={2}  xl={1}  > 
                            <TextField
                                name="newSalaryLimit"
                                id="newSalaryLimit"
                                placeholder={intl.formatMessage(messages.newSalaryLimit) }
                                label={intl.formatMessage(messages.newSalaryLimit)}
                                fullWidth
                                variant="outlined"
                                type='number'
                                value={formData.newSalaryLimit}
                                onChange={(e) => onChangeFieldFun("newSalaryLimit", e.target.value)}
                                required
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item > 
                            <FormControlLabel  
                                control={ 
                                <Switch  
                                checked={formData.isPercentage} 
                                onChange={() => {
                                    setFormData((prev) =>({
                                        ...prev,
                                        isPercentage: !formData.isPercentage
                                    }))
                                }}
                                color="primary" 
                                className={style.BtnSty}
                                />} 
                                  label={intl.formatMessage(messages.isPercentage) }
                                /> 
                        </Grid>
                    </Grid>
              </Grid>
            </Grid>

            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                 
                  <Grid item xs={12} md={12}></Grid>
                  <Grid item xs={12} md={4}
                  container
                  spacing={3}
                  alignItems="flex-start"
                  direction="row"
                  className={style.itemsStyle}
                  >
                <Grid item xs={3}  md={5} lg={3}>                  
                    <SaveButton Id={formData.id} processing={processing} />
                </Grid>
                <Grid item xs={3}  md={5} lg={3}>
                    <Button variant="contained" size="medium" color="primary" 
                    onClick={oncancel}
                     >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>
                </Grid>
              </Grid>
          </form>
      </PapperBlock>         

     
    </PayRollLoaderInForms>
  );
}

SinsuranceCalculationTemplateCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SinsuranceCalculationTemplateCreate); 
