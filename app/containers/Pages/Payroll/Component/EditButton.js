import React,{memo} from 'react';
import IconButton from '@mui/material/IconButton';
import Payrollmessages from '../messages';
import EditIcon from '@mui/icons-material/Create';
import { injectIntl } from 'react-intl';
import { Link} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

function EditButton(props) {
  
  const {intl,url,param} = props;
 
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
   
  return (
      <div>
        <Tooltip title={intl.formatMessage(Payrollmessages.edit)} cursor="pointer" className="mr-6">     
          <IconButton
            disabled={!Menu.isUpdate}
            aria-label={intl.formatMessage(Payrollmessages.edit)}
            size="large"
          >
            <Link to={{ pathname: url, state: param,}}>
                <EditIcon />             
            </Link>
          </IconButton>
        </Tooltip>
      </div>
  );
} ;
  

const MemoedEditButton = memo(EditButton);

export default injectIntl(MemoedEditButton);