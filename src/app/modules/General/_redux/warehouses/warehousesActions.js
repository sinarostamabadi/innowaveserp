import * as requestFromServer from "./warehousesCrud";
import { warehousesSlice, callTypes } from "./warehousesSlice";
const { actions } = warehousesSlice;
export const fetchWarehouses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findWarehouses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.warehousesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find warehouses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchWarehouse = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.warehouseFetched({ warehouseForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getWarehouseById(id)
    .then((response) => {
      const warehouse = response.data;
      dispatch(actions.warehouseFetched({ warehouseForEdit: warehouse }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find warehouse";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteWarehouse = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteWarehouse(id)
    .then((response) => {
      dispatch(actions.warehouseDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete warehouse";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createWarehouse = (warehouseForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createWarehouse(warehouseForCreation)
    .then((response) => {
      const warehouse = response.data;
      dispatch(actions.warehouseCreated(warehouse));
    })
    .catch((error) => {
      error.clientMessage = "Can't create warehouse";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateWarehouse = (id, warehouse) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateWarehouse(id, warehouse)
    .then((response) => {
      dispatch(actions.warehouseUpdated({ warehouse }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update warehouse";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateWarehousesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForWarehouses(ids, status)
    .then(() => {
      dispatch(actions.warehousesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update warehouses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteWarehouses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteWarehouses(ids)
    .then(() => {
      dispatch(actions.warehousesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete warehouses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
