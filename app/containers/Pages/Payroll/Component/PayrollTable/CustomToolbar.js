import { Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {
  Button, CircularProgress, IconButton, Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../messages';

function CustomToolbar(props) {
  const {
    intl,
    options,
    onExcelExportClick,
    onPrintClick,
    actions,
    isPrintLoading,
    onAddActionBtnClick,
  } = props;

  const stringMenu = localStorage.getItem('Menu');
  const menu = stringMenu ? JSON.parse(stringMenu) : null;

  let isAddBtnDisabled = !menu?.isAdd;

  if (typeof actions?.add?.disabled === 'boolean') {
    isAddBtnDisabled = actions?.add?.disabled;
  } else if (typeof actions?.add?.disabled === 'function') {
    isAddBtnDisabled = actions?.add?.disabled();
  }

  return (
    <>
      {options.download !== false && (
        <Tooltip
          placement='bottom'
          title={intl.formatMessage(payrollMessages.downloadExcel)}
        >
          <IconButton onClick={onExcelExportClick}>
            <BackupTableIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Tooltip>
      )}

      {options.print !== false && (
        <Tooltip
          placement='bottom'
          title={intl.formatMessage(payrollMessages.Print)}
        >
          <IconButton onClick={onPrintClick}>
            {isPrintLoading ? (
              <CircularProgress size={15} />
            ) : (
              <Print sx={{ fontSize: '1.2rem' }} />
            )}
          </IconButton>
        </Tooltip>
      )}

      {actions.add && (
        <Button
          disabled={isAddBtnDisabled}
          variant='contained'
          onClick={onAddActionBtnClick}
          color='primary'
          startIcon={<AddIcon />}
        >
          {intl.formatMessage(payrollMessages.add)}
        </Button>
      )}

      {options.customToolbar && options.customToolbar()}
    </>
  );
}

CustomToolbar.propTypes = {
  intl: PropTypes.object.isRequired,
  isPrintLoading: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    download: PropTypes.bool,
    print: PropTypes.bool,
    customToolbar: PropTypes.func,
  }).isRequired,
  onExcelExportClick: PropTypes.func.isRequired,
  onPrintClick: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    add: PropTypes.shape({
      disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    }),
  }).isRequired,
  onAddActionBtnClick: PropTypes.func.isRequired,
};

export default injectIntl(CustomToolbar);
