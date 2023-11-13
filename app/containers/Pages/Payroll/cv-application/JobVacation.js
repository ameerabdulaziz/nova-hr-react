import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { Box, Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../../App/ThemeWrapper';
import Typography from '../../../UiElements/Typography';
import PayRollLoader from '../Component/PayRollLoader';
import API from './api';
import JobCard from './components/JobCard';
import Section from './components/Section';
import Layout from './layouts/Layout.cv';
import messages from './messages';

function JobVacation(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);

  const changeMode = useContext(ThemeContext);

  const [jobs, setJobs] = useState([]);
  const [config, setConfig] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobListData = async () => {
    setIsLoading(true);

    try {
      const response = await API(locale).GetJobList();
      setJobs(response);

      const configResponse = await API(locale).GetCompanyData();
      setConfig(configResponse);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobListData();
  }, []);

  return (
    <PayRollLoader isLoading={isLoading}>
      <Layout isLoading={isLoading} config={config} changeMode={changeMode}>
        <Section title={config.cvTitle} description={config.cvSubTitle}>
          <div className='cv-container'>
            <Grid
              container
              mt={5}
              spacing={3}
              justifyContent='center'
              alignItems='stretch'
            >
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <Grid item xs={12} md={6} lg={4} key={job.id}>
                    <JobCard job={job} />
                  </Grid>
                ))
              ) : (
                <Stack
                  direction='row'
                  sx={{ minHeight: 200 }}
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'
                >
                  <Box>
                    <HomeRepairServiceIcon
                      sx={{ color: '#a7acb2', fontSize: 30 }}
                    />
                    <Typography color='#a7acb2' variant='body1'>
                      {intl.formatMessage(messages.noJobs)}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Grid>
          </div>
        </Section>
      </Layout>
    </PayRollLoader>
  );
}

JobVacation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobVacation);
