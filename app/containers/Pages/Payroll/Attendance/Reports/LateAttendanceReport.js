import React, { useEffect, useState } from "react";
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
import payrollMessages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import GeneralListApis from "../../api/GeneralListApis";
import Autocomplete from '@mui/material/Autocomplete';
import style from '../../../../../styles/styles.scss'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { toast } from "react-hot-toast";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function LateAttendanceReport(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
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
    BranchId: branchId,
    EmpStatusId: 1,
    IncludeLeavesAndShiftLeaves: false,
    type: 1
  });

  const [printFilterData, setPrintFilterData] = useState({
       FromDate: null,
       ToDate: null,
       Employee: '',
       EmpStatus: "",
       Organization: '',
       Branch: "",
     });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: printFilterData.Organization.name,
      });
    }

    if (printFilterData.Employee && printFilterData.Employee.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: printFilterData.Employee.name,
      });
    }

    if (printFilterData.EmpStatus && printFilterData.EmpStatus.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: printFilterData.Branch.name,
      });
    }

    if (printFilterData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(printFilterData.FromDate),
      });
    }

    if (printFilterData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(printFilterData.ToDate),
      });
    }

    if (Shift && Shift.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.shift),
        value: Shift.map((item) => item.name).join(' , '),
      });
    }

    if (searchData.type === 1) {
          highlights.push({
            label: intl.formatMessage(messages.details),
            value: intl.formatMessage(payrollMessages.yes)
          });
        }
    
    if (searchData.type === 2) {
      highlights.push({
        label: intl.formatMessage(messages.TotalReport),
        value: intl.formatMessage(payrollMessages.yes)
      });
    }
    
    if (searchData.type === 3) {
      highlights.push({
        label: intl.formatMessage(messages.GroupByDepartmentSection),
        value: intl.formatMessage(payrollMessages.yes)
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



    let ShiftData = ""
    if (Shift !== null) {
      // used to reformat elements data ( combobox ) before send it to api
      Shift.map((ele, index) => {
        ShiftData += `${ele.id}`
        if (index + 1 !== Shift.length) {
          ShiftData += ","
        }
      })
    }



    try {
      setIsLoading(true);
      let formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
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

      getFilterHighlights();
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

  if (searchData.type === 1) {
    columns = [
      {
        name: "shiftId",
        label: intl.formatMessage(messages.shiftCode),
      },
      {
        name: "shiftname",
        label: intl.formatMessage(messages.shift),
      },
      {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
      },
      {
        name: "jobName",
        label: intl.formatMessage(messages.job),
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
        name: "shiftDate",
        label: intl.formatMessage(messages.attendanceDate),
        options: getDateColumnOptions(
          intl.formatMessage(messages.attendanceDate),
          {
            minDateLabel: intl.formatMessage(payrollMessages.minDate),
            maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
          }
        ),
      },
      {
        name: "timeIn",
        label: intl.formatMessage(messages.signIn),
      },
      {
        name: "startTime",
        label: intl.formatMessage(messages.shiftStart),
      },
      {
        name: "lateMin",
        label: intl.formatMessage(messages.lateness),
      },
    ];

  }


  if (searchData.type === 2) {
    columns = [
      {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
      },
      {
        name: "jobName",
        label: intl.formatMessage(messages.job),
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
        name: "lateMin",
        label: intl.formatMessage(messages.lateness),
      },
      {
        name: "lateCount",
        label: intl.formatMessage(messages.LateCount),
      },
    ];
  }


  if (searchData.type === 3) {
    columns = [
      {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
      },
      {
        name: "lateMin",
        label: intl.formatMessage(messages.lateness),
      },
    ];
  }


  const openMonthDateWithCompanyChangeFun = async (BranchId, EmployeeId) => {

    let OpenMonthData

    try {
      if (!EmployeeId) {
        OpenMonthData = await GeneralListApis(locale).getOpenMonth(BranchId, 0);
      }
      else {
        OpenMonthData = await GeneralListApis(locale).getOpenMonth(0, EmployeeId);
      }


      setsearchData((prev) => ({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))

      setPrintFilterData((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))

    }
    catch (err) { }

  }


  useEffect(() => {
    if (searchData.BranchId !== "" && searchData.EmployeeId === "") {
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if (searchData.BranchId === "" && searchData.EmployeeId !== "") {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if (searchData.BranchId === "" && searchData.EmployeeId === "") {
      setsearchData((prev) => ({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))

      setPrintFilterData((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))

    }

  }, [searchData.BranchId, searchData.EmployeeId])



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
              company={searchData.BranchId}
              setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>

          <Grid item xs={12} md={1} lg={3} xl={5}></Grid>

          <Grid item xs={12} md={5.5} lg={4.5} xl={3.5}>
            <Autocomplete
              multiple
              className={`${style.AutocompleteMulSty} ${locale === "ar" ? style.AutocompleteMulStyAR : null}`}
              id="checkboxes-tags-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={ShiftList.length != 0 ? ShiftList : []}
              disableCloseOnSelect
              getOptionLabel={(option) => (
                option ? option.name : ""
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


          <Grid item md={12} lg={6} xl={5}>
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
                  checked={searchData.type === 1 ? true : false}
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
                  checked={searchData.type === 2 ? true : false}
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
                  checked={searchData.type === 3 ? true : false}
                />
              </RadioGroup>
            </FormControl>
          </Grid>



          <Grid item xs={12} >
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

LateAttendanceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(LateAttendanceReport);
