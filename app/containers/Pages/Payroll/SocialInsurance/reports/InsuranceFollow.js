import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/InsuranceReportApisData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Backdrop,
  CircularProgress,
  Box,
  Autocomplete,
  TextField,
  Tooltip
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import  InsuranceFormPopUp  from '../../Component/InsuranceFormPopUp';
import notif from 'enl-api/ui/notifMessage';


function InsuranceNotifications(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [InsuranceStatus, setInsuranceStatus] = useState("");
  const [Company, setCompany] = useState("");
  const [CompanyList, setCompanyList] = useState([]);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);


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
      let formData = {
        InsStatusId: InsuranceStatus,
        BranchId: Company,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });



      const dataApi = await ApiData(locale).GetInsuranceFollowReport(formData);
      setdata(dataApi);
    } catch (err) {

    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const Branch = await GeneralListApis(locale).GetBranchList();
      setCompanyList(Branch);
    } catch (err) {

    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "id",
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
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
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
      name: "birthDate",
      label: intl.formatMessage(messages.birthDate),
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), 'yyyy-MM-dd'),
      },
    },
    {
      name: "notes",
      label: intl.formatMessage(messages.notes),
      options: {
        filter: true,
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.BranchName),
      options: {
        filter: true,
      },
    },
    {
      name: "insNotes",
      label: intl.formatMessage(messages.HrNotes),
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
    rowsPerPageOptions: [10, 15, 50, 100],
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
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
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

        <Grid container spacing={2}>


          <Grid item xs={12} md={2}>
            <Autocomplete
              id="Company"
              name="Company"
              options={CompanyList.length != 0 ? CompanyList: []}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setCompany(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="Company"
                  label={intl.formatMessage(messages.Company)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Autocomplete
              id="InsuranceStatus"
              name="InsuranceStatus"
              options={[
                { id: null, name: "All" },
                { id: 1, name: "Join social Insuranc" },
                { id: 0, name: "Exit Insurance" },
              ]}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setInsuranceStatus(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="InsuranceStatus"
                  label={intl.formatMessage(messages.InsuranceStatus)}
                />
              )}
            />
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

    </Box>
  );
}

InsuranceNotifications.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(InsuranceNotifications);
