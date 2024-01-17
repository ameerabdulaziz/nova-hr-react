import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/MedicalInsuranceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Tooltip,
  TextField
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import  InsuranceFormPopUp  from '../../Component/InsuranceFormPopUp';
import notif from 'enl-api/ui/notifMessage';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function MedicalInsuranceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [ToDate, setToDate] = useState(null);
  const [searchData, setsearchData] = useState({
    // FromDate: null,
    // ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });

  const [hrNotes, setHrNotes] = useState(false);
  const [rowIndexVal, setRowIndexVal] = useState("");

  const handleClickOpen = (key) => {
    setHrNotes(true)
   };
   
   const handleClose = (key) => {
    setHrNotes(false)
   };


  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      var formData = {
        ToDate: ToDate,
        EmployeeId: searchData.EmployeeId,
        EmpStatusId: searchData.EmpStatusId,
        OrganizationId: searchData.OrganizationId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).GetMedicalInsuranceReport(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };


  const columns = [
    {
      name: "id",
        label: intl.formatMessage(Payrollmessages.id),
      options: {
        display: false,
      },
    },
    {
        name: "employeeCode",
        label: intl.formatMessage(messages.EmpCode),
        options: {
          filter: true,
        },
      },
      {
        name: "employeeName",
        label: intl.formatMessage(messages.employeeName),
        options: {
          filter: true,
        },
      },
    {
      name: "hiringDate",
      label: intl.formatMessage(messages.hiringDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
      },
    },
    {
        name: "insuranceDate",
        label: intl.formatMessage(messages.insuranceDate),
        options: {
          filter: true,
          customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
        },
      },
      {
        name: "birthDate",
        label: intl.formatMessage(messages.birthDate),
        options: {
          filter: true,
          customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
        },
      },
    {
        name: "job",
        label: intl.formatMessage(messages.job),
        options: {
          filter: true,
        },
      },
      {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
        options: {
          filter: true,
        },
      },
      {
        name: "insNotes",
        label: intl.formatMessage(messages.hrNotes),
        options: {
          filter: true,
          customBodyRender: (value, tableMeta) => {
            return (
              <div >
                <Tooltip title= "Edit">
                <span 
                onClick={()=>{
                  handleClickOpen()
                  setRowIndexVal(tableMeta.rowData[0])
                }}
                  > 
                  {value} 
                  </span>
                </Tooltip>
                
              </div>
            );
          }
        },
      },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    selectableRows: "none",
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };


  const createHrNotesFun = async (hrNoteVal) => {

    try {
      let response = await ApiData(locale).save(hrNoteVal,rowIndexVal);
      if (response.status==200) {
        toast.success(notif.saved);
        setdata([]);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>

        <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label={intl.formatMessage(Payrollmessages.todate)}
                value={ToDate}
                onChange={(date) => {
                  if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                    if (!isNaN(new Date(date))) { 
                      setToDate(  date === null ? null : format(new Date(date), "yyyy-MM-dd"),)
                    } 
                    else
                    {
                      setToDate(null)
                    }
                  }
                    
                }}
                className={classes.field}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined"   />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={10}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               notShowDate={true}
            ></Search>
          </Grid>

          
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>

      <InsuranceFormPopUp  
        handleClose={()=>handleClose()}
        open={hrNotes}
        callFun={createHrNotesFun}
      />
    </PayRollLoader>
  );
}

MedicalInsuranceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(MedicalInsuranceReport);
