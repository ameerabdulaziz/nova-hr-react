import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import { EditTable } from '../../../../Tables/demos';
import ApiData from '../api/PenaltyData';
import PenaltyDetailData from '../api/PenaltyDetailData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useParams ,useHistory } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField, Autocomplete ,Typography,Paper} from "@mui/material";
import useStyles from '../../Style';
import PropTypes from 'prop-types';



function CreatePenalty(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  let { id } = useParams();
  const { classes } = useStyles();
  const [data, setdata] = useState({
    "id": 0,
    "arName": "",
    "enName": "",  
    "elementId": 0,
    "elementName":"",
    "type": 1,          
    "penaltyDetailsList":[]
  });
  const [ElementList, setElementList] = useState([]);
  const history=useHistory();  
  const anchorTable= [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'name',
      label: 'name',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: true,
    },
   
    {
      name: 'PenaltyTypeName',
      label: 'PenaltyTypeName',
      type: 'selection',
      initialValue: '',
      options: [],
      width: 'auto',
      hidden: false,
    },
    {
      name: 'PenaltyTypeId',
      label: 'id',
      type: 'number',
      initialValue: '0',
      width: 'auto',
      hidden: true,
    },    
      
    {
    name: 'PenaltyValue',
    label: 'PenaltyValue',
    type: 'number',
    initialValue: '',
    width: 'auto',
    hidden: false,
    },
    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
    {
      name: 'index',
      label: 'index',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
  ];
  
  const dataTable = useSelector(state => state.crudTableDemo.dataTable);
  
  const handleChange = (event) => {
    if(event.target.name =="arName")
    setdata((prevFilters) => ({
        ...prevFilters,
        arName: event.target.value,
      }));
      debugger;
    
      if(event.target.name =="enName")
    setdata((prevFilters) => ({
        ...prevFilters,
        enName: event.target.value,
      }));
          
  };

async function on_submit() {
  
    try {
      if(dataTable.length== 0) {
        toast.error("ُEnter Details data");
        return ;
      }
      let response = await  ApiData(locale).SaveData(data,dataTable);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/Penalty`);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(notif.error);
    }
  }

  async function fetchData() {
    debugger ;
    const dataApi = await ApiData(locale).GetPenalty(id??0);
    setElementList(dataApi.ElementList);
    debugger ;
    setdata(dataApi.finaldata);
  }
  useEffect(() => {    
    fetchData();
  }, []);

  return (
    <div>
        <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.createPenaltyTitle):intl.formatMessage(messages.updatePenaltyTitle)} desc={""}>
            <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row">
            
                <Grid item xs={12} md={3}>
                    
                        <TextField
                        id="arName"
                        name="arName"
                        value={data.arName}
                        onChange={(e) => handleChange(e)}                 
                        label={intl.formatMessage(messages.arName)}
                        required
                        className={classes.field}
                        variant="standard"
                        />
                </Grid>
                <Grid item xs={12} md={3}>
                    
                        <TextField
                        id="enName"
                        name="enName"
                        value={data.enName}
                        onChange={(e) => handleChange(e)}                        
                        label={intl.formatMessage(messages.enName)}
                        required
                        className={classes.field}
                        variant="standard"
                        />
                </Grid>
                <Grid item xs={12} md={3}>
                      <Autocomplete  
                          id="elementId"                        
                          options={ElementList}  
                          value={{id:data.elementId,name:data.elementName}}                      
                          getOptionLabel={(option) =>
                            option.name ? option.name : ""
                          }
                          onChange={(event, value) => {

                            debugger ;
                              if (value !== null) {
                                    setdata((prevFilters) => ({
                                    ...prevFilters,
                                    elementId:value.id,
                                    elementName:value.name
                                  }));     
                              } else {
                                setdata((prevFilters) => ({
                                  ...prevFilters,
                                  elementId:0,
                                  elementName:""
                                })); 
                              }                               
                          }}
                          renderInput={(params) => (
                          <TextField
                              variant="standard"                            
                              {...params}
                              name="element"                              
                              label={intl.formatMessage(messages.elementName)}
                               />
                          )}
                      />  
                </Grid>
                <Grid item xs={12} md={2}>
                  
                    <Button variant="contained" size="medium" color="primary" onClick={on_submit} style={{marginTop: '20px'}}>
                       <FormattedMessage {...Payrollmessages.save} /> 
                    </Button>
                </Grid>
                

            </Grid>
            <div className={classes.root}>
            {
                <EditTable
                anchorTable={anchorTable}
                title={""}
                API={PenaltyDetailData(locale,id)}
                IsNotSave={true}
                />
            }
            </div>
            
        </PapperBlock>
    
    </div>
  );
}
CreatePenalty.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(CreatePenalty);

