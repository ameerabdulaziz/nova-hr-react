import React, { useEffect, useState,useRef } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import PayRollLoader from "../../Component/PayRollLoader";
import style from "../../../../../styles/styles.scss";
import { toast } from 'react-hot-toast';


import NameList from "../../Component/NameList";

function PeerAppraisalSetting(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);


  const [EmployeeList, setEmployeeList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);

  const [dataList, setdataList] = useState([]);




  const handleSearch = async (e) => {
    // if(Year.length !== 0)
    // {
    //     try {
    //     setIsLoading(true);
        
    //     const dataApi = await ApiData(locale).GetDataById(Year.id,Department,Employee,Month);

    //     dataApi[0].SalfEvaluation = dataApi[0].employeeEvalChoice ? [dataApi[0].employeeEvalChoice," (",dataApi[0].employeeEval,"%",")"] : null
    //     dataApi[0].ManagerEvaluation = dataApi[0].mgrEvalChoice ? [dataApi[0].mgrEvalChoice," (",dataApi[0].mgrEval,"%",")"] : null

    //     setdata(dataApi);
    //     } catch (err) {
    //     } finally {
    //     setIsLoading(false);
    //     }
    // }
    // else
    // {
    //     toast.error(intl.formatMessage(messages.YouMustToChooseYear));
    // }
  };

  async function fetchData() {
    setIsLoading(true);
    
    try {
      const empolyees = await GeneralListApis(locale).GetEmployeeList();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();

      setEmployeeList(empolyees)
      setMonthList(months)
      setYearList(years)

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);





  const handleDelete = async (e) => {
//     setdeleteprocessing(true);
//     setIsLoading(true);
//     try{
       
     
//     let response = await  ApiData(locale).DeleteAll(data);

//     if (response.status==200) 
//     {
//         toast.success(notif.saved);
//         handleReset();
//     }

    
    
// }
// catch (err) {
//     //
// } finally {
//         setdeleteprocessing(false);
//         setprocessing(false);
//         setIsLoading(false);
//     }
  }


  const handleReset = async (e) => {
    setEmployee("")
    setMonth("")
    setYear("")
    setdataList([])
  }





  return (
    <PayRollLoader isLoading={isLoading}>


      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <Grid container spacing={2}>

          <Grid item xs={12} md={3}>
            
            <Autocomplete
            id="ddlMenu"   
            isOptionEqualToValue={(option, value) => option.id === value.id}                      
            options={EmployeeList.length != 0 ? EmployeeList: []}
            getOptionLabel={(option) =>(
                option  ? option.name : ""
            )
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
                    setEmployee(value.id);
                } else {
                    setEmployee("");
                }
            }}
            renderInput={(params) => (
            <TextField
                {...params}
                name="VacationType"
                label={intl.formatMessage(messages.employeeName)}
                margin="normal" 
                className={style.fieldsSty}
                
                />
          )}
        />
      </Grid>

    

      <Grid item xs={12} md={2}>
           
           <Autocomplete
               id="ddlMenu"   
               isOptionEqualToValue={(option, value) => option.id === value.id}                      
               options={MonthList.length != 0 ? MonthList: []}
               getOptionLabel={(option) =>(
                   option  ? option.name : ""
               )
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
                       setMonth(value.id);
                   } else {
                       setMonth("");
                   }
               }}
               renderInput={(params) => (
               <TextField
                   {...params}
                   name="VacationType"
                   label={intl.formatMessage(messages.months)}
                   margin="normal" 
                   className={style.fieldsSty}
                   
                   />

               )}
               /> 
         </Grid>
          
         <Grid item xs={12} md={2}>
            
            <Autocomplete
           id="ddlMenu"   
           isOptionEqualToValue={(option, value) => option.id === value.id}                      
           options={YearList.length != 0 ? YearList: []}
           getOptionLabel={(option) =>(
               option  ? option.name : ""
           )
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
                   setYear(value);
               } else {
                   setYear("");
               }
           }}
           renderInput={(params) => (
           <TextField
               {...params}
               name="VacationType"
               label={intl.formatMessage(messages.year)}
               margin="normal" 
               className={style.fieldsSty}
               
               />
         )}
       />
     </Grid>


          <Grid item xs={12} md={2} lg={1.3}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.preview} />
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              // onClick={handleDelete}
            >
              <FormattedMessage {...Payrollmessages.delete} />
            </Button>
          </Grid>

          <Grid item xs={12} md={12}></Grid>
          
          <Grid item xs={6} md={12}>
            <NameList
              dataList={dataList}
              setdataList={setdataList}
              Key={"Employee"}
            />
          </Grid>


        </Grid>
      </PapperBlock>

    </PayRollLoader>
  );
}

PeerAppraisalSetting.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(PeerAppraisalSetting);
