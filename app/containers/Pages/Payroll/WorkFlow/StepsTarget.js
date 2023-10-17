import React from 'react';
import { Dialog,DialogContent,DialogTitle,Card ,CardContent,Grid } from "@mui/material"; 
import { injectIntl,FormattedMessage } from 'react-intl';
import useStyles from '../Style';
import NameList from '../Component/NameList';


function StepsTarget(props) {
  
  const {classes,cx} = useStyles();  
  
  const { handleClose,open,stepsemployeeList,setstepsemployeeList,stepsjobList,setstepsjobList } = props;

  return (
    <div>
    <Dialog open={open} onClose={()=>handleClose()} style={{maxWidth: '1000px !important'}}>
        <DialogTitle>{"Steps Employees and Jobs"} </DialogTitle>
        <DialogContent>       
            <Grid item xs={12} md={12}> 
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={3} alignItems="flex-start" direction="row">  
                        <Grid item xs={12} md={6}>
                        <Card className={classes.card}>
                            <CardContent>
                                <NameList
                                    dataList={stepsemployeeList}            
                                    setdataList={setstepsemployeeList}
                                    Key={"Employee"}
                                />
                            </CardContent>
                        </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <NameList
                                        dataList={stepsjobList}            
                                        setdataList={setstepsjobList}
                                        Key={"Job"}
                                    />
                                </CardContent>
                            </Card>
                        </Grid> 
                    </Grid>
                </CardContent>
            </Card>
            </Grid>
        </DialogContent>        
    </Dialog>
</div>
            
            
  );
}
  
export default injectIntl(StepsTarget);