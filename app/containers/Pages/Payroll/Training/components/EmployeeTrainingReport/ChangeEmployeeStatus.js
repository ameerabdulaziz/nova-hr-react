import { Button, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../../messages';

function ChangeEmployeeStatus(props) {
  const {
    intl, employeeStatus, row, onChangeEmployeeStatusChange
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = async (statusId) => {
    onChangeEmployeeStatusChange(row.employeeId, statusId);

    closeMenu();
  };

  if (row.statusId === 3) {
    return null;
  }

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={(evt) => setAnchorEl(evt.currentTarget)}
      >
        {intl.formatMessage(messages.changeEmployeeStatus)}
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {employeeStatus.map((item) => (
          <MenuItem key={item.id} onClick={() => onMenuItemClick(item.id)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

ChangeEmployeeStatus.propTypes = {
  intl: PropTypes.object.isRequired,
  employeeStatus: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  onChangeEmployeeStatusChange: PropTypes.func.isRequired,
};

export default injectIntl(ChangeEmployeeStatus);
