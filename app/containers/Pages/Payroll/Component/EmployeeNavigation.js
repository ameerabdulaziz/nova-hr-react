import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import payrollMessages from '../messages';
import SITEMAP, { DOMAIN_NAME } from '../../../App/routes/sitemap';

function EmployeeNavigation(props) {
  const {
    intl, employeeId, employeeName, anchor, openInNewTap, ResetDeviceKeyFun,rowData
  } = props;

  const OPTIONS = [
    {
      name: intl.formatMessage(payrollMessages.personal),
      url: SITEMAP.employee.Personal.route,
    },
    {
      name: intl.formatMessage(payrollMessages.qualification),
      url: SITEMAP.employee.EmployeeQualification.route,
    },
    {
      name: intl.formatMessage(payrollMessages.contactInfo),
      url: SITEMAP.employee.EmployeeContactInfo.route,
    },
    {
      name: intl.formatMessage(payrollMessages.address),
      url: SITEMAP.employee.EmployeeAddress.route,
    },
    {
      name: intl.formatMessage(payrollMessages.car),
      url: SITEMAP.employee.EmployeeCar.route,
    },
    {
      name: intl.formatMessage(payrollMessages.course),
      url: SITEMAP.employee.EmployeeCourse.route,
    },
    {
      name: intl.formatMessage(payrollMessages.contract),
      url: SITEMAP.employee.EmployeeContract.route,
    },
    {
      name: intl.formatMessage(payrollMessages.experience),
      url: SITEMAP.employee.EmployeeExperince.route,
    },
    {
      name: intl.formatMessage(payrollMessages.insurance),
      url: SITEMAP.employee.EmployeeInsurance.route,
    },
    {
      name: intl.formatMessage(payrollMessages.bank),
      url: SITEMAP.employee.EmployeeBank.route,
    },
    {
      name: intl.formatMessage(payrollMessages.salary),
      url: SITEMAP.employee.EmployeeSalary.route,
    },
    {
      name: intl.formatMessage(payrollMessages.resetDeviceKey)
    },
  ];

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const closeDropdown = () => setAnchorEl(null);

  const getPageURL = (url) => {
    if (!employeeId || !employeeName) {
      return `${DOMAIN_NAME}${encodeURI(url)}`;
    }

    const payload = JSON.stringify({
      id: employeeId,
      name: employeeName,
    });

    var url= encodeURI(`${DOMAIN_NAME}${url}/${btoa(encodeURIComponent(payload))}`);

    return url;
  };

  const onMenuItemClick = (option) => {
    closeDropdown();
    if(option.url)
    {
        if (openInNewTap) {
          window.open(getPageURL(option.url), '_blank')?.focus();
        } else {
          history.push(getPageURL(option.url));
        }
    }
    else if(ResetDeviceKeyFun)
    {      
      ResetDeviceKeyFun(rowData.id,rowData.organizationId) 
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
