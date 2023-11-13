import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import GeneralListApis from "../../api/GeneralListApis";
import Autocomplete from '@mui/material/Autocomplete';
import style from '../../../../../styles/styles.scss'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function LateAttendanceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [ShiftList, setShiftList] = useState([]);
  const [Shift, setShift] = useState(null);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    IncludeLeavesAndShiftLeaves: false,
    type: 1
  });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const handleSearch = async (e) => {

    let ShiftData = ""
    if(Shift !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    Shift.map((ele, index)=>{
        ShiftData+= `${ele.id}`
        if(index + 1 !== Shift.length)
        {
            ShiftData+= ","
        }
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
        Type: searchData.type,
        ShiftCodes: ShiftData
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).LateAttendanceReportApi(formData);
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


  let columns = []

  if(searchData.type === 1)
  {
    columns = [
        {
          name: "id",
            label: intl.formatMessage(Payrollmessages.id),
          options: {
            display: false,
          },
        },
        {
            name: "shiftCode",
            label: intl.formatMessage(messages.shiftCode),
            options: {
              filter: true,
            },
          },
        {
            name: "shiftname",
            label: intl.formatMessage(messages.shift),
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
            name: "jobName",
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
          },
        },
        {
          name: "timeIn",
          label: intl.formatMessage(messages.signIn),
          options: {
            filter: true,
          },
        },  
        {
            name: "startTime",
            label: intl.formatMessage(messages.shiftStart),
            options: {
              filter: true,
            },
          }, 
          {
            name: "lateMin",
            label: intl.formatMessage(messages.lateness),
            options: {
              filter: true,
            },
          }, 
          {
            name: "branchName",
            label: intl.formatMessage(messages.branchName),
            options: {
              filter: true,
            },
          }, 
      ];
      
  }
   

  if(searchData.type === 2)
  {
    columns = [
        {
          name: "id",
            label: intl.formatMessage(Payrollmessages.id),
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
            name: "jobName",
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
            name: "lateMin",
            label: intl.formatMessage(messages.lateness),
            options: {
              filter: true,
            },
          }, 
          {
            name: "branchName",
            label: intl.formatMessage(messages.branchName),
            options: {
              filter: true,
            },
          }, 
          {
            name: "lateCount",
            label: intl.formatMessage(messages.LateCount),
            options: {
              filter: true,
            },
          }, 
        
      ];
  }


  if(searchData.type === 3)
  {
    columns = [
        {
          name: "id",
            label: intl.formatMessage(Payrollmessages.id),
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
            name: "lateMin",
            label: intl.formatMessage(messages.lateness),
            options: {
              filter: true,
            },
          },    
      ];
  }

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
            

            <Grid item md={12} lg={4}>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Sign In Only"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel 
                            value="Details"
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  type: 1,
                                }));
                                setdata([])
                              }}
                            />} 
                            label={intl.formatMessage(messages.details)}
                            checked={searchData.type === 1 ? true : false }
                        />

                        <FormControlLabel 
                            value="Total Report"
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  type: 2,
                                }));
                                setdata([])
                              }}
                            />} 
                            label={intl.formatMessage(messages.TotalReport)}
                            checked={searchData.type === 2 ? true : false }
                        />

                        <FormControlLabel 
                        value="Group By Department / Section"
                        control={
                        <Radio 
                        onChange={(evt) => {
                            setsearchData((prev) => ({
                              ...prev,
                              type: 3
                            }));
                            setdata([])
                          }}
                        />} 
                        label={intl.formatMessage(messages.GroupByDepartmentSection)}
                        checked={searchData.type === 3 ? true : false }
                        />
                    </RadioGroup>
                </FormControl>
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

LateAttendanceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(LateAttendanceReport);
