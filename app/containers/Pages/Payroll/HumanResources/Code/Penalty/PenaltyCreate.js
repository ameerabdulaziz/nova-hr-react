import React, { useState, useEffect, useCallback } from 'react';
import { PapperBlock } from 'enl-components';
import { EditTable } from '../../../../../Tables/demos';
import ApiData from '../../api/PenaltyData';
import PenaltyDetailData from '../../api/PenaltyDetailData';
import messages from '../../messages';
import Payrollmessages from '../../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Button ,Grid,TextField, Autocomplete } from "@mui/material";
import useStyles from '../../../Style';
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import SaveButton from '../../../Component/SaveButton';
import { Backdrop, CircularProgress, Box } from "@mui/material";
import SITEMAP from '../../../../../App/routes/sitemap';

function PenaltyCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);  
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation()
  const { id } = location.state??0;
  const { classes } = useStyles();
  const [data, setdata] = useState({
    "id": 0,
    "arName": "",
    "enName": "",  
    "elementId": 0,
    "elementName":"",
    "type": 1, 
    "typeName": "شهرى",          
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
      
    
      if(event.target.name =="enName")
    setdata((prevFilters) => ({
        ...prevFilters,
        enName: event.target.value,
      }));
          
  };

  async function oncancel(){
    history.push(SITEMAP.humanResources.Penalty.route);
  }
  const handleSubmit = async (e) => {
    
    e.preventDefault();   
  
    try {
      setIsLoading(true); 
      if(dataTable.length== 0) {
        toast.error("ُEnter Details data");
        return ;
      }
      let response = await  ApiData(locale).SaveData(data,dataTable);

      if (response.status==200) {
        toast.success(notif.saved);
        history.push(SITEMAP.humanResources.Penalty.route);
      } else {
          toast.error(response.statusText);
      }
    } catch (err) {
    }
    finally{
      setIsLoading(false); 
    }
  }
  const fetchData = useCallback(async () => {
    try {
    const dataApi = await ApiData(locale).GetPenalty(id??0);
    setElementList(dataApi.ElementList);
    
    setdata(dataApi.finaldata);
    }
    catch(err) {}
    finally {setIsLoading(false);}
  });
 
  useEffect(() => {    
    fetchData();
  }, []);

  return (
    <Box
    sx={{
      zIndex: 100,
      position: "relative",
    }}
  >
    <PapperBlock whiteBg icon="border_color" title={data.id==0?intl.formatMessage(messages.createPenaltyTitle):intl.formatMessage(messages.updatePenaltyTitle)} desc={""}>
          
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: 10,
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.69)",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <form onSubmit={handleSubmit}>
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
                          variant="outlined"
                          autoComplete='off'
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
                          variant="outlined"
                          autoComplete='off'
                          />
                  </Grid>
                  <Grid item xs={12} md={2}>
                        <Autocomplete  
                            id="elementId"                        
                            options={ElementList}  
                            value={{id:data.elementId,name:data.elementName}}  
                            isOptionEqualToValue={(option, value) =>
                              value.id === 0 || value.id === "" ||option.id === value.id
                            }                      
                            getOptionLabel={(option) =>
                              option.name ? option.name : ""
                            }
                            onChange={(event, value) => {                                
                                setdata((prevFilters) => ({
                                ...prevFilters,
                                elementId:value !== null?value.id:0,
                                elementName:value !== null?value.name:""
                              }));                
                            }}
                            renderInput={(params) => (
                            <TextField
                                variant="outlined"                            
                                {...params}
                                name="element"    
                                required                          
                                label={intl.formatMessage(messages.elementName)}
                                />
                            )}
                        />  
                  </Grid>
                  <Grid item xs={12} md={2}>
                        <Autocomplete  
                            id="typelist"                        
                            options={[{"id":1,"name":"شهرى"},{"id":2,"name":"نصف سنوى"},{"id":3,"name":"سنوى"},{"id":4,"name":"من تاريخ التعيين"}]}  
                            value={{id:data.type,name:data.typeName}}
                            isOptionEqualToValue={(option, value) =>
                              value.id === 0 || value.id === "" ||option.id === value.id
                            }  
                            getOptionLabel={(option) =>
                              option.name ? option.name : ""
                            }
                            onChange={(event, value) => {
                                      setdata((prevFilters) => ({
                                      ...prevFilters,
                                      type:value !== null?value.id:1,
                                      typeName:value !== null?value.name:"شهرى",
                                    }));                 
                            }}
                            renderInput={(params) => (
                            <TextField
                                variant="outlined"                            
                                {...params}
                                name="typelist"                              
                                label={intl.formatMessage(messages.type)}
                                />
                            )}
                        />  
                  </Grid>
                  <Grid item xs={12} md={1}>
                      <SaveButton Id={id} />
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <Button variant="contained" size="medium" color="primary" onClick={oncancel} >
                       <FormattedMessage {...Payrollmessages.cancel} /> 
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
          </form>
        </PapperBlock>
    
    </Box>
  );
}
PenaltyCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PenaltyCreate);

