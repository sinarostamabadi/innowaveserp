
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantMenuItemPriceModel } from "../../../../../core/_models/Restaurant/RestaurantMenuItemPriceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantMenuItemPricesUIContext = createContext();

export function useRestaurantMenuItemPricesUIContext() {
  return useContext(RestaurantMenuItemPricesUIContext);
}

export const RestaurantMenuItemPricesUIConsumer = RestaurantMenuItemPricesUIContext.Consumer;

export function RestaurantMenuItemPricesUIProvider({ restaurantMenuItemPricesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantMenuItemPriceModel).initialFilter
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
    dataModel: RestaurantMenuItemPriceModel,
    newRestaurantMenuItemPriceButtonClick: restaurantMenuItemPricesUIEvents.newRestaurantMenuItemPriceButtonClick,
    openEditRestaurantMenuItemPricePage: restaurantMenuItemPricesUIEvents.openEditRestaurantMenuItemPricePage,
    openDeleteRestaurantMenuItemPriceDialog: restaurantMenuItemPricesUIEvents.openDeleteRestaurantMenuItemPriceDialog,
    openDeleteRestaurantMenuItemPricesDialog: restaurantMenuItemPricesUIEvents.openDeleteRestaurantMenuItemPricesDialog,
    openFetchRestaurantMenuItemPricesDialog: restaurantMenuItemPricesUIEvents.openFetchRestaurantMenuItemPricesDialog,
    openUpdateRestaurantMenuItemPricesStatusDialog: restaurantMenuItemPricesUIEvents.openUpdateRestaurantMenuItemPricesStatusDialog,
  };
  return (
    <RestaurantMenuItemPricesUIContext.Provider value={value}>{children}</RestaurantMenuItemPricesUIContext.Provider>
  );
}