import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'enl-components';
import ApiData from './api/ExplanationData';
import Payrollmessages from '../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField,Autocomplete} from "@mui/material";
import useStyles from '../Style';
import PropTypes from 'prop-types';
import GeneralListApis from '../api/GeneralListApis';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



function NewIdea(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  
  const [EmployeeList, setEmployeeList] = useState([]);
  const [TypeList, setTypeList] = useState([]);
  const [data, setdata] = useState({
    "id": 0,    
    "questionTitle":"",
    "questionType":"1",
    "questionTypeName":"Enquiry",
    "questionDetails":"",
    "directedTo":"",
    "directedToName":"",
    "meetingReq":false,
  });
  const history=useHistory();  

  const handleSubmit = async (e) => {
    
    e.preventDefault();   
    try{
      debugger;  
      let response = await  ApiData(locale).SaveEnquiry(data);

      if (response.status==200) {
        toast.success(notif.saved);
        setdata({
            "id": 0,    
            "questionTitle":"",
            "questionType":"1",
            "questionTypeName":"Enquiry",
            "questionDetails":"",
            "directedTo":"",
            "directedToName":"",
            "meetingReq":false,
          });
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  }
  async function oncancel(){
    setdata({
        "id": 0,    
    "questionTitle":"",
    "questionType":"1",
    "questionTypeName":"Enquiry",
    "questionDetails":"",
    "directedTo":"",
    "directedToName":"",
    "meetingReq":false,
      })
  }
  async function fetchData() {
    debugger ;
    const types = await GeneralListApis(locale).GetExplanationTypeList(locale);
    setTypeList(types);
    const employees = await GeneralListApis(locale).GetEmployeeList(locale);
    setEmployeeList(employees);
    
  }
  useEffect(() => {    
    fetchData();
  }, []);
  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={Title} desc={""}>
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
                    <Grid item xs={12} md={2}>
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
                            onChange={(event, value) =>{debugger; setdata((prevFilters) => ({...prevFilters,questionType: value.id,questionTypeName:value.name})) }}
                            
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
                    <Grid item xs={12} md={4}>
                        <Autocomplete  
                            id="employeeId"                        
                            options={EmployeeList}
                            value={{id:data.directedTo,name:data.directedToName}}    
                            isOptionEqualToValue={(option, value) =>
                                value.id === 0 || value.id === "" ||option.id === value.id
                            }                 
                            getOptionLabel={(option) =>
                            option.name ? option.name : ""
                            }
                            onChange={(event, value) =>{debugger; setdata((prevFilters) => ({...prevFilters,directedTo: value.id,directedToName:value.name})) }}
                            
                            renderInput={(params) => (
                            <TextField
                                variant="outlined"                            
                                {...params}
                                name="employeeId"
                                required                              
                                label={intl.formatMessage(Payrollmessages.directedTo)}
                                />
                            )}
                        />  
                    </Grid>
                    <Grid item xs={12}  md={2}>
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
                    <Grid item xs={12}  md={4}></Grid>           
                    <Grid item xs={12}  md={4}>                
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
                            
                        />
                    </Grid>
                    <Grid item xs={12}  md={12}>                
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
NewIdea.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(NewIdea);

