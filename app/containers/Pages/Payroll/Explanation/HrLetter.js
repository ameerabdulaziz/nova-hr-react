import React, { useState } from "react";
import { PapperBlock } from "enl-components";
import ApiData from "./api/ExplanationData";
import messages from "../messages";
import Payrollmessages from "../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import { injectIntl, FormattedMessage } from "react-intl";
import { Button, Grid, TextField } from "@mui/material";
import useStyles from "../Style";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Backdrop, CircularProgress, Box } from "@mui/material";

function HrLetter(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState({
    id: 0,
    hrLetterLang: "",
    hrLetterDate: format(new Date(), "yyyy-MM-dd"),
    questionDetails: "",
    directedTo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await ApiData(locale).SaveHrLetter(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        setdata({
          id: 0,
          hrLetterLang: "",
          hrLetterDate: format(new Date(), "yyyy-MM-dd"),
          questionDetails: "",
          directedTo: "",
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
      hrLetterLang: "",
      hrLetterDate: format(new Date(), "yyyy-MM-dd"),
      questionDetails: "",
      directedTo: "",
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.hrLetterDate)}
                  value={data.hrLetterDate}
                  onChange={(date) => {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      hrLetterDate: format(new Date(date), "yyyy-MM-dd"),
                    }));
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="directedTo"
                name="directedTo"
                value={data.directedTo}
                label={intl.formatMessage(messages.directedTo)}
                className={classes.field}
                variant="outlined"
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    directedTo: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="hrLetterLang"
                name="hrLetterLang"
                value={data.hrLetterLang}
                label={intl.formatMessage(Payrollmessages.hrLetterLang)}
                className={classes.field}
                variant="outlined"
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    hrLetterLang: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="QuestionDetails"
                name="QuestionDetails"
                value={data.questionDetails}
                multiline
                rows={2}
                label={intl.formatMessage(Payrollmessages.details)}
                className={classes.field}
                variant="outlined"
                onChange={(e) =>
                  setdata((prevFilters) => ({
                    ...prevFilters,
                    questionDetails: e.target.value,
                  }))
                }
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
HrLetter.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(HrLetter);
