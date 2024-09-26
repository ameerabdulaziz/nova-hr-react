import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import payrollMessages from '../messages';

function EmployeeNavigation(props) {
  const {
    intl, employeeId, employeeName, anchor, openInNewTap
  } = props;

  const OPTIONS = [
    { name: intl.formatMessage(payrollMessages.personal), url: 'Personal' },
    { name: intl.formatMessage(payrollMessages.qualification), url: 'EmployeeQualification' },
    { name: intl.formatMessage(payrollMessages.contactInfo), url: 'EmployeeContactInfo' },
    { name: intl.formatMessage(payrollMessages.address), url: 'EmployeeAddress' },
    { name: intl.formatMessage(payrollMessages.car), url: 'EmployeeCar' },
    { name: intl.formatMessage(payrollMessages.course), url: 'EmployeeCourse' },
    { name: intl.formatMessage(payrollMessages.contract), url: 'EmployeeContract' },
    { name: intl.formatMessage(payrollMessages.experience), url: 'EmployeeExperince' },
    { name: intl.formatMessage(payrollMessages.insurance), url: 'EmployeeInsurance' },
    { name: intl.formatMessage(payrollMessages.bank), url: 'EmployeeBank' },
    { name: intl.formatMessage(payrollMessages.salary), url: 'EmployeeSalary' },
  ];

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const closeDropdown = () => setAnchorEl(null);

  const getPageURL = (url) => {
    if (!employeeId || !employeeName) {
      return encodeURI(`/app/Pages/Employee/${url}`);
    }

    const payload = JSON.stringify({
      id: employeeId,
      name: employeeName,
    });

    var url= encodeURI(`/app/Pages/Employee/${url}/${btoa(encodeURIComponent(payload))}`);
    return url;
  };

  const onMenuItemClick = (option) => {
    closeDropdown();
debugger;
    if (openInNewTap) {
      window.open(getPageURL(option.url), '_blank')?.focus();
    } else {
      history.push(getPageURL(option.url));
    }
  };

  return (
    <>
      <div onClick={(evt) => setAnchorEl(evt.currentTarget)}>{anchor}</div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeDropdown}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              width: 200,
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {OPTIONS.map((option) => (
          <MenuItem key={option.name} onClick={() => onMenuItemClick(option)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

EmployeeNavigation.propTypes = {
  employeeId: PropTypes.number.isRequired,
  employeeName: PropTypes.string.isRequired,
  anchor: PropTypes.node,
  openInNewTap: PropTypes.bool,
  intl: PropTypes.object.isRequired
};

EmployeeNavigation.defaultProps = {
  anchor: (
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  ),
  openInNewTap: false,
};

export default memo(injectIntl(EmployeeNavigation));
