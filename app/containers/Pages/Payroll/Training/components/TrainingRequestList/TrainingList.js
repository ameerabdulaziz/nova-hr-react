import { Checkbox } from '@mui/material';
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
import { formateDate } from '../../../helpers';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function TrainingList(props) {
  const {
    intl, trainingCourse, setFormInfo, formInfo
  } = props;

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
    () => trainingCourse.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, trainingCourse]
  );

  const onCheckboxChange = (evt, item) => {
    let trainingId = item.id;

    if (!evt.target.checked) {
      trainingId = null;
    }

    setFormInfo((prev) => ({
      ...prev,
      trainingId,
    }));
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size='small'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>

              <TableCell>
                {intl.formatMessage(payrollMessages.arName)}
              </TableCell>

              <TableCell>
                {intl.formatMessage(payrollMessages.enName)}
              </TableCell>

              <TableCell>
                {intl.formatMessage(payrollMessages.fromdate)}
              </TableCell>

              <TableCell>
                {intl.formatMessage(payrollMessages.todate)}
              </TableCell>

              <TableCell>
                {intl.formatMessage(messages.trainerName)}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>
                  <Checkbox
                    checked={formInfo.trainingId === item.id}
                    onChange={(evt) => onCheckboxChange(evt, item)}
                    name='isSelect'
                  />
                </TableCell>

                <TableCell>{item.arName}</TableCell>

                <TableCell>{item.enName}</TableCell>

                <TableCell>{formateDate(item.fromDate)}</TableCell>

                <TableCell>{formateDate(item.toDate)}</TableCell>

                <TableCell>{item.trainerName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={trainingCourse.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
}

TrainingList.propTypes = {
  intl: PropTypes.object.isRequired,
  formInfo: PropTypes.object.isRequired,
  setFormInfo: PropTypes.func.isRequired,
  trainingCourse: PropTypes.array.isRequired,
};

export default injectIntl(TrainingList);
