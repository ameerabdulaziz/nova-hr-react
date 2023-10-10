import { InfoOutlined } from '@mui/icons-material';
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
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
<GovernmentVacationPopup vacationId={vacationId} />
```
 */
function GovernmentVacationPopup(props) {
  const { vacationId, intl } = props;
  const locale = useSelector((state) => state.language.locale);

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState([]);

  const fetchVacationBalance = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).getVacationBalanceById(vacationId);
      setBalance(response);
    } catch (er) {
      setError(JSON.stringify(er));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (vacationId) {
      if (isOpen) {
        fetchVacationBalance();
        setError('');
      }
    } else {
      setError(intl.formatMessage(payrollMessages.noVacationIdProvide));
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
      return (
        <Alert severity='error'>
          {error && error !== '{}'
            ? error
            : intl.formatMessage(payrollMessages.somethingWentWrong)}
        </Alert>
      );
    }

    if (isLoading) {
      return (
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{
            height: '100px',
          }}
        >
          <CircularProgress />
        </Stack>
      );
    }
    if (balance.length > 0) {
      return <GridRows />;
    }
  };

  const GridRows = () => (
    <Box sx={{ width: '500px' }}>
      <Grid container spacing={1}>
        <Grid item md={6}></Grid>

        <Grid item md={6}>
          <Typography variant='h6' fontWeight='normal'>
            {intl.formatMessage(payrollMessages.employeeDeduced)}
          </Typography>
        </Grid>
      </Grid>

      {balance.map((row) => (
        <Grid container spacing={1} my={2} key={row.vacationId}>
          <Grid item md={6}>
            <TextField
              fullWidth
              label={intl.formatMessage(payrollMessages.daysCount)}
              disabled
              value={10}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {intl.formatMessage(payrollMessages.day)}
                  </InputAdornment>
                ),
              }}
              label={intl.formatMessage(payrollMessages.count_value)}
              disabled
              value={10}
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );

  return (
    <>
      <IconButton onClick={onBtnClick}>
        <InfoOutlined />
      </IconButton>

      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          <FormattedMessage {...payrollMessages.sickLeave} />
        </DialogTitle>

        <DialogContent sx={{ minWidth: '400px' }}>
          <RenderContent />
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

export default injectIntl(GovernmentVacationPopup);
