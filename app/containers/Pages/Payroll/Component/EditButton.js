import React,{memo} from 'react';
import IconButton from '@mui/material/IconButton';
import Payrollmessages from '../messages';
import EditIcon from '@mui/icons-material/Create';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import { Link} from "react-router-dom";

function EditButton(props) {
  
  const {intl,Id,url} = props;
 
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
  debugger; 
  return (
      <div>
        <IconButton
          disabled={!Menu.isUpdate}
          aria-label={intl.formatMessage(Payrollmessages.edit)}
          size="large"
        >
          <Link to={{ pathname: url, state: {id:Id},}}>
              <EditIcon />
          </Link>
        </IconButton>
      </div>
  );
} ;
  

const MemoedEditButton = memo(EditButton);

export default injectIntl(MemoedEditButton);