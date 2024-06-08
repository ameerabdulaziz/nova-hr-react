import { People } from '@mui/icons-material';
import {
  Box, Card, CardContent, Grid, Stack, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import messages from '../../messages';

function FunctionsList(props) {
  const { functions, intl } = props;

  return (
    <Grid container spacing={2} alignItems='stretch'>
      {functions.map((item) => (
        <Grid item xs={12} key={item.id} md={6}>
          <Card sx={{ height: '100%' }} variant='outlined'>
            <CardContent sx={{ p: '16px!important' }}>
              <Typography variant='h5' sx={{ fontWeight: 'light', mb: 2 }}>
                {item.arName}
              </Typography>

              {item.employees.length > 0 ? (
                item.employees.map((employee) => (
                  <Typography
                    variant='body1'
                    key={employee.employeeId}
                    color='text.secondary'
                  >
                    {employee.employeeName}
                  </Typography>
                ))
              ) : (
                <Stack
                  direction='row'
                  sx={{ minHeight: 150 }}
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'
                >
                  <Box>
                    <People sx={{ color: '#a7acb2', fontSize: 20 }} />
                    <Typography color='#a7acb2' variant='body1'>
                      {intl.formatMessage(messages.noEmployees)}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

FunctionsList.propTypes = {
  intl: PropTypes.object.isRequired,
  functions: PropTypes.array.isRequired,
};

export default injectIntl(FunctionsList);
