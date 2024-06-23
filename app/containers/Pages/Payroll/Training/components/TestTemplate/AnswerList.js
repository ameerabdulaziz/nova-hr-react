import { Delete } from '@mui/icons-material';
import { Checkbox, IconButton, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function AnswerList(props) {
  const { intl, questionInfo, setQuestionInfo } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => questionInfo.choiceList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, questionInfo.choiceList]
  );

  const onCheckboxChange = (evt, index) => {
    if (evt.target.checked) {
      const clonedItems = questionInfo.choiceList.map((item) => ({
        ...item,
        isCorrect: false,
      }));

      const choice = visibleRows[index];

      const choiceIndex = clonedItems.findIndex(
        (item) => item.id === choice.id
      );

      if (choiceIndex !== -1) {
        clonedItems[choiceIndex].isCorrect = evt.target.checked;
      }

      setQuestionInfo((prev) => ({
        ...prev,
        choiceList: clonedItems,
      }));
    }
  };

  const onInputChange = (evt, choice) => {
    const choiceIndex = questionInfo.choiceList.findIndex(
      (item) => item.id === choice.id
    );

    const clonedAnswers = [...questionInfo.choiceList];

    if (choiceIndex !== -1) {
      clonedAnswers[choiceIndex] = {
        ...choice,
        [evt.target.name]: evt.target.value,
      };
    }

    setQuestionInfo((prev) => ({ ...prev, choiceList: clonedAnswers }));
  };

  const onChoiceRemove = (index) => {
    const clonedItems = [...questionInfo.choiceList];

    clonedItems.splice(index, 1);

    if (visibleRows.length === 1) {
      setPage((prev) => (prev === 0 ? 0 : prev - 1));
    }

    if (clonedItems.length === 1) {
      clonedItems[0].isCorrect = true;
    }

    setQuestionInfo((prev) => ({
      ...prev,
      choiceList: clonedItems,
    }));
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                {intl.formatMessage(messages.correctChoice)}
              </TableCell>

              <TableCell>
                {intl.formatMessage(payrollMessages.enName)}
              </TableCell>

              <TableCell>
                {intl.formatMessage(payrollMessages.arName)}
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((choice, index) => (
              <TableRow
                key={choice.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>
                  <Checkbox
                    checked={choice.isCorrect}
                    disabled={questionInfo.choiceList.length === 1}
                    onChange={(evt) => onCheckboxChange(evt, index)}
                    name='isSelect'
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    name='enName'
                    value={choice.enName}
                    required
                    onChange={(evt) => onInputChange(evt, choice)}
                    label={intl.formatMessage(payrollMessages.enName)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    name='arName'
                    value={choice.arName}
                    required
                    onChange={(evt) => onInputChange(evt, choice)}
                    label={intl.formatMessage(payrollMessages.arName)}
                    fullWidth
                    variant='outlined'
                    autoComplete='off'
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    color='error'
                    disabled={questionInfo.choiceList.length === 1}
                    onClick={() => onChoiceRemove(index)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={questionInfo.choiceList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
}

AnswerList.propTypes = {
  intl: PropTypes.object.isRequired,
  questionInfo: PropTypes.object.isRequired,
  setQuestionInfo: PropTypes.func.isRequired,
};

export default injectIntl(AnswerList);
