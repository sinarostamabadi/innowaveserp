import * as requestFromServer from "./buyCostsCrud";
import { buyCostsSlice, callTypes } from "./buyCostsSlice";
const { actions } = buyCostsSlice;
export const fetchBuyCosts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBuyCosts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buyCostsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find buyCosts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuyCost = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.buyCostFetched({ buyCostForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBuyCostById(id)
    .then((response) => {
      const buyCost = response.data;
      dispatch(actions.buyCostFetched({ buyCostForEdit: buyCost }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find buyCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyCost = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuyCost(id)
    .then((response) => {
      dispatch(actions.buyCostDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buyCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuyCost = (buyCostForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBuyCost(buyCostForCreation)
    .then((response) => {
      const buyCost = response.data;
      dispatch(actions.buyCostCreated(buyCost));
    })
    .catch((error) => {
      error.clientMessage = "Can't create buyCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyCost = (buyCost) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBuyCost(buyCost)
    .then((response) => {
      dispatch(actions.buyCostUpdated({ buyCost }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buyCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyCostsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBuyCosts(ids, status)
    .then(() => {
      dispatch(actions.buyCostsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buyCosts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyCosts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuyCosts(ids)
    .then(() => {
      dispatch(actions.buyCostsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buyCosts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
