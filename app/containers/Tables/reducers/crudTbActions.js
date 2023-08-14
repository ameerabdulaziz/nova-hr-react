import * as notification from 'enl-redux/constants/notifConstants';
import * as types from './crudTbConstants';

export const fetchAction = (items,anchor, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA}`,
  items,
  anchor
});
export const addAction = (anchor, branch) => ({
  branch,
  type: `${branch}/${types.ADD_EMPTY_ROW}`,
  anchor
});
export const removeAction = (item,isnotify, branch) => ({
  branch,
  type: `${branch}/${types.REMOVE_ROW}`,
  item,
  isnotify
});
export const updateAction = (event, item, branch) => ({
  branch,
  type: `${branch}/${types.UPDATE_ROW}`,
  event,
  item
});
export const editAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.EDIT_ROW}`,
  item
});
export const saveAction = (item,colId,isnotify, branch) => ({
  branch,
  type: `${branch}/${types.SAVE_ROW}`,
  item,
  colId,
  isnotify
});
export const closeNotifAction = branch => ({
  branch,
  type: `${branch}/${notification.CLOSE_NOTIF}`,
});
export const resetStateAction = branch => ({
  branch,
  type: `${branch}/${types.Reset}`,
});
