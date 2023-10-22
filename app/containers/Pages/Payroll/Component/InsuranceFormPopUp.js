
import  React, {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
// import messages from '../../containers/Pages/Payroll/MainData/messages';

import Payrollmessages from '../messages';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';



const InsuranceFormPopUp = ({
    handleClose,
    open,
    keyVal,
    callFun,
    Title,
    intl,
    submitting,
    processing
}) => {

    const [note, setNote] = useState("");
    const locale = useSelector(state => state.language.locale);


    // used to clear fields
    useEffect(()=>{
        if(open)
        {
            setNote('')
        }
    },[open])
 
    return(
        <div>
            <Dialog open={open} onClose={(key)=>handleClose(key)}>
            <form onSubmit={(e)=>{
                e.preventDefault();
                    callFun(note)
                    handleClose()
                }}>
                <DialogTitle>
                    Edit Hr Notes
                    {/* <FormattedMessage {...messages.ADD} />  {Title} */}
                    </DialogTitle>
                <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText> */}
                
                <TextField
                    // autoFocus
                    margin="dense"
                    id="name"
                    label="hrNotes"
                    // label={intl.formatMessage(messages.arName)}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setNote(e.target.value)}
                    // required={locale === "ar" ? true : false}
                />
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>
                    <FormattedMessage {...Payrollmessages.cancel} />
                </Button>

                <Button 
                type="submit" 
                // disabled={submitting || processing}
                >
                    {processing && (
                    <CircularProgress
                    size={24}
                    />
                    )}
                    <FormattedMessage {...Payrollmessages.save} />
                </Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

InsuranceFormPopUp.propTypes = {
    intl: PropTypes.object.isRequired,
  };

export default injectIntl(InsuranceFormPopUp);