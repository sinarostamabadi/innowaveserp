import * as requestFromServer from "./servicesesCrud";
import { servicesesSlice, callTypes } from "./servicesesSlice";
const { actions } = servicesesSlice;
export const fetchServiceses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findServiceses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.servicesesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find serviceses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchServices = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.servicesFetched({ servicesForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getServicesById(id)
    .then((response) => {
      const services = response.data;
      dispatch(actions.servicesFetched({ servicesForEdit: services }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find services";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteServices = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServices(id)
    .then((response) => {
      dispatch(actions.servicesDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete services";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createServices = (servicesForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createServices(servicesForCreation)
    .then((response) => {
      const services = response.data;
      dispatch(actions.servicesCreated(services));
    })
    .catch((error) => {
      error.clientMessage = "Can't create services";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateServices = (services) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateServices(services)
    .then((response) => {
      dispatch(actions.servicesUpdated({ services }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update services";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateServicesesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForServiceses(ids, status)
    .then(() => {
      dispatch(actions.servicesesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update serviceses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteServiceses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServiceses(ids)
    .then(() => {
      dispatch(actions.servicesesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete serviceses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
