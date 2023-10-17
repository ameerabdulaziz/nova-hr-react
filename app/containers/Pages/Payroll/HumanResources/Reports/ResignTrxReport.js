import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/ResignTrxData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import style from "../../../../../../app/styles/styles.scss";

function ResignTrxReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState(null);
  const [Organization, setOrganization] = useState("");
  const [EmployeeStatus, setEmployeeStatus] = useState("");
  const [Resign, setResign] = useState(null);
  const [ResignList, setResignList] = useState([]);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);

  const CheckBox = (value) => {
    return (
      <div className={style.actionsSty}>
        {value ? (
          <CheckIcon style={{ color: "#3f51b5" }} />
        ) : (
          <CloseIcon style={{ color: "#717171" }} />
        )}
      </div>
    );
  };
  const handleChange = useCallback((name, value) => {
    if (name == "fromDate")
      setfromate(value == null ? null : format(new Date(value), "yyyy-MM-dd"));
    if (name == "toDate")
      settodate(value == null ? null : format(new Date(value), "yyyy-MM-dd"));
    if (name == "employeeId") setemployee(value);

    if (name == "organizationId") setOrganization(value);

    if (name == "statusId") setEmployeeStatus(value);
  }, []);

  
  

  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      var formData = {
        FromDate: fromdate,
        ToDate: todate,
        EmployeeId: employee,
        ResignReasonId: Resign,
        OrganizationId: Organization,
        EmployeeStatusId: EmployeeStatus,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).GetReport(formData);

      setdata(dataApi);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const resigns = await GeneralListApis(locale).GetResignReasonList(locale);
      setResignList(resigns);
    } catch (err) {
      toast.error(err.message);
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
        filter: false,
      },
    },
    {
      name: "date",
      label: <FormattedMessage {...messages["date"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },

    {
      name: "employeeName",
      label: <FormattedMessage {...messages["employeeName"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "resignReasonName",
      label: <FormattedMessage {...messages["resignReasonName"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "lworkingDay",
      label: <FormattedMessage {...messages["lworkingDay"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => value?format(new Date(value), "yyyy-MM-dd"):value,
      },
    },

    {
      name: "note",
      label: <FormattedMessage {...messages["note"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "settlementV",
      label: <FormattedMessage {...messages["settlementV"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "vacSettlValue",
      label: <FormattedMessage {...messages["vacSettlValue"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "isStop",
      label: <FormattedMessage {...Payrollmessages["isStop"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "source",
      label: <FormattedMessage {...messages["source"]} />,
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 10,
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
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Backdrop
          sx={{
            color: "primary.main",
            zIndex: 10,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.69)",
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
              handleChange={handleChange}
              fromdate={fromdate}
              todate={todate}
            ></Search>
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="ResignId"
              options={ResignList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setResign(value == null ? null : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="ResignId"
                  required
                  label={intl.formatMessage(messages.resignReasonName)}
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
    </Box>
  );
}

ResignTrxReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(ResignTrxReport);
