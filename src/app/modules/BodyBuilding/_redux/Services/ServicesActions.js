import * as requestFromServer from "./ServicesCrud";
import { servicesSlice, callTypes } from "./ServicesSlice";
const { actions } = servicesSlice;
export const fetchServices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findServices(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.servicesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find services";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchService = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.serviceFetched({ serviceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getServiceById(id)
    .then((response) => {
      const service = response.data;
      dispatch(actions.serviceFetched({ serviceForEdit: service }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find service";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteService = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteService(id)
    .then((response) => {
      dispatch(actions.serviceDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete service";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createService = (serviceForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createService(serviceForCreation)
    .then((response) => {
      const service = response.data;
      fnCallBack(service);

      dispatch(actions.serviceCreated(service));

      return service;
    })
    .catch((error) => {
      error.clientMessage = "Can't create service";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateService = (id, service, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateService(id, service)
    .then((response) => {
      fnCallBack(service);

      dispatch(actions.serviceUpdated({ service }));

      return service;
    })
    .catch((error) => {
      error.clientMessage = "Can't update service";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateServicesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForServices(ids, status)
    .then(() => {
      dispatch(actions.servicesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update services status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteServices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServices(ids)
    .then(() => {
      dispatch(actions.servicesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete services";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
