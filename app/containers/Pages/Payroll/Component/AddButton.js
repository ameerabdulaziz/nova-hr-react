import React,{memo} from 'react';
import {Button} from "@mui/material";  
import Payrollmessages from '../messages';
import AddIcon from '@mui/icons-material/Add';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import { useHistory} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

function AddButton(props) {
  
  const {intl,url,param,disabled } = props;
  const history=useHistory();  
  const { classes } = useStyles();
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
   
  return (
      <div>
        <Tooltip title={intl.formatMessage(Payrollmessages.add)} cursor="pointer" className="mr-6">  
        <span>
          <Button
              disabled={!Menu.isAdd||disabled }
              variant="contained"
              onClick={() => {
                history.push(url,param);
              }}
              color="secondary"
              className={classes.button}
            >
              <AddIcon />
                <FormattedMessage {...Payrollmessages.add} />
          </Button>
        </span>
        </Tooltip>
      </div>
  );
} ;
  

const MemoedAddButton = memo(AddButton);

export default injectIntl(MemoedAddButton);