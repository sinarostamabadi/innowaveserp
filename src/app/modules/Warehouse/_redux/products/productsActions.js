
import * as requestFromServer from "./productsCrud";
import { productsSlice, callTypes } from "./productsSlice";
const { actions } = productsSlice;
export const fetchProducts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProducts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.productsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find products";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProduct = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.productFetched({ productForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductById(id)
    .then((response) => {
      const product = response.data;
      dispatch(actions.productFetched({ productForEdit: product }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProduct = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProduct(id)
    .then((response) => {
      dispatch(actions.productDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createProduct = (productForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProduct(productForCreation)
    .then((response) => {
      const product = response.data;
      fnCallBack(product);
      
      dispatch(actions.productCreated(product));

      return product;
    })
    .catch((error) => {
      error.clientMessage = "Can't create product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProduct = (id, product, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProduct(id, product)
    .then((response) => {
      fnCallBack(product);

      dispatch(actions.productUpdated({ product }));
      return product;
    })
    .catch((error) => {
      error.clientMessage = "Can't update product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProductsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForProducts(ids, status)
    .then(() => {
      dispatch(actions.productsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update products status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProducts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProducts(ids)
    .then(() => {
      dispatch(actions.productsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete products";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};