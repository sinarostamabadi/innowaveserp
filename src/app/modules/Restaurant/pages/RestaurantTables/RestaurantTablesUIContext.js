import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantTableModel } from "../../../../../core/_models/Restaurant/RestaurantTableModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantTablesUIContext = createContext();

export function useRestaurantTablesUIContext() {
  return useContext(RestaurantTablesUIContext);
}

export const RestaurantTablesUIConsumer = RestaurantTablesUIContext.Consumer;

export function RestaurantTablesUIProvider({
  restaurantTablesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantTableModel).initialFilter
  );

  const [ids, setIds] = useState([]);

  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: RestaurantTableModel,
    newRestaurantTableButtonClick:
      restaurantTablesUIEvents.newRestaurantTableButtonClick,
    openEditRestaurantTablePage:
      restaurantTablesUIEvents.openEditRestaurantTablePage,
    openDeleteRestaurantTableDialog:
      restaurantTablesUIEvents.openDeleteRestaurantTableDialog,
    openDeleteRestaurantTablesDialog:
      restaurantTablesUIEvents.openDeleteRestaurantTablesDialog,
    openFetchRestaurantTablesDialog:
      restaurantTablesUIEvents.openFetchRestaurantTablesDialog,
    openUpdateRestaurantTablesStatusDialog:
      restaurantTablesUIEvents.openUpdateRestaurantTablesStatusDialog,
  };
  return (
    <RestaurantTablesUIContext.Provider value={value}>
      {children}
    </RestaurantTablesUIContext.Provider>
  );
}
