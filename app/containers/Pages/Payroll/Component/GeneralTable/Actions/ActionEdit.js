import EditIcon from '@mui/icons-material/Create';
import { IconButton, Stack, Tooltip } from '@mui/material';
import React, { memo, useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import payrollMessages from '../../../messages';

function ActionEdit(props) {
  const {
    intl, 
    disabled,
    URL,
  } = props;

  const stringMenu = localStorage.getItem('Menu');
  const menu = stringMenu ? JSON.parse(stringMenu) : null;
  const history = useHistory();




    const editFun = () => {
      history.push(URL);
    }
    

  return (
    <>
        <Tooltip
          placement='bottom'
          title={intl.formatMessage(payrollMessages.edit)}
        >
          <span>
            <IconButton
              color='primary'
              onClick={editFun}
              disabled={
                menu.isUpdate === false ? 
                  menu.isUpdate 
                    : 
                    disabled ? disabled : false
                  }
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
    </>
  );
}



export default injectIntl(ActionEdit);
