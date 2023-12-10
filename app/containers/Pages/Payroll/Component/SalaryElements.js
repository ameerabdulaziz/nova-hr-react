import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../Recruitment/messages';
import payrollMessages from '../messages';

function SalaryElements(props) {
  const {
    intl, dataList, setDataList, salaryElementsList
  } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [popupState, setPopupState] = useState({
    id: '',
    elementId: null,
    elementVal: '',
    elementDesc: '',
  });

  const closePopup = () => {
    setIsPopupOpen(false);

    setSelectedRow(null);

    setPopupState({
      id: '',
      elementId: null,
      elementVal: '',
      elementDesc: '',
    });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    if (selectedRow !== null) {
      const selectedRowData = dataList[selectedRow];

      setIsPopupOpen(true);

      setPopupState(selectedRowData);
    }
  }, [selectedRow]);

  const getMappedSalaryItems = useCallback(() => {
    const selectedIds = dataList.map((item) => item.id);

    const allExceptUsed = salaryElementsList.filter(
      (item) => !selectedIds.includes(item.id)
    );

    if (selectedRow === null) {
      return allExceptUsed;
    }

    const selectedRowData = dataList[selectedRow];
    const selectedElement = salaryElementsList.find(
      (item) => item.id === selectedRowData.elementId
    );

    return [...allExceptUsed, selectedElement];
  }, [dataList, salaryElementsList, selectedRow]);

  const onAutoCompletePopupChange = (value, name) => {
    setPopupState((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onNumericInputChange = (evt) => {
    setPopupState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onInputChange = (evt) => {
    setPopupState((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onDeleteBtnClick = (id) => {
    const dataListCopy = [...dataList];
    const indexToRemove = dataListCopy.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      dataListCopy.splice(indexToRemove, 1);
      setDataList(dataListCopy);
    }
  };

  const onFormSubmit = async () => {
    const dataListCopy = [...dataList];

    if (selectedRow !== null) {
      dataListCopy[selectedRow] = popupState;
    } else {
      dataListCopy.push({ ...popupState, id: popupState.elementId });
    }

    setDataList(dataListCopy);

    closePopup();
  };

  return (
    <>
      <Dialog
        open={isPopupOpen}
        onClose={closePopup}
        PaperProps={{
          sx: (th) => ({
            [th.breakpoints.down('md')]: {
              width: '100%',
            },
            width: '70vw',
          }),
        }}
      >
        <DialogTitle>
          <FormattedMessage {...payrollMessages.Actions} />
        </DialogTitle>

        <DialogContent sx={{ pt: '10px !important' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={getMappedSalaryItems()}
                value={
                  getMappedSalaryItems().find(
                    (item) => item.id === popupState.elementId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompletePopupChange(value, 'elementId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.elementName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name='elementVal'
                onChange={onNumericInputChange}
                value={popupState.elementVal}
                label={intl.formatMessage(messages.value)}
                variant='outlined'
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name='elementDesc'
                onChange={onInputChange}
                value={popupState.elementDesc}
                label={intl.formatMessage(messages.description)}
                variant='outlined'
                fullWidth
                multiline
                rows={1}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closePopup}>
            <FormattedMessage {...payrollMessages.cancel} />
          </Button>

          <Button variant='contained' onClick={onFormSubmit}>
            <FormattedMessage {...messages.confirm} />
          </Button>
        </DialogActions>
      </Dialog>

      <Button onClick={openPopup} color='primary' variant='contained'>
        <FormattedMessage {...messages.addSalaryElements} />
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>{intl.formatMessage(messages.elementName)}</TableCell>
              <TableCell>{intl.formatMessage(messages.value)}</TableCell>
              <TableCell>{intl.formatMessage(messages.description)}</TableCell>
              <TableCell>
                {intl.formatMessage(payrollMessages.Actions)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.length > 0 ? (
              dataList.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {
                      salaryElementsList.find((item) => item.id === row.elementId)
                        ?.name
                    }
                  </TableCell>
                  <TableCell>{row.elementVal}</TableCell>
                  <TableCell>{row.elementDesc}</TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1}>
                      <IconButton onClick={() => setSelectedRow(index)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => onDeleteBtnClick(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' colSpan={4}>
                  {intl.formatMessage(payrollMessages.noMatchingRecord)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

SalaryElements.propTypes = {
  intl: PropTypes.object.isRequired,
  dataList: PropTypes.array.isRequired,
  setDataList: PropTypes.func.isRequired,
  salaryElementsList: PropTypes.array.isRequired,
};

export default injectIntl(SalaryElements);
