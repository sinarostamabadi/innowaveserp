import * as requestFromServer from "./massageTimePriceingCrud";
import {
  massageTimePriceingSlice,
  callTypes,
} from "./massageTimePriceingSlice";
const { actions } = massageTimePriceingSlice;
export const fetchMassageTimePriceing = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMassageTimePriceing(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.massageTimePriceingFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find massageTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMassageTimePriceing = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.massageTimePriceingFetched({
        massageTimePriceingForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMassageTimePriceingById(id)
    .then((response) => {
      const massageTimePriceing = response.data;
      dispatch(
        actions.massageTimePriceingFetched({
          massageTimePriceingForEdit: massageTimePriceing,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find massageTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageTimePriceing = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMassageTimePriceing(id)
    .then((response) => {
      dispatch(actions.massageTimePriceingDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete massageTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMassageTimePriceing =
  (massageTimePriceingForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createMassageTimePriceing(massageTimePriceingForCreation)
      .then((response) => {
        const massageTimePriceing = response.data;
        dispatch(actions.massageTimePriceingCreated(massageTimePriceing));
      })
      .catch((error) => {
        error.clientMessage = "Can't create massageTimePriceing";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMassageTimePriceing =
  (massageTimePriceing) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateMassageTimePriceing(massageTimePriceing)
      .then((response) => {
        dispatch(actions.massageTimePriceingUpdated({ massageTimePriceing }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update massageTimePriceing";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMassageTimePriceingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMassageTimePriceing(ids, status)
    .then(() => {
      dispatch(actions.massageTimePriceingStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update massageTimePriceing status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageTimePriceing = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMassageTimePriceing(ids)
    .then(() => {
      dispatch(actions.massageTimePriceingDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete massageTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
