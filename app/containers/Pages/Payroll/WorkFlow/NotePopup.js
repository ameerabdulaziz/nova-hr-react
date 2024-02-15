import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Payrollmessages from "../messages";
import messages from "./messages";

import { injectIntl,FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import {
  Grid,
  TextField
} from "@mui/material";
import style from "../../../../styles/styles.scss";


const NotePopup = (props) => {
  const locale = useSelector((state) => state.language.locale);
  const { handleClose, open, setNote,Note, callFun ,Action, intl } = props;

  return (
    <div>
      <Dialog open={open} 
        PaperProps={{
          overflowy: "clip !important",
        }}
        maxWidth="md" onClose={handleClose}>
        <DialogTitle>
          <FormattedMessage {...messages.noteConfirmation} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={12}>
              <TextField
                id="note"
                style={{width: '100%'}}
                name="note"
                label={intl.formatMessage(Payrollmessages.notes)}
                onChange={(e) => setNote(e.target.value)}
                
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={style.deleteAlertBtnSty} onClick={handleClose}>
            <FormattedMessage {...Payrollmessages.no} />
          </Button>
          <Button
            className={style.deleteAlertBtnSty}
            disabled={Action==3&&Note==""?true:false}
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
