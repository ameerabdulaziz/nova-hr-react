import React, { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CrudTable, Notification } from 'enl-components';
import useStyles from '../../Pages/Payroll/Style';
import {  closeNotifAction, resetStateAction} from '../reducers/crudTbActions';
import PayRollLoader from "../../Pages/Payroll/Component/PayRollLoader";

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
    <PayRollLoader isLoading={isLoading}>        
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
    </PayRollLoader>
  );
}

export default React.memo(EditTable);
