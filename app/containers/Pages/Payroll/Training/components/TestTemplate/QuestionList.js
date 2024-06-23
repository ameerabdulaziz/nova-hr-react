import { BorderColor, Delete } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

function QuestionList(props) {
  const locale = useSelector((state) => state.language.locale);

  const { onQuestionEdit, onQuestionRemove, formInfo } = props;

  const onQuestionBtnClickEdit = (item) => {
    onQuestionEdit(item);
  };

  return (
    <Grid container spacing={2}>
      {formInfo.questionList.map((item) => (
        <Grid item xs={12} key={item.questionId} md={6}>
          <Card
            variant='outlined'
            sx={{
              p: 2,
              height: '100%',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
              <IconButton
                size='small'
                aria-label='edit'
                color='primary'
                onClick={() => onQuestionBtnClickEdit(item)}
              >
                <BorderColor sx={{ fontSize: '15px' }} />
              </IconButton>

              <IconButton
                size='small'
                color='error'
                aria-label='delete'
                onClick={() => onQuestionRemove(item.questionId)}
              >
                <Delete sx={{ fontSize: '15px' }} />
              </IconButton>
            </Box>

            <CardContent>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                {locale === 'en' ? item.enName : item.arName}
              </Typography>

              <Typography variant='body1' color='text.secondary'>
                {item.questionType}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

QuestionList.propTypes = {
  onQuestionEdit: PropTypes.func.isRequired,
  onQuestionRemove: PropTypes.func.isRequired,
  formInfo: PropTypes.object.isRequired,
};

export default QuestionList;
