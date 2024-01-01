import Grid from '@mui/material/Grid';
import React from 'react';
import ProfileWidget from '../Widget/ProfileWidget';

function About() {
  return (
    <Grid container direction='row' spacing={3}>
      <Grid item md={6} xs={12}>
        <ProfileWidget />
      </Grid>
    </Grid>
  );
}

export default About;
