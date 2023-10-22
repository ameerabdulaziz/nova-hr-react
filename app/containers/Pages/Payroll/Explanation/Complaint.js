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
import { Backdrop, CircularProgress, Box } from "@mui/material";

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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
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
              />
            </Grid>
            <Grid item xs={12} md={8}></Grid>
            <Grid item xs={12} md={4}>
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
              />
            </Grid>
            <Grid item xs={12} md={12}>
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
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="primary"
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
    </Box>
  );
}
Complaint.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(Complaint);
