import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "../../api/PermissionData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function PermissionCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    shortName: "",
    isDeducted: false,
    elementId: null,
    elementName: "",
    deductedValue: "",
    maxRepeated: "",
    maxMinuteNo: "",
    isDeductAnnual: false,
  });
  const [ElementList, setElementList] = useState([]);
  const history = useHistory();
  const [processing, setprocessing] = useState(false);

  const handleChange = (event) => {
    if (event.target.name == "arName")
      setdata((prevFilters) => ({
        ...prevFilters,
        arName: event.target.value,
      }));

    if (event.target.name == "enName")
      setdata((prevFilters) => ({
        ...prevFilters,
        enName: event.target.value,
      }));

    if (event.target.name == "shortName")
      setdata((prevFilters) => ({
        ...prevFilters,
        shortName: event.target.value,
      }));

    if (event.target.name == "deductedValue")
      setdata((prevFilters) => ({
        ...prevFilters,
        deductedValue: event.target.value,
      }));

    if (event.target.name == "maxRepeated") {
      setdata((prevFilters) => ({
        ...prevFilters,
        maxRepeated: event.target.value,
      }));
    }
    if (event.target.name == "maxMinuteNo") {
      setdata((prevFilters) => ({
        ...prevFilters,
        maxMinuteNo: event.target.value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setprocessing(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/Att/PermissionList`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setprocessing(false);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/Att/PermissionList`);
  }
  async function fetchData() {
    const elements = await GeneralListApis(locale).GetElementList(locale);
    setElementList(elements);

    if (id) {
      const dataApi = await ApiData(locale).Get(id ?? 0);
      setdata(dataApi);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.PermissionCreateTitle)
            : intl.formatMessage(messages.PermissionUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={6}>
              <TextField
                id="arName"
                name="arName"
                value={data.arName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(Payrollmessages.arName)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="enName"
                name="enName"
                value={data.enName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(Payrollmessages.enName)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="shortName"
                name="shortName"
                value={data.shortName}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.shortName)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="maxMinuteNo"
                name="maxMinuteNo"
                value={data.maxMinuteNo}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.maxMinuteNo)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="maxRepeated"
                name="maxRepeated"
                value={data.maxRepeated}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.maxRepeated)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={9}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isDeducted}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isDeducted: e.target.checked,
                                isDeductAnnual: !e.target.checked,
                              }))
                            }
                            value={data.isDeducted}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.isDeducted)}
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Autocomplete
                        id="elementid"
                        options={ElementList}
                        value={{ id: data.elementId, name: data.elementName }}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === "" ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ""
                        }
                        onChange={(event, value) => {
                          setdata((prevFilters) => ({
                            ...prevFilters,
                            elementId: value !== null ? value.id : null,
                            elementName: value !== null ? value.name : "",
                          }));
                        }}
                        disabled={!data.isDeducted}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="elementid"
                            required={data.isDeducted}
                            disabled={!data.isDeducted}
                            label={intl.formatMessage(Payrollmessages.element)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="deductedValue"
                        name="deductedValue"
                        value={data.deductedValue}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(messages.deductedValue)}
                        className={classes.field}
                        variant="outlined"
                        disabled={!data.isDeducted}
                        required={data.isDeducted}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isDeductAnnual}
                            onChange={(e) =>
                              setdata((prevFilters) => ({
                                ...prevFilters,
                                isDeductAnnual: e.target.checked,
                                isDeducted: !e.target.checked,
                                deductedValue: "",
                                elementId: null,
                                elementName: "",
                              }))
                            }
                            value={data.isDeductAnnual}
                            color="primary"
                          />
                        }
                        label={intl.formatMessage(messages.isDeductAnnual)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}></Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
                disabled={processing}
              >
                {processing && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
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
    </div>
  );
}
PermissionCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PermissionCreate);
