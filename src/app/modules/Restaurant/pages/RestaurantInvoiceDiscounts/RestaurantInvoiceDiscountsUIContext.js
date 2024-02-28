import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantInvoiceDiscountModel } from "../../../../../core/_models/Restaurant/RestaurantInvoiceDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantInvoiceDiscountsUIContext = createContext();

export function useRestaurantInvoiceDiscountsUIContext() {
  return useContext(RestaurantInvoiceDiscountsUIContext);
}

export const RestaurantInvoiceDiscountsUIConsumer =
  RestaurantInvoiceDiscountsUIContext.Consumer;

export function RestaurantInvoiceDiscountsUIProvider({
  restaurantInvoiceDiscountsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantInvoiceDiscountModel).initialFilter
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
    dataModel: RestaurantInvoiceDiscountModel,
    newRestaurantInvoiceDiscountButtonClick:
      restaurantInvoiceDiscountsUIEvents.newRestaurantInvoiceDiscountButtonClick,
    openEditRestaurantInvoiceDiscountPage:
      restaurantInvoiceDiscountsUIEvents.openEditRestaurantInvoiceDiscountPage,
    openDeleteRestaurantInvoiceDiscountDialog:
      restaurantInvoiceDiscountsUIEvents.openDeleteRestaurantInvoiceDiscountDialog,
    openDeleteRestaurantInvoiceDiscountsDialog:
      restaurantInvoiceDiscountsUIEvents.openDeleteRestaurantInvoiceDiscountsDialog,
    openFetchRestaurantInvoiceDiscountsDialog:
      restaurantInvoiceDiscountsUIEvents.openFetchRestaurantInvoiceDiscountsDialog,
    openUpdateRestaurantInvoiceDiscountsStatusDialog:
      restaurantInvoiceDiscountsUIEvents.openUpdateRestaurantInvoiceDiscountsStatusDialog,
  };
  return (
    <RestaurantInvoiceDiscountsUIContext.Provider value={value}>
      {children}
    </RestaurantInvoiceDiscountsUIContext.Provider>
  );
}
