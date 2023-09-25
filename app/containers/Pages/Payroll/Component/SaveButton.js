import React,{memo} from 'react';
import {Button} from "@mui/material";  
import Payrollmessages from '../messages';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import CircularProgress from '@mui/material/CircularProgress';

function SaveButton(props) {
  
  const {intl,Id,processing} = props;
  const {classes,cx} = useStyles();  
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
  
  return (
      <div>
        <Button variant="contained" type="submit" size="medium" color="secondary" disabled={(Id?!Menu.isUpdate:!Menu.isAdd)||processing} >
            {processing && (
            <CircularProgress
                size={24}
                className={classes.buttonProgress}
            />
            )} 
            <FormattedMessage {...Payrollmessages.save} /> 
            
        </Button>
      </div>
  );
} ;
  

const MemoedSaveButton = memo(SaveButton);

export default injectIntl(MemoedSaveButton);