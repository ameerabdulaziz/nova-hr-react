import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { useHistory } from 'react-router';

const OPTIONS = [
  { name: 'Personal', url: 'Personal' },
  { name: 'Qualification', url: 'EmployeeQualification' },
  { name: 'Contact Info', url: 'EmployeeContactInfo' },
  { name: 'Address', url: 'EmployeeAddress' },
  { name: 'Car', url: 'EmployeeCar' },
  { name: 'Course', url: 'EmployeeCourse' },
  { name: 'Contract', url: 'EmployeeContract' },
  { name: 'Experince', url: 'EmployeeExperince' },
  { name: 'Insurance', url: 'EmployeeInsurance' },
  { name: 'Bank', url: 'EmployeeBank' },
  { name: 'Salary', url: 'EmployeeSalary' },
];

function EmployeeNavigation(props) {
  const {
    employeeId, employeeName, anchor, openInNewTap
  } = props;

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

    return encodeURI(`/app/Pages/Employee/${url}/${btoa(payload)}`);
  };

  const onMenuItemClick = (option) => {
    closeDropdown();

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
};

EmployeeNavigation.defaultProps = {
  anchor: (
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  ),
  openInNewTap: false,
};

export default memo(EmployeeNavigation);
