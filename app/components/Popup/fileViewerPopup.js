
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import style from '../../styles/styles.scss';
import messages from '../../containers/Pages/Payroll/Employee/messages';
import Payrollmessages from '../../containers/Pages/Payroll/messages';
import { FormattedMessage , injectIntl } from 'react-intl';


const AlertPopup = ({
    handleClose,
    open,
    uploadedFileType,
    uploadedFile,
    validImageTypes,
    validPDFTypes,

}) => {

    const locale = useSelector((state) => state.language.locale);
    
 
    return(
        <div>
            <Dialog open={open} onClose={handleClose}  className={style.viewerPopup}>
                <DialogTitle>
                    <FormattedMessage {...messages.FilePreview} />
                </DialogTitle>
                <DialogContent>
                <DialogContentText className={style.fileContainer}>
                {validImageTypes.includes( uploadedFileType ) ? 
                        <img  src={uploadedFile && uploadedFile instanceof File ?   URL.createObjectURL(uploadedFile) : uploadedFile } /> 
                    : validPDFTypes.includes( uploadedFileType ) ? 
                      <object
                      data={uploadedFile !== null && uploadedFile instanceof File ? URL.createObjectURL(uploadedFile) : uploadedFile}
                      type="application/pdf"
                      width="100%"
                    >
              
                      </object>
                      : null
                    }

                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                className={style.deleteAlertBtnSty}
                onClick={handleClose}>
                    <FormattedMessage {...Payrollmessages.cancel} />
                </Button>
                
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default AlertPopup;