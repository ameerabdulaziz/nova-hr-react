import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/ExplanationData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useParams ,useHistory } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField} from "@mui/material";
import useStyles from '../../Style';
import PropTypes from 'prop-types';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from "date-fns";



function ExplanationEdit(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  let { id } = useParams();
  const { classes } = useStyles();
  
  const [data, setdata] = useState({
    "id": 0,
    "employeeName":"",
    "job":"",
    "questionType":"",
    "expTypeName":"",
    "questionTitle":"",
    "questionDate":"",
    "questionDetails":"",
    "hrLetterDate":"",
    "directedTo":"",
    "hrLetterLang":""
  });
  const history=useHistory();  

  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
      debugger;  
      let response = await  ApiData(locale).SaveResponse(data);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/ExplanationList`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
  async function oncancel(){
    history.push(`/app/Pages/HR/ExplanationList`);
  }

  async function fetchData() {
    debugger ;
    
    const dataApi = await ApiData(locale).Get(id??0);
    
    setdata(dataApi);
  }
  
  useEffect(() => {    
    fetchData();
  }, []);

  
  
  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={intl.formatMessage(messages.AttentionUpdateTitle)} desc={""}>
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                    <Grid item xs={12}  md={4}>                
                        <TextField
                            id="employee"
                            name="employee"
                            value={data.employeeName}               
                            label={intl.formatMessage(messages.employeeName)}
                            className={classes.field}
                            variant="outlined"
                            
                        />
                    </Grid>
                    <Grid item xs={12}  md={4}>                
                        <TextField
                            id="job"
                            name="job"
                            value={data.job}               
                            label={intl.formatMessage(messages.job)}
                            className={classes.field}
                            variant="outlined"
                            
                        />
                    </Grid>
                    <Grid item xs={12}  md={4}>                
                        <TextField
                            id="job"
                            name="job"
                            value={data.questionDate}               
                            label={intl.formatMessage(messages.job)}
                            className={classes.field}
                            variant="outlined"
                            
                        />
                    </Grid>
                    <Grid item xs={12}  md={4}>                
                        <TextField
                            id="ExpTypeName"
                            name="ExpTypeName"
                            value={data.expTypeName}               
                            label={intl.formatMessage(Payrollmessages.type)}
                            className={classes.field}
                            variant="outlined"
                            
                        />
                    </Grid>
                    <Grid item xs={12}  md={4}>                
                        <TextField
                            id="QuestionTitle"
                            name="QuestionTitle"
                            value={data.questionTitle}               
                            label={intl.formatMessage(Payrollmessages.title)}
                            className={classes.field}
                            variant="outlined"
                            
                        />
                    </Grid>
                    <Grid item xs={12}  md={12}>                
                        <TextField
                            id="QuestionDetails"
                            name="QuestionDetails"
                            value={data.questionDetails}  
                            multiline
                            rows={2}                
                            label={intl.formatMessage(Payrollmessages.details)}
                            className={classes.field}
                            variant="outlined"
                            
                        />
                    </Grid>
                    {(data.questionType ==4?
                        <Grid item xs={12}  md={4}>                
                            <TextField
                                id="HrLetterDate"
                                name="HrLetterDate"
                                value={data.hrLetterDate}  
                                label={intl.formatMessage(messages.hrLetterDate)}
                                className={classes.field}
                                variant="outlined"                            
                            />
                        </Grid>:""
                    )}
                    {(data.questionType ==4?
                        <Grid item xs={12}  md={4}>                
                            <TextField
                                id="DirectedTo"
                                name="DirectedTo"
                                value={data.directedTo}                                                
                                label={intl.formatMessage(messages.expDirectedTo)}
                                className={classes.field}
                                variant="outlined"                            
                            />
                        </Grid>:""
                    )}
                    {(data.questionType ==4?
                        <Grid item xs={12}  md={4}>                
                            <TextField
                                id="HrLetterLang"
                                name="HrLetterLang"
                                value={data.hrLetterLang}  
                                label={intl.formatMessage(messages.hrLetterLang)}
                                className={classes.field}
                                variant="outlined"                            
                            />
                        </Grid>:""
                    )}
                    <Grid item xs={12} md={12}>                    
                        <TextField
                        id="response"
                        name="response"
                        multiline
                        required
                        rows={2}                    
                        onChange={(e) => setdata((prevFilters) => ({
                            ...prevFilters,
                            response: e.target.value,
                        }))}                        
                        label={intl.formatMessage(messages.response)}
                        className={classes.field}
                        variant="outlined"
                        />
                    </Grid>
                
                <Grid item xs={12} md={1}>                  
                    <Button variant="contained" type="submit" size="medium" color="primary" >
                       <FormattedMessage {...Payrollmessages.save} /> 
                    </Button>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button variant="contained" size="medium" color="primary" onClick={oncancel} >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
                    </Button>
                </Grid>
                

            </Grid>            
        </form>
        </PapperBlock>
    
    </div>
  );
}
ExplanationEdit.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ExplanationEdit);

