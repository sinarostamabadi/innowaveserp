import * as requestFromServer from "./buySettlementTypesCrud";
import { buySettlementTypesSlice, callTypes } from "./buySettlementTypesSlice";
const { actions } = buySettlementTypesSlice;
export const fetchBuySettlementTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBuySettlementTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buySettlementTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find buySettlementTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuySettlementType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.buySettlementTypeFetched({ buySettlementTypeForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBuySettlementTypeById(id)
    .then((response) => {
      const buySettlementType = response.data;
      dispatch(
        actions.buySettlementTypeFetched({
          buySettlementTypeForEdit: buySettlementType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find buySettlementType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuySettlementType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuySettlementType(id)
    .then((response) => {
      dispatch(actions.buySettlementTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buySettlementType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuySettlementType =
  (buySettlementTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createBuySettlementType(buySettlementTypeForCreation)
      .then((response) => {
        const buySettlementType = response.data;
        dispatch(actions.buySettlementTypeCreated(buySettlementType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create buySettlementType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBuySettlementType =
  (id, buySettlementType) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateBuySettlementType(id, buySettlementType)
      .then((response) => {
        dispatch(actions.buySettlementTypeUpdated({ buySettlementType }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update buySettlementType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBuySettlementTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBuySettlementTypes(ids, status)
    .then(() => {
      dispatch(actions.buySettlementTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buySettlementTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuySettlementTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuySettlementTypes(ids)
    .then(() => {
      dispatch(actions.buySettlementTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buySettlementTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
