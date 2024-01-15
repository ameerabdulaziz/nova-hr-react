import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
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
import Search from "../../Component/Search";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import style from '../../../../../styles/styles.scss'
import ApiData from "../api/AttendanceReportsData";
import PayRollLoader from "../../Component/PayRollLoader";
import { format } from "date-fns";

function EarlyLeavingReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [ShiftList, setShiftList] = useState([]);
  const [Shift, setShift] = useState(null);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName"); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleSearch = async (e) => {


    let ShiftData = []
    if(Shift !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    Shift.map((ele, index)=>{
        ShiftData.push(ele.id)
        })
    }
    

    try {
      setIsLoading(true);

      let formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      
      const dataApi = await ApiData(locale).EarlyLeavingReport(formData, ShiftData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const Shift = await GeneralListApis(locale).GetShiftList();

      setShiftList(Shift)
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
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
      options: {
        filter: true,
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
        name: "shiftDate",
        label: intl.formatMessage(messages.AttendanceDate),
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
      },
    },
    {
      name: "timeOut",
      label: intl.formatMessage(messages.outTime),
    options: {
      filter: true,
    },
  },
  {
    name: "endTime",
    label: intl.formatMessage(messages.endTime),
  options: {
    filter: true,
  },
},
{
  name: "earlyLeaveMinutes",
  label: intl.formatMessage(messages.earlyLeaveMin),
options: {
  filter: true,
},
},
    
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    selectableRows: "none",
    page: 0,
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
  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
            ></Search>
          </Grid>

          <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                          id="checkboxes-tags-demo"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={ShiftList.length != 0 ? ShiftList: []}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>(
                            option  ? option.name : ""
                        )
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setShift(value);
                          } else {
                            setShift(null);
                          }
                      }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.name}
                            </li>
                          )}
                          style={{ width: 500 }}
                          renderInput={(params) => (
                            <TextField {...params} 
                            label={intl.formatMessage(messages.shift)}
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
    </PayRollLoader>
  );
}

EarlyLeavingReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(EarlyLeavingReport);
