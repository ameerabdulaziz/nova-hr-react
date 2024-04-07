import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import {  FormattedMessage } from 'react-intl';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import useStyles from '../../Style';
import { useSelector } from 'react-redux';
import classes2 from '../../../../../styles/styles.scss';
import ApiData from '../api/ImportLeaveBalanceData';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { read, utils } from 'xlsx';
import { Link } from "react-router-dom";
import {ServerURL} from '../../api/ServerConfig';
import { format } from "date-fns";
import Payrollmessages from '../../messages';
import CircularProgress from '@mui/material/CircularProgress';
import { object } from 'prop-types';
import messages from '../messages';
import {Grid} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { async } from '@dabeng/react-orgchart';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';



function ImportLeaveBalance({intl }) {
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const locale = useSelector(state => state.language.locale);
  const [cols, setCols] = useState("");
  const [fileData, setFileData] = useState([]);
  const [jsonFileData, setJsonFileData] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");
  const Title = localStorage.getItem("MenuName");  
  let columns = []
  const [VacationType, setVacationType] = useState(null);
  const [LeavesList, setLeavesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  

  const handleImport = ($event) => {
   
    const files = $event.target.files;
    let jsonData = []
    let obj= {}

    
    if (files.length) {
     
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;
            
            if (sheets.length) {
             
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {raw: false});
               if(rows.length !== 0)
               {
              
                // the below code used to recustomize the file data before send it to Api
              

                  rows.map((items)=>(

                  obj= {},
                  Object.keys(items).map((item, index) => {

                    

                    if(index === 0 && items[item].length !== 0)
                    {
                      
                      obj.employeeId = Number(items[item])
                    }

                    if(index === 2 && items[item].length !== 0)
                    {
                      obj.currentBalance   = parseFloat(items[item])
                    }

                    if(index === 3 && items[item].length !== 0 &&  items[item].length !== 0 )
                    {
                      obj.oldBal  = parseFloat(items[item])
                    }

                    if(index === 4 && items[item].length !== 0 && items[item].length !== 0 )
                    {
                      obj.postedBal  = parseFloat(items[item])
                    }

                  }),

                  jsonData.push(obj)

                ))

                }
              else
              {
                toast.error( intl.formatMessage(messages.FileIsEmpty) );
              }

                setJsonFileData(jsonData)
                setFileData(rows)

                console.log("rows =", rows);

                setCols(Object.keys(rows[0]).map(item => (
                  {
                     name: item,
                     label: item,
                     options: {
                       filter: true
                     }
                  }
                 )) )

                // rows.map(item => (
                //     setCols(Object.keys(item))
                // ))
              
            }
        }
        reader.readAsArrayBuffer(file);
        setFileTitle(file.name.split(".")[0])

        
    }
}
const resetDataFun = () => {
  setFileData([])
  setJsonFileData([])
  setFileTitle("")
  setCols("")
  setFile("")
  setVacationType(null)
}

const submitFun = async (e) => {
let lock = true

    // used to check if file has empty cells
    jsonFileData.forEach( async (val, index) => {
        if (
          Object.keys(val).some((key) => {
            return val[key] === null || val[key] === "";
          })
        )
        {
          lock = false
          toast.error(`There is missed values in row number ${index + 1} in the file`);
        }
      });


      if(lock)
      {
      try{
            setIsLoading(true);
              let response = await  ApiData(locale).SaveList(jsonFileData,VacationType);
      
              if (response.status==200) {
                toast.success(notif.saved);
                resetDataFun();
              }
      
            } catch (err) {
              //
            } finally {
              setIsLoading(false);
            }
      }
}

  const getVacTypeList = async () => {
    try {
      setIsLoading(true);
      const Leaves = await GeneralListApis(locale).GetVacList(true);
      setLeavesList(Leaves);
    } catch (error) {
      // 
    } finally {
      setIsLoading(false);
    }
  }

  useEffect( ()=>{
    getVacTypeList()
  },[])

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid
            container
            spacing={3}
            mt={0}
            direction="row">
              <Grid item md={4} >
                <Autocomplete
                  id="ddlMenu"
                  options={LeavesList}
                  value={LeavesList.find((item)=> item.id === VacationType) ?? null}
                  // options={topFilms}
                  getOptionLabel={(option) =>
                    option.name || ""
                    // option ? option.name : ""
                    // option ? option.title : ""
                    // locale=="en"?option.enName:option.arName
                  }
                  renderOption={(props, option) => {
                    
                    return (
                      <li {...props} key={option.id}>
                        {option.name}
                      </li>
                    );
                  }}
                  onChange={(event, value) => {
                    if (value !== null) {
                      setVacationType(value.id);
                    } else {
                      setVacationType(null);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="LeaveType"
                      label= {intl.formatMessage(messages.LeaveType)}
                    />
                  )}
                />
              </Grid>

              <Grid item >
                  <Tooltip title="Download">             
                  <a 
                    href={`${ServerURL}Doc/ExcelForm/VacBalanceForm.xlsx`} 
                    target="_blank" rel="noreferrer"  
                    download>
                      <Button
                      variant="contained"
                      color="secondary"
                    >
                      <FormattedMessage {...Payrollmessages.Download} /> 
                    </Button>
                  </a>

                  </Tooltip>

              </Grid>

              <Grid item >
                  <Tooltip title="Import">
                    <Button
                        variant="contained"
                        color="secondary"
                        component="label"
                    >
                        <AddIcon
                        className={cx(smUp && classes.leftIcon, classes.iconSmall)}
                        />
                        <FormattedMessage {...Payrollmessages.Import} /> 
                        
                        <input 
                        hidden 
                        value={file}
                        type="file" 
                        name="file" 
                        className="custom-file-input" 
                        id="inputGroupFile" 
                        onChange={handleImport}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                    </Button>
                  </Tooltip>
              </Grid>

              <Grid item  >
                    <Tooltip title="Reset">             
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={resetDataFun}
                      >
                          <FormattedMessage {...Payrollmessages.reset} /> 
                      </Button>
                    </Tooltip>
              </Grid>

              <Grid item >
                    <Tooltip title="Import Excel File To Can Submit">              
                      <span>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={submitFun}
                          disabled={fileData.length !== 0 && VacationType !== null ? false : true}
                        >
                            <FormattedMessage {...Payrollmessages.save} /> 
                        </Button>
                      </span>
                    </Tooltip>
              </Grid>
        </Grid>

      </PapperBlock>

        {fileData.length !== 0 && (
          <PayrollTable
          title={fileTitle}
          data={fileData}
          columns={cols}
          />
        )}
          
    </PayRollLoader>
  );
}

export default injectIntl(ImportLeaveBalance);
