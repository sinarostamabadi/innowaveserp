
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantInvoiceCostModel } from "../../../../../core/_models/Restaurant/RestaurantInvoiceCostModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantInvoiceCostsUIContext = createContext();

export function useRestaurantInvoiceCostsUIContext() {
  return useContext(RestaurantInvoiceCostsUIContext);
}

export const RestaurantInvoiceCostsUIConsumer = RestaurantInvoiceCostsUIContext.Consumer;

export function RestaurantInvoiceCostsUIProvider({ restaurantInvoiceCostsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantInvoiceCostModel).initialFilter
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
    dataModel: RestaurantInvoiceCostModel,
    newRestaurantInvoiceCostButtonClick: restaurantInvoiceCostsUIEvents.newRestaurantInvoiceCostButtonClick,
    openEditRestaurantInvoiceCostPage: restaurantInvoiceCostsUIEvents.openEditRestaurantInvoiceCostPage,
    openDeleteRestaurantInvoiceCostDialog: restaurantInvoiceCostsUIEvents.openDeleteRestaurantInvoiceCostDialog,
    openDeleteRestaurantInvoiceCostsDialog: restaurantInvoiceCostsUIEvents.openDeleteRestaurantInvoiceCostsDialog,
    openFetchRestaurantInvoiceCostsDialog: restaurantInvoiceCostsUIEvents.openFetchRestaurantInvoiceCostsDialog,
    openUpdateRestaurantInvoiceCostsStatusDialog: restaurantInvoiceCostsUIEvents.openUpdateRestaurantInvoiceCostsStatusDialog,
  };
  return (
    <RestaurantInvoiceCostsUIContext.Provider value={value}>{children}</RestaurantInvoiceCostsUIContext.Provider>
  );
}