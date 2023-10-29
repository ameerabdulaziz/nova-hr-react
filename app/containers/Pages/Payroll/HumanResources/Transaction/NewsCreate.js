import React, { useState, useEffect } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../api/NewsData";
import messages from "../messages";
import Payrollmessages from "../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GeneralListApis from "../../api/GeneralListApis";
import { format } from "date-fns";
import useMediaQuery from "@mui/material/useMediaQuery";
import NameList from "../../Component/NameList";
import useStyles from "../../Style";
import SaveButton from "../../Component/SaveButton";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PayRollLoader from "../../Component/PayRollLoader";

function NewsCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [data, setdata] = useState({
    id: 0,
    fromDate: format(new Date(), "yyyy-MM-dd"),
    toDate: format(new Date(), "yyyy-MM-dd"),
    header: "",
    details: "",
    newsTypeId: "",
    newsTypeName: "",
    image: "",
    photo: "",
  });
  const [TypeList, setTypeList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).Save(data, EmployeeList);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/News`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/News`);
  }

  async function fetchData() {
    try {
      const types = await GeneralListApis(locale).GetNewsTypeList(locale);
      setTypeList(types);

      if (id) {
        const result = await ApiData(locale).Get(id ?? 0);
        if (result.employees) {
          setEmployeeList(
            result.employees.map((obj) => {
              return {
                ...obj,
                isSelected: true,
              };
            })
          );
        }
        setdata(result);
      }
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
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.NewsCreateTitle)
            : intl.formatMessage(messages.NewsUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container alignItems={"initial"} spacing={3}>
            <Grid
              container
              item
              md={7}
              xs={12}
              direction="row"
              style={{ maxHeight: "200vh" }}
            >
              <Grid item md={4} xs={12}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label={intl.formatMessage(Payrollmessages.fromdate)}
                    value={data.fromDate}
                    onChange={(date) => {
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        fromDate: format(new Date(date), "yyyy-MM-dd"),
                      }));
                    }}
                    className={classes.field1}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={4} xs={12}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label={intl.formatMessage(Payrollmessages.todate)}
                    value={data.toDate}
                    onChange={(date) => {
                      setdata((prevFilters) => ({
                        ...prevFilters,
                        toDate: format(new Date(date), "yyyy-MM-dd"),
                      }));
                    }}
                    className={classes.field1}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={4} xs={12}>
                <Autocomplete
                  id="newsTypeId"
                  options={TypeList}
                  value={{ id: data.newsTypeId, name: data.newsTypeName }}
                  isOptionEqualToValue={(option, value) =>
                    value.id === 0 || value.id === "" || option.id === value.id
                  }
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  onChange={(event, value) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      newsTypeId: value !== null ? value.id : 0,
                      newsTypeName: value !== null ? value.name : "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      name="newsTypeId"
                      required
                      label={intl.formatMessage(Payrollmessages.type)}
                    />
                  )}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="title"
                  name="title"
                  value={data.header}
                  label={intl.formatMessage(Payrollmessages.title)}
                  className={classes.field}
                  variant="outlined"
                  onChange={(e) =>
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      header: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  id="details"
                  name="details"
                  multiline
                  required
                  rows={2}
                  value={data.details}
                  onChange={(e) =>
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      details: e.target.value,
                    }))
                  }
                  label={intl.formatMessage(Payrollmessages.details)}
                  className={classes.field}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item md={5} xs={12} direction="row">
              <section className={classes.content}>
                <Grid item xs={12} md={12}>
                  {data.image && (
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={URL.createObjectURL(data.image)}
                    />
                  )}
                  {data.photo && (
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={`data:image/jpeg;base64,${data.photo}`}
                    />
                  )}
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl
                    variant="standard"
                    className={`${cx(classes.textField)}`}
                  >
                    <div className={classes.actions}>
                      <Tooltip title="Upload">
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          component="label"
                        >
                          <AddIcon
                            className={cx(
                              smUp && classes.leftIcon,
                              classes.iconSmall
                            )}
                          />
                          {smUp && " "} Upload
                          <input
                            hidden
                            type="file"
                            name="file"
                            className="custom-file-input"
                            id="inputGroupFile"
                            onChange={(e) => {
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                image: e.target.files[0],
                                photo: "",
                              }));
                            }}
                            accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml"
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <hr className={classes.hr} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <NameList
                    dataList={EmployeeList}
                    setdataList={setEmployeeList}
                    Key={"Employee"}
                  />
                </Grid>
              </section>
            </Grid>
            <Grid item xs={12} md={1}>
              <SaveButton Id={id} />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={oncancel}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
NewsCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(NewsCreate);
