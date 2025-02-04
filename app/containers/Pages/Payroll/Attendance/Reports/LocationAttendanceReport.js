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
import PayRollLoader from "../../Component/PayRollLoader";
import GeneralListApis from "../../api/GeneralListApis";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import style from '../../../../../styles/styles.scss'
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { format } from "date-fns";

function LocationAttendanceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [LocationList, setLocationList] = useState([]);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    FromDate: null,
    ToDate: null,
  });


  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);


    if (location && location.length > 0) {
        highlights.push({
          label: intl.formatMessage(payrollMessages.location),
          value: location.map((item) => item.name).join(' , '),
        });
      }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (searchData.FromDate) {
      highlights.push({
        label: intl.formatMessage(messages.fromDate),
        value: formateDate(searchData.FromDate),
      });
    }

    if (searchData.ToDate) {
        highlights.push({
          label: intl.formatMessage(messages.toDate),
          value: formateDate(searchData.ToDate),
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

      let locationData = []
    if(location !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    location.map((ele, index)=>{
        locationData.push(ele.id)
        })
    }


    try {
      setIsLoading(true);
      let formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
      };

      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).getLocationAttendenceData(formData,locationData);
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

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

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
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
    },
    {
        name: "employeeCode",
        label: intl.formatMessage(messages.EmpCode),
      },
      {
        name: "employeeName",
        label: intl.formatMessage(messages.employeeName),
      },
    {
      name: "transactionDate",
      label: intl.formatMessage(payrollMessages.date),
      options: {
        customBodyRender: (value) => (<pre>{value?format(new Date(value), "yyyy-MM-dd hh:mm aa"):""}</pre>),
      },
    },
    {
      name: "locationName",
      label: intl.formatMessage(messages.locationName),
    },
    {
      name: "locAddress",
      label: intl.formatMessage(messages.Address),
    },
    {
      name: "distance",
      label: intl.formatMessage(messages.Distance),
    },

  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               DateError={DateError}
               setDateError={setDateError}
               notShowCompany={true}
               notShowOrganization={true}
               notShowStatus={true}
            ></Search>
          </Grid>

          <Grid item xs={12} md={4}>
                <Autocomplete
                      multiple  
                      className={`${style.AutocompleteMulSty} ${locale !== "en" ?  style.AutocompleteMulStyAR : null}`}
                      id="checkboxes-tags-demo"
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      options={LocationList.length != 0 ? LocationList: []}
                      disableCloseOnSelect
                      getOptionLabel={(option) =>(
                        option  ? option.name : ""
                    )
                    }
                    onChange={(event, value) => {
                      if (value !== null) {
                        setLocation(value);
                      } else {
                        setLocation(null);
                      }
                  }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props} key={option.id}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField {...params} 
                        label={intl.formatMessage(messages.LocationList)}
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

    </PayRollLoader>
  );
}

LocationAttendanceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(LocationAttendanceReport);
