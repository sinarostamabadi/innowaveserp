
import * as requestFromServer from "./closetsCrud";
import { closetsSlice, callTypes } from "./closetsSlice";
const { actions } = closetsSlice;
export const fetchClosets = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findClosets(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.closetsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find closets";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCloset = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.closetFetched({ closetForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getClosetById(id)
    .then((response) => {
      const closet = response.data;
      dispatch(actions.closetFetched({ closetForEdit: closet }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find closet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCloset = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCloset(id)
    .then((response) => {
      dispatch(actions.closetDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete closet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const openCloset = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .openCloset(id)
    .then((response) => {
      dispatch(actions.closetOpened({ id }));
    })
    .catch((error) => {
      error.clientMessage = "بازکردن کمد با خطا مواجه شده است.";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const freeCloset = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .freeCloset(id)
    .then((response) => {
      dispatch(actions.closetSettedFree({ id }));
    })
    .catch((error) => {
      error.clientMessage = "آزادسازی کمد با خطا مواجه شده است.";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCloset = (closetForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCloset(closetForCreation)
    .then((response) => {
      const closet = response.data;
      dispatch(actions.closetCreated(closet));
    })
    .catch((error) => {
      error.clientMessage = "Can't create closet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCloset = (id, closet) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCloset(id, closet)
    .then((response) => {
      dispatch(actions.closetUpdated({ closet }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update closet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateClosetsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForClosets(ids, status)
    .then(() => {
      dispatch(actions.closetsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update closets status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteClosets = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteClosets(ids)
    .then(() => {
      dispatch(actions.closetsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete closets";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 