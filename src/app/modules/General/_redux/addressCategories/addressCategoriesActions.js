
import * as requestFromServer from "./addressCategoriesCrud";
import { addressCategoriesSlice, callTypes } from "./addressCategoriesSlice";
const { actions } = addressCategoriesSlice;
export const fetchAddressCategories = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findAddressCategories(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.addressCategoriesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find addressCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAddressCategory = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.addressCategoryFetched({ addressCategoryForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getAddressCategoryById(id)  
    .then((response) => {
      const addressCategory = response.data;
      dispatch(actions.addressCategoryFetched({ addressCategoryForEdit: addressCategory }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find addressCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAddressCategory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAddressCategory(id)  
    .then((response) => {
      dispatch(actions.addressCategoryDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete addressCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAddressCategory = (addressCategoryForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createAddressCategory(addressCategoryForCreation)  
    .then((response) => {
      const addressCategory = response.data;
      dispatch(actions.addressCategoryCreated(addressCategory));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create addressCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAddressCategory = (addressCategory) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateAddressCategory(addressCategory)  
    .then((response) => {
      dispatch(actions.addressCategoryUpdated({ addressCategory }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update addressCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAddressCategoriesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForAddressCategories(ids, status)  
    .then(() => {
      dispatch(actions.addressCategoriesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update addressCategories status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAddressCategories = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAddressCategories(ids)  
    .then(() => {
      dispatch(actions.addressCategoriesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete addressCategories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 