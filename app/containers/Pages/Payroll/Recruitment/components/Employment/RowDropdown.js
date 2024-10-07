import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import React, { useState, memo } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { ServerURL } from '../../../api/ServerConfig';
import messages from '../../messages';

function RowDropdown(props) {
  const {
    tableMeta, intl, row
  } = props;

  const history = useHistory();

  const [openedDropdown, setOpenedDropdown] = useState({});

  const onDropdownClose = (rowIndex) => setOpenedDropdown((prev) => ({
    ...prev,
    [rowIndex]: null,
  }));

  const onPreviewCVBtnClick = (rowIndex) => {
    onDropdownClose(rowIndex);

    window.open(`${encodeURI(`/app/Pages/Recruitment/JobApplicationPreview/${btoa(encodeURIComponent(JSON.stringify(
      {
          id: row.id 
      }
    )))}`)}`, '_blank')?.focus()
  };

  const onSetHiringDateBtnClick = (rowIndex) => {
    onDropdownClose(rowIndex);
    props.onSetHiringDateBtnClick([row.id]);
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
        onClose={() => onDropdownClose(tableMeta.rowIndex)}
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
            {intl.formatMessage(messages.setHiringDate)}
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={() => onPreviewCVBtnClick(tableMeta.rowIndex)}>
          <ListItemIcon>
            <VisibilityIcon fontSize='small' />
          </ListItemIcon>

          <ListItemText>
            {intl.formatMessage(messages.viewApplicationForm)}
          </ListItemText>
        </MenuItem>

        <MenuItem
          component='a'
          target='_blank'
          disabled={!row.cVfile}
          href={ServerURL + 'Doc/CVDoc/' + row.cVfile}
          onClick={() => onDropdownClose(tableMeta.rowIndex)}
        >
          <ListItemIcon>
            <DownloadIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>{intl.formatMessage(messages.downloadCV)}</ListItemText>
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
