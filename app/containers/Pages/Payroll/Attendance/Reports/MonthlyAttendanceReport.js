import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";

function MonthlyAttendanceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [ShiftList, setShiftList] = useState([]);
  const [Shift, setShift] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [columns, setColumns] = useState([
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
  ]);

  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    vacnamechk: false,
  });



  const handleSearch = async (e) => {
    if(searchData.FromDate !== null && searchData.ToDate !== null )
    {
        let columnsArr = []

    try {
      setIsLoading(true);
      let formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        shiftcode:  Shift,
        vacnamechk: searchData.vacnamechk ? true: "",
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).MonthlyAttendanceReport(formData);
      setdata(dataApi);


   Object.keys( dataApi[0]).map((col)=>{
 
    if(col !== "employeeId")
    {
    columnsArr.push(
        col === "organizationName" ? 
        {
            name: col,
            label: intl.formatMessage(messages.orgName),
            options: {
              filter: true,
            },
          } 
          : col === "employeeCode" ? 
          {
            name: col,
            label: intl.formatMessage(messages.EmpCode),
            options: {
              filter: true,
            },
          }
          :  col === "employeeName" ? 
          {
            name: "employeeName",
            label: intl.formatMessage(messages.employeeName),
            options: {
              filter: true,
            },
          }
          :
          {
            label: col,
            name: col,
            filter: true,
            options: {
            }
          },
      )
    }
        
    })

    setColumns(columnsArr)

   

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.dateWithPeriodErrorMes));
    }

  };



  async function fetchData() {
    try {
      const shift = await GeneralListApis(locale).GetShiftList();

      setShiftList(shift);

    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);



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

          <Grid item xs={12} md={2}>
            <Autocomplete
              id="shift"
              name="shift"
              options={ShiftList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setShift(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="shift"
                  label={intl.formatMessage(messages.shift)}
                />
              )}
            />
          </Grid>

      
          <Grid item md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.vacnamechk}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            vacnamechk: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.showVacationName)}
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

MonthlyAttendanceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(MonthlyAttendanceReport);
