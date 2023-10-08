import { InfoOutlined } from '@mui/icons-material';
import {
  Alert, CircularProgress, IconButton,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import api from '../api/GeneralListApis';
import payrollMessages from '../messages';

/**
 * @usage

```js
<VacationBalancePopup employeeId={employeeId} />
```
 */
function VacationBalancePopup(props) {
  const { employeeId, intl } = props;
  const locale = useSelector((state) => state.language.locale);

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState([]);

  const fetchVacationBalance = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).getVacationBalanceById(employeeId);
      setBalance(response);
    } catch (er) {
      setError(er);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      if (isOpen) {
        fetchVacationBalance();
        setError('');
      }
    } else {
      setError(intl.formatMessage(payrollMessages.noEmployeeIdProvide));
    }
  }, [isOpen]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onBtnClick = () => {
    setIsOpen(true);
  };

  const RenderContent = () => {
    if (error) {
      return <Alert severity='error'>
        <FormattedMessage {...payrollMessages.noEmployeeIdProvide} />
      </Alert>;
    }

    if (isLoading) {
      return <Stack direction='row' justifyContent='center' alignItems='center' sx={{
        height: '100px'
      }} >
        <CircularProgress />
      </Stack>;
    } if (balance.length > 0) {
      return <Grid/>;
    }
  };

  const Grid = () => <TableContainer >
    <Table sx={{ minWidth: 450, m: 0 }} >
      <TableHead>
        <TableRow>
          <TableCell> <FormattedMessage {...payrollMessages.vacation} /></TableCell>
          <TableCell> <FormattedMessage {...payrollMessages.balance} /></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {balance.map((row) => (
          <TableRow
            key={row.vacationId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.vacName}
            </TableCell>
            <TableCell >{row.vacBalance}</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>;

  return (
    <>
      <IconButton onClick={onBtnClick}>
        <InfoOutlined />
      </IconButton>

      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          <FormattedMessage {...payrollMessages.vacationBalance} />
        </DialogTitle>

        <DialogContent sx={{ minWidth: '400px' }}>
          <RenderContent/>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            <FormattedMessage {...payrollMessages.close} />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default injectIntl(VacationBalancePopup);
