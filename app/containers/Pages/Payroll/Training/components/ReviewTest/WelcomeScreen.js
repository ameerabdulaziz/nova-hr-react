import { Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import examLogo from '../../../Assets/Employee-Assessment/exam-logo.png';
import examLogo2 from '../../../Assets/Employee-Assessment/info_graphic_1.svg';
import useStyles from '../../../Style';
import surveyMessages from '../../../Survey/messages';

function WelcomeScreen(props) {
  const { testInfo, intl, setIsTestStart } = props;

  const locale = useSelector((state) => state.language.locale);

  const { classes } = useStyles();

  const onStartTestBtnClick = () => {
    setIsTestStart(true);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} className={`${style.gridContainerSty} `}>
        <div className={`${style.mainContainer} ${classes.surveyMainSty}`}>
          <div>
            <img src={examLogo2} alt='examLogo2' />

            <p style={{ marginTop: '15px' }}>
              {locale === 'en'
                ? testInfo.enDescription
                : testInfo.arDescription}
            </p>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={6} className={`${style.gridContainerSty} `}>
        <div className={`${style.startExamContainer}`}>
          <div>
            <img src={examLogo} alt='examLogo' />

            <h1 className={`${classes.textSty}`}>{testInfo.name}</h1>

            <Button
              variant='contained'
              color='primary'
              disabled={testInfo.templateId === null}
              onClick={onStartTestBtnClick}
            >
              {intl.formatMessage(surveyMessages.start)}
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

WelcomeScreen.propTypes = {
  intl: PropTypes.object.isRequired,
  testInfo: PropTypes.object.isRequired,
  setIsTestStart: PropTypes.func.isRequired,
};

export default injectIntl(WelcomeScreen);
