import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import messages from '../messages'
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';


 function SurveyResultReportPrint(props) {

    const {intl , data } = props
    const company = useSelector((state) => state.authReducer.companyInfo);

    const visibleTodos = useMemo(() => {
      if (!data) {
        return;
      }
      const filter = data.question.reduce((prev, current) => {
        if (current.questionTypeId == 2) {
          prev.filterChose.push(current);
        } else if (current.questionTypeId == 1) {
          prev.filterComment.push(current);
        } else {
          prev.filterChoseAndComment.push(current);
        }
        return prev;
      }, { filterChose: [], filterComment: [], filterChoseAndComment: [] });
      return filter;
    }, [data]);

    if (!data ) {
      return <div>No Data Provide</div>;
    }
    return (<>
  
        <header>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <img src={company?.logo} alt='' height={45} />
                <br />
                <h1  >{data?.name}</h1>
                <hr style={{ height: "12px", width: "80%", marginRight: "auto", marginLeft: "auto", color: "black", borderRadius: "5px" }} />
            </div>
        </header>

        <div>
            {visibleTodos.filterChose && visibleTodos.filterChose.length > 0 && (
                <>
 
                    {visibleTodos.filterChose.map((el, index) => (
                        <Box
                            key={index}
                            sx={{
                                textAlign: 'center',
                                mt: 2,
                                pageBreakInside: 'avoid',
                                paddingBottom: '10px',
                            }}
                        >
                            <Typography variant="h6" sx={{ padding: '10px' }} style={{ fontSize: '14px' }}>
                                {el.question}
                            </Typography>
                            {el.choice.map((answer) => (
                                <Grid
                                    container
                                    spacing={3}
                                    key={answer.id}
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ pageBreakInside: 'avoid' }}
                                    sx={{ padding: '10px' }}
                                >
                                    <Grid item xs={6} sm={4} >
                                        <Typography variant="body2">
                                          {intl.formatMessage(messages.choice)} : {answer.name}  
                                        </Typography>
                                    </Grid>                                    
                                    <Grid item xs={6} sm={4}>
                                        <Typography variant="body2">
                                         {intl.formatMessage(messages.totalchoices)}: {answer.selno} 
                                        </Typography>
                                    </Grid>                                    


                                </Grid>
                            ))}
                        </Box>
                    ))}
                </>
            )}

            {visibleTodos.filterComment && visibleTodos.filterComment.length > 0 && (
                <>

                    {visibleTodos.filterComment.map((el, index) => (
                        <Box
                            key={index}
                            sx={{
                                textAlign: 'center',
                                mt: 2,
                                pageBreakInside: 'avoid',
                                paddingBottom: '10px',
                            }}
                        >
                            <Typography sx={{ padding: '10px' }} variant="h6" style={{ fontSize: '14px' }}>
                                {index + 1}-{el?.question}
                            </Typography>
                            <Grid container spacing={2} justifyContent="center" style={{ pageBreakInside: 'avoid' }}>
                                {el?.textAnswer.map((comment, commentIndex) => (
                                    <Grid item sx={{ padding: '10px' }} xs={12} sm={6} key={commentIndex}>
                                        <Typography variant="body2">
                                            {commentIndex + 1}-{comment}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </>
            )}

            {visibleTodos.filterChoseAndComment && visibleTodos.filterChoseAndComment.length > 0 && (
  <>
    {visibleTodos.filterChoseAndComment.map((el, index) => (
      <Box
        key={index}
        sx={{
          textAlign: 'center',
          mt: 2,
          pageBreakInside: 'avoid',
          paddingBottom: '10px',
        }}
      >
        <Typography sx={{ padding: '10px' }} variant="h6" style={{ fontSize: '14px' }}>
          {el.question}
        </Typography>


        {el.choice.map((answer) => (
          <Grid
            container
            spacing={2}
            key={answer.id}
            justifyContent="center"
            alignItems="center"
            style={{ pageBreakInside: 'avoid' }}
            sx={{ padding: '10px' }}
          >
            <Grid item xs={6} sm={4}>
              <Typography variant="body2">
                  {intl.formatMessage(messages.choice)} : {answer.name}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2">
                 {intl.formatMessage(messages.totalchoices)}: {answer.selno}
              </Typography>
            </Grid>
          </Grid>
        ))}

       {el?.textAnswer.length > 0 ? (<>
               <Typography variant="h6" style={{ fontSize: '14px', marginTop: '15px' }}>
               {intl.formatMessage(messages.textAnswers)}
        </Typography>
        <Grid container spacing={2} justifyContent="center" style={{ pageBreakInside: 'avoid' }}>
          {el?.textAnswer.map((comment, commentIndex) => (
            <Grid item xs={12} sm={6} key={commentIndex}>
              <Typography sx={{ padding: '10px' }} variant="body2">
                {commentIndex + 1}-{comment}
              </Typography>
            </Grid>
          ))}
        </Grid> 
          </>)  :""}

      </Box>
    ))}
  </>
             )}
        </div>

      </>)
}


SurveyResultReportPrint.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(SurveyResultReportPrint);