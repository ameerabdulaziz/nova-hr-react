import React,{memo} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import Tooltip from '@mui/material/Tooltip';
import Payrollmessages from '../messages';

function DeleteButton(props) {
  
  const {intl,clickfnc,disabled} = props; 
  const { classes } = useStyles();
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
   
  return (
      <div>
        <Tooltip title={intl.formatMessage(Payrollmessages.delete)} cursor="pointer" className="mr-6">       
          <IconButton
            disabled={!Menu.isDelete||disabled}
            className={classes.button}
            aria-label={intl.formatMessage(Payrollmessages.delete)}
            size="large"
            color="primary"
            onClick={clickfnc}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>      
      </div>
  );
} ;
  

const MemoedDeleteButton = memo(DeleteButton);

export default injectIntl(MemoedDeleteButton);