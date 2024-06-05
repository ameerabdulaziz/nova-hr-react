import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import DropZone from '../../Component/DropZone';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import GeneralListApis from '../../api/GeneralListApis';
import { getFormData } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/CoursesData';
import messages from '../messages';

function CoursesCreate(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();

  const id = location.state?.id ?? 0;

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);

  const [coursesTypes, setCoursesTypes] = useState([]);

  const [filesList, setFilesList] = useState([]);

  const [formInfo, setFormInfo] = useState({
    id,

    arName: '',
    enName: '',
    topic: '',
    courseDays: '',
    courseHours: '',
    expiratioPeriod: '',
    courseTypeId: '',
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const types = await GeneralListApis(locale).GetCourseTypeList();
      setCoursesTypes(types);

      if (id !== 0) {
        const dataApi = await api(locale).getById(id);
        setFormInfo(dataApi);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const body = getFormData({
      ...formInfo,
      filesList,
    });

    setIsLoading(true);

    try {
      await api(locale).save(body);

      toast.success(notif.saved);
      history.push('/app/Pages/HR/CourseList');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/HR/CourseList');
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const documents = useMemo(() => filesList, [filesList]);

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={pageTitle}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={3}>
              <TextField
                name='arName'
                value={formInfo.arName}
                onChange={onInputChange}
                label={intl.formatMessage(messages.arName)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                required
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='enName'
                value={formInfo.enName}
                onChange={onInputChange}
                label={intl.formatMessage(messages.enName)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                required
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Autocomplete
                options={coursesTypes}
                value={
                  coursesTypes.find(
                    (alt) => alt.id === formInfo.courseTypeId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    courseTypeId: value !== null ? value.id : null,
                  }));
                }}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    variant='outlined'
                    required
                    {...params}
                    label={intl.formatMessage(messages.courseType)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='topic'
                value={formInfo.topic}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.topics)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='courseDays'
                value={formInfo.courseDays}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.courseDays)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                required
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='courseHours'
                value={formInfo.courseHours}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.courseHours)}
                required
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='expiratioPeriod'
                value={formInfo.expiratioPeriod}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.expirationPeriodInMonths)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                required
              />
            </Grid>

            <Grid item xs={12}>
              <DropZone
                files={documents}
                setFiles={setFilesList}
                showPreviews
                acceptedFiles={['image/*', 'application/pdf']}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <SaveButton Id={id} />
                </Grid>

                <Grid item>
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

CoursesCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CoursesCreate);
