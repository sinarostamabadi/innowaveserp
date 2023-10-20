
import * as requestFromServer from "./productWarehousesCrud";
import { productWarehousesSlice, callTypes } from "./productWarehousesSlice";
const { actions } = productWarehousesSlice;
export const fetchProductWarehouses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findProductWarehouses(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.productWarehousesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find productWarehouses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProductWarehouse = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.productWarehouseFetched({ productWarehouseForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getProductWarehouseById(id)  
    .then((response) => {
      const productWarehouse = response.data;
      dispatch(actions.productWarehouseFetched({ productWarehouseForEdit: productWarehouse }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find productWarehouse";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProductWarehouse = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteProductWarehouse(id)  
    .then((response) => {
      dispatch(actions.productWarehouseDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete productWarehouse";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createProductWarehouse = (productWarehouseForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createProductWarehouse(productWarehouseForCreation)  
    .then((response) => {
      const productWarehouse = response.data;
      dispatch(actions.productWarehouseCreated(productWarehouse));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create productWarehouse";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProductWarehouse = (productWarehouse) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateProductWarehouse(productWarehouse)  
    .then((response) => {
      dispatch(actions.productWarehouseUpdated({ productWarehouse }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update productWarehouse";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProductWarehousesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForProductWarehouses(ids, status)  
    .then(() => {
      dispatch(actions.productWarehousesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update productWarehouses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProductWarehouses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteProductWarehouses(ids)  
    .then(() => {
      dispatch(actions.productWarehousesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete productWarehouses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 