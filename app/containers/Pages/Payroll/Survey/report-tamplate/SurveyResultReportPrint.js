import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';


export default function SurveyResultReportPrint(props) {

    const { data } = props
    const locale = useSelector((state) => state.language.locale);
    const filterChose = data?.question.filter((el) => el.questionType == "Choice Only" || el.questionType == "اختيارات فقط")
    const filterComment = data?.question.filter((el) => el.questionType == "Comment Only" || el.questionType == "تعليقات فقط")
    const filterChoseAndComment = data?.question.filter((el) => el.questionType == "Choice & Comment" || el.questionType == "اختيار وتعليق")
    const company = useSelector((state) => state.authReducer.companyInfo);

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
            {filterChose && filterChose.length > 0 ? (
                <>
 
                    {filterChose.map((el, index) => (
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
                                        {locale === 'en' ? 'Choice' : 'الاختيار'}: {answer.name}  
                                        </Typography>
                                    </Grid>                                    
                                    <Grid item xs={6} sm={4}>
                                        <Typography variant="body2">
                                        {locale === 'en' ? 'Total choices' : 'إجمالي الاختيارات'}: {answer.selno} 
                                        </Typography>
                                    </Grid>                                    


                                </Grid>
                            ))}
                        </Box>
                    ))}
                </>
            ) : (
                ''
            )}

            {filterComment && filterComment.length > 0 ? (
                <>

                    {filterComment.map((el, index) => (
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
            ) : (
                ''
            )}

{filterChoseAndComment && filterChoseAndComment.length > 0 ? (
  <>
    {filterChoseAndComment.map((el, index) => (
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
                {locale === 'en' ? 'Choice' : 'الاختيار'}: {answer.name}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2">
                {locale === 'en' ? 'Total choices' : 'إجمالي الاختيارات'}: {answer.selno}
              </Typography>
            </Grid>
          </Grid>
        ))}

       {el?.textAnswer.length > 0 ? (<>
               <Typography variant="h6" style={{ fontSize: '14px', marginTop: '15px' }}>
          {locale === 'en' ? 'Text Answers' : 'الإجابات المقالية'}
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
) : (
  ''
)}
        </div>

      </>)
}
