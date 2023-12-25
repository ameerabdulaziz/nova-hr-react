import { Delete } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
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
import React, { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../../messages';
import CompetencyPopup from './CompetencyPopup';

function CompetencyInfo(props) {
  const {
    intl, competencyList, setFormInfo, formInfo
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isCompetencyPopupOpen, setIsCompetencyPopupOpen] = useState(false);

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => formInfo.asTemplateCompetency.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, formInfo.asTemplateCompetency]
  );

  const onCompetencyRemove = (id) => {
    if (visibleRows.length === 1) {
      setPage((prev) => (prev === 0 ? 0 : prev - 1));
    }

    const clonedItems = [...formInfo.asTemplateCompetency];
    const indexToRemove = clonedItems.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      clonedItems.splice(indexToRemove, 1);
      setFormInfo((prev) => ({
        ...prev,
        asTemplateCompetency: clonedItems,
      }));
    }
  };

  const onCompetencyPopupBtnClick = () => {
    setIsCompetencyPopupOpen(true);
  };

  const onCompetencySave = (items) => {
    setFormInfo((prev) => ({
      ...prev,
      asTemplateCompetency: items,
    }));

    setIsCompetencyPopupOpen(false);
  };

  return (
    <>
      <CompetencyPopup
        isOpen={isCompetencyPopupOpen}
        setIsOpen={setIsCompetencyPopupOpen}
        onSave={onCompetencySave}
        selectedCompetency={formInfo.asTemplateCompetency}
        competencyList={competencyList}
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
                {intl.formatMessage(messages.competencyInfo)}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                onClick={onCompetencyPopupBtnClick}
                color='primary'
              >
                {intl.formatMessage(messages.addOrChangeCompetency)}
              </Button>
            </Grid>
          </Grid>

          {formInfo.asTemplateCompetency.length > 0 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {intl.formatMessage(messages.competencyName)}
                      </TableCell>
                      <TableCell>
                        {intl.formatMessage(messages.totalGrade)}
                      </TableCell>
                      <TableCell>
                        {intl.formatMessage(messages.actions)}
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {visibleRows.map((competency) => (
                      <TableRow
                        key={competency.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {competency.name}
                        </TableCell>
                        <TableCell>{competency.totalGrade}</TableCell>
                        <TableCell>
                          <IconButton
                            color='error'
                            onClick={() => onCompetencyRemove(competency.id)}
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
                count={formInfo.asTemplateCompetency.length}
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
                <DescriptionIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
                <Typography color='#a7acb2' variant='body1'>
                  {intl.formatMessage(messages.noCompetencyFound)}
                </Typography>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
}

CompetencyInfo.propTypes = {
  intl: PropTypes.object.isRequired,
  formInfo: PropTypes.object.isRequired,
  competencyList: PropTypes.array.isRequired,
  setFormInfo: PropTypes.func.isRequired,
};

export default injectIntl(CompetencyInfo);
