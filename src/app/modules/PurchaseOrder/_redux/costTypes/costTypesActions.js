
import * as requestFromServer from "./costTypesCrud";
import { costTypesSlice, callTypes } from "./costTypesSlice";
const { actions } = costTypesSlice;
export const fetchCostTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCostTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.costTypesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find costTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCostType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.costTypeFetched({ costTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCostTypeById(id)
    .then((response) => {
      const costType = response.data;
      dispatch(actions.costTypeFetched({ costTypeForEdit: costType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find costType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCostType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCostType(id)
    .then((response) => {
      dispatch(actions.costTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete costType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCostType = (costTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCostType(costTypeForCreation)
    .then((response) => {
      const costType = response.data;
      dispatch(actions.costTypeCreated(costType));
    })
    .catch((error) => {
      error.clientMessage = "Can't create costType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCostType = (id, costType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCostType(id, costType)
    .then((response) => {
      dispatch(actions.costTypeUpdated({ costType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update costType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCostTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCostTypes(ids, status)
    .then(() => {
      dispatch(actions.costTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update costTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCostTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCostTypes(ids)
    .then(() => {
      dispatch(actions.costTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete costTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 