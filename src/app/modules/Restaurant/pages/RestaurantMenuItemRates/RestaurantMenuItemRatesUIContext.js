
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantMenuItemRateModel } from "../../../../../core/_models/Restaurant/RestaurantMenuItemRateModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantMenuItemRatesUIContext = createContext();

export function useRestaurantMenuItemRatesUIContext() {
  return useContext(RestaurantMenuItemRatesUIContext);
}

export const RestaurantMenuItemRatesUIConsumer = RestaurantMenuItemRatesUIContext.Consumer;

export function RestaurantMenuItemRatesUIProvider({ restaurantMenuItemRatesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantMenuItemRateModel).initialFilter
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
    dataModel: RestaurantMenuItemRateModel,
    newRestaurantMenuItemRateButtonClick: restaurantMenuItemRatesUIEvents.newRestaurantMenuItemRateButtonClick,
    openEditRestaurantMenuItemRatePage: restaurantMenuItemRatesUIEvents.openEditRestaurantMenuItemRatePage,
    openDeleteRestaurantMenuItemRateDialog: restaurantMenuItemRatesUIEvents.openDeleteRestaurantMenuItemRateDialog,
    openDeleteRestaurantMenuItemRatesDialog: restaurantMenuItemRatesUIEvents.openDeleteRestaurantMenuItemRatesDialog,
    openFetchRestaurantMenuItemRatesDialog: restaurantMenuItemRatesUIEvents.openFetchRestaurantMenuItemRatesDialog,
    openUpdateRestaurantMenuItemRatesStatusDialog: restaurantMenuItemRatesUIEvents.openUpdateRestaurantMenuItemRatesStatusDialog,
  };
  return (
    <RestaurantMenuItemRatesUIContext.Provider value={value}>{children}</RestaurantMenuItemRatesUIContext.Provider>
  );
}