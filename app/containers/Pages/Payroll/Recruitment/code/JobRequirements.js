/* eslint-disable no-unused-vars */
import { Autocomplete, Grid, TextField } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import JobRequirementsData from '../api/JobRequirementsData';
import messages from '../messages';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function JobRequirements(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const title = localStorage.getItem('MenuName');
  const locale = useSelector((state) => state.language.locale);

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const GetJobs = async () => {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobsList();
      setJobsList(jobs || []);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetJobs();
  }, []);

  const anchorTable = [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'arDescription',
      label: 'name',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },
    {
      name: 'enDescription',
      label: 'enname',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },
    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <Grid container direction='row'>
          <Grid item xs={12} md={4}>
            <Autocomplete
              options={jobsList}
              value={selectedJob}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(_, value) => setSelectedJob(value)}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label={intl.formatMessage(messages.jobName)}
                />
              )}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
            />
          </Grid>
        </Grid>
      </PapperBlock>

      <div className={classes.root}>
        <EditTable
          anchorTable={anchorTable}
          title={selectedJob?.name ?? ''}
          API={selectedJob ? JobRequirementsData(selectedJob.id) : ""}
        />
      </div>
    </PayRollLoader>
  );
}

JobRequirements.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobRequirements);
