import { Check, RadioButtonUnchecked, TextFields } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import payrollMessages from '../../../messages';
import useStyles from '../../../Style';

function SurveyTemplatePrint(props) {
  const { intl, groupedQuestion } = props;

  const { classes } = useStyles();

  return (
    <>
      <Grid
        container
        justifyContent='space-between'
        sx={{
          borderBottom: '1.5px solid black',
          pb: 1,
          mb: 1,
          mx: 4,
          width: 'auto!important',
        }}
      >
        <Grid item xs={3}>
          <Typography>
            {' '}
            {intl.formatMessage(payrollMessages.name)} : ---------{' '}
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>
            {' '}
            {intl.formatMessage(payrollMessages.job)} : ---------{' '}
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>
            {' '}
            {intl.formatMessage(payrollMessages.date)} : --- / --- / ---
          </Typography>
        </Grid>
      </Grid>

      <div
        className={`${style.examContainer} ${style.examContainer2AllQue} `}
        style={{ marginLeft: '32px', marginRight: '32px' }}
      >
        <Box sx={{ width: '100%!important' }}>
          {Object.entries(groupedQuestion).map(
            ([group, questions], groupIndex) => (
              <Box sx={{ pageBreakInside: 'avoid' }} key={group}>
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 600, mb: 2, fontSize: '18px!important' }}
                >
                  {group}
                </Typography>

                {questions.map((question) => {
                  const isChoiceQuestion = question.questionTypeId === 2
                    || question.questionTypeId === 3;

                  const isAnswerQuestion = question.questionTypeId === 1
                    || question.questionTypeId === 3;

                  return (
                    <React.Fragment key={question.questionId}>
                      <Typography variant='body1' sx={{ fontWeight: 400, fontSize: '16px!important' }}>
                        {question.question}
                      </Typography>

                      {isChoiceQuestion && (
                        <FormControl style={{ width: '100%' }}>
                          <RadioGroup
                            value={null}
                            className={style.radioContainer}
                          >
                            <Grid container spacing={2}>
                              {question.choice.map((choice) => (
                                <Grid
                                  item
                                  xs={6}
                                  key={choice.id}
                                  sx={{ m: '0!important' }}
                                >
                                  <FormControlLabel
                                    value={choice.id}
                                    control={
                                      <Radio
                                        checkedIcon={
                                          <Check
                                            className={`${style.checkedIconeSty} ${classes.surveyMainSty}`}
                                          />
                                        }
                                        icon={
                                          <RadioButtonUnchecked
                                            className={style.iconeSty}
                                          />
                                        }
                                      />
                                    }
                                    label={choice.name}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </RadioGroup>
                        </FormControl>
                      )}

                      {isAnswerQuestion && (
                        <Box sx={{ my: 4, borderBottom: '1px solid #eee' }}>
                          <TextFields sx={{ fontSize: '20px' }} />
                        </Box>
                      )}
                    </React.Fragment>
                  );
                })}

                <Box
                  className={style.lineStye}
                  sx={{
                    my:
                      groupIndex === Object.keys(groupedQuestion).length - 1
                        ? 0
                        : 3,
                  }}
                />
              </Box>
            )
          )}
        </Box>
      </div>
    </>
  );
}

SurveyTemplatePrint.propTypes = {
  intl: PropTypes.object.isRequired,
  groupedQuestion: PropTypes.object.isRequired,
};

export default injectIntl(SurveyTemplatePrint);
