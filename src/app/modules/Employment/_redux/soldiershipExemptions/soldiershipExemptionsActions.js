import * as requestFromServer from "./soldiershipExemptionsCrud";
import {
  soldiershipExemptionsSlice,
  callTypes,
} from "./soldiershipExemptionsSlice";
const { actions } = soldiershipExemptionsSlice;
export const fetchSoldiershipExemptions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSoldiershipExemptions(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.soldiershipExemptionsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find soldiershipExemptions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSoldiershipExemption = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.soldiershipExemptionFetched({
        soldiershipExemptionForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSoldiershipExemptionById(id)
    .then((response) => {
      const soldiershipExemption = response.data;
      dispatch(
        actions.soldiershipExemptionFetched({
          soldiershipExemptionForEdit: soldiershipExemption,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find soldiershipExemption";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSoldiershipExemption = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSoldiershipExemption(id)
    .then((response) => {
      dispatch(actions.soldiershipExemptionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete soldiershipExemption";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSoldiershipExemption =
  (soldiershipExemptionForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createSoldiershipExemption(soldiershipExemptionForCreation)
      .then((response) => {
        const soldiershipExemption = response.data;
        dispatch(actions.soldiershipExemptionCreated(soldiershipExemption));
      })
      .catch((error) => {
        error.clientMessage = "Can't create soldiershipExemption";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateSoldiershipExemption =
  (soldiershipExemption) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateSoldiershipExemption(soldiershipExemption)
      .then((response) => {
        dispatch(actions.soldiershipExemptionUpdated({ soldiershipExemption }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update soldiershipExemption";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateSoldiershipExemptionsStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForSoldiershipExemptions(ids, status)
      .then(() => {
        dispatch(actions.soldiershipExemptionsStatusUpdated({ ids, status }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update soldiershipExemptions status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteSoldiershipExemptions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSoldiershipExemptions(ids)
    .then(() => {
      dispatch(actions.soldiershipExemptionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete soldiershipExemptions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
