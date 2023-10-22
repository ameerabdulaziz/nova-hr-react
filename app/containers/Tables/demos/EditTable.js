import React, { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CrudTable, Notification } from 'enl-components';
import useStyles from '../../Pages/Payroll/Style';
import {  closeNotifAction, resetStateAction} from '../reducers/crudTbActions';
import { Backdrop, CircularProgress, Box } from "@mui/material";

function EditTable(props) {
  const {anchorTable,title,API,IsNotSave,isNotAdd} = props;
  const branch = 'crudTableDemo' ;
  const dataTable = useSelector(state => state.crudTableDemo.dataTable);
  const anchor = useSelector(state => state.crudTableDemo.anchor);
  const messageNotif = useSelector(state => state.crudTableDemo.notifMsg);
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  
  // Dispatcher
  
  
  const closeNotif = useDispatch();
  const reset = useDispatch();

  useEffect(() => {
    
    return () => {
      console.log("leave page");
      reset(resetStateAction( branch))
    }
  }, []);
  
  console.log("Edittable");
  return (
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
        <Backdrop
          sx={{
            color: "primary.main",
            zIndex: 10,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.69)",
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      {/* <div className={classes.rootTable}> */}
      <div className={classes.CustomMUIDataTable}>
        <CrudTable
          dataInit={[]}
          anchorTable={anchorTable}
          title={title}
          dataTable={dataTable}
          anchor={anchor}
          API={API}
          IsNotSave={IsNotSave}
          isNotAdd={isNotAdd}
          setIsLoading={setIsLoading}
        />
      </div>
    </Box>
  );
}

export default React.memo(EditTable);
