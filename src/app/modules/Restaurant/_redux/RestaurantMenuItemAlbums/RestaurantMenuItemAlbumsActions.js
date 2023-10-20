
import * as requestFromServer from "./restaurantMenuItemAlbumsCrud";
import { restaurantMenuItemAlbumsSlice, callTypes } from "./restaurantMenuItemAlbumsSlice";
const { actions } = restaurantMenuItemAlbumsSlice;
export const fetchRestaurantMenuItemAlbums = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRestaurantMenuItemAlbums(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantMenuItemAlbumsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItemAlbums";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantMenuItemAlbum = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.restaurantMenuItemAlbumFetched({ restaurantMenuItemAlbumForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRestaurantMenuItemAlbumById(id)  
    .then((response) => {
      const restaurantMenuItemAlbum = response.data;
      dispatch(actions.restaurantMenuItemAlbumFetched({ restaurantMenuItemAlbumForEdit: restaurantMenuItemAlbum }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItemAlbum";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItemAlbum = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantMenuItemAlbum(id)  
    .then((response) => {
      dispatch(actions.restaurantMenuItemAlbumDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItemAlbum";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantMenuItemAlbum = (restaurantMenuItemAlbumForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRestaurantMenuItemAlbum(restaurantMenuItemAlbumForCreation)  
    .then((response) => {
      const restaurantMenuItemAlbum = response.data;
      dispatch(actions.restaurantMenuItemAlbumCreated(restaurantMenuItemAlbum));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create restaurantMenuItemAlbum";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantMenuItemAlbum = (restaurantMenuItemAlbum) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRestaurantMenuItemAlbum(restaurantMenuItemAlbum)  
    .then((response) => {
      dispatch(actions.restaurantMenuItemAlbumUpdated({ restaurantMenuItemAlbum }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItemAlbum";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantMenuItemAlbumsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRestaurantMenuItemAlbums(ids, status)  
    .then(() => {
      dispatch(actions.restaurantMenuItemAlbumsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItemAlbums status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItemAlbums = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantMenuItemAlbums(ids)  
    .then(() => {
      dispatch(actions.restaurantMenuItemAlbumsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItemAlbums";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 