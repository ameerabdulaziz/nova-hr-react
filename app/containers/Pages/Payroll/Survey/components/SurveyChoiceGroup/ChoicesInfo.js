import { BorderColor, Delete } from '@mui/icons-material';
import PollIcon from '@mui/icons-material/Poll';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
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
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { uuid } from '../../../helpers';
import payrollMessages from '../../../messages';
import messages from '../../messages';
import ChoicePopup from './ChoicePopup';

function ChoicesInfo(props) {
  const { intl, setFormInfo, formInfo } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isChoicePopupOpen, setIsChoicePopupOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  useEffect(() => {
    if (selectedChoice) {
      setIsChoicePopupOpen(true);
    }
  }, [selectedChoice]);

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChoicePopupBtnClick = async () => {
    setIsChoicePopupOpen(true);
  };

  const visibleRows = useMemo(
    () => formInfo.choiceList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, formInfo.choiceList]
  );

  const onChoiceRemove = (index) => {
    const clonedItems = [...formInfo.choiceList];

    clonedItems.splice(index, 1);

    if (visibleRows.length === 1) {
      setPage((prev) => (prev === 0 ? 0 : prev - 1));
    }

    setFormInfo((prev) => ({
      ...prev,
      choiceList: clonedItems,
    }));
  };

  const onChoiceSave = (choice) => {
    if (selectedChoice) {
      const clonedItems = [...formInfo.choiceList];
      const index = clonedItems.findIndex((item) => item.id === choice.id);

      if (index !== -1) {
        clonedItems[index] = choice;

        setFormInfo((prev) => ({
          ...prev,
          choiceList: clonedItems,
        }));
      }
      setSelectedChoice(null);
    } else {
      setFormInfo((prev) => ({
        ...prev,
        choiceList: [
          ...prev.choiceList,
          { ...choice, id: uuid() },
        ],
      }));
    }

    setIsChoicePopupOpen(false);
  };

  const onChoiceEdit = (choice) => {
    setSelectedChoice(choice);
  };

  return (
    <>
      <ChoicePopup
        isOpen={isChoicePopupOpen}
        setIsOpen={setIsChoicePopupOpen}
        onSave={onChoiceSave}
        setSelectedChoice={setSelectedChoice}
        selectedChoice={selectedChoice}
      />

      <Card>
        <CardContent sx={{ p: '16px!important' }}>
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            mb={3}
          >
            <Grid item>
              <Typography variant='h6'>
                {intl.formatMessage(messages.choicesInfo)}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant='contained'
                onClick={onChoicePopupBtnClick}
                color='primary'
              >
                {intl.formatMessage(messages.addOrChangeChoice)}
              </Button>
            </Grid>
          </Grid>

          {formInfo.choiceList.length > 0 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {intl.formatMessage(payrollMessages.arName)}
                      </TableCell>

                      <TableCell>
                        {intl.formatMessage(payrollMessages.enName)}
                      </TableCell>
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
                        <TableCell component='th' scope='row'>
                          {choice.arName}
                        </TableCell>

                        <TableCell>{choice.enName}</TableCell>
                        <TableCell>
                          <Stack direction='row' gap={2}>
                            <IconButton
                              color='primary'
                              size='small'
                              onClick={() => onChoiceEdit(choice)}
                            >
                              <BorderColor />
                            </IconButton>

                            <IconButton
                              color='error'
                              size='small'
                              onClick={() => onChoiceRemove(index)}
                            >
                              <Delete />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component='div'
                count={formInfo.choiceList.length}
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
                <PollIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
                <Typography color='#a7acb2' variant='body1'>
                  {intl.formatMessage(messages.noChoicesFound)}
                </Typography>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
}

ChoicesInfo.propTypes = {
  intl: PropTypes.object.isRequired,
  formInfo: PropTypes.object.isRequired,
  setFormInfo: PropTypes.func.isRequired,
};

export default injectIntl(ChoicesInfo);
