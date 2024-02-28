import * as requestFromServer from "./employeeRelationsCrud";
import { employeeRelationsSlice, callTypes } from "./employeeRelationsSlice";
const { actions } = employeeRelationsSlice;
export const fetchEmployeeRelations = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployeeRelations(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeRelationsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeRelations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeRelation = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.employeeRelationFetched({ employeeRelationForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeRelationById(id)
    .then((response) => {
      const employeeRelation = response.data;
      dispatch(
        actions.employeeRelationFetched({
          employeeRelationForEdit: employeeRelation,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeRelation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeRelation = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeRelation(id)
    .then((response) => {
      dispatch(actions.employeeRelationDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeRelation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeRelation =
  (employeeRelationForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createEmployeeRelation(employeeRelationForCreation)
      .then((response) => {
        const employeeRelation = response.data;
        dispatch(actions.employeeRelationCreated(employeeRelation));
      })
      .catch((error) => {
        error.clientMessage = "Can't create employeeRelation";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateEmployeeRelation = (employeeRelation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEmployeeRelation(employeeRelation)
    .then((response) => {
      dispatch(actions.employeeRelationUpdated({ employeeRelation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeRelation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeRelationsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployeeRelations(ids, status)
    .then(() => {
      dispatch(actions.employeeRelationsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeRelations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeRelations = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeRelations(ids)
    .then(() => {
      dispatch(actions.employeeRelationsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeRelations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
