import { Autocomplete, Grid, TextField } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import GeneralListApis from '../../api/GeneralListApis';
import JobDescriptionsData from '../api/JobDescriptionsData';
import messages from '../messages';
import PayRollLoader from '../../Component/PayRollLoader';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function JobDescriptions(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [jobList, setJobList] = useState([]);
  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobsList();

      setJobList(jobs);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
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
      name: 'enJobDesc',
      label: 'enJobDesc',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'arJobDesc',
      label: 'arJobDesc',
      type: 'text',
      width: 'auto',
      initialValue: '',
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
        <Grid container mt={3}>
          <Grid item xs={6} lg={3}>
            <Autocomplete
              options={jobList}
              value={jobList.find((item) => item.id === job?.id) ?? null}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => setJob(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.jobName)}
                />
              )}
            />
          </Grid>
        </Grid>
      </PapperBlock>

      <div className={classes.root}>
        <EditTable
          anchorTable={anchorTable}
          title={job?.name ?? ''}
          API={JobDescriptionsData(job?.id ?? 0)}
        />
      </div>
    </PayRollLoader>
  );
}

JobDescriptions.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobDescriptions);
