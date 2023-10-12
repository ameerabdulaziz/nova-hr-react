import React,{memo} from 'react';
import IconButton from '@mui/material/IconButton';
import Payrollmessages from '../messages';
import EditIcon from '@mui/icons-material/Create';
import { injectIntl } from 'react-intl';
import { Link} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import useStyles from '../Style';

function EditButton(props) {
  
  const {intl,url,param} = props;
  const { classes } = useStyles();
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
   
  return (
      <div>
        <Tooltip title={intl.formatMessage(Payrollmessages.edit)} cursor="pointer" className="mr-6">     
          <IconButton
            disabled={!Menu.isUpdate}
            aria-label={intl.formatMessage(Payrollmessages.edit)}
            size="large"
            color="secondary"
            className={classes.button}
          >
            <Link to={{ pathname: url, state: param,}} color="secondary">
                <EditIcon color="secondary"/>             
            </Link>
          </IconButton>
        </Tooltip>
      </div>
      
  );
} ;
  

const MemoedEditButton = memo(EditButton);

export default injectIntl(MemoedEditButton);