import React, { useEffect, useState } from 'react';
import ResignReasonData from '../api/ResignReasonData';
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



function ResignReasonCreate(props) {
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
    specifiedContract: null,
    notSpecifiedContract: null,
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
      specifiedContract: formDate.specifiedContract ? formDate.specifiedContract.id : null,
      notSpecifiedContract: formDate.notSpecifiedContract ? formDate.notSpecifiedContract.id : null,
    };


    try {
      let response = await ResignReasonData().Save(bodyData);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.ResignReason.route);
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

    const data =  await ResignReasonData(locale).GetDataById(ID);

    setFormDate((prev)=>({
        ...prev,
        id: data.id,
        enName: data.enName,
        arName: data.arName,
        specifiedContract: data.specifiedContract ? SpecifiedContractData.find((item) => item.id == data.specifiedContract ) : null,
        notSpecifiedContract: data.notSpecifiedContract ? SpecifiedContractData.find((item) => item.id == data.notSpecifiedContract ) : null,
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
    history.push(SITEMAP.humanResources.ResignReason.route);
  }


  const onChangeFieldFun = (name,val) => {
    setFormDate((prev)=>({
        ...prev,
        [name]: val
    }))
  } 


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" 
          title={ID ?  
                    intl.formatMessage(messages.EditResignReason)
                  :  
                    intl.formatMessage(messages.CreateResignReason)
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
                    
                        <Grid item xs={12} md={3}>
                            <Autocomplete
                            id="ddlMenu"
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            value={formDate.specifiedContract}
                            //   options={[]}
                            options={SpecifiedContractData.length != 0 ? SpecifiedContractData : []}
                            getOptionLabel={(option) => (option ? option.name : "")}
                            renderOption={(props, option) => {
                                return (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                                );
                            }}
                            onChange={(event, value) => {
                                if (value !== null) {
                                    onChangeFieldFun("specifiedContract", value)
                                } else {
                                    onChangeFieldFun("specifiedContract", null)
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                name="SpecifiedContract"
                                label={intl.formatMessage(messages.specifiedContract)}
                                margin="normal"
                                className={style.fieldsSty}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Autocomplete
                            id="ddlMenu"
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            value={formDate.notSpecifiedContract}
                            options={SpecifiedContractData.length != 0 ? SpecifiedContractData : []}
                            getOptionLabel={(option) => (option ? option.name : "")}
                            renderOption={(props, option) => {
                                return (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                                );
                            }}
                            onChange={(event, value) => {
                                if (value !== null) {
                                    onChangeFieldFun("notSpecifiedContract", value)
                                } else {
                                    onChangeFieldFun("notSpecifiedContract", null)
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                name="NotSpecifiedContract"
                                label={intl.formatMessage(messages.notSpecifiedContract)}
                                margin="normal"
                                className={style.fieldsSty}
                                />
                            )}
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

    </PayRollLoader>
  );
}

ResignReasonCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ResignReasonCreate); 
