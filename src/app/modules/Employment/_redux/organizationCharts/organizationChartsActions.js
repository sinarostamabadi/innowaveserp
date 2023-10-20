
import * as requestFromServer from "./organizationChartsCrud";
import { organizationChartsSlice, callTypes } from "./organizationChartsSlice";
const { actions } = organizationChartsSlice;
export const fetchOrganizationCharts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findOrganizationCharts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.organizationChartsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find organizationCharts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOrganizationChart = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.organizationChartFetched({ organizationChartForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getOrganizationChartById(id)  
    .then((response) => {
      const organizationChart = response.data;
      dispatch(actions.organizationChartFetched({ organizationChartForEdit: organizationChart }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find organizationChart";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationChart = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOrganizationChart(id)  
    .then((response) => {
      dispatch(actions.organizationChartDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete organizationChart";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createOrganizationChart = (organizationChartForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createOrganizationChart(organizationChartForCreation)  
    .then((response) => {
      const organizationChart = response.data;
      dispatch(actions.organizationChartCreated(organizationChart));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create organizationChart";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOrganizationChart = (organizationChart) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateOrganizationChart(organizationChart)  
    .then((response) => {
      dispatch(actions.organizationChartUpdated({ organizationChart }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update organizationChart";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOrganizationChartsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForOrganizationCharts(ids, status)  
    .then(() => {
      dispatch(actions.organizationChartsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update organizationCharts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationCharts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOrganizationCharts(ids)  
    .then(() => {
      dispatch(actions.organizationChartsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete organizationCharts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 