
import * as requestFromServer from "./masseursCrud";
import { masseursSlice, callTypes } from "./masseursSlice";
const { actions } = masseursSlice;
export const fetchMasseurs = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findMasseurs(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.masseursFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find masseurs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMasseur = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.masseurFetched({ masseurForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getMasseurById(id)  
    .then((response) => {
      const masseur = response.data;
      dispatch(actions.masseurFetched({ masseurForEdit: masseur }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find masseur";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMasseur = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteMasseur(id)  
    .then((response) => {
      dispatch(actions.masseurDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete masseur";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMasseur = (masseurForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createMasseur(masseurForCreation)  
    .then((response) => {
      const masseur = response.data;
      dispatch(actions.masseurCreated(masseur));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create masseur";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMasseur = (masseur) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateMasseur(masseur)  
    .then((response) => {
      dispatch(actions.masseurUpdated({ masseur }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update masseur";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMasseursStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForMasseurs(ids, status)  
    .then(() => {
      dispatch(actions.masseursStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update masseurs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMasseurs = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteMasseurs(ids)  
    .then(() => {
      dispatch(actions.masseursDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete masseurs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 