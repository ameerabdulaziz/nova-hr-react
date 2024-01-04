import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import PapperBlock from '../../../../../components/PapperBlock/PapperBlock';
import useStyles from '../../../../../components/Profile/profile-jss';
import Quote from '../../../../../components/Quote/Quote';
import messages from '../messages';

function JobData(props) {
  const { intl, profileInfo } = props;
  const { classes } = useStyles();

  return (
    <Grid
      container
      alignItems='flex-start'
      justifyContent='space-between'
      direction='row'
      spacing={2}
      className={classes.rootx}
    >
      <Grid item md={6} xs={12}>
        <PapperBlock
          title={intl.formatMessage(messages.jobDescription)}
          icon='format_quote'
          whiteBg
          noMargin
          desc=''
        >
          {profileInfo.jobDescription.length > 0 ? (
            <Grid container spacing={2}>
              {profileInfo.jobDescription.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Quote
                    align='left'
                    content={item.jobDesc}
                    footnote={item.jobTitle}
                  />
                </Grid>
              ))}
            </Grid>
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
                  {intl.formatMessage(messages.noJobDescription)}
                </Typography>
              </Box>
            </Stack>
          )}
        </PapperBlock>
      </Grid>

      <Grid item md={6} xs={12}>
        <PapperBlock
          title={intl.formatMessage(messages.jobKPI)}
          icon='format_quote'
          whiteBg
          noMargin
          desc=''
        >
          {profileInfo.employeeJobKpi.length > 0 ? (
            <Grid container spacing={2}>
              {profileInfo.employeeJobKpi.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Quote align='left' content={item.kpidesc} footnote='' />
                </Grid>
              ))}
            </Grid>
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
                  {intl.formatMessage(messages.noJobKPI)}
                </Typography>
              </Box>
            </Stack>
          )}
        </PapperBlock>
      </Grid>
    </Grid>
  );
}

JobData.propTypes = {
  intl: PropTypes.object.isRequired,
  profileInfo: PropTypes.object.isRequired,
};

export default injectIntl(JobData);
