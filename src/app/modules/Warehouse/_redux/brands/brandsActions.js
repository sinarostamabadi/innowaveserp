
import * as requestFromServer from "./brandsCrud";
import { brandsSlice, callTypes } from "./brandsSlice";
const { actions } = brandsSlice;
export const fetchBrands = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBrands(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.brandsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find brands";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBrand = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.brandFetched({ brandForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBrandById(id)
    .then((response) => {
      const brand = response.data;
      dispatch(actions.brandFetched({ brandForEdit: brand }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find brand";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBrand = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBrand(id)
    .then((response) => {
      dispatch(actions.brandDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete brand";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBrand = (brandForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBrand(brandForCreation)
    .then((response) => {
      const brand = response.data;
      dispatch(actions.brandCreated(brand));
    })
    .catch((error) => {
      error.clientMessage = "Can't create brand";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBrand = (id, brand) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBrand(id, brand)
    .then((response) => {
      dispatch(actions.brandUpdated({ brand }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update brand";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBrandsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBrands(ids, status)
    .then(() => {
      dispatch(actions.brandsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update brands status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBrands = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBrands(ids)
    .then(() => {
      dispatch(actions.brandsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete brands";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 