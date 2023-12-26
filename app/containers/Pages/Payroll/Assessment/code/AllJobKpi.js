import { Autocomplete, Grid, TextField } from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { EditTable } from '../../../../Tables/demos';
import GeneralListApis from '../../api/GeneralListApis';
import AllJobKpiData from '../api/AllJobKpiData';
import messages from '../messages';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function AllJobKpi(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const title = localStorage.getItem('MenuName');

  const [job, setJob] = useState(null);
  const [jobList, setJobList] = useState([]);

  const fetchNeededData = async () => {
    try {
      const jobs = await GeneralListApis(locale).GetJobsList();

      setJobList(jobs);
    } catch (err) {
      //
    } finally {
      //
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
      name: 'enJobKpi',
      label: 'enJobKpi',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: false,
    },

    {
      name: 'arJobKpi',
      label: 'arJobKpi',
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
    <div>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <Grid container mt={3}>
          <Grid item md={6}>
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
          API={AllJobKpiData(job?.id ?? 0)}
        />
      </div>
    </div>
  );
}

AllJobKpi.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AllJobKpi);
