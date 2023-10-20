
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CoffeeInvoiceCostModel } from "../../../../../core/_models/Cofe/CoffeeInvoiceCostModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CoffeeInvoiceCostsUIContext = createContext();

export function useCoffeeInvoiceCostsUIContext() {
  return useContext(CoffeeInvoiceCostsUIContext);
}

export const CoffeeInvoiceCostsUIConsumer = CoffeeInvoiceCostsUIContext.Consumer;

export function CoffeeInvoiceCostsUIProvider({ coffeeInvoiceCostsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CoffeeInvoiceCostModel).initialFilter
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
    dataModel: CoffeeInvoiceCostModel,
    newCoffeeInvoiceCostButtonClick: coffeeInvoiceCostsUIEvents.newCoffeeInvoiceCostButtonClick,
    openEditCoffeeInvoiceCostPage: coffeeInvoiceCostsUIEvents.openEditCoffeeInvoiceCostPage,
    openDeleteCoffeeInvoiceCostDialog: coffeeInvoiceCostsUIEvents.openDeleteCoffeeInvoiceCostDialog,
    openDeleteCoffeeInvoiceCostsDialog: coffeeInvoiceCostsUIEvents.openDeleteCoffeeInvoiceCostsDialog,
    openFetchCoffeeInvoiceCostsDialog: coffeeInvoiceCostsUIEvents.openFetchCoffeeInvoiceCostsDialog,
    openUpdateCoffeeInvoiceCostsStatusDialog: coffeeInvoiceCostsUIEvents.openUpdateCoffeeInvoiceCostsStatusDialog,
  };
  return (
    <CoffeeInvoiceCostsUIContext.Provider value={value}>{children}</CoffeeInvoiceCostsUIContext.Provider>
  );
}