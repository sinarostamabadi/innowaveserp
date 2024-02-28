import * as requestFromServer from "./restaurantTablesCrud";
import { restaurantTablesSlice, callTypes } from "./restaurantTablesSlice";
const { actions } = restaurantTablesSlice;
export const fetchRestaurantTables = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRestaurantTables(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantTablesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantTables";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantTable = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.restaurantTableFetched({ restaurantTableForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRestaurantTableById(id)
    .then((response) => {
      const restaurantTable = response.data;
      dispatch(
        actions.restaurantTableFetched({
          restaurantTableForEdit: restaurantTable,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantTable";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantTable = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantTable(id)
    .then((response) => {
      dispatch(actions.restaurantTableDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantTable";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantTable =
  (restaurantTableForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createRestaurantTable(restaurantTableForCreation)
      .then((response) => {
        const restaurantTable = response.data;
        dispatch(actions.restaurantTableCreated(restaurantTable));
      })
      .catch((error) => {
        error.clientMessage = "Can't create restaurantTable";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRestaurantTable = (restaurantTable) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRestaurantTable(restaurantTable)
    .then((response) => {
      dispatch(actions.restaurantTableUpdated({ restaurantTable }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantTable";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantTablesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRestaurantTables(ids, status)
    .then(() => {
      dispatch(actions.restaurantTablesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantTables status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantTables = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantTables(ids)
    .then(() => {
      dispatch(actions.restaurantTablesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantTables";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
