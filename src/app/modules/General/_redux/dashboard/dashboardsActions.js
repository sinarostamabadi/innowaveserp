import * as requestFromServer from "./dashboardsCrud";
import { dashboardsSlice, callTypes } from "./dashboardsSlice";

const { actions } = dashboardsSlice;

export const fetchDashboards = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllDashboards(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.dashboardsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find dashboards";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDashboard = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.dashboardFetched({ dashboardForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDashboardById(id)
    .then((response) => {
      const dashboard = response.data;
      dispatch(actions.dashboardFetched({ dashboardForEdit: dashboard }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find dashboard";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
