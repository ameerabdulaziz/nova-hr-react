import { BorderColor, Delete } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

function QuestionList(props) {
  const locale = useSelector((state) => state.language.locale);

  const { onQuestionEdit, onQuestionRemove, groupedQuestions } = props;

  const onQuestionBtnClickEdit = (item) => {
    onQuestionEdit(item);
  };

  return (
    <Grid container>
      {Object.entries(groupedQuestions).map(([group, items], index) => (
        <Grid item xs={12} key={group}>
          <Typography variant='h6' sx={{ fontWeight: 'light' }}>
            {group}
          </Typography>

          <Grid container spacing={2} mt={0}>
            {items.map((item) => (
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
                      {item.choiceGroup}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {index !== Object.entries(groupedQuestions).length - 1 && (
            <Divider sx={{ my: 4 }} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

QuestionList.propTypes = {
  onQuestionEdit: PropTypes.func.isRequired,
  onQuestionRemove: PropTypes.func.isRequired,
  groupedQuestions: PropTypes.object.isRequired,
};

export default QuestionList;
