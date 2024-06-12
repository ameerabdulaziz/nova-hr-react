import { Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import examLogo from '../../../Assets/Employee-Assessment/exam-logo.png';
import examLogo2 from '../../../Assets/Employee-Assessment/info_graphic_1.svg';
import useStyles from '../../../Style';
import messages from '../../messages';

function WelcomeScreen(props) {
  const { surveyInfo, intl, setIsSurveyStart } = props;

  const { classes } = useStyles();

  const onStartSurveyBtnClick = () => {
    setIsSurveyStart(true);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} className={`${style.gridContainerSty} `}>
        <div className={`${style.mainContainer} ${classes.surveyMainSty}`}>
          <div>
            <img src={examLogo2} alt='examLogo2' />
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={6} className={`${style.gridContainerSty} `}>
        <div className={`${style.startExamContainer}`}>
          <div>
            <img src={examLogo} alt='examLogo' />

            <p>{surveyInfo.name}</p>

            <Button
              variant='contained'
              color='primary'
              disabled={surveyInfo.templateId === null}
              onClick={onStartSurveyBtnClick}
            >
              {intl.formatMessage(messages.start)}
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

WelcomeScreen.propTypes = {
  intl: PropTypes.object.isRequired,
  surveyInfo: PropTypes.object.isRequired,
  setIsSurveyStart: PropTypes.func.isRequired,
};

export default injectIntl(WelcomeScreen);
