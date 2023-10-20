
import * as requestFromServer from "./packageTypesCrud";
import { packageTypesSlice, callTypes } from "./packageTypesSlice";
const { actions } = packageTypesSlice;
export const fetchPackageTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPackageTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.packageTypesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find packageTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPackageType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.packageTypeFetched({ packageTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPackageTypeById(id)
    .then((response) => {
      const packageType = response.data;
      dispatch(actions.packageTypeFetched({ packageTypeForEdit: packageType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find packageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePackageType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePackageType(id)
    .then((response) => {
      dispatch(actions.packageTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete packageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPackageType = (packageTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPackageType(packageTypeForCreation)
    .then((response) => {
      const packageType = response.data;
      dispatch(actions.packageTypeCreated(packageType));
    })
    .catch((error) => {
      error.clientMessage = "Can't create packageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePackageType = (id, packageType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePackageType(id, packageType)
    .then((response) => {
      dispatch(actions.packageTypeUpdated({ packageType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update packageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePackageTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPackageTypes(ids, status)
    .then(() => {
      dispatch(actions.packageTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update packageTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePackageTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePackageTypes(ids)
    .then(() => {
      dispatch(actions.packageTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete packageTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 