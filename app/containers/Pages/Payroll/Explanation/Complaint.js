import React, { useState } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "./api/ExplanationData";
import messages from "../messages";
import Payrollmessages from "../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField } from "@mui/material";
import useStyles from "../Style";
import PropTypes from "prop-types";
import PayRollLoaderInForms from "../Component/PayRollLoaderInForms";

function Complaint(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState({
    id: 0,
    questionTitle: "",
    questionDetails: "",
    location: "",
  });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).SaveComplaint(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        setdata({
          id: 0,
          questionTitle: "",
          questionDetails: "",
          location: "",
        });
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function oncancel() {
    setdata({
      id: 0,
      questionTitle: "",
      questionDetails: "",
      location: "",
    });
  }
  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                  <Grid item xs={6} lg={12} >
              <TextField
                id="location"
                name="location"
                value={data.location}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    location: e.target.value,
                  }))
                }
                label={intl.formatMessage(messages.location)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
                 </Grid>
                 <Grid item xs={6} lg={12}>
              <TextField
                id="QuestionTitle"
                name="QuestionTitle"
                value={data.questionTitle}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    questionTitle: e.target.value,
                  }))
                }
                label={intl.formatMessage(Payrollmessages.title)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
                 </Grid> 
              </Grid>
            </Grid>

            <Grid item xs={12}  lg={8}>
              <TextField
                id="QuestionDetails"
                name="QuestionDetails"
                value={data.questionDetails}
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    questionDetails: e.target.value,
                  }))
                }
                multiline
                rows={2}
                label={intl.formatMessage(Payrollmessages.details)}
                className={classes.field}
                variant="outlined"
                autoComplete='off'
              />
            </Grid>

            <Grid item >
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="primary"
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item >
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
    </PayRollLoaderInForms>
  );
}
Complaint.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(Complaint);
