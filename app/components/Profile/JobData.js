import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import PapperBlock from '../PapperBlock/PapperBlock';
import Quote from '../Quote/Quote';
import messages from './messages';
import useStyles from './profile-jss';

function CompanyDocument(props) {
  const { intl } = props;
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
          <Quote
            align='left'
            content="Imagine all the people living life in peace. You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us, and the world will be as one."
            footnote='John Lennon'
          />
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
          <Quote
            align='left'
            content="Imagine all the people living life in peace. You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us, and the world will be as one."
            footnote='John Lennon'
          />
        </PapperBlock>
      </Grid>
    </Grid>
  );
}

CompanyDocument.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CompanyDocument);
