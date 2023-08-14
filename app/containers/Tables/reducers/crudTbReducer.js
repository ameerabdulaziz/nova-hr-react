import produce from 'immer';
import notif from 'enl-api/ui/notifMessage';
import { CLOSE_NOTIF } from 'enl-redux/constants/notifConstants';
import {
  FETCH_DATA,
  ADD_EMPTY_ROW,
  UPDATE_ROW,
  REMOVE_ROW,
  EDIT_ROW,
  SAVE_ROW,
  Reset
} from './crudTbConstants';

const initialState = {
  dataTable: [],
  anchor:[],
  notifMsg: '',
};

const initialItem = ( anchor,dataTable) => {
  
  const staticKey = {
    id:0,//(+new Date() + Math.floor(Math.random() * 999999)).toString(36),
  };
  
  for (let i = 0; i < anchor.length; i += 1) {
    if (anchor[i].name !== 'id' && anchor[i].name !== 'edited') {
      staticKey[anchor[i].name] = anchor[i].initialValue;
    }
  }
  // Push another static key
  staticKey.edited = true;
  staticKey["index"] = dataTable.length+1;
  return staticKey;
};

/* eslint-disable default-case, no-param-reassign */
const crudTbReducer = (state = initialState, action = {}) => produce(state, draft => {
  const { branch } = action;
  switch (action.type) {
    case `${branch}/${FETCH_DATA}`:
      debugger;
      draft.dataTable = action.items;
      draft.anchor = action.anchor;
      
      break;
    case `${branch}/${ADD_EMPTY_ROW}`: {
   
      const initial = initialItem(action.anchor,draft.dataTable);
      draft.dataTable.unshift(initial);
      break;
    }
    case `${branch}/${REMOVE_ROW}`: {
      debugger;
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      if (index !== -1) {
        draft.dataTable.splice(index, 1);
        if(action.isnotify)
          draft.notifMsg = notif.removed;
      }
      break;
    }
    case `${branch}/${UPDATE_ROW}`: {
      debugger ;
      
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      const cellTarget = action.event.target.name;
      const newVal = type => {
        if (type === 'checkbox') {
          return action.event.target.checked;
        }
        return action.event.target.value;
      };
      if (index !== -1) {
        var val=newVal(action.event.target.type);
        
      var selectindex = draft.anchor.findIndex(x => x.name ===cellTarget);
        if(draft.anchor[selectindex].orignaldata && draft.anchor[selectindex].childname)
        {        
          const Optionid =draft.anchor[selectindex].orignaldata.find((ele) => ele.name === val).id;
          var childname = draft.anchor[selectindex].childname;
          var childindex=draft.anchor.findIndex(x => x.name ===childname);
          var NameList=[];
          for (let i = 0; i < draft.anchor[childindex].orignaldata.length; i++) {
            if(draft.anchor[childindex].orignaldata[i].parentId===Optionid)
              NameList.push(draft.anchor[childindex].orignaldata[i].name);
          };
          draft.anchor[childindex].options=NameList;
        }
        draft.dataTable[index][cellTarget] =val ;
      }
      break;
    }
    case `${branch}/${EDIT_ROW}`: {
      debugger ;
      
      for(var i=0; i<draft.dataTable.length; i++)
      {
        if(draft.dataTable[i].edited)
          draft.dataTable[i].edited = false ;
      }
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      if (index !== -1) {
        draft.dataTable[index].edited = true;
       
        var parentindex=draft.anchor.findIndex(x => x.childname);
        if (parentindex !== -1) 
        {
          if(draft.anchor[parentindex].orignaldata && draft.anchor[parentindex].childname)
          {        
            const Optionid =draft.anchor[parentindex].orignaldata.find((ele) => ele.name === draft.dataTable[index][draft.anchor[parentindex].name]).id;
            var childname = draft.anchor[parentindex].childname;
            var childindex=draft.anchor.findIndex(x => x.name ===childname);
            var NameList=[];
            for (let i = 0; i < draft.anchor[childindex].orignaldata.length; i++) {
              if(draft.anchor[childindex].orignaldata[i].parentId===Optionid)
                NameList.push(draft.anchor[childindex].orignaldata[i].name);
            };
            draft.anchor[childindex].options=NameList;
            break;
          }
        }
      }
      break;
    }
    case `${branch}/${SAVE_ROW}`: {
      debugger ;
      const index = draft.dataTable.findIndex(item => item.id === action.item.id);
      if (index !== -1) {
        
        if(action.colId !=-1 && action.colId !=0 && action.colId !="crudTableDemo")
          draft.dataTable[index].id = action.colId;

        draft.dataTable[index].edited = false;
        if(action.isnotify)
          draft.notifMsg = notif.saved;
      }
      break;
    }
    case `${branch}/${CLOSE_NOTIF}`:
      draft.notifMsg = '';
      break;
    case `${branch}/${Reset}`:
      return initialState;
      break;
    default:
      break;
  }
});

export default crudTbReducer;
