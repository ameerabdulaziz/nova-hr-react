import { HomeRepairService } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function ChooseQuestionPopup(props) {
  const {
    intl, isOpen, setIsOpen, questionList, setFormInfo, formInfo
  } = props;

  const locale = useSelector((state) => state.language.locale);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [questionsClone, setQuestionsClone] = useState([]);
  const [query, setQuery] = useState('');

  const resetData = () => {
    setRowsPerPage(10);
    setPage(0);
    setQuery('');
    setQuestionsClone([]);
  };

  const getSelectedQuestions = useCallback(() => {
    const selectedQuestionsIds = questionsClone
      .filter((item) => item.isSelect)
      .map((item) => item.questionId);

    return questionsClone
      .filter((item) => selectedQuestionsIds.includes(item.questionId));
  }, [questionList, questionsClone]);

  const init = () => {
    const mappedQuestions = questionList.map((item) => ({ ...item, isSelect: false }));

    setQuestionsClone(mappedQuestions);
  };

  useEffect(() => {
    if (isOpen) {
      init();
    } else {
      resetData();
    }
  }, [isOpen]);

  const searchAlgorithm = (question) => {
    const initQuery = query.toLowerCase();
    const enName = question.enName.toLowerCase();
    const arName = question.arName.toLowerCase();
    const questionGroup = question.questionGroup.toLowerCase();

    const isExist = enName.includes(initQuery)
      || arName.includes(initQuery)
      || questionGroup.includes(initQuery);

    return isExist;
  };

  const filteredQuestions = useMemo(() => {
    let filteredData = [...questionsClone];

    if (query.length !== 0) {
      filteredData = filteredData.filter(searchAlgorithm);
      setPage(0);
    }

    return filteredData;
  }, [questionsClone, query]);

  const visibleRows = useMemo(
    () => filteredQuestions.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, filteredQuestions, query]
  );

  const onPopupClose = () => {
    setIsOpen(false);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const selectedQuestions = getSelectedQuestions();

    setIsOpen(false);

    setFormInfo((prev) => ({
      ...prev,
      questionList: [...prev.questionList, ...selectedQuestions],
    }));
  };

  const onCheckboxChange = (evt, index) => {
    const clonedItems = [...questionsClone];
    const question = visibleRows[index];

    const questionIndex = clonedItems.findIndex(
      (item) => item.questionId === question.questionId
    );

    if (questionIndex !== -1) {
      clonedItems[questionIndex].isSelect = evt.target.checked;
      clonedItems[questionIndex].isNew = evt.target.checked;
    }

    setQuestionsClone(clonedItems);
  };

  const onAllCheckboxChange = (evt) => {
    const clonedItems = [...filteredQuestions];

    visibleRows.forEach((question) => {
      const questionIndex = clonedItems.findIndex(
        (item) => item.questionId === question.questionId
      );

      if (questionIndex !== -1) {
        clonedItems[questionIndex].isSelect = evt.target.checked;
        clonedItems[questionIndex].isNew = evt.target.checked;
      }
    });

    setQuestionsClone(clonedItems);
  };

  const isAllSelect = useCallback(
    () => visibleRows.every((item) => item.isSelect),
    [visibleRows]
  );

  const isSomeSelect = useCallback(() => {
    const filtered = visibleRows.filter((item) => item.isSelect).length;

    return filtered > 0 && filtered < visibleRows.length;
  }, [visibleRows]);

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog
      open={isOpen}
      component='form'
      onSubmit={onFormSubmit}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '80vw',
          maxWidth: '80vw',
        }),
      }}
    >
      <DialogTitle>{intl.formatMessage(messages.addQuestion)}</DialogTitle>

      <DialogContent>
        <Grid container mb={3} gap={3} pt={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name='query'
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
              label={intl.formatMessage(messages.question)}
              fullWidth
              variant='outlined'
              autoComplete='off'
            />
          </Grid>
        </Grid>

        {filteredQuestions.length > 0 ? (
          <>
            <TableContainer>
              <Table size='small' sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 30 }}>
                      <Checkbox
                        checked={isAllSelect()}
                        onChange={onAllCheckboxChange}
                        indeterminate={isSomeSelect()}
                        name='all'
                      />
                    </TableCell>

                    <TableCell>
                      {intl.formatMessage(messages.question)}
                    </TableCell>

                    <TableCell>
                      {intl.formatMessage(messages.questionGroup)}
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {visibleRows.map((item, index) => (
                    <TableRow
                      key={item.questionId}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>
                        <Checkbox
                          checked={visibleRows[index].isSelect}
                          onChange={(evt) => onCheckboxChange(evt, index)}
                          name='isSelect'
                        />
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {locale === 'en' ? item.enName : item.arName}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {item.questionGroup}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component='div'
              count={filteredQuestions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </>
        ) : (
          <Stack
            direction='row'
            sx={{ minHeight: 200 }}
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <Box>
              <HomeRepairService sx={{ color: '#a7acb2', fontSize: 30 }} />
              <Typography color='#a7acb2' variant='body1'>
                {intl.formatMessage(messages.noQuestions)}
              </Typography>
            </Box>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onPopupClose}>
          {intl.formatMessage(payrollMessages.close)}
        </Button>

        <Button type='submit' variant='contained'>
          {intl.formatMessage(payrollMessages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChooseQuestionPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  questionList: PropTypes.array.isRequired,
  setFormInfo: PropTypes.func.isRequired,
  formInfo: PropTypes.object.isRequired,
};

export default injectIntl(ChooseQuestionPopup);
