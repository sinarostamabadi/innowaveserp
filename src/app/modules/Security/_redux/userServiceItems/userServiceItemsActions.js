
import * as requestFromServer from "./userServiceItemsCrud";
import { userServiceItemsSlice, callTypes } from "./userServiceItemsSlice";
const { actions } = userServiceItemsSlice;
export const fetchUserServiceItems = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findUserServiceItems(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.userServiceItemsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find userServiceItems";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchUserServiceItem = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.userServiceItemFetched({ userServiceItemForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getUserServiceItemById(id)  
    .then((response) => {
      const userServiceItem = response.data;
      dispatch(actions.userServiceItemFetched({ userServiceItemForEdit: userServiceItem }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find userServiceItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUserServiceItem = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteUserServiceItem(id)  
    .then((response) => {
      dispatch(actions.userServiceItemDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete userServiceItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createUserServiceItem = (userServiceItemForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createUserServiceItem(userServiceItemForCreation)  
    .then((response) => {
      const userServiceItem = response.data;
      dispatch(actions.userServiceItemCreated(userServiceItem));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create userServiceItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUserServiceItem = (userServiceItem) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateUserServiceItem(userServiceItem)  
    .then((response) => {
      dispatch(actions.userServiceItemUpdated({ userServiceItem }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update userServiceItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUserServiceItemsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForUserServiceItems(ids, status)  
    .then(() => {
      dispatch(actions.userServiceItemsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update userServiceItems status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUserServiceItems = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteUserServiceItems(ids)  
    .then(() => {
      dispatch(actions.userServiceItemsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete userServiceItems";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 