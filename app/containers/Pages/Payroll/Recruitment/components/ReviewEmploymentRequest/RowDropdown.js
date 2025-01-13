import MoreVertIcon from '@mui/icons-material/MoreVert';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import messages from '../../messages';
import SITEMAP from '../../../../../App/routes/sitemap';

function RowDropdown(props) {
  const {
    row, tableMeta, intl
  } = props;

  const history = useHistory();

  const [openedDropdown, setOpenedDropdown] = useState({});

  const closeDropdown = (rowIndex) => setOpenedDropdown((prev) => ({
    ...prev,
    [rowIndex]: null,
  }));

  const onSetHiringDateBtnClick = (rowIndex) => {
    closeDropdown(rowIndex);
    props.onSetHiringDateBtnClick(row.id);
  };

  const onPreviewEmploymentRequestClick = (rowIndex) => {
    closeDropdown(rowIndex);

    history.push(SITEMAP.recruitment.ReviewEmploymentRequestEdit.route, {
      id: row.id,
    });
  };

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
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => onSetHiringDateBtnClick(tableMeta.rowIndex)}>
          <ListItemIcon>
            <SystemUpdateAltIcon fontSize='small' />
          </ListItemIcon>

          <ListItemText>
            {intl.formatMessage(messages.createEmploymentRequest)}
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => onPreviewEmploymentRequestClick(tableMeta.rowIndex)}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize='small' />
          </ListItemIcon>

          <ListItemText>
            {intl.formatMessage(messages.viewEmploymentRequest)}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

RowDropdown.propTypes = {
  intl: PropTypes.object.isRequired,
  tableMeta: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
  onSetHiringDateBtnClick: PropTypes.func.isRequired,
};

export default memo(injectIntl(RowDropdown));
