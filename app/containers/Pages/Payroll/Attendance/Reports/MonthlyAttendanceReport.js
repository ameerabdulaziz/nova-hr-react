import React, { useEffect, useState } from "react";
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
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";

function MonthlyAttendanceReport(props) {
  const { intl } = props;
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
  ]);

  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    vacnamechk: false,
  });


  const [DateError, setDateError] = useState({});


  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
      return  date ? format(new Date(date), "yyyy-MM-dd") : ""
   }
  



  const handleSearch = async (e) => {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }



    let subDate = Math.abs(new Date( searchData.ToDate ) - new Date( searchData.FromDate ) )  /(1000 * 3600 * 24) + 1
    if(searchData.FromDate !== null && searchData.ToDate !== null && subDate <= 30)
    {
        let columnsArr = []

    try {
      setIsLoading(true);
      let formData = {
        FromDate: dateFormatFun(searchData.FromDate),
        ToDate: dateFormatFun(searchData.ToDate),
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
          } 
          : col === "employeeCode" ? 
          {
            name: col,
            label: intl.formatMessage(messages.EmpCode),
          }
          :  col === "employeeName" ? 
          {
            name: "employeeName",
            label: intl.formatMessage(messages.employeeName),
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

      
          <Grid item md={3} lg={2}>
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

        <PayrollTable
          title=""
          data={data}
          columns={columns}
        />
    </PayRollLoader>
  );
}

MonthlyAttendanceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(MonthlyAttendanceReport);
