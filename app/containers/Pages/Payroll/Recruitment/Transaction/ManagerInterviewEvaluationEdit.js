import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/ManagerInterviewEvaluationData';
import messages from '../messages';

function ManagerInterviewEvaluationEdit(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const { classes } = useStyles();
  const history = useHistory();
  const Title = localStorage.getItem('MenuName');

  const [statusList, setStatusList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [jobEvaluation, setJobEvaluation] = useState([]);
  const [formInfo, setFormInfo] = useState({
    id,

    jobName: '',
    empName: '',
    idcardNumber: ' ',
    qualificationName: '',

    status: null,
    comment: '',
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const popupStatus = await GeneralListApis(
        locale
      ).GetApplicationStatusList();
      setStatusList(popupStatus);

      if (id) {
        const response = await api(locale).GetById(id);

        setFormInfo((prev) => ({
          ...prev,
          jobName: response.applicationData.jobName,
          empName: response.applicationData.empName,
          idcardNumber: response.applicationData.idcardNumber,
          qualificationName: response.applicationData.qualificationName,

          status: response.applicationData.techInterviewStatus,
          comment: response.applicationData.techInterviewComment,
        }));

        setJobEvaluation(response.jobEvaluation);
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

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const jobEvaluationMapped = jobEvaluation.map((item) => ({
      id: item.id,
      jobApplicarionId: item.jobApplicarionId,
      elCode: item.elCode,
      elValue: item.el_value,
      notes: item.notes,
    }));

    const formData = {
      id,

      status: formInfo.status,
      comment: formInfo.comment,

      JobEvaluationList: jobEvaluationMapped,
    };

    setProcessing(true);
    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/Recruitment/ManagerInterviewEvaluation');
    } catch (error) {
      //
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onJobEvaluationInputChange = (evt, index) => {
    const clonedJobEvaluation = [...jobEvaluation];

    const row = clonedJobEvaluation[index];

    row[evt.target.name] = evt.target.value;

    clonedJobEvaluation[index] = row;

    setJobEvaluation(clonedJobEvaluation);
  };

  const onNumericJobEvaluationInputChange = (evt, index) => {
    const clonedJobEvaluation = [...jobEvaluation];

    const row = clonedJobEvaluation[index];

    row[evt.target.name] = evt.target.value.replace(/[^\d]/g, '');

    clonedJobEvaluation[index] = row;

    setJobEvaluation(clonedJobEvaluation);
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Recruitment/ManagerInterviewEvaluation');
  };

  const jobEvaluationFinalGrade = useMemo(() => {
    const reduce = jobEvaluation.reduce(
      (acc, curr) => ({
        totalGrade: acc.totalGrade + parseFloat(curr.el_value || 0),
        finalGrade: acc.finalGrade + parseFloat(curr.finGrad),
      }),
      { finalGrade: 0, totalGrade: 0 }
    );

    return ((reduce.totalGrade / reduce.finalGrade) * 100).toFixed(2);
  }, [jobEvaluation]);

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' desc='' title={Title}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                name='empName'
                value={formInfo.empName}
                label={intl.formatMessage(messages.employeeName)}
                className={classes.field}
                variant='outlined'
                disabled
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='idcardNumber'
                value={formInfo.idcardNumber}
                label={intl.formatMessage(messages.idNumber)}
                className={classes.field}
                variant='outlined'
                disabled
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='qualificationName'
                value={formInfo.qualificationName}
                label={intl.formatMessage(messages.qualification)}
                className={classes.field}
                variant='outlined'
                disabled
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='jobName'
                value={formInfo.jobName}
                label={intl.formatMessage(messages.jobName)}
                className={classes.field}
                variant='outlined'
                disabled
              />
            </Grid>
          </Grid>
        </PapperBlock>

        {jobEvaluation.length > 0 && (
          <PapperBlock
            whiteBg
            icon='border_color'
            desc=''
            title={intl.formatMessage(messages.jobEvaluation)}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {intl.formatMessage(payrollMessages.name)}
                    </TableCell>
                    <TableCell>
                      {intl.formatMessage(messages.description)}
                    </TableCell>
                    <TableCell>{intl.formatMessage(messages.grade)}</TableCell>
                    <TableCell>
                      {intl.formatMessage(payrollMessages.notes)}
                    </TableCell>
                    <TableCell>
                      {intl.formatMessage(messages.finalGrade)}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobEvaluation.map((test, index) => {
                    const row = jobEvaluation[index];

                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>{test.testname}</TableCell>
                        <TableCell>{test.desc}</TableCell>
                        <TableCell sx={{ maxWidth: 120 }}>
                          <TextField
                            name='el_value'
                            value={row.el_value ?? ''}
                            label={intl.formatMessage(messages.grade)}
                            className={classes.field}
                            onChange={(evt) => onNumericJobEvaluationInputChange(evt, index)
                            }
                            variant='outlined'
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name='notes'
                            value={row.notes}
                            label={intl.formatMessage(payrollMessages.notes)}
                            className={classes.field}
                            onChange={(evt) => onJobEvaluationInputChange(evt, index)
                            }
                            variant='outlined'
                          />
                        </TableCell>
                        <TableCell>{test.finGrad}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant='body2'>
              {intl.formatMessage(messages.finalGrade)}:{' '}
              {jobEvaluationFinalGrade} %
            </Typography>
          </PapperBlock>
        )}

        <PapperBlock whiteBg icon='border_color' desc='' title=''>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={statusList}
                    value={
                      statusList.find(
                        (item) => item.id === formInfo.status
                      ) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
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
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name='comment'
                        onChange={onInputChange}
                        value={formInfo.comment}
                        label={intl.formatMessage(messages.comment)}
                        className={classes.field}
                        variant='outlined'
                        multiline
                        rows={1}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={1}>
              <SaveButton Id={id} processing={processing} />
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
        </PapperBlock>
      </form>
    </PayRollLoader>
  );
}

ManagerInterviewEvaluationEdit.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ManagerInterviewEvaluationEdit);
