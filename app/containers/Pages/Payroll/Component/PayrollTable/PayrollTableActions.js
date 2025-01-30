import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import payrollMessages from '../../messages';

function PayrollTableActions(props) {
  const {
    intl, data, actions, tableMeta, onDeleteActionBtnClick
  } = props;

  const stringMenu = localStorage.getItem('Menu');
  const menu = stringMenu ? JSON.parse(stringMenu) : null;

  const history = useHistory();

  // Get row index depend on new table data, that can be change by any operation
  // like search, filter, sort
  const currentRowMetaData = tableMeta.currentTableData[tableMeta.rowIndex];
  const row = data[currentRowMetaData.index];

  let isDeleteBtnDisabled = !menu?.isDelete;

  if (typeof actions?.delete?.disabled === 'boolean') {
    isDeleteBtnDisabled = actions?.delete?.disabled;
  } else if (typeof actions?.delete?.disabled === 'function') {
    isDeleteBtnDisabled = actions?.delete?.disabled(row);
  }

  let isEditBtnDisabled = !menu?.isUpdate;

  if (typeof actions?.edit?.disabled === 'boolean') {
    isEditBtnDisabled = actions?.edit?.disabled;
  } else if (typeof actions?.edit?.disabled === 'function') {
    isEditBtnDisabled = actions?.edit?.disabled(row);
  }

  const onEditActionBtnClick = (id) => {
    // Check is employee has update permission
    if (menu?.isUpdate) {
      history.push(actions?.edit?.url, {
        id,
        ...(actions?.edit?.params || {}),
      });
    }
  };

  return (
    <Stack direction='row' justifyContent='flex-end' spacing={1}>
      {actions?.extraActions && actions?.extraActions(row)}

      {actions?.edit && (
        <Tooltip
          placement='bottom'
          title={intl.formatMessage(payrollMessages.edit)}
        >
          <span>
            <IconButton
              color='primary'
              disabled={isEditBtnDisabled}
              onClick={() => onEditActionBtnClick(row.id)}
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}

      {actions?.delete && (
        <Tooltip
          placement='bottom'
          title={intl.formatMessage(payrollMessages.delete)}
        >
          <span>
            <IconButton
              color='error'
              disabled={isDeleteBtnDisabled}
              onClick={() => onDeleteActionBtnClick(row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  );
}

PayrollTableActions.propTypes = {
  intl: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  tableMeta: PropTypes.object.isRequired,
  onDeleteActionBtnClick: PropTypes.func.isRequired,
};

export default injectIntl(memo(PayrollTableActions));
