
import * as requestFromServer from "./productGroupsCrud";
import { productGroupsSlice, callTypes } from "./productGroupsSlice";
const { actions } = productGroupsSlice;
export const fetchProductGroups = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProductGroups(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.productGroupsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find productGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProductGroupsTree = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getTree(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.productGroupsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find productGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProductGroup = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.productGroupFetched({ productGroupForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductGroupById(id)
    .then((response) => {
      const productGroup = response.data;
      dispatch(actions.productGroupFetched({ productGroupForEdit: productGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find productGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProductGroup = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProductGroup(id)
    .then((response) => {
      dispatch(actions.productGroupDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete productGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createProductGroup = (productGroupForCreation, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProductGroup(productGroupForCreation)
    .then((response) => {
      const productGroup = response.data;
      fnCallback(productGroup);
      dispatch(actions.productGroupCreated(productGroup));
    })
    .catch((error) => {
      error.clientMessage = "Can't create productGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProductGroup = (id, productGroup) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProductGroup(id, productGroup)
    .then((response) => {
      dispatch(actions.productGroupUpdated({ productGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update productGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProductGroupsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForProductGroups(ids, status)
    .then(() => {
      dispatch(actions.productGroupsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update productGroups status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProductGroups = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProductGroups(ids)
    .then(() => {
      dispatch(actions.productGroupsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete productGroups";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 