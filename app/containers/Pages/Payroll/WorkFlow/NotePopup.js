import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Payrollmessages from "../messages";
import hrmessages from "../HumanResources/messages";
import missionmessages from "../Attendance/messages";
import messages from "./messages";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";
import style from "../../../../styles/styles.scss";
import useStyles from "../Style";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const NotePopup = (props) => {
  const locale = useSelector((state) => state.language.locale);

  const { classes } = useStyles();
  const { handleClose, open, postDate, setPostDate, callFun, isCustody, intl } =
    props;
  return (
    <div>
      <Dialog
        open={open}
        PaperProps={{
          overflowy: "clip !important",
        }}
        maxWidth="md"
        onClose={handleClose}
      >
        <DialogTitle>
          <FormattedMessage {...messages.noteConfirmation} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}>
              <TextField
                id="note"
                style={{ width: "100%" }}
                name="note"
                label={intl.formatMessage(Payrollmessages.notes)}
                onChange={(e) =>
                  setPostDate((prevFilters) => ({
                    ...prevFilters,
                    note: e.target.value,
                  }))
                }
              />
            </Grid>
            {isCustody ? (
              <Grid item xs={12} md={6}>
                <TextField
                  id="itemsCount"
                  style={{ width: "100%" }}
                  name="note"
                  label={intl.formatMessage(Payrollmessages.count)}
                  onChange={(e) =>
                    setPostDate((prevFilters) => ({
                      ...prevFilters,
                      itemsCount: e.target.value,
                    }))
                  }
                />
              </Grid>
            ) : (
              ""
            )}
            {postDate.docId == 6 && postDate.isUpdateOverTime==true ? (
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={postDate.calcAsrepVac || false}
                      onChange={(e) =>{debugger;
                        setPostDate((prevFilters) => ({
                          ...prevFilters,
                          calcAsrepVac: e.target.checked,
                        }))}
                      }
                      value={postDate.calcAsrepVac || false}
                      color="primary"
                    />
                  }
                  label={intl.formatMessage(missionmessages.calcAsrepVac)}
                />
              </Grid>
            ) : (
              ""
            )}
            {postDate.docId == 6 && postDate.isUpdateOverTime==true ? (
              <Grid item xs={12} md={6}>
                <TextField
                  id="factor"
                  style={{ width: "100%" }}
                  name="factor"
                  label={intl.formatMessage(missionmessages.factor)}
                  value={postDate.factor}
                  onChange={(e) =>
                    setPostDate((prevFilters) => ({
                      ...prevFilters,
                      factor: e.target.value,
                    }))
                  }
                />
              </Grid>
            ) : (
              ""
            )}
            {isCustody ? (
              <Grid item xs={12} md={6}>
                <TextField
                  id="itemSerial"
                  style={{ width: "100%" }}
                  name="itemSerial"
                  label={intl.formatMessage(hrmessages.itemSerial)}
                  onChange={(e) =>
                    setPostDate((prevFilters) => ({
                      ...prevFilters,
                      itemSerial: e.target.value,
                    }))
                  }
                />
              </Grid>
            ) : (
              ""
            )}
            {postDate.docId == 10 && postDate.actionTypeId == 9 ? (
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={intl.formatMessage(Payrollmessages.date)}
                    value={
                      postDate.executionDate
                        ? dayjs(postDate.executionDate)
                        : null
                    }
                    className={classes.field}
                    onChange={(date) => {
                      setPostDate((prevFilters) => ({
                        ...prevFilters,
                        executionDate: date,
                      }));
                    }}
                    onError={(error, value) => {
                      if (error !== null) {
                        setPostDate((prevState) => ({
                          ...prevState,
                          [`executionDate`]: true,
                        }));
                      } else {
                        setPostDate((prevState) => ({
                          ...prevState,
                          [`executionDate`]: false,
                        }));
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={style.deleteAlertBtnSty} onClick={handleClose}>
            <FormattedMessage {...Payrollmessages.no} />
          </Button>
          <Button
            className={style.deleteAlertBtnSty}
            disabled={
              ((postDate.actionTypeId == 3 || postDate.actionTypeId == 14) &&
                postDate.note == "") ||
              (postDate.actionTypeId == 10 && postDate.note == "") ||
              (postDate.actionTypeId == 9 && postDate.executionDate == null) ||
              ((postDate.actionTypeId == 5 ||
                postDate.actionTypeId == 6 ||
                postDate.actionTypeId == 7) &&
                (postDate.note == "" ||
                  postDate.itemsCount == "" ||
                  postDate.itemSerial == ""))
                ? true
                : false
            }
            onClick={() => {
              handleClose();
              callFun();
            }}
          >
            <FormattedMessage {...Payrollmessages.yes} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default injectIntl(NotePopup);
