import { ArrowBackIosNew } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ThemeContext } from '../../../App/ThemeWrapper';
import PayRollLoader from '../Component/PayRollLoader';
import API from './api';
import cvReviewImage from './assets/images/icons/cv-review.svg';
import Section from './components/Section';
import Layout from './layouts/Layout.cv';
import messages from './messages';

function ApplicationUnderReviewing(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();

  const changeMode = useContext(ThemeContext);

  const [config, setConfig] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const configResponse = await API(locale).GetCompanyData();
      setConfig(configResponse);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onBackToVacationBtnClick = () => {
    history.push('/public/JobAdvertisement');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Layout isLoading={isLoading} config={config} changeMode={changeMode}>
        <Section title={config.cvTitle} description={config.cvSubTitle}>
          <div className='cv-container'>
            <Grid
              container
              spacing={3}
              py={5}
              justifyContent='center'
            >
              <Grid item md={6} textAlign='center' >

                <img src={cvReviewImage} alt='review' />

                <Typography variant='h6' color='gray' mb={3} >
                  {intl.formatMessage(messages.CVUnderReviewing)}
                </Typography>

                <Button
                  variant='outlined'
                  startIcon={<ArrowBackIosNew />}
                  onClick={onBackToVacationBtnClick}
                >
                  {intl.formatMessage(messages.backToJobVacation)}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Section>
      </Layout>
    </PayRollLoader>
  );
}

ApplicationUnderReviewing.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ApplicationUnderReviewing);
