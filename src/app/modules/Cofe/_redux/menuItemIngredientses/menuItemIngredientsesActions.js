import * as requestFromServer from "./menuItemIngredientsesCrud";
import {
  menuItemIngredientsesSlice,
  callTypes,
} from "./menuItemIngredientsesSlice";
const { actions } = menuItemIngredientsesSlice;
export const fetchMenuItemIngredientses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMenuItemIngredientses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.menuItemIngredientsesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuItemIngredientses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMenuItemIngredients = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.menuItemIngredientsFetched({
        menuItemIngredientsForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMenuItemIngredientsById(id)
    .then((response) => {
      const menuItemIngredients = response.data;
      dispatch(
        actions.menuItemIngredientsFetched({
          menuItemIngredientsForEdit: menuItemIngredients,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuItemIngredients";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItemIngredients = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuItemIngredients(id)
    .then((response) => {
      dispatch(actions.menuItemIngredientsDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuItemIngredients";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMenuItemIngredients =
  (menuItemIngredientsForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createMenuItemIngredients(menuItemIngredientsForCreation)
      .then((response) => {
        const menuItemIngredients = response.data;
        dispatch(actions.menuItemIngredientsCreated(menuItemIngredients));
      })
      .catch((error) => {
        error.clientMessage = "Can't create menuItemIngredients";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMenuItemIngredients =
  (menuItemIngredients) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateMenuItemIngredients(menuItemIngredients)
      .then((response) => {
        dispatch(actions.menuItemIngredientsUpdated({ menuItemIngredients }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update menuItemIngredients";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMenuItemIngredientsesStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForMenuItemIngredientses(ids, status)
      .then(() => {
        dispatch(actions.menuItemIngredientsesStatusUpdated({ ids, status }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update menuItemIngredientses status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteMenuItemIngredientses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuItemIngredientses(ids)
    .then(() => {
      dispatch(actions.menuItemIngredientsesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuItemIngredientses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
