
import * as requestFromServer from "./provincesCrud";
import { provincesSlice, callTypes } from "./provincesSlice";
const { actions } = provincesSlice;
export const fetchProvinces = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findProvinces(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.provincesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find provinces";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProvince = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.provinceFetched({ provinceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getProvinceById(id)  
    .then((response) => {
      const province = response.data;
      dispatch(actions.provinceFetched({ provinceForEdit: province }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find province";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProvince = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteProvince(id)  
    .then((response) => {
      dispatch(actions.provinceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete province";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createProvince = (provinceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createProvince(provinceForCreation)  
    .then((response) => {
      const province = response.data;
      dispatch(actions.provinceCreated(province));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create province";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProvince = (province) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateProvince(province)  
    .then((response) => {
      dispatch(actions.provinceUpdated({ province }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update province";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProvincesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForProvinces(ids, status)  
    .then(() => {
      dispatch(actions.provincesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update provinces status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProvinces = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteProvinces(ids)  
    .then(() => {
      dispatch(actions.provincesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete provinces";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};