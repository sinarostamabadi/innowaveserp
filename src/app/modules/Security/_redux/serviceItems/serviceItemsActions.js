import * as requestFromServer from "./serviceItemsCrud";
import { serviceItemsSlice, callTypes } from "./serviceItemsSlice";
const { actions } = serviceItemsSlice;
export const fetchServiceItems = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findServiceItems(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.serviceItemsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find serviceItems";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchServiceItem = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.serviceItemFetched({ serviceItemForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getServiceItemById(id)
    .then((response) => {
      const serviceItem = response.data;
      dispatch(actions.serviceItemFetched({ serviceItemForEdit: serviceItem }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find serviceItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteServiceItem = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServiceItem(id)
    .then((response) => {
      dispatch(actions.serviceItemDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete serviceItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createServiceItem = (serviceItemForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createServiceItem(serviceItemForCreation)
    .then((response) => {
      const serviceItem = response.data;
      dispatch(actions.serviceItemCreated(serviceItem));
    })
    .catch((error) => {
      error.clientMessage = "Can't create serviceItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateServiceItem = (serviceItem) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateServiceItem(serviceItem)
    .then((response) => {
      dispatch(actions.serviceItemUpdated({ serviceItem }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update serviceItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateServiceItemsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForServiceItems(ids, status)
    .then(() => {
      dispatch(actions.serviceItemsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update serviceItems status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteServiceItems = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServiceItems(ids)
    .then(() => {
      dispatch(actions.serviceItemsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete serviceItems";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
