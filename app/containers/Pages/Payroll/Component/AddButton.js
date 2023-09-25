import React,{memo} from 'react';
import {Button} from "@mui/material";  
import Payrollmessages from '../messages';
import AddIcon from '@mui/icons-material/Add';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import { useHistory} from "react-router-dom";

function AddButton(props) {
  
  const {intl,url} = props;
  const history=useHistory();  
  const { classes } = useStyles();
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
   
  return (
      <div>
       <Button
          disabled={!Menu.isAdd}
          variant="contained"
          onClick={() => {
            history.push(url);
          }}
          color="secondary"
          className={classes.button}
        >
          <AddIcon />
            <FormattedMessage {...Payrollmessages.add} />
        </Button>
      </div>
  );
} ;
  

const MemoedAddButton = memo(AddButton);

export default injectIntl(MemoedAddButton);