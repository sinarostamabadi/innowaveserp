
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CoffeeInvoiceDiscountModel } from "../../../../../core/_models/Cofe/CoffeeInvoiceDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CoffeeInvoiceDiscountsUIContext = createContext();

export function useCoffeeInvoiceDiscountsUIContext() {
  return useContext(CoffeeInvoiceDiscountsUIContext);
}

export const CoffeeInvoiceDiscountsUIConsumer = CoffeeInvoiceDiscountsUIContext.Consumer;

export function CoffeeInvoiceDiscountsUIProvider({ coffeeInvoiceDiscountsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CoffeeInvoiceDiscountModel).initialFilter
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
    dataModel: CoffeeInvoiceDiscountModel,
    newCoffeeInvoiceDiscountButtonClick: coffeeInvoiceDiscountsUIEvents.newCoffeeInvoiceDiscountButtonClick,
    openEditCoffeeInvoiceDiscountPage: coffeeInvoiceDiscountsUIEvents.openEditCoffeeInvoiceDiscountPage,
    openDeleteCoffeeInvoiceDiscountDialog: coffeeInvoiceDiscountsUIEvents.openDeleteCoffeeInvoiceDiscountDialog,
    openDeleteCoffeeInvoiceDiscountsDialog: coffeeInvoiceDiscountsUIEvents.openDeleteCoffeeInvoiceDiscountsDialog,
    openFetchCoffeeInvoiceDiscountsDialog: coffeeInvoiceDiscountsUIEvents.openFetchCoffeeInvoiceDiscountsDialog,
    openUpdateCoffeeInvoiceDiscountsStatusDialog: coffeeInvoiceDiscountsUIEvents.openUpdateCoffeeInvoiceDiscountsStatusDialog,
  };
  return (
    <CoffeeInvoiceDiscountsUIContext.Provider value={value}>{children}</CoffeeInvoiceDiscountsUIContext.Provider>
  );
}