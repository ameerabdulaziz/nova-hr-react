import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import css from 'enl-styles/Table.scss';

function AutoComplete(props) {
  const theme = useTheme();
  const { cellData, edited, options, updateRow, branch } = props;

  const handleChange = useCallback((event, newValue) => {
    updateRow({ target: { name: cellData.type, value: newValue } }, branch);
  }, [updateRow, branch, cellData.type]);

  return (
<TableCell padding="none">
  <Autocomplete
    id={cellData.id.toString()}
    className={clsx(
      css.crudInput,
      cellData.disabled ? css.crudInputId : null,
      theme.palette.mode === 'dark' ? css.lightTxt : css.darkTxt
    )}
    value={cellData.value || null}
    options={options}
    getOptionLabel={(option) => option.toString()}
    sx={{ width: '100%' }}
    onChange={handleChange}
    disabled={cellData.disabled ? true : !edited}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="standard"
        margin="none"
        sx={{
          '& .MuiInputBase-root': {
            border: 'none',
          },
          '& .MuiInput-underline:before': {
            borderBottom: 'none',
          },
          '& .MuiInput-underline:after': {
            borderBottom: 'none',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      />
    )}
  />
</TableCell>

  );
}

AutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
  cellData: PropTypes.object.isRequired,
  updateRow: PropTypes.func.isRequired,
  edited: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired,
};

export default AutoComplete;
