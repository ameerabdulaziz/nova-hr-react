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
import ApiData from '../api/ImportVacationsData';
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



function ImportVacations({intl }) {
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

  const handleImport = ($event) => {
   
    const files = $event.target.files;
    let jsonData = []
    let obj= {}
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    
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
              obj.trxDate =  format(new Date(), "yyyy-MM-dd")

                  rows.map((items)=>(

                  obj= {},
                  Object.keys(items).map((item, index) => {

                    if(index === 5 && items[item].length !== 0)
                    {
                      obj.VacCode = Number(items[item])
                    }

                    if(index === 0 && items[item].length !== 0)
                    {
                      obj.employeeId = Number(items[item])
                    }

                    if(index === 2 && items[item].length !== 0 && regex.test(items[item]))
                    {
                      obj.fromdate = items[item]
                    }

                    if(index === 3 && items[item].length !== 0 && regex.test(items[item]))
                    {
                      obj.todate = items[item]
                    }

                    if(index === 4 && items[item].length !== 0)
                    {
                      obj.vacationName = items[item]
                    }

                    if(index === 6 && items[item].length !== 0)
                    {
                      obj.notes = items[item]
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
          let response = await  ApiData(locale).SaveList(jsonFileData);
  
          if (response.status==200) {
            toast.success(response.data , {duration: 8000});
            resetDataFun();
          } else {
              toast.error(response.statusText);
          }
  
          setprocessing(false);
        } catch (err) {
          setprocessing(false);
          toast.error(err.response.data);
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
   

  
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
    selectableRowsHeader: false,
    selectableRows: "none"
  };


  return (
    <div>
      
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
      <Grid item xs={12} sm={6}  md={2}>
            <div className={classes.actions}>     
              <Tooltip title="Download">             
              <a 
                href={`${ServerURL}Doc/ExcelForm/VacForm.xlsx`} 
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

        <Grid item xs={12} sm={6}  md={2}>
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

<Grid item  xs={12} sm={6} md={2}>
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

        <Grid item xs={12} sm={6}  md={2}>

            <div className={classes.actions}>     
              <Tooltip title="Import Excel File To Can Submit">              
                <span>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={submitFun}
                  disabled={fileData.length !== 0 && !processing ? false : true}
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

            <div className={`${classes2.ImportTableContainer}  ${locale === "ar" ? classes2.tableContainerStyAr : ''}`}>
                    <MUIDataTable
                    title={fileTitle}
                    data={fileData}
                    columns={columns}
                    options={options}
                    className={classes2.tableSty}
                    />
            </div>
        )}
          
        </div>
      </PapperBlock>
    </div>
  );
}

export default injectIntl(ImportVacations);
