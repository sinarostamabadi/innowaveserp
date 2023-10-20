
import * as requestFromServer from "./chequePapersCrud";
import { chequePapersSlice, callTypes } from "./chequePapersSlice";
const { actions } = chequePapersSlice;
export const fetchChequePapers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findChequePapers(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.chequePapersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find chequePapers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchChequePaper = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.chequePaperFetched({ chequePaperForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getChequePaperById(id)  
    .then((response) => {
      const chequePaper = response.data;
      dispatch(actions.chequePaperFetched({ chequePaperForEdit: chequePaper }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find chequePaper";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteChequePaper = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteChequePaper(id)  
    .then((response) => {
      dispatch(actions.chequePaperDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete chequePaper";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createChequePaper = (chequePaperForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createChequePaper(chequePaperForCreation)  
    .then((response) => {
      const chequePaper = response.data;
      dispatch(actions.chequePaperCreated(chequePaper));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create chequePaper";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateChequePaper = (chequePaper) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateChequePaper(chequePaper)  
    .then((response) => {
      dispatch(actions.chequePaperUpdated({ chequePaper }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update chequePaper";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateChequePapersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForChequePapers(ids, status)  
    .then(() => {
      dispatch(actions.chequePapersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update chequePapers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteChequePapers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteChequePapers(ids)  
    .then(() => {
      dispatch(actions.chequePapersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete chequePapers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};