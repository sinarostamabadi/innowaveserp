import * as requestFromServer from "./billiardTimePriceingCrud";
import {
  billiardTimePriceingSlice,
  callTypes,
} from "./billiardTimePriceingSlice";
const { actions } = billiardTimePriceingSlice;
export const fetchBilliardTimePriceing = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBilliardTimePriceing(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.billiardTimePriceingFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find billiardTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBilliardTimePriceing = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.billiardTimePriceingFetched({
        billiardTimePriceingForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBilliardTimePriceingById(id)
    .then((response) => {
      const billiardTimePriceing = response.data;
      dispatch(
        actions.billiardTimePriceingFetched({
          billiardTimePriceingForEdit: billiardTimePriceing,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find billiardTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardTimePriceing = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBilliardTimePriceing(id)
    .then((response) => {
      dispatch(actions.billiardTimePriceingDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete billiardTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBilliardTimePriceing =
  (billiardTimePriceingForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createBilliardTimePriceing(billiardTimePriceingForCreation)
      .then((response) => {
        const billiardTimePriceing = response.data;
        dispatch(actions.billiardTimePriceingCreated(billiardTimePriceing));
      })
      .catch((error) => {
        error.clientMessage = "Can't create billiardTimePriceing";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBilliardTimePriceing =
  (billiardTimePriceing) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateBilliardTimePriceing(billiardTimePriceing)
      .then((response) => {
        dispatch(actions.billiardTimePriceingUpdated({ billiardTimePriceing }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update billiardTimePriceing";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBilliardTimePriceingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBilliardTimePriceing(ids, status)
    .then(() => {
      dispatch(actions.billiardTimePriceingStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update billiardTimePriceing status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardTimePriceing = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBilliardTimePriceing(ids)
    .then(() => {
      dispatch(actions.billiardTimePriceingDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete billiardTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
