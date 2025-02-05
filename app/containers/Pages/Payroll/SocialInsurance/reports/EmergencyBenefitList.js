import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../styles/styles.scss';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import GeneralListApis from '../../api/GeneralListApis';
import { getAutoCompleteValue } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/EmergencyBenefitListData';
import messages from '../messages';

function EmergencyBenefitList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const pageTitle = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [filterHighlights, setFilterHighlights] = useState([]);

  const [organizationList, setOrganizationList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    organizationId: [],
    InsOffice: '',
    YearId: '',
    MonthId: '',
    IsInsured: false,
  });

  const getFilterHighlights = () => {
    const highlights = [];

    const office = getAutoCompleteValue(officeList, formInfo.InsOffice);
    const year = getAutoCompleteValue(yearList, formInfo.YearId);
    const month = getAutoCompleteValue(monthsList, formInfo.MonthId);

    if (office) {
      highlights.push({
        label: intl.formatMessage(messages.insuranceOffice),
        value: office.name,
      });
    }

    if (year) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: year.name,
      });
    }

    if (month) {
      highlights.push({
        label: intl.formatMessage(messages.month),
        value: month.name,
      });
    }

    highlights.push({
      label: intl.formatMessage(messages.onlyInsured),
      value: formInfo.IsInsured
        ? intl.formatMessage(payrollMessages.yes)
        : intl.formatMessage(payrollMessages.no),
    });

    if (formInfo.organizationId.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.organizationName),
        value: formInfo.organizationId.map((item) => item.name).join(' , '),
      });
    }

    setFilterHighlights(highlights);
  };

  const fetchTableData = async () => {
    try {
      setIsLoading(true);

      const { organizationId, ...formData } = { ...formInfo };

      const organizations = formInfo.organizationId.map((item) => item.id);

      const response = await api(locale).GetList(organizations, formData);
      setTableData(response);

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthsList(months);

      const organizations = await api(locale).GetSInsuranceOrgnization();
      setOrganizationList(organizations);

      const office = await api(locale).GetSInsuranceOffices();
      setOfficeList(office);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        display: false,
        print: false,
      },
    },
    {
      name: 'insOrganizationName',
      label: intl.formatMessage(messages.organizationName),
    },

    {
      name: 'orgInsuranceNo',
      label: intl.formatMessage(messages.insuranceNumber),
    },

    {
      name: 'govname',
      label: intl.formatMessage(messages.government),
    },

    {
      name: 'empCount',
      label: intl.formatMessage(messages.employeeNumber),
    },

    {
      name: 'totVal',
      label: intl.formatMessage(messages.basicSalary),
    },

    {
      name: 'totPerc',
      label: intl.formatMessage(messages.percent1),
    },

    {
      name: 'insuOfficeName',
      label: intl.formatMessage(messages.insuranceOffice),
    },
  ];

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
  };

  const onMultiAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={5} xl={4}>
              <Autocomplete
                options={organizationList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === 'ar' ? style.AutocompleteMulStyAR : null
                }`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={formInfo.organizationId}
                renderOption={(optionProps, option, { selected }) => (
                  <li {...optionProps} key={optionProps.id}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                      checkedIcon={<CheckBoxIcon fontSize='small' />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onMultiAutoCompleteChange(value, 'organizationId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.organizationName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3} xl={3}>
              <Autocomplete
                options={officeList}
                value={getAutoCompleteValue(officeList, formInfo.InsOffice)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    InsOffice: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.insuranceOffice)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={2.9} lg={2} xl={1.5}>
              <Autocomplete
                options={yearList}
                value={getAutoCompleteValue(yearList, formInfo.YearId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    YearId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.year)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={2.6} lg={2} xl={1.5}>
              <Autocomplete
                options={monthsList}
                value={getAutoCompleteValue(monthsList, formInfo.MonthId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    MonthId: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.month)}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.IsInsured}
                    onChange={(evt) => {
                      setFormInfo((prev) => ({
                        ...prev,
                        IsInsured: evt.target.checked,
                      }));
                    }}
                  />
                }
                label={intl.formatMessage(messages.onlyInsured)}
              />
            </Grid>

            <Grid item>
              <Button variant='contained' color='primary' type='submit'>
                {intl.formatMessage(payrollMessages.search)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=''
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoaderInForms>
  );
}

EmergencyBenefitList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmergencyBenefitList);
