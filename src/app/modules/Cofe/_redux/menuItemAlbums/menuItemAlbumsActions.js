
import * as requestFromServer from "./menuItemAlbumsCrud";
import { menuItemAlbumsSlice, callTypes } from "./menuItemAlbumsSlice";
const { actions } = menuItemAlbumsSlice;
export const fetchMenuItemAlbums = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findMenuItemAlbums(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.menuItemAlbumsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find menuItemAlbums";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMenuItemAlbum = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.menuItemAlbumFetched({ menuItemAlbumForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getMenuItemAlbumById(id)  
    .then((response) => {
      const menuItemAlbum = response.data;
      dispatch(actions.menuItemAlbumFetched({ menuItemAlbumForEdit: menuItemAlbum }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find menuItemAlbum";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItemAlbum = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteMenuItemAlbum(id)  
    .then((response) => {
      dispatch(actions.menuItemAlbumDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete menuItemAlbum";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMenuItemAlbum = (menuItemAlbumForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createMenuItemAlbum(menuItemAlbumForCreation)  
    .then((response) => {
      const menuItemAlbum = response.data;
      dispatch(actions.menuItemAlbumCreated(menuItemAlbum));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create menuItemAlbum";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuItemAlbum = (menuItemAlbum) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateMenuItemAlbum(menuItemAlbum)  
    .then((response) => {
      dispatch(actions.menuItemAlbumUpdated({ menuItemAlbum }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update menuItemAlbum";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuItemAlbumsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForMenuItemAlbums(ids, status)  
    .then(() => {
      dispatch(actions.menuItemAlbumsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update menuItemAlbums status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItemAlbums = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteMenuItemAlbums(ids)  
    .then(() => {
      dispatch(actions.menuItemAlbumsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete menuItemAlbums";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 