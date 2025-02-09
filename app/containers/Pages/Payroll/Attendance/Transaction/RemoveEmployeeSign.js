import React, { useEffect, useState } from "react";
import css from "enl-styles/Table.scss";
import ApiData from "../api/RemoveEmployeeSignData";
import { useSelector } from "react-redux";
import { Button, Grid, TextField, Autocomplete, Checkbox,Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, } from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import style from "../../../../../styles/styles.scss";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { toast } from "react-hot-toast";
import GeneralListApis from "../../api/GeneralListApis";

function RemoveEmployeeSign(props) {
  const { intl } = props;
  const { classes,cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [Device, setDevice] = useState("");
  const [Deleted, setDeleted] = useState("");
  const [DeviceList, setDeviceList] = useState([]);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    FromDate: new Date(),
    ToDate: new Date(),
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [DateError, setDateError] = useState({});


  // used to reformat date before send it to api
  const dateFormatFun = (date) => {
      return  date ? format(new Date(date), "yyyy-MM-dd") : ""
   }

  
  const handlepermcheckboxAll = (event) => {
    setdata(
      data.map((x) => {
        x.isSelected = event.target.checked;
        return x;
      })
    );
  };

  const handleEnableOne = (event, row) => {
    setdata(
      data.map((x) => {
        if (x.id == row.id) {
          if (event.target.name == "isselected") {
            x.isSelected = event.target.checked;
          } else if (event.target.name == "notes") {
            x.notes = event.target.value
          }
          else if (event.target.name == "isDeleted") {
            x.isDeleted = event.target.checked
          }
          
        }
        return x;
      })
    );
  };


  const handleSearch = async (e) => {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }


    try {
       
      setIsLoading(true);
      let DeviceData = ""
    if(Device !== "")
    {
        
        Device.map((ele, index)=>{
            DeviceData+= `${ele.id}`
        if(index + 1 !== Device.length)
        {
            DeviceData+= ","
        }
      })
    }

      var formData = {
        FromDate: dateFormatFun(searchData.FromDate),
        ToDate: dateFormatFun(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        DevNo: DeviceData,
        DelRec: Deleted,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).GetList(formData);
      setdata(
        dataApi.map((obj) => {
          return {
            ...obj,
            isSelected: false,
          };
        })
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function on_submit() {
    var list = data.filter((row) => row.isSelected==true);
    if (list.length== 0) {
      toast.error("Please Select data first");
      return;
    }
    try {
      setIsLoading(true);
      let response = await ApiData().DeleteList(data.filter((row) => row.isSelected==true));

      if (response.status == 200) {
        toast.success(notif.saved);
        GetList();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchData() {
    try {
      const devices = await GeneralListApis
      (locale).GetDeviceList();
      setDeviceList(devices);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={10} xl={8}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              DateError={DateError}
              setDateError={setDateError}
            ></Search>
          </Grid>

          <Grid item xs={12} xl={4}></Grid>

          <Grid item xs={12}  lg={5} xl={4}>
            <Autocomplete
              multiple
              className={`${style.AutocompleteMulSty} ${
                locale === "ar" ? style.AutocompleteMulStyAR : null
              }`}
              id="checkboxes-tags-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={DeviceList.length != 0 ? DeviceList : []}
              disableCloseOnSelect
              getOptionLabel={(option) => (option ? option.name : "")}
              onChange={(event, value) => {
                if (value !== null) {
                  setDevice(value);
                } else {
                  setDevice(null);
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
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.device)}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={3} xl={2}>
            <Autocomplete
              id="DeleteList"
              options={[
                { id: null, name: "All" },
                { id: true, name: "Deleted" },
                { id: false, name: "Not Deleted" },
              ]}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) =>
                setDeleted(
                  value === null ? "" : value.id == null ? "" : value.id
                )
              }
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="DeleteList"
                  label={intl.formatMessage(Payrollmessages.delete)}
                />
              )}
            />
          </Grid>

         <Grid item xs={12}>
          <Grid container spacing={3}>
          <Grid item >
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>

          <Grid item >
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={on_submit}
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>            
          </Grid>
         </Grid>



          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>
      <div className={classes.rootTable}>
            <Table
              className={cx(css.tableCrud, classes.table, classes.stripped)}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "5px", padding: "0px",textAlign:"center"  }}>
                    <Checkbox
                      checked={
                        data.length > 0 &&
                        data.filter((crow) => crow.isSelected == true)
                          .length === data.length
                          ? true
                          : false
                      }
                      color="primary"
                      name="AllSelect"
                      indeterminate={
                        data.filter((crow) => crow.isSelected == true)
                          .length > 0 &&
                        data.filter((crow) => crow.isSelected == true)
                          .length < data.length
                          ? true
                          : false
                      }
                      onChange={handlepermcheckboxAll}
                    />
                  </TableCell>
                  <TableCell style={{ width: "5px", padding: "0px",textAlign:"center" }}>
                    <FormattedMessage {...Payrollmessages.id} />
                  </TableCell>
                  <TableCell style={{ width: "20px", padding: "0px",textAlign:"center" }}>
                    <FormattedMessage {...Payrollmessages.organizationName} />
                  </TableCell>
                  <TableCell style={{ width: "10px", padding: "0px",textAlign:"center" }}>
                    <FormattedMessage {...Payrollmessages.employeeId} />
                  </TableCell>
                  <TableCell style={{ width: "20px", padding: "0px",textAlign:"center" }}>
                    <FormattedMessage {...Payrollmessages.employeeName} />
                  </TableCell>
                  <TableCell style={{ width: "15px", padding: "0px",textAlign:"center" }}>
                    <FormattedMessage {...messages.device} />
                  </TableCell> 
                  <TableCell style={{ width: "15px", padding: "0px",textAlign:"center" }}>
                    <FormattedMessage {...Payrollmessages.date} />
                  </TableCell> 
                  <TableCell style={{ width: "5px", padding: "0px",textAlign:"center" }}>
                    <FormattedMessage {...Payrollmessages.delete} />
                  </TableCell>                  
                  <TableCell style={{ width: "25px", padding: "0px",textAlign:"center" }}>
                    <FormattedMessage {...Payrollmessages.notes} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length !== 0 &&
                  data.map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.id}
                        sx={{ height: 1 }}
                        style={{ padding: "0px" }}
                      >
                        <TableCell style={{ width: "5px", padding: "0px",textAlign:"center" }}>
                          <Checkbox
                            checked={row.isSelected}
                            color="primary"
                            name="isselected"
                            onChange={(event) => handleEnableOne(event, row)}
                            value={row.isSelected}
                          />
                        </TableCell>
                        <TableCell style={{ width: "5px", padding: "0px",textAlign:"center" }}>
                          {row.id}
                        </TableCell>
                        <TableCell style={{ width: "20px", padding: "0px",textAlign:"center" }}>
                          {row.organizationName}
                        </TableCell>
                        <TableCell style={{ width: "10px", padding: "0px",textAlign:"center" }}>
                          {row.employeeId}
                        </TableCell>
                        <TableCell style={{ width: "20px", padding: "0px",textAlign:"center" }}>
                          {row.employeeName}
                        </TableCell>                       
                        <TableCell style={{ width: "15px", padding: "0px",textAlign:"center" }}>
                          {row.devName}
                        </TableCell>
                        <TableCell style={{ width: "15px", padding: "0px" ,textAlign:"center"}}>
                          {format(new Date(row.trxDateTime2), "yyyy-MM-dd HH:mm:ss")}
                        </TableCell>
                        
                        <TableCell style={{ width: "5px", padding: "0px",textAlign:"center" }}>
                          <input
                            name="isDeleted"
                            type="checkbox"
                            checked={row.isDeleted}
                            onChange={(event) => handleEnableOne(event, row)}
                          ></input>
                        </TableCell>
                        <TableCell style={{ width: "25px", padding: "0px",textAlign:"center" }}>
                          <input
                            name="notes"
                            type="text"
                            value={row.notes??""}
                            onChange={(event) => handleEnableOne(event, row)}
                          ></input>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
    </PayRollLoaderInForms>
  );
}

RemoveEmployeeSign.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(RemoveEmployeeSign);
