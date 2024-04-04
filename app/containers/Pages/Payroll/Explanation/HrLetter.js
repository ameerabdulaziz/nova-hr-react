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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PayRollLoader from "../Component/PayRollLoader";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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


  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);

      data.hrLetterDate = dateFormatFun(data.hrLetterDate);



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
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">

                  <Grid item xs={12} md={4}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(messages.hrLetterDate)}
                          value={data.hrLetterDate ? dayjs(data.hrLetterDate) : data.hrLetterDate}
                        className={classes.field}
                          onChange={(date) => {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              hrLetterDate: date ,
                            }))
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`hrLetterDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`hrLetterDate`]: false
                              }))
                          }
                        }}
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
                autoComplete='off'
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
                autoComplete='off'
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
                autoComplete='off'
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
    </PayRollLoader>
  );
}
HrLetter.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(HrLetter);
