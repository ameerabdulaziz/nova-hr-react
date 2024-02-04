import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PapperBlock } from 'enl-components';
import { injectIntl } from 'react-intl';
import MUIDataTable from 'mui-datatables';
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
  const [fileApiLock, setFileApiLock] = useState(false);
  const Title = localStorage.getItem("MenuName");  
  let columns = []
  const [processing, setprocessing] = useState(false);
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

                rows.map(item => (
                    setCols(Object.keys(item))
                ))
              
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
        return val[key] == null || val[key] == "";
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
        setprocessing(true); 
        setIsLoading(false);
          let response = await  ApiData(locale).SaveList(jsonFileData,VacationType);
  
          if (response.status==200) {
            toast.success(notif.saved);
            resetDataFun();
          }
  
          setprocessing(false);
        } catch (err) {
          //
        } finally {
          setprocessing(false);
          setIsLoading(false);
        }
  }
    
}

   columns =  cols.length !== 0?
   cols.map(item => (
    {
       name: item,
       label: item,
       options: {
         filter: true
       }
    }
   )) 


  // [
  //   {
  //     name: "اسم الموظف",
  //     label: "Employee Name",
  //     // label: intl.formatMessage(messages.id),
  //     options: {
  //       display: true
  //     }
  //   },
  //   {
  //     name: 'من يوم',
  //     label: "From",
  //     // label: intl.formatMessage(messages.arName),
  //     options: {
  //       filter: true
  //     }
  //   },
  //   {
  //       name: 'الى يوم',
  //       label: "To",
  //       // label: intl.formatMessage(messages.enName),
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'اسم الاجازة',
  //       label: "Vacation name",
  //       // label: intl.formatMessage(messages.parentNameOrg),
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'كود الاجازة',
  //       label: "Vacation code",
  //       // label: intl.formatMessage(messages.empName),
  //       options: {
  //         filter: true
  //       }
  //     },
  //     {
  //       name: 'ملاحظات',
  //       label: "Notes",
  //       // label: intl.formatMessage(messages.manPower),
  //       options: {
  //         filter: true
  //       }
  //     }
  // ]
   
   
   
   : []
   

  


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
        <div className={`${classes.root} ${classes2.btnsContainer}`}  >
        
        <Toolbar className={classes.toolbar} style={ locale === "ar" ? {justifyContent: "flex-start"} : {justifyContent: "end"}}>

        <div className={`${classes.title} `} style={{width: "100%"}}>

        <Grid item xs={12} md={12}
                        container
                        spacing={3}
                        direction="row"
                        className={`${classes2.itemsStyle}   ${locale === "en" ? classes2.btnsStyle : classes2.btnsStyleAr} `}
                        >

          <Grid item xs={12}   lg={4}>
            <div className={classes.actions}>     
            <Autocomplete
              id="ddlMenu"
              className={`${classes2.comboBoxSty} ${classes2.comboBoxSty2}`}
              options={LeavesList}
              // options={topFilms}
              sx={{ width: "300px", paddingTop: "0px" }}
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
                  margin="normal"
                />
              )}
            />
          </div>

        </Grid>

      <Grid item xs={12} md={6} lg={2}>
            <div className={classes.actions}>     
              <Tooltip title="Download">             
              <a 
                href={`${ServerURL}Doc/ExcelForm/VacBalanceForm.xlsx`} 
                target="_blank" rel="noreferrer"  
                download>
                  <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                   <FormattedMessage {...Payrollmessages.Download} /> 
                </Button>
              </a>

              </Tooltip>
          </div>

        </Grid>

        <Grid item xs={12} md={6} lg={2}>
            <div className={classes.actions}>     
            <Tooltip title="Import">

            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
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
            </div>
</Grid>

<Grid item  xs={12} md={6} lg={2}>
            <div className={classes.actions}>     
              <Tooltip title="Reset">             
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={resetDataFun}
                >
                    <FormattedMessage {...Payrollmessages.reset} /> 
                </Button>
              </Tooltip>
          </div>

        </Grid>

        <Grid item xs={12} md={6} lg={2}>

            <div className={classes.actions}>     
              <Tooltip title="Import Excel File To Can Submit">              
                <span>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={submitFun}
                  disabled={fileData.length !== 0 && VacationType !== null && !processing ? false : true}
                >
                  {processing && (
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                            )}
                    <FormattedMessage {...Payrollmessages.save} /> 
                  
                </Button>
                </span>
              </Tooltip>
          </div>

        </Grid>

        </Grid>
        </div>
      </Toolbar>

        {fileData.length !== 0 && (

            // <div className={`${classes2.ImportTableContainer}  ${locale === "ar" ? classes2.tableContainerStyAr : ''}`}>
                    <PayrollTable
                    title={fileTitle}
                    data={fileData}
                    columns={columns}
                    />
        )}
          
        </div>
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(ImportLeaveBalance);
