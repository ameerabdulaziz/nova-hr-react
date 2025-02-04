import React, { useEffect, useState } from 'react';
import hrResignRuleData from '../api/hrResignRuleData';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss'
import {  useHistory, useLocation  } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { FormattedMessage , injectIntl } from 'react-intl';
import messages from '../messages';
import Payrollmessages from '../../messages';
import PropTypes from 'prop-types';
import GeneralListApis from '../../api/GeneralListApis'; 
import { PapperBlock } from 'enl-components';
import useStyles from '../../Style';
import { format } from "date-fns";
import SaveButton from '../../Component/SaveButton';
import PayRollLoader from '../../Component/PayRollLoader';
import {
    Button,
    Grid,
    TextField,
    Autocomplete,
  } from "@mui/material";

import SITEMAP from '../../../../App/routes/sitemap';
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";



function hrResignRuleCreate(props) {
  const { state } = useLocation()
  const  ID  = state?.id
  const history = useHistory(); 
  const { intl } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [processing ,setProcessing] = useState(false)
  const locale = useSelector(state => state.language.locale);
  const [SpecifiedContractData, setSpecifiedContractData] = useState([]);
  const [formDate, setFormDate] = useState({
    id: 0,
    enName: "",
    arName: "",
    firstYear: "",
    from2To5: "",
    more5: "",
    maxYear: "",
  });

  const { classes } = useStyles();




  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    setProcessing(true)


    const bodyData = {
      id: formDate.id,
      enName: formDate.enName,
      arName: formDate.arName,
      firstYear: formDate.firstYear,
      from2To5: formDate.from2To5,
      more5: formDate.more5,
      maxYear: formDate.maxYear,
    };


    try {
      let response = await hrResignRuleData().Save(bodyData);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.HrResignRuleList.route);
      } else {
          toast.error(response.statusText);
      }
      setIsLoading(false)
      setProcessing(false)
    } catch (err) {
      //
    } finally {
      setIsLoading(false)
      setProcessing(false)
    }
    
  };
 


const getdata =  async () => {
  setIsLoading(true);

  try {
    const ResignRule = await GeneralListApis(locale).GetResignRuleList();    
  
    setSpecifiedContractData(ResignRule)
  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }
};

const getEditdata =  async () => {
  setIsLoading(true);

  try {

    const data =  await hrResignRuleData(locale).GetDataById(ID);

    setFormDate((prev)=>({
        ...prev,
        id: data.id,
        enName: data.enName,
        arName: data.arName,
        firstYear: data.firstYear,
        from2To5: data.from2To5,
        more5: data.more5,
        maxYear: data.maxYear,
    }))

  } catch (error) {
    //
  } finally {
    setIsLoading(false);
  }
};


useEffect(() => {
  getdata();
}, []);

useEffect(() => {
  if(ID && SpecifiedContractData.length !== 0)
  {
    getEditdata()
  }
  }, [ID,SpecifiedContractData]);



  function oncancel(){
    history.push(SITEMAP.humanResources.HrResignRuleList.route);
  }


  const onChangeFieldFun = (name,val) => {
    setFormDate((prev)=>({
        ...prev,
        [name]: val
    }))
  } 


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
                    intl.formatMessage(messages.EditHrResignRule)
                  :  
                    intl.formatMessage(messages.CreateHrResignRule)
               } 
          desc={""}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                item
                spacing={3}
                alignItems="flex-start"
                direction="row">
                  <Grid
                      container
                      item
                      spacing={3}
                      alignItems="flex-start"
                      direction="row">
                        <Grid item xs={12}  md={3}> 
                            <TextField
                                name="ENName"
                                id="ENName"
                                placeholder={intl.formatMessage(Payrollmessages.enName) }
                                label={intl.formatMessage(Payrollmessages.enName)}
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={formDate.enName}
                                onChange={(e) => {
                                    onChangeFieldFun("enName", e.target.value)
                                }}
                                required
                                autoComplete='off'
                            />
                        </Grid>
                      
                        <Grid item xs={12}  md={3}> 
                            <TextField
                                name="ARName"
                                id="ARName"
                                placeholder={intl.formatMessage(Payrollmessages.arName) }
                                label={intl.formatMessage(Payrollmessages.arName)}
                                required
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={formDate.arName}
                                onChange={(e) => {
                                    onChangeFieldFun("arName", e.target.value)
                                }}
                                autoComplete='off'
                            />
                        </Grid>
                  </Grid>

                  <Grid
                      container
                      item
                      spacing={3}
                      alignItems="flex-start"
                      direction="row">
                        <Grid item xs={12}  md={3}> 
                            <TextField
                                name="firstYear"
                                id="firstYear"
                                placeholder={intl.formatMessage(messages.firstYear) }
                                label={intl.formatMessage(messages.firstYear)}
                                type='number'
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={formDate.firstYear}
                                onChange={(e) => {
                                    onChangeFieldFun("firstYear", e.target.value)
                                }}
                                required
                                autoComplete='off'
                            />
                        </Grid>
                      
                        <Grid item xs={12}  md={3}> 
                            <TextField
                                name="from2To5"
                                id="from2To5"
                                placeholder={intl.formatMessage(messages.between2To5Years) }
                                label={intl.formatMessage(messages.between2To5Years)}
                                required
                                type='number'
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={formDate.from2To5}
                                onChange={(e) => {
                                    onChangeFieldFun("from2To5", e.target.value)
                                }}
                                autoComplete='off'
                            />
                        </Grid>
                  </Grid>

                  <Grid
                      container
                      item
                      spacing={3}
                      alignItems="flex-start"
                      direction="row">
                        <Grid item xs={12}  md={3}> 
                            <TextField
                                name="more5"
                                id="more5"
                                placeholder={intl.formatMessage(messages.moreThan5Years) }
                                label={intl.formatMessage(messages.moreThan5Years)}
                                type='number'
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={formDate.more5}
                                onChange={(e) => {
                                    onChangeFieldFun("more5", e.target.value)
                                }}
                                required
                                autoComplete='off'
                            />
                        </Grid>
                      
                        <Grid item xs={12}  md={3}> 
                            <TextField
                                name="maxYear"
                                id="maxYear"
                                placeholder="maxYear"
                                label="maxYear"
                                required
                                type='number'
                                className={`${classes.field} ${style.fieldsSty}`}
                                margin="normal"
                                variant="outlined"
                                value={formDate.maxYear}
                                onChange={(e) => {
                                    onChangeFieldFun("maxYear", e.target.value)
                                }}
                                autoComplete='off'
                            />
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
                    <SaveButton Id={formDate.id} processing={processing} />
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

hrResignRuleCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(hrResignRuleCreate); 
