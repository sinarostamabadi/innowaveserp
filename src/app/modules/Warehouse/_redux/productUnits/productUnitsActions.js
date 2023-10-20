
import * as requestFromServer from "./productUnitsCrud";
import { productUnitsSlice, callTypes } from "./productUnitsSlice";
const { actions } = productUnitsSlice;
export const fetchProductUnits = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findProductUnits(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.productUnitsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find productUnits";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProductUnit = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.productUnitFetched({ productUnitForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getProductUnitById(id)  
    .then((response) => {
      const productUnit = response.data;
      dispatch(actions.productUnitFetched({ productUnitForEdit: productUnit }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find productUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProductUnit = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteProductUnit(id)  
    .then((response) => {
      dispatch(actions.productUnitDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete productUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createProductUnit = (productUnitForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createProductUnit(productUnitForCreation)  
    .then((response) => {
      const productUnit = response.data;
      dispatch(actions.productUnitCreated(productUnit));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create productUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProductUnit = (productUnit) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateProductUnit(productUnit)  
    .then((response) => {
      dispatch(actions.productUnitUpdated({ productUnit }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update productUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProductUnitsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForProductUnits(ids, status)  
    .then(() => {
      dispatch(actions.productUnitsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update productUnits status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProductUnits = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteProductUnits(ids)  
    .then(() => {
      dispatch(actions.productUnitsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete productUnits";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 