import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Payrollmessages from "../messages";
import { FormattedMessage } from "react-intl";
import messages from "../Attendance/messages";
import payrollMessages from '../messages';
import style from "../../../../styles/styles.scss";
import {
  Grid, TextField
} from '@mui/material';
import useStyles from '../Style';
import { ServerURL } from '../api/ServerConfig';
import { injectIntl } from 'react-intl';

const MissionDetails = ({ 
  handleClose, open, messageData, data, intl
}) => {

  const { classes } = useStyles();


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {messageData}
        </DialogTitle>
        <DialogContent style={{paddingTop:"20px"}}>
          <Grid
           item
           xs={12}
           md={12}
           container
           spacing={3}
           alignItems="flex-start"
           direction="row"
          >
             
                <Grid item xs={12} md={3}>
                  <TextField
                    name='FromHours'
                    disabled
                    value={data.startVisitTime ? data.startVisitTime : "" }
                    label={intl.formatMessage(payrollMessages.startTime)}
                    type='datetime-local'
                    InputLabelProps={{
                        shrink: true,
                      }}
                    fullWidth
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12}  md={9} > 
                   <TextField
                       name="Latitude"
                       id="Latitude"
                       value={data.startAddress ? data.startAddress : "" }
                       placeholder={intl.formatMessage(messages.StartAddress) }
                       label={intl.formatMessage(messages.StartAddress)}
                       className={`${classes.field} ${style.fieldsSty}`}
                       margin="normal"
                       variant="outlined"
                       disabled
                       fullWidth
                       autoComplete='off'
                   />
                </Grid>

                 <Grid item xs={12} md={3}>
                   <TextField
                     name='ToHours'
                     disabled
                     value={data.endVisitTime ? data.endVisitTime : "" }
                     label={intl.formatMessage(payrollMessages.endTime)}
                     type='datetime-local'
                     InputLabelProps={{
                         shrink: true,
                       }}
                     fullWidth
                     autoComplete='off'
                   />
                 </Grid>
               
                <Grid item xs={12}  md={9}> 
                  <TextField
                      name="Longitude"
                      id="Longitude"
                      value={data.endAddress ? data.endAddress : "" }
                      disabled
                      placeholder={intl.formatMessage(messages.EndAddress) }
                      label={intl.formatMessage(messages.EndAddress)}
                      className={`${classes.field} ${style.fieldsSty}`}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12} style={{textAlign:"center"}}>
                  <img  src={`${data.docName ? `${ServerURL}${data.docName}` : "" }`} alt="img" />
                </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={style.deleteAlertBtnSty} onClick={handleClose}>
            <FormattedMessage {...Payrollmessages.close} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default injectIntl(MissionDetails);
