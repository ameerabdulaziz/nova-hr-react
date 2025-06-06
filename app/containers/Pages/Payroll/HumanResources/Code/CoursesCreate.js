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
import { ServerURL } from '../../api/ServerConfig';
import { getFormData } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/CoursesData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

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
    docsUrl: [],
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const types = await GeneralListApis(locale).GetCourseTypeList();
      setCoursesTypes(types);

      if (id !== 0) {
        const dataApi = await api(locale).getById(id);

        const docsUrl = dataApi.docsUrl?.map((item) => ({
          ...item,
          src: `${ServerURL}Doc/CoursesDoc/${item.name}`,
        })) || [];

        setFormInfo(dataApi);
        setFilesList(docsUrl);
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

    const reducedFiles = filesList.reduce(
      (prev, current) => {
        if (current instanceof File) {
          prev.filesList.push(current);
        } else {
          prev.docsUrl.push({
            name: current.name,
            id: current.id,
          });
        }
        return prev;
      },
      { filesList: [], docsUrl: [] }
    );

    const body = getFormData({
      ...formInfo,
      filesList: reducedFiles.filesList,
      docsUrl: reducedFiles.docsUrl,
    });

    setIsLoading(true);

    try {
      await api(locale).save(body);

      toast.success(notif.saved);
      history.push(SITEMAP.humanResources.CourseList.route);
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
    history.push(SITEMAP.humanResources.CourseList.route);
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
            <Grid item xs={12} md={4} lg={3}  xl={2.5}>
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

            <Grid item xs={12} md={4} lg={3} xl={2.5}>
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

            <Grid item xs={12} md={4} lg={3} xl={2}>
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
                    {...params}
                    label={intl.formatMessage(messages.courseType)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4} md={4} lg={3}  xl={1.5}>
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

            <Grid item xs={4} md={4} lg={3} xl={1.5}>
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

            <Grid item xs={4} md={4} lg={3} xl={2}>
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
              <TextField
                name='topic'
                value={formInfo.topic}
                onChange={onInputChange}
                label={intl.formatMessage(messages.topics)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                multiline
                rows={1}
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
