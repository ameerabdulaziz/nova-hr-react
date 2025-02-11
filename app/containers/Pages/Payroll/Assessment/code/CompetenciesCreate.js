import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import payrollMessages from '../../messages';
import api from '../api/CompetenciesData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function CompetenciesCreate(props) {
  const { intl } = props;
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const [formInfo, setFormInfo] = useState({
    id,

    arName: '',
    enName: '',
    notEffective: false,
    categoryId: null,
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      await api(locale).save(formInfo);
      toast.success(notif.saved);
      history.push(SITEMAP.assessment.Competencies.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const category = await api(locale).GetCategoryList();
      setCategoryList(category);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo(dataApi);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.assessment.Competencies.route);
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={categoryList}
                value={
                  categoryList.find(
                    (item) => item.id === formInfo.categoryId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'categoryId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.category)}
                  />
                )}
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.notEffective}
                    onChange={onCheckboxChange}
                    name='notEffective'
                  />
                }
                label={intl.formatMessage(messages.notEffective)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name='enName'
                value={formInfo.enName}
                onChange={onInputChange}
                label={intl.formatMessage(messages.competencyName)}
                fullWidth
                variant='outlined'
                multiline
                required
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name='arName'
                value={formInfo.arName}
                onChange={onInputChange}
                label={intl.formatMessage(messages.arCompetencyName)}
                fullWidth
                variant='outlined'
                multiline
                required
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item >
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>
                </Grid>

                <Grid item >
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
    </PayRollLoaderInForms>
  );
}

CompetenciesCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CompetenciesCreate);
