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
import { useDispatch } from 'react-redux';
import {
  removeAction,
  updateAction,
  editAction,
  saveAction
} from '../../../containers/Tables/reducers/crudTbActions';

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import style from "../../../styles/styles.scss";

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
    handleClickOpen
  } = props;

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
        const data =  await API.Delete(item);
        if(data.status === 200)
          removeRow(removeAction(item,true, branch));
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
      
      const data =  await API.Save(item);
      if(data.status === 200)
      {
        finishEditRow(saveAction(item,item.id===0?data.data.id:0,true, branch));
      }
    }
    else
        finishEditRow(saveAction(item,item.id,false, branch));

     
  }, [finishEditRow, item, branch]);

  const renderCell = dataArray => dataArray.map((itemCell, index) => {

    
    if (itemCell.name !== 'action' && !itemCell.hidden) {
      const inputType = anchor[index].type;
      switch (inputType) {
        case 'selection':
          return (
            <SelectableCell
              updateRow={(event) => updateRow(updateAction(event,item, branch))}
              cellData={{
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
              className={style.actionsSty}
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
                type: itemCell.name,
                value: item[itemCell.name],
                id: itemCell.name+item.id,
              }}
              edited={item.edited}
              key={index.toString()}
              branch={branch}
            />
          );
        case 'time':
          return (
            <TimePickerCell
              updateRow={(event) => updateRow(updateAction(event, item,branch))}
              cellData={{
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


  console.log("RawTable");
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
})

Row.propTypes = {
  anchor: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,  
};

export default Row;
