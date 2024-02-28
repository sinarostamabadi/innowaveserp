import * as requestFromServer from "./organizationUnitsCrud";
import { organizationUnitsSlice, callTypes } from "./organizationUnitsSlice";
const { actions } = organizationUnitsSlice;
export const fetchOrganizationUnits = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findOrganizationUnits(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.organizationUnitsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find organizationUnits";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOrganizationUnit = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.organizationUnitFetched({ organizationUnitForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getOrganizationUnitById(id)
    .then((response) => {
      const organizationUnit = response.data;
      dispatch(
        actions.organizationUnitFetched({
          organizationUnitForEdit: organizationUnit,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find organizationUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationUnit = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOrganizationUnit(id)
    .then((response) => {
      dispatch(actions.organizationUnitDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete organizationUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createOrganizationUnit =
  (organizationUnitForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createOrganizationUnit(organizationUnitForCreation)
      .then((response) => {
        const organizationUnit = response.data;
        dispatch(actions.organizationUnitCreated(organizationUnit));
      })
      .catch((error) => {
        error.clientMessage = "Can't create organizationUnit";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateOrganizationUnit = (organizationUnit) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOrganizationUnit(organizationUnit)
    .then((response) => {
      dispatch(actions.organizationUnitUpdated({ organizationUnit }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update organizationUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOrganizationUnitsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForOrganizationUnits(ids, status)
    .then(() => {
      dispatch(actions.organizationUnitsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update organizationUnits status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationUnits = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOrganizationUnits(ids)
    .then(() => {
      dispatch(actions.organizationUnitsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete organizationUnits";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
