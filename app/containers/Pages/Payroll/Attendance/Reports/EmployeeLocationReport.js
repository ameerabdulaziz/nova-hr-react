import React, { useEffect, useState } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import GeneralListApis from "../../api/GeneralListApis";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import style from '../../../../../styles/styles.scss'
import { format } from "date-fns";

function EmployeeLocationReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [LocationList, setLocationList] = useState([]);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    FromDate: null,
    ToDate: null,
  });

  const [printFilterData, setPrintFilterData] = useState({
      FromDate: null,
      ToDate: null,
      Employee: '',
    });


  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);

  const getFilterHighlights = () => {
    
    const highlights = [];

    if (location && Object.keys(location).length > 0) {
        highlights.push({
          label: intl.formatMessage(payrollMessages.location),
          value: location.name,
        });
      }

      if (printFilterData.Employee && printFilterData.Employee.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: printFilterData.Employee.name,
      });
    }

    if (printFilterData.FromDate) {
      highlights.push({
        label: intl.formatMessage(messages.fromDate),
        value: formateDate(printFilterData.FromDate),
      });
    }

    if (printFilterData.ToDate) {
        highlights.push({
          label: intl.formatMessage(messages.toDate),
          value: formateDate(printFilterData.ToDate),
        });
      }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {


    	// used to stop call api if user select wrong date
      if (Object.values(DateError).includes(true)) {  
        toast.error(intl.formatMessage(payrollMessages.DateNotValid));
        return;
      }

    try {
      setIsLoading(true);
      let formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        LocationId: location.id ? location.id : "",
      };

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).EmployeeLocationReportData(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {        
    } finally {
      setIsLoading(false);
    }

  };

  async function fetchData() {
    try {
      const locations = await GeneralListApis(locale).GetLocationList();

      setLocationList(locations);

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
        label: intl.formatMessage(payrollMessages.id),
      options: {
        // display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: "fromDate",
      label: intl.formatMessage(payrollMessages.fromdate),
      options: {
        customBodyRender: (value) => (<pre>{value?format(new Date(value), "yyyy-MM-dd hh:mm aa"):""}</pre>),
      },
    },
    {
        name: "toDate",
        label: intl.formatMessage(payrollMessages.todate),
        options: {
            customBodyRender: (value) => (<pre>{value?format(new Date(value), "yyyy-MM-dd hh:mm aa"):""}</pre>),
          },
      },
      {
        name: "notes",
        label: intl.formatMessage(payrollMessages.notes),
      },

  ];

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={11} lg={9} xl={7}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               DateError={DateError}
               setDateError={setDateError}
               notShowCompany={true}
               notShowOrganization={true}
               notShowStatus={true}
               setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>

           <Grid item xs={12} md={1} lg={3} xl={5}></Grid>         

          <Grid item xs={12} md={5.5} lg={4.5} xl={3.5}>
            <Autocomplete
                id="ddlMenu"   
                isOptionEqualToValue={(option, value) => option.id === value.id}                   
                options={LocationList.length != 0 ? LocationList: []}
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
                        setLocation(value);
                    } else {
                        setLocation("");
                    }
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    name="LocationList"
                    label={intl.formatMessage(messages.LocationList)}
                    margin="normal" 
                    className={style.fieldsSty}
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
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

        <SimplifiedPayrollTable
          title=""
          data={data}
          columns={columns}
          filterHighlights={filterHighlights}
        />

    </PayRollLoaderInForms>
  );
}

EmployeeLocationReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(EmployeeLocationReport);
