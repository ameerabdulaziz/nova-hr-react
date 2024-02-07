import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';

const optionsOpt = [
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

function RowDropdown(props) {
  const { tableMeta } = props;

  const history = useHistory();

  const [openedDropdown, setOpenedDropdown] = useState({});

  const closeDropdown = (rowIndex) => setOpenedDropdown((prev) => ({
    ...prev,
    [rowIndex]: null,
  }));

  return (
    <>
      <IconButton
        onClick={(evt) => {
          setOpenedDropdown((prev) => ({
            ...prev,
            [tableMeta.rowIndex]: evt.currentTarget,
          }));
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={openedDropdown[tableMeta.rowIndex]}
        open={Boolean(openedDropdown[tableMeta.rowIndex])}
        onClose={() => closeDropdown(tableMeta.rowIndex)}
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
        {optionsOpt.map((option) => (
          <MenuItem
            key={option.name}
            onClick={() => {
              closeDropdown(tableMeta.rowIndex);
              history.push(`/app/Pages/Employee/${option.url}`, {
                empid: {
                  id: tableMeta.rowData[0],
                  name: tableMeta.rowData[2],
                },
              });
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

RowDropdown.propTypes = {
  intl: PropTypes.object.isRequired,
  tableMeta: PropTypes.object.isRequired,
};

export default memo(injectIntl(RowDropdown));
