import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import css from 'enl-styles/Table.scss';

function EditableCell(props) {
  const theme = useTheme();
  const {
    cellData,
    edited,
    inputType,
    updateRow,
    branch
  } = props;

  const handleUpdate = useCallback((event) => {
    event.persist();
    updateRow(event, branch);
  }, [updateRow, branch]);

  switch (inputType) {
    case 'text':
      return (
        <TableCell padding="normal">
          <TextField
            variant="standard"
            placeholder={cellData.type}
            name={cellData.type}
            className={clsx(css.crudInput , inputType === "static" || cellData.disabled ? css.crudInputId : null, theme.palette.mode === 'dark' ? css.lightTxt : css.darkTxt)}
            // className={clsx(css.crudInput, theme.palette.mode === 'dark' ? css.lightTxt : css.darkTxt)}
            sx={{width: '100%'}}
            id={cellData.id.toString()}
            value={cellData.value}
            onChange={(event) => handleUpdate(event)}
            disabled={cellData.type === "id" || cellData.disabled ? true : !edited }
            margin="none"
            inputProps={{
              'aria-label': 'Description',
            }}
            autoComplete='off'
            />
        </TableCell>
      );
    case 'number':
      return (
        <TableCell padding="none">
          <TextField
            variant="standard"
            id={cellData.id.toString()}
            name={cellData.type}
            className={clsx(css.crudInput, cellData.disabled ? css.crudInputId : null, theme.palette.mode === 'dark' ? css.lightTxt : css.darkTxt)}
            value={cellData.value}
            onChange={(event) => handleUpdate(event)}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="none"
            autoComplete='off'
            disabled={ cellData.disabled ? true : !edited} />
        </TableCell>
      );
    default:
      return (
        <TableCell padding="normal">
          <TextField
            variant="standard"
            placeholder={cellData.type}
            name={cellData.type}
            className={clsx(css.crudInput , inputType === "static" || cellData.disabled ? css.crudInputId : null, theme.palette.mode === 'dark' ? css.lightTxt : css.darkTxt)}
            // className={clsx(css.crudInput, theme.palette.mode === 'dark' ? css.lightTxt : css.darkTxt)}
            id={cellData.id.toString()}
            value={cellData.value}
            onChange={(event) => handleUpdate(event)}
            // disabled={!edited}
            disabled={cellData.type === "id" || cellData.disabled ? true : !edited }
            margin="none"
            inputProps={{
              'aria-label': 'Description',
            }} 
            autoComplete='off'
            />
        </TableCell>
      );
  }
}

EditableCell.propTypes = {
  inputType: PropTypes.string.isRequired,
  cellData: PropTypes.object.isRequired,
  updateRow: PropTypes.func.isRequired,
  edited: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired,
};

export default EditableCell;
