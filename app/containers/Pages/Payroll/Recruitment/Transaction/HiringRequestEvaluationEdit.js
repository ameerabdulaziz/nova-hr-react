import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import style from '../../../../../styles/styles.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/HiringRequestEvaluationData';
import messages from '../messages';

function HiringRequestEvaluationEdit(props) {
  const { intl } = props;
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [setting, setSetting] = useState({
    canSave: true,
    makeJobOffer: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [statusList, setStatusList] = useState([]);

  const [formInfo, setFormInfo] = useState({
    hiringRequestDate: '',
    candidateName: '',
    startDate: '',
    JobApplicarionId: '',
    salaryelement: [],
    hiringReqAssignEmployee: [],
    reportToName: '',
    positionName: '',
    departmentName: '',
    salary: '',
    contractDuration: '',
    benefits: '',
    tools: '',
    comments: '',
  });

  const [editInfo, setEditInfo] = useState({
    id,
    comment: '',
    status: '',
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : '');

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      await api(locale).save(editInfo);
      toast.success(notif.saved);
      history.push('/app/Pages/Recruitment/HiringRequestEvaluation');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const status = await GeneralListApis(locale).GetApplicationStatusList(false, true);
      setStatusList(status);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo(dataApi);

        setSetting({
          canSave: dataApi.canSave,
          makeJobOffer: dataApi.makeJobOffer,
        });
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
    setEditInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setEditInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Recruitment/HiringRequestEvaluation');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.candidateName}
                label={intl.formatMessage(messages.applicantName)}
                name='candidateName'
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formateDate(formInfo.hiringRequestDate)}
                label={intl.formatMessage(payrollMessages.date)}
                name='hiringRequestDate'
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.reportToName}
                label={intl.formatMessage(messages.reportingTo)}
                name='reportToName'
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.positionName}
                label={intl.formatMessage(messages.position)}
                name='positionName'
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.departmentName}
                label={intl.formatMessage(messages.department)}
                name='departmentName'
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formateDate(formInfo.startDate)}
                label={intl.formatMessage(messages.startDate)}
                name='startDate'
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.contractDuration}
                label={intl.formatMessage(messages.contractDuration)}
                name='contractDuration'
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.salary}
                label={intl.formatMessage(messages.salaryInGross)}
                name='salary'
                disabled
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={[]}
                multiple
                disableCloseOnSelect
                disabled
                className={`${style.AutocompleteMulSty} ${
                  locale === 'ar' ? style.AutocompleteMulStyAR : null
                }`}
                value={formInfo.hiringReqAssignEmployee.map((item) => ({
                  id: item.employeeId,
                  name: item.employeeName,
                }))}
                renderOption={(inputProps, option, { selected }) => (
                  <li {...inputProps}>
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled
                    label={intl.formatMessage(messages.assignTo)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name='benefits'
                value={formInfo.benefits}
                disabled
                label={intl.formatMessage(messages.benefits)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name='tools'
                value={formInfo.tools}
                disabled
                label={intl.formatMessage(messages.tools)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name='comments'
                value={formInfo.comments}
                label={intl.formatMessage(messages.comments)}
                fullWidth
                variant='outlined'
                disabled
                multiline
                rows={1}
              />
            </Grid>

            {formInfo.salaryelement.length > 0 && (
              <Grid item xs={12} md={12}>
                <Grid item xs={12} md={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {intl.formatMessage(messages.elementName)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.value)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.description)}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formInfo.salaryelement.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {row.elementName}
                            </TableCell>
                            <TableCell>{row.elementVal}</TableCell>
                            <TableCell>{row.elementDesc}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            )}

            {formInfo.hiringReqAssignEmployee.some(
              (item) => item.statusName !== null
            )
              && id !== 0 && (
              <Grid item xs={12} md={12}>
                <Grid item xs={12} md={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {intl.formatMessage(messages.employeeName)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.status)}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formInfo.hiringReqAssignEmployee.map(
                          (row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component='th' scope='row'>
                                {row.employeeName}
                              </TableCell>
                              <TableCell>{row.statusName}</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            )}

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={statusList}
                value={
                  statusList.find(
                    (item) => item.id === editInfo.status
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'status')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.status)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='comment'
                value={editInfo.comment}
                onChange={onInputChange}
                label={intl.formatMessage(messages.comment)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
                    disabled={id !== 0 ? !setting.canSave : false}
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>
                </Grid>

                <Grid item xs={12} md={1}>
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

HiringRequestEvaluationEdit.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HiringRequestEvaluationEdit);
