
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
import { ServerURL } from "../../containers/Pages/Payroll/api/ServerConfig";


const fileViewerPopup = ({
    handleClose,
    open,
    uploadedFileType,
    uploadedFile,
    validImageTypes,
    validPDFTypes,
    validVideoTypes,
}) => {

 
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
                        : validVideoTypes && uploadedFile ? 
                                validVideoTypes.includes( uploadedFileType ) ?                             
                                    <video width="100%" height="500" controls>
                                        <source src={uploadedFile && uploadedFile instanceof File ?  URL.createObjectURL(uploadedFile) : `${ServerURL}${uploadedFile}`} type={uploadedFile && uploadedFile instanceof File ? uploadedFileType : `video/${uploadedFileType}`} />
                                            Your browser does not support the video tag.
                                    </video>
                                : null
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


export default fileViewerPopup;