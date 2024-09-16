import React, { useEffect, useState } from "react";
import ApiData from "../../api/MissionTrxData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import messages from "../../messages";
import payrollMessages from "../../../messages";
import GeneralListApis from "../../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../../Component/Search";
import PayRollLoader from "../../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import { formateDate } from "../../../helpers";
import { format } from "date-fns";
import useStyles from "../../../Style";
import css from "enl-styles/Table.scss";
import notif from "enl-api/ui/notifMessage";
import style from '../../../../../../styles/styles.scss';

function MissionTransportaion(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataList, setdataList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
  });

  const [DateError, setDateError] = useState({});

  const handleEnableOne = (event, row) => {
    setdataList(
      dataList.map((x) => {
        if (x.id == row.id) {
          if (event.target.name == "transportationExpenses") {
            x.transportationExpenses = event.target.value
              ? parseInt(event.target.value)
              : 0;
          }
          if (event.target.name == "currency") {
            x.currencyId = event.target.value
              ? parseInt(event.target.value)
              : null;
          }
        }
        return x;
      })
    );
  };

  const handleSave = async (id, currencyId, transportationExpenses) => {
    try {
      debugger;
      setIsLoading(true);
      var data = {
        id: id,
        currencyId: currencyId,
        transportationExpenses: transportationExpenses,
      };

      const response = await ApiData(locale).UpdateTransportation(data);
      if (response.status == 200) toast.success(notif.saved);
      else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = async (e) => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);
      var formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).GetSubmitedMissions(formData);
      setdataList(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      setIsLoading(true);
      const Currency = await GeneralListApis(locale).MdCurrency(locale);
      setCurrencyList(Currency);
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
              notShowCompany={true}
              notShowStatus={true}
              notShowOrganization={true}
            ></Search>
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

      <Grid item xs={12} md={12}>
        <div className={`${classes.rootTable} ${style.tableContainer}`}>
          <Table  className={style.tableSty}>
            <TableHead>
              <TableRow>
                <TableCell >
                  <FormattedMessage {...messages.id} />
                </TableCell>
                <TableCell >
                  <FormattedMessage {...messages.EmpCode} />
                </TableCell>
                <TableCell >
                  <FormattedMessage {...messages.employeeName} />
                </TableCell>

                <TableCell >
                  <FormattedMessage {...messages.fromDate} />
                </TableCell>
                <TableCell >
                  <FormattedMessage {...messages.toDate} />
                </TableCell>
                <TableCell >
                  <FormattedMessage {...messages.missionName} />
                </TableCell>
                <TableCell >
                  <FormattedMessage {...messages.transportationExpenses} />
                </TableCell>
                <TableCell >
                  <FormattedMessage {...messages.currency} />
                </TableCell>
                <TableCell ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.length !== 0 &&
                dataList.map((row) => {
                  return (
                    <TableRow
                      hover
                      key={row.jobId}
                      sx={{ height: 1 }}
                      style={{ padding: "0px" }}
                    >
                      <TableCell >
                        {row.id}
                      </TableCell>
                      <TableCell >
                        {row.employeeCode}
                      </TableCell>
                      <TableCell >
                        {row.employeeName}
                      </TableCell>

                      <TableCell >
                        {format(new Date(row.fromDate), "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell >
                        {format(new Date(row.toDate), "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell >
                        {row.missionName}
                      </TableCell>
                      <TableCell >
                        <input
                          name="transportationExpenses"
                          type="text"
                          value={row.transportationExpenses}
                          onChange={(event) => handleEnableOne(event, row)}
                          style={{ width: "100px", textAlign: "center" }}
                        ></input>
                      </TableCell>
                      <TableCell >
                        <Select
                          style={{width:"100%"}}
                          id="currency"
                          name="currency"
                          variant="outlined"
                          value={row.currencyId}
                          onChange={(event) => handleEnableOne(event, row)}
                        >
                          {currencyList.length !== 0 &&
                            currencyList.map((model, index) => {
                              return (
                                <MenuItem key={index} value={model.id}>
                                  {model.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </TableCell>
                      <TableCell >
                        <Button
                          variant="contained"
                          size="medium"
                          color="primary"
                          onClick={(event) => handleSave(row.id,row.currencyId,row.transportationExpenses)}
                        >
                          <FormattedMessage {...payrollMessages.save} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Grid>
    </PayRollLoader>
  );
}

MissionTransportaion.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(MissionTransportaion);
