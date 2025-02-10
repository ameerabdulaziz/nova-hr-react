import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'enl-components';
import ApiData from './api/ExplanationData';
import Payrollmessages from '../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { injectIntl, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField,Autocomplete} from "@mui/material";
import useStyles from '../Style';
import PropTypes from 'prop-types';
import GeneralListApis from '../api/GeneralListApis';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PayRollLoaderInForms from "../Component/PayRollLoaderInForms";



function NewIdea(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");  
  const [isLoading, setIsLoading] = useState(false);  
  const [directedToList, setDirectedToList] = useState([]);
  const [TypeList, setTypeList] = useState([]);
  const [data, setdata] = useState({
    "id": 0,    
    "questionTitle":"",
    "questionType":"",
    "questionTypeName":"",
    "questionDetails":"",
    "expDirectedTo":"",
    "directedToName":"",
    "meetingReq":false,
  });

  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
        setIsLoading(true);
      let response = await  ApiData(locale).SaveEnquiry(data);

      if (response.status==200) {
        toast.success(notif.saved);
        setdata({
            "id": 0,    
            "questionTitle":"",
            "questionType":"1",
            "questionTypeName":"Enquiry",
            "questionDetails":"",
            "expDirectedTo":"",
            "directedToName":"",
            "meetingReq":false,
          });
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
    }
    finally {setIsLoading(false);}
  }
  async function oncancel(){
    setdata({
        "id": 0,    
    "questionTitle":"",
    "questionType":  TypeList && TypeList.length !== 0 ? TypeList[0].id : "",
    "questionTypeName": TypeList && TypeList.length !== 0 ? TypeList[0].name : "",
    "questionDetails":"",
    "directedTo":"",
    "directedToName":"",
    "meetingReq":false,
      })
  }
  async function fetchData() {
    
    const types = await GeneralListApis(locale).GetExplanationTypeList();
    const DirectedToData = await GeneralListApis(locale).GetDirectedToList();

    setdata((prev) => ({
      ...prev,
      questionType: types && types.length !== 0 ? types[0].id : "",
      questionTypeName: types && types.length !== 0 ? types[0].name : "",
    }));

    setTypeList(types);
    setDirectedToList(DirectedToData);
    
  }
  useEffect(() => {    
    fetchData();
  }, []);
  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">


                 <Grid item xs={12} md={5.5} lg={7} xl={5}>
                    <Grid container spacing={3}>
                       <Grid item xs={12}  lg={8}>
                        <Autocomplete  
                            id="typeid"                        
                            options={TypeList}
                            value={{id:data.questionType,name:data.questionTypeName}}    
                            isOptionEqualToValue={(option, value) =>
                                value.id === 0 || value.id === "" ||option.id === value.id
                            }                 
                            getOptionLabel={(option) =>
                            option.name ? option.name : ""
                            }
                            onChange={(event, value) =>{ setdata((prevFilters) => ({...prevFilters,questionType: value.id,questionTypeName:value.name})) }}
                            
                            renderInput={(params) => (
                            <TextField
                                variant="outlined"                            
                                {...params}
                                name="typeid"
                                required                              
                                label={intl.formatMessage(Payrollmessages.type)}
                                />
                            )}
                        />  
                       </Grid>
                       <Grid item >
                        <FormControlLabel
                            control={(
                            <Checkbox
                                checked={data.meetingReq}
                                onChange={(e) => setdata((prevFilters) => ({
                                    ...prevFilters,
                                    meetingReq: e.target.checked,
                                  }))}   
                                value={data.meetingReq}
                                color="primary"
                            />
                            )}
                            label={intl.formatMessage(Payrollmessages.meetingReq)}
                        />
                       </Grid>                         
                    </Grid>
                  </Grid>

                  <Grid item xs={12}  lg={5} xl={7}></Grid>


                  <Grid item xs={12} md={5.5}  lg={4.5} xl={4}>
                    <Grid container spacing={3}>                        
                       <Grid item xs={12}  lg={12}>
                        <Autocomplete  
                            id="directedTo"                        
                            options={directedToList}
                            value={{id:data.expDirectedTo,name:data.directedToName}}    
                            isOptionEqualToValue={(option, value) =>
                                value.id === 0 || value.id === "" ||option.id === value.id
                            }                 
                            getOptionLabel={(option) =>
                            option.name ? option.name : ""
                            }
                            onChange={(event, value) =>{ setdata((prevFilters) => ({...prevFilters,expDirectedTo: value.id,directedToName:value.name})) }}
                            
                            renderInput={(params) => (
                            <TextField
                                variant="outlined"                            
                                {...params}
                                name="directedTo"
                                required                              
                                label={intl.formatMessage(Payrollmessages.directedTo)}
                                />
                            )}
                        />  
                       </Grid>
       
                       <Grid item xs={12}   lg={12}>                
                        <TextField
                            id="QuestionTitle"
                            name="QuestionTitle"
                            value={data.questionTitle}   
                            onChange={(e) => setdata((prevFilters) => ({
                                ...prevFilters,
                                questionTitle: e.target.value,
                              }))}               
                            label={intl.formatMessage(Payrollmessages.title)}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                        />
                       </Grid>
                    </Grid>
                  </Grid>

                    <Grid item xs={12}  md={12} lg={7.5} xl={8}>                
                        <TextField
                            id="QuestionDetails"
                            name="QuestionDetails"
                            value={data.questionDetails}  
                            onChange={(e) => setdata((prevFilters) => ({
                                ...prevFilters,
                                questionDetails: e.target.value,
                              }))}   
                            multiline
                            rows={2}                
                            label={intl.formatMessage(Payrollmessages.details)}
                            className={classes.field}
                            variant="outlined"
                            autoComplete='off'
                        />
                    </Grid>
                    
                    <Grid item xs={12}></Grid>
                <Grid item >                  
                    <Button variant="contained" type="submit" size="medium" color="primary" >
                       <FormattedMessage {...Payrollmessages.save} /> 
                    </Button>
                </Grid>
                <Grid item >
                    <Button variant="contained" size="medium" color="primary" onClick={oncancel} >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>
                

            </Grid>            
        </form>
        </PapperBlock>
    
    </PayRollLoaderInForms>
  );
}
NewIdea.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(NewIdea);

