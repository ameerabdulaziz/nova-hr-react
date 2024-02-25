import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import PayRollLoader from "../../Component/PayRollLoader";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../api/GeneralListApis";
import style from '../../../../../styles/styles.scss'
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { toast } from "react-hot-toast";


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function AttendanceDeviceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);
  const [Shift, setShift] = useState(null);
  const [ShiftList, setShiftList] = useState([]);

  const [DateError, setDateError] = useState({});


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


    // used to reformat date before send it to api
    const dateFormatFun = (date) => {
      return  date ? format(new Date(date), "yyyy-MM-dd") : ""
    }

  const handleSearch = async (e) => {

    let ShiftData = []
    if(Shift !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    Shift.map((ele, index)=>{
        ShiftData.push(ele.id)
        })
    }

	// used to stop call api if user select wrong date
  if (Object.values(DateError).includes(true)) {  
    toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
    return;
  }

    try {
      setIsLoading(true);
      let formData = {
        FromDate: dateFormatFun(FromDate),
        ToDate: dateFormatFun(ToDate),
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).AttendanceDeviceReportApi(formData, ShiftData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }

  };

  async function fetchData() {
    try {
      const shift = await GeneralListApis(locale).GetDeviceList();

      setShiftList(shift);

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
        label: intl.formatMessage(Payrollmessages.id),
      options: {
        display: false,
      },
    },
    {
      name: "deviceName",
      label: intl.formatMessage(messages.device),
      options: {
        filter: true,
      },
    },
    {
        name: "countRecord",
        label: intl.formatMessage(messages.recordCount),
        options: {
          filter: true,
        },
      },
      {
        name: "minDate",
        label: intl.formatMessage(messages.MinDate),
        options: {
          filter: true,
          customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
        },
      },
    {
      name: "maxDate",
      label: intl.formatMessage(messages.MaxDate),
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{format(new Date(value), "yyyy-MM-dd")}</pre>),
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



  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>

                  <Grid item xs={12} md={2}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                       label={intl.formatMessage(Payrollmessages.fromdate)}
                        value={FromDate  ? dayjs(FromDate) : FromDate}
                        className={classes.field}
                          onChange={(date) => {
                            setFromDate(date)
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`FromDate`]: true
                            }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                              ...prevState,
                                [`FromDate`]: false
                            }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

                <Grid item xs={12} md={2}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                     label={intl.formatMessage(Payrollmessages.todate)}
                      value={ToDate  ? dayjs(ToDate) : ToDate}
                      className={classes.field}
                        onChange={(date) => {
                          setToDate(date)
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`ToDate`]: true
                          }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                            ...prevState,
                              [`ToDate`]: false
                          }))
                        }
                      }}
                      />
                  </LocalizationProvider>
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

AttendanceDeviceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AttendanceDeviceReport);
