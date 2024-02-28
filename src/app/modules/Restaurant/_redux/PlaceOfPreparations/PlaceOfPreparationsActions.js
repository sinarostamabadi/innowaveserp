import * as requestFromServer from "./placeOfPreparationsCrud";
import {
  placeOfPreparationsSlice,
  callTypes,
} from "./placeOfPreparationsSlice";
const { actions } = placeOfPreparationsSlice;
export const fetchPlaceOfPreparations = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPlaceOfPreparations(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.placeOfPreparationsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find placeOfPreparations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPlaceOfPreparation = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.placeOfPreparationFetched({
        placeOfPreparationForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPlaceOfPreparationById(id)
    .then((response) => {
      const placeOfPreparation = response.data;
      dispatch(
        actions.placeOfPreparationFetched({
          placeOfPreparationForEdit: placeOfPreparation,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find placeOfPreparation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePlaceOfPreparation = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePlaceOfPreparation(id)
    .then((response) => {
      dispatch(actions.placeOfPreparationDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete placeOfPreparation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPlaceOfPreparation =
  (placeOfPreparationForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createPlaceOfPreparation(placeOfPreparationForCreation)
      .then((response) => {
        const placeOfPreparation = response.data;
        dispatch(actions.placeOfPreparationCreated(placeOfPreparation));
      })
      .catch((error) => {
        error.clientMessage = "Can't create placeOfPreparation";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updatePlaceOfPreparation = (placeOfPreparation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePlaceOfPreparation(placeOfPreparation)
    .then((response) => {
      dispatch(actions.placeOfPreparationUpdated({ placeOfPreparation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update placeOfPreparation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePlaceOfPreparationsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPlaceOfPreparations(ids, status)
    .then(() => {
      dispatch(actions.placeOfPreparationsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update placeOfPreparations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePlaceOfPreparations = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePlaceOfPreparations(ids)
    .then(() => {
      dispatch(actions.placeOfPreparationsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete placeOfPreparations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
