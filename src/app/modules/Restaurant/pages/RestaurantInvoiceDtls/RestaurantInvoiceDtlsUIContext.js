import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantInvoiceDtlModel } from "../../../../../core/_models/Restaurant/RestaurantInvoiceDtlModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantInvoiceDtlsUIContext = createContext();

export function useRestaurantInvoiceDtlsUIContext() {
  return useContext(RestaurantInvoiceDtlsUIContext);
}

export const RestaurantInvoiceDtlsUIConsumer =
  RestaurantInvoiceDtlsUIContext.Consumer;

export function RestaurantInvoiceDtlsUIProvider({
  restaurantInvoiceDtlsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantInvoiceDtlModel).initialFilter
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
    dataModel: RestaurantInvoiceDtlModel,
    newRestaurantInvoiceDtlButtonClick:
      restaurantInvoiceDtlsUIEvents.newRestaurantInvoiceDtlButtonClick,
    openEditRestaurantInvoiceDtlPage:
      restaurantInvoiceDtlsUIEvents.openEditRestaurantInvoiceDtlPage,
    openDeleteRestaurantInvoiceDtlDialog:
      restaurantInvoiceDtlsUIEvents.openDeleteRestaurantInvoiceDtlDialog,
    openDeleteRestaurantInvoiceDtlsDialog:
      restaurantInvoiceDtlsUIEvents.openDeleteRestaurantInvoiceDtlsDialog,
    openFetchRestaurantInvoiceDtlsDialog:
      restaurantInvoiceDtlsUIEvents.openFetchRestaurantInvoiceDtlsDialog,
    openUpdateRestaurantInvoiceDtlsStatusDialog:
      restaurantInvoiceDtlsUIEvents.openUpdateRestaurantInvoiceDtlsStatusDialog,
  };
  return (
    <RestaurantInvoiceDtlsUIContext.Provider value={value}>
      {children}
    </RestaurantInvoiceDtlsUIContext.Provider>
  );
}
