import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PayRollLoader from '../Component/PayRollLoader';
import API from './api';
import JobCard from './components/JobCard';
import Section from './components/Section';

function JobVacation() {
  const locale = useSelector((state) => state.language.locale);

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobListData = async () => {
    setIsLoading(true);

    try {
      const response = await API(locale).GetJobList();
      setJobs(response);
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
      <Section
        title='We Offer Great Jobs'
        description='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using.'
      >
        <div className='cv-container'>
          <Grid
            container
            mt={5}
            spacing={3}
            justifyContent='center'
            alignItems='stretch'
          >
            {jobs.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job.id}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Section>
    </PayRollLoader>
  );
}

export default JobVacation;
