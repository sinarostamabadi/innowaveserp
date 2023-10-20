
import * as requestFromServer from "./organizationChartLevelsCrud";
import { organizationChartLevelsSlice, callTypes } from "./organizationChartLevelsSlice";
const { actions } = organizationChartLevelsSlice;
export const fetchOrganizationChartLevels = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findOrganizationChartLevels(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.organizationChartLevelsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find organizationChartLevels";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOrganizationChartLevel = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.organizationChartLevelFetched({ organizationChartLevelForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getOrganizationChartLevelById(id)  
    .then((response) => {
      const organizationChartLevel = response.data;
      dispatch(actions.organizationChartLevelFetched({ organizationChartLevelForEdit: organizationChartLevel }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find organizationChartLevel";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationChartLevel = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOrganizationChartLevel(id)  
    .then((response) => {
      dispatch(actions.organizationChartLevelDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete organizationChartLevel";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createOrganizationChartLevel = (organizationChartLevelForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createOrganizationChartLevel(organizationChartLevelForCreation)  
    .then((response) => {
      const organizationChartLevel = response.data;
      dispatch(actions.organizationChartLevelCreated(organizationChartLevel));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create organizationChartLevel";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOrganizationChartLevel = (organizationChartLevel) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateOrganizationChartLevel(organizationChartLevel)  
    .then((response) => {
      dispatch(actions.organizationChartLevelUpdated({ organizationChartLevel }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update organizationChartLevel";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOrganizationChartLevelsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForOrganizationChartLevels(ids, status)  
    .then(() => {
      dispatch(actions.organizationChartLevelsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update organizationChartLevels status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationChartLevels = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOrganizationChartLevels(ids)  
    .then(() => {
      dispatch(actions.organizationChartLevelsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete organizationChartLevels";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 