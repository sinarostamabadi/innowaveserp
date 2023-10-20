
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CoffeeInvoiceModel } from "../../../../../core/_models/Cofe/CoffeeInvoiceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CoffeeInvoicesUIContext = createContext();

export function useCoffeeInvoicesUIContext() {
  return useContext(CoffeeInvoicesUIContext);
}

export const CoffeeInvoicesUIConsumer = CoffeeInvoicesUIContext.Consumer;

export function CoffeeInvoicesUIProvider({ coffeeInvoicesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CoffeeInvoiceModel).initialFilter
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
    dataModel: CoffeeInvoiceModel,
    newCoffeeInvoiceButtonClick: coffeeInvoicesUIEvents.newCoffeeInvoiceButtonClick,
    openEditCoffeeInvoicePage: coffeeInvoicesUIEvents.openEditCoffeeInvoicePage,
    openDeleteCoffeeInvoiceDialog: coffeeInvoicesUIEvents.openDeleteCoffeeInvoiceDialog,
    openDeleteCoffeeInvoicesDialog: coffeeInvoicesUIEvents.openDeleteCoffeeInvoicesDialog,
    openFetchCoffeeInvoicesDialog: coffeeInvoicesUIEvents.openFetchCoffeeInvoicesDialog,
    openUpdateCoffeeInvoicesStatusDialog: coffeeInvoicesUIEvents.openUpdateCoffeeInvoicesStatusDialog,
  };
  return (
    <CoffeeInvoicesUIContext.Provider value={value}>{children}</CoffeeInvoicesUIContext.Provider>
  );
}