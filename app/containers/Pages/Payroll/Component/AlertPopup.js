import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Payrollmessages from "../messages";
import { FormattedMessage } from "react-intl";
import messages from "../MainData/messages";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import style from "../../../../styles/styles.scss";

const AlertPopup = ({ handleClose, open, messageData, callFun }) => {
  const locale = useSelector((state) => state.language.locale);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <FormattedMessage {...Payrollmessages.confirmationMess} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{messageData}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={style.deleteAlertBtnSty} onClick={handleClose}>
            <FormattedMessage {...Payrollmessages.no} />
          </Button>
          <Button
            className={style.deleteAlertBtnSty}
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

export default AlertPopup;
