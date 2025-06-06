import React, { useCallback, useState, useImperativeHandle , forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/BorderColor';
import DoneIcon from '@mui/icons-material/Done';
import css from 'enl-styles/Table.scss';
import EditableCell from './EditableCell';
import SelectableCell from './SelectableCell';
import ToggleCell from './ToggleCell';
import DatePickerCell from './DatePickerCell';
import TimePickerCell from './TimePickerCell';
import AutoComblate from "./AutoComblate"
import {useSelector,  useDispatch } from 'react-redux';
import {
  removeAction,
  updateAction,
  editAction,
  saveAction
} from '../../../containers/Tables/reducers/crudTbActions';

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import style from "../../../styles/styles.scss";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import Payrollmessages from '../../../containers/Pages/Payroll/messages';
import { FormattedMessage ,injectIntl } from 'react-intl';

const useStyles = makeStyles()((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

  const Row = forwardRef((props, ref) => {
  const {
    classes,
    cx
  } = useStyles();
  const {
    anchor,
    item,  
    API,IsNotSave,isNotAdd,
    handleClickOpen, setIsLoading
  } = props;


  
  const { intl } = props;
  const locale = useSelector(state => state.language.locale);


  const [DateError, setDateError] = useState({});
  // const [DateError, setDateError] = useState([]);



  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }

  const branch = 'crudTableDemo' ;
  const removeRow = useDispatch();
  const updateRow = useDispatch();
  const editRow = useDispatch();
  const finishEditRow = useDispatch();

  const eventDel = useCallback(async(item) => {

    if(item.id===0)
    {
      if(IsNotSave)
        removeRow(removeAction(item,false, branch));
      else
        removeRow(removeAction(item,true, branch));
    }      
    else
    {
      if(API && !IsNotSave)
      {
        setIsLoading(true);
        const data =  await API.Delete(item);
        if(data.status === 200)
          removeRow(removeAction(item,true, branch));

        setIsLoading(false);
      }
      else
        removeRow(removeAction(item,false, branch));
    }
  }, [removeRow, item, branch]);

  const eventEdit = useCallback(async() => {
    
      editRow(editAction(item, branch));
  }, [editRow, item, branch]);

  const eventDone = useCallback(async() => {

    if(API && !IsNotSave)
    {
      if (Object.values(DateError).includes(true)) {  
        toast.error(locale === "en" ? "Date Not Valid" : "التاريخ غير صحيح");
        // toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      }
      else
      {
        const apidata = {...item}

        apidata.qualificationDate = dateFormatFun(apidata.qualificationDate)

        // this condition used in Documents page in master data to make validation in some fields
        if(apidata.isCheckExpireDate && (apidata.expirationPeriod.length === 0 ||  apidata.expirationFollow.length === 0 ))
        {
          toast.error("You must to choose expiration Period and expiration Follow")
          return
        }
        

      setIsLoading(true);
      const data =  await API.Save(apidata);
      // const data =  await API.Save(item);
      if(data.status === 200)
      {
        finishEditRow(saveAction(item,item.id===0?data.data.id:0,true, branch));
      }

      setIsLoading(false);
    }
    }
    else
        finishEditRow(saveAction(item,item.id,false, branch));

     
  }, [finishEditRow, item, branch,DateError]);

  

  const renderCell = dataArray => dataArray.map((itemCell, index) => {

    if (itemCell.name !== 'action' && !itemCell.hidden) {
      const inputType = anchor[index].type;
      switch (inputType) {
        case 'autoComblate':
          return (
            <AutoComblate
              updateRow={(event) => updateRow(updateAction(event,item, branch))}
              cellData={{
                disabled: itemCell?.disabled ?? false,
                type: itemCell.name,
                value: item[itemCell.name],
                id: itemCell.name+item.id,

              }}
              edited={item.edited}
              key={index.toString()}
              options={anchor[index].options}
              branch={branch}
            />
          );

        case 'selection':
          return (
            <SelectableCell
              updateRow={(event) => updateRow(updateAction(event,item, branch))}
              cellData={{
                disabled: itemCell?.disabled ?? false,
                type: itemCell.name,
                value: item[itemCell.name],
                id: itemCell.name+item.id,
              }}
              edited={item.edited}
              key={index.toString()}
              options={anchor[index].options}
              branch={branch}
            />
          );
        case 'toggle':
          return (
            item.edited ? (
           
            <ToggleCell
              updateRow={(event) => updateRow(updateAction(event,item, branch))}
              cellData={{
                disabled: itemCell?.disabled ?? false,
                type: itemCell.name,
                value: item[itemCell.name],
                id: itemCell.name+item.id,
              }}
              edited={item.edited}
              key={index.toString()}
              branch={branch}
            />
           
            )
            :
            (
              <td 
              // className={style.actionsSty}
              key={index.toString()}
              >
                {item[itemCell.name] ? (
                  <CheckIcon style={{ color: "#3f51b5" }} />
                ) : (
                  <CloseIcon style={{ color: "#717171" }} />
                )}
              </td>
            )
          );
        case 'date':
          return (
            <DatePickerCell
              updateRow={(event) => updateRow(updateAction(event,item, branch))}
              cellData={{
                disabled: itemCell?.disabled ?? false,
                type: itemCell.name,
                value: item[itemCell.name],
                id: itemCell.name+item.id,
              }}
              edited={item.edited}
              key={index.toString()}
              branch={branch}
              setDateError={setDateError}
            />
          );
        case 'time':
          return (
            <TimePickerCell
              updateRow={(event) => updateRow(updateAction(event, item,branch))}
              cellData={{
                disabled: itemCell?.disabled ?? false,
                type: itemCell.name,
                value: item[itemCell.name],
                id: itemCell.name+item.id,
              }}
              edited={item.edited}
              key={index.toString()}
              branch={branch}
            />
          );
        default:
          
          return (

            <EditableCell
              updateRow={(event) => updateRow(updateAction(event,item, branch))}
              cellData={{
                disabled: itemCell?.disabled ?? false,
                type: itemCell.name,
                value: item[itemCell.name],
                id: itemCell.name+item.id,
              }}
              edited={item.edited}
              key={index.toString()}
              inputType={inputType}
              branch={branch}
            />
          );
      }
    }
    return false;
  });



  useImperativeHandle(ref, () => ({

    eventDel

  }));


  return (
    <tr className={item.edited ? css.editing : ''}>
      {renderCell(anchor)}
      <TableCell padding="none">
        <IconButton
          onClick={() => eventEdit(this)}
          className={cx((item.edited ? css.hideAction : ''), classes.button)}
          aria-label="Edit"
          size="large">
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => eventDone(this)}
          color="secondary"
          className={cx((!item.edited ? css.hideAction : ''), classes.button)}
          aria-label="Done"
          size="large">
          <DoneIcon />
        </IconButton>
        {(isNotAdd)?'':
        <IconButton
          onClick={() =>{ 
            handleClickOpen(item)
          }}
          // onClick={() => eventDel(this)}
          className={classes.button}
          aria-label="Delete"
          size="large">
          <DeleteIcon />
        </IconButton>}
      </TableCell>
    </tr>
  );
}
)

Row.propTypes = {
  anchor: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,  
};


export default Row;

