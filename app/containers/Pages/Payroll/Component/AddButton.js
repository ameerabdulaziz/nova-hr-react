import React,{memo} from 'react';
import {Button} from "@mui/material";  
import Payrollmessages from '../messages';
import AddIcon from '@mui/icons-material/Add';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import { Link} from "react-router-dom";

function AddButton(props) {
  
  const {intl,url,Id,employeeId} = props;
  const { classes } = useStyles();
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
   
  return (
      <div>
       <Button
          disabled={!Menu.isAdd}
          variant="contained"
          color="secondary"
          className={classes.button}
        >

          {employeeId?<Link to={{ pathname: url, state: {id:Id?Id:0,employeeId:employeeId},}}>
              <AddIcon />
              <FormattedMessage {...Payrollmessages.add} />
          </Link>:
          <Link to={{ pathname: url, state: {id:Id?Id:0},}}>
              <AddIcon />
              <FormattedMessage {...Payrollmessages.add} />
          </Link> }
        </Button>
      </div>
  );
} ;
  

const MemoedAddButton = memo(AddButton);

export default injectIntl(MemoedAddButton);