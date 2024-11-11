import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import { injectIntl } from 'react-intl';
import CounterWidget from '../Counter/CounterWidget';
import messages from './messages';
import useStyles from './widget-jss';
import CoPresentSharpIcon from '@mui/icons-material/CoPresentSharp';
import DirectionsWalkSharpIcon from '@mui/icons-material/DirectionsWalkSharp';
import Diversity3SharpIcon from '@mui/icons-material/Diversity3Sharp';
import FeedSharpIcon from '@mui/icons-material/FeedSharp';

function CounterIconWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2.4}>
          <CounterWidget
            color="firstCard"
            start={0}
            end={207}
            duration={3}
            title={intl.formatMessage(messages.Employee)}
          >
            <SupervisorAccount className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={2.4}>
          <CounterWidget
            color="secondCard"
            start={0}
            end={207}
            duration={3}
            title={intl.formatMessage(messages.newHired)}
          >
            <CoPresentSharpIcon className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={2.4}>
          <CounterWidget
            color="thirdCard"
            start={0}
            end={300}
            duration={3}
            title={intl.formatMessage(messages.inProbation)}
          >
            <Diversity3SharpIcon className={classes.counterIcon} />
            
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={2.4}>
          <CounterWidget
            color="forthCard"
            start={0}
            end={67}
            duration={3}
            title={intl.formatMessage(messages.resignation)}
          >
            <FeedSharpIcon className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={2.4}>
          <CounterWidget
            color="fifthCard"
            start={0}
            end={70}
            duration={3}
            title={intl.formatMessage(messages.terminated)}
          >
            {/* <CollectionsBookmark className={classes.counterIcon} /> */}
            <DirectionsWalkSharpIcon className={classes.counterIcon} ></DirectionsWalkSharpIcon>
          </CounterWidget>
        </Grid>
      </Grid>
    </div>
  );
}

CounterIconWidget.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(CounterIconWidget);
