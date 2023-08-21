import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CrudTable, Notification } from 'enl-components';
import useStyles from 'enl-components/Tables/tableStyle-jss';
import { addAction, closeNotifAction, resetStateAction} from '../reducers/crudTbActions';

function EditTable(props) {
  const {anchorTable,title,API,IsNotSave,isNotAdd} = props;
  const branch = 'crudTableDemo' ;
  const dataTable = useSelector(state => state.crudTableDemo.dataTable);
  const anchor = useSelector(state => state.crudTableDemo.anchor);
  const messageNotif = useSelector(state => state.crudTableDemo.notifMsg);
  const { classes } = useStyles();

  
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
    <div>
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      <div className={classes.rootTable}>
        <CrudTable
          dataInit={[]}
          anchorTable={anchorTable}
          title={title}
          dataTable={dataTable}
          anchor={anchor}
          API={API}
          IsNotSave={IsNotSave}
          isNotAdd={isNotAdd}
        />
      </div>
    </div>
  );
}

export default EditTable;
