
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantCostTypeModel } from "../../../../../core/_models/Restaurant/RestaurantCostTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantCostTypesUIContext = createContext();

export function useRestaurantCostTypesUIContext() {
  return useContext(RestaurantCostTypesUIContext);
}

export const RestaurantCostTypesUIConsumer = RestaurantCostTypesUIContext.Consumer;

export function RestaurantCostTypesUIProvider({ restaurantCostTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantCostTypeModel).initialFilter
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
    dataModel: RestaurantCostTypeModel,
    newRestaurantCostTypeButtonClick: restaurantCostTypesUIEvents.newRestaurantCostTypeButtonClick,
    openEditRestaurantCostTypePage: restaurantCostTypesUIEvents.openEditRestaurantCostTypePage,
    openDeleteRestaurantCostTypeDialog: restaurantCostTypesUIEvents.openDeleteRestaurantCostTypeDialog,
    openDeleteRestaurantCostTypesDialog: restaurantCostTypesUIEvents.openDeleteRestaurantCostTypesDialog,
    openFetchRestaurantCostTypesDialog: restaurantCostTypesUIEvents.openFetchRestaurantCostTypesDialog,
    openUpdateRestaurantCostTypesStatusDialog: restaurantCostTypesUIEvents.openUpdateRestaurantCostTypesStatusDialog,
  };
  return (
    <RestaurantCostTypesUIContext.Provider value={value}>{children}</RestaurantCostTypesUIContext.Provider>
  );
}