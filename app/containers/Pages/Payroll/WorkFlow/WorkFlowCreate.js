import React, { useState, useEffect } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "./api/WorkFlowData";
import messages from "./messages";
import Payrollmessages from "../messages";
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
import useStyles from "../Style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import NameList from "../Component/NameList";
import StepsList from "./StepsList";
import ActionsList from "./ActionsList";
import GeneralListApis from "../api/GeneralListApis";
import PayRollLoader from "../Component/PayRollLoader";

function WorkFlowCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const { id } = location.state ?? 0;
  const { classes } = useStyles();

  const [data, setdata] = useState({
    id: 0,
    arName: "",
    enName: "",
    documentId: "",
    documentName: "",
  });

  const [employeeList, setemployeeList] = useState([]);
  const [DocumentList, setDocumentList] = useState([]);
  const [Steps, setSteps] = useState([]);
  const [Actions, setActions] = useState([]);
  const [jobList, setjobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      data.employeeList = employeeList.filter((row) => row.isSelected == true);
      data.jobList = jobList.filter((row) => row.isSelected == true);
      data.steps = Steps;
      data.actions = Actions;
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);

        history.push(`/app/Pages/WF/WorkFlow`);
      } else toast.error(response.statusText);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function oncancel() {
    history.push(`/app/Pages/WF/WorkFlow`);
  }
  async function fetchData() {
    try {
      const Documents = await GeneralListApis(locale).GetDocumentList(locale);
      setDocumentList(Documents);

      if (id) {
        const dataApi = await ApiData(locale).Get(id ?? 0);
        setdata(dataApi);
        setjobList(
          dataApi.jobList
            ? dataApi.jobList.map((obj) => {
                return {
                  ...obj,
                  isSelected: true,
                };
              })
            : []
        );
        setemployeeList(
          dataApi.employeeList
            ? dataApi.employeeList.map((obj) => {
                return {
                  ...obj,
                  isSelected: true,
                };
              })
            : []
        );
        setSteps(dataApi.steps || []);
        setActions(dataApi.actions || []);
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
            ? intl.formatMessage(messages.workFlowCreateTitle)
            : intl.formatMessage(messages.workFlowUpdateTitle)
        }
        desc={""}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="arName"
                        name="arName"
                        value={data.arName}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(Payrollmessages.arName)}
                        className={classes.field}
                        variant="outlined"
                        required
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="enName"
                        name="enName"
                        value={data.enName}
                        onChange={(e) => handleChange(e)}
                        label={intl.formatMessage(Payrollmessages.enName)}
                        className={classes.field}
                        variant="outlined"
                        required
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        id="documentId"
                        options={DocumentList}
                        value={{ id: data.documentId, name: data.documentName }}
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
                            documentId: value !== null ? value.id : 0,
                            documentName: value !== null ? value.name : "",
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="documentId"
                            required
                            label={intl.formatMessage(messages.documentName)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card className={classes.card}>
                        <CardContent>
                          <NameList
                            dataList={employeeList}
                            setdataList={setemployeeList}
                            Key={"Employee"}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card className={classes.card}>
                        <CardContent>
                          <NameList
                            dataList={jobList}
                            setdataList={setjobList}
                            Key={"Job"}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12}></Grid>
                    <Grid item xs={12} md={12}>
                      <Card className={classes.card}>
                        <CardContent>
                          <StepsList dataList={Steps} setdataList={setSteps} />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Card className={classes.card}>
                        <CardContent>
                          <ActionsList
                            dataList={Actions}
                            setdataList={setActions}
                            Steps={Steps}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                style={{ width: 100 }}
                color="secondary"
              >
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
    </PayRollLoader>
  );
}
WorkFlowCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(WorkFlowCreate);
