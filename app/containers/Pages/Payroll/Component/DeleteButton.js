import React,{memo} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';

function DeleteButton(props) {
  
  const {intl,clickfnc} = props; 
  const { classes } = useStyles();
  const Menu = JSON.parse(localStorage.getItem("Menu")) ;  
   
  return (
      <div>
        <IconButton
          disabled={!Menu.isDelete}
          className={classes.button}
          aria-label="Delete"
          size="large"
          onClick={clickfnc}
        >
          <DeleteIcon />
        </IconButton>
      </div>
  );
} ;
  

const MemoedDeleteButton = memo(DeleteButton);

export default injectIntl(MemoedDeleteButton);