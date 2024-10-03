import { BorderColor, Delete } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function JobAdvertisementCards(props) {
  const locale = useSelector((state) => state.language.locale);

  const { 
    quesPopupData, 
    setQuesPopupData,
    setQuesPopupEditData, 
    setQuesPopupEditcardName,
    openQuesPopup ,
    setPopupType
} = props;

  const onQuestionBtnClickEdit = (item,itemsName) => {

    setPopupType("edit")
    openQuesPopup()
    setQuesPopupEditData(item)
    setQuesPopupEditcardName(itemsName)

  };


  const onQuestionBtnClickRemove = (itemsName) => {

        const { [itemsName]: _, ...newState } = quesPopupData;

        setQuesPopupData(newState) 
  }


  return (
    <Grid container>

      {
     
      Object.keys(quesPopupData).map((items, index) => (

        <Card
          key={index}
          variant='outlined'
          sx={{
            p: 2,
            height: '100%',
            position: 'relative',
            overflow: 'visible',
            width:"300px",
            margin:"5px"
          }}>
              <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                <IconButton
                  size='small'
                  aria-label='edit'
                  color='primary'
                  onClick={() => onQuestionBtnClickEdit(quesPopupData[items], items)}
                >
                  <BorderColor sx={{ fontSize: '15px' }} />
                </IconButton>

                <IconButton
                  size='small'
                  color='error'
                  aria-label='delete'
                  onClick={() => onQuestionBtnClickRemove(items)}
                >
                  <Delete sx={{ fontSize: '15px' }} />
                </IconButton>
              </Box>

              <CardContent>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    {quesPopupData[items].formData.Question1}
                </Typography>

              </CardContent>
          </Card>
      ))
   
    }
    </Grid>
  );
}


export default JobAdvertisementCards;
