import * as requestFromServer from "./bodyBuildingPriceingCrud";
import {
  bodyBuildingPriceingSlice,
  callTypes,
} from "./bodyBuildingPriceingSlice";
const { actions } = bodyBuildingPriceingSlice;
export const fetchBodyBuildingPriceings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBodyBuildingPriceing(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bodyBuildingPriceingFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingPriceing";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBodyBuildingPriceing = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.bodyBuildingPriceingFetched({
        bodyBuildingPriceingForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBodyBuildingPriceingById(id)
    .then((response) => {
      const bodyBuildingPriceing = response.data;
      dispatch(
        actions.bodyBuildingPriceingFetched({
          bodyBuildingPriceingForEdit: bodyBuildingPriceing,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingPriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingPriceing = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBodyBuildingPriceing(id)
    .then((response) => {
      dispatch(actions.bodyBuildingPriceingDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingPriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBodyBuildingPriceing =
  (bodyBuildingPriceingForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createBodyBuildingPriceing(bodyBuildingPriceingForCreation)
      .then((response) => {
        const bodyBuildingPriceing = response.data;
        dispatch(actions.bodyBuildingPriceingCreated(bodyBuildingPriceing));
      })
      .catch((error) => {
        error.clientMessage = "Can't create bodyBuildingPriceing";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBodyBuildingPriceing =
  (bodyBuildingPriceing) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateBodyBuildingPriceing(bodyBuildingPriceing)
      .then((response) => {
        dispatch(actions.bodyBuildingPriceingUpdated({ bodyBuildingPriceing }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update bodyBuildingPriceing";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBodyBuildingPriceingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBodyBuildingPriceing(ids, status)
    .then(() => {
      dispatch(actions.bodyBuildingPriceingStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update bodyBuildingPriceing status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingPriceings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBodyBuildingPriceings(ids)
    .then(() => {
      dispatch(actions.bodyBuildingPriceingDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingPriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
