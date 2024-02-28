import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CoffeeInvoiceDtlModel } from "../../../../../core/_models/Cofe/CoffeeInvoiceDtlModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CoffeeInvoiceDtlsUIContext = createContext();

export function useCoffeeInvoiceDtlsUIContext() {
  return useContext(CoffeeInvoiceDtlsUIContext);
}

export const CoffeeInvoiceDtlsUIConsumer = CoffeeInvoiceDtlsUIContext.Consumer;

export function CoffeeInvoiceDtlsUIProvider({
  coffeeInvoiceDtlsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CoffeeInvoiceDtlModel).initialFilter
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
    dataModel: CoffeeInvoiceDtlModel,
    newCoffeeInvoiceDtlButtonClick:
      coffeeInvoiceDtlsUIEvents.newCoffeeInvoiceDtlButtonClick,
    openEditCoffeeInvoiceDtlPage:
      coffeeInvoiceDtlsUIEvents.openEditCoffeeInvoiceDtlPage,
    openDeleteCoffeeInvoiceDtlDialog:
      coffeeInvoiceDtlsUIEvents.openDeleteCoffeeInvoiceDtlDialog,
    openDeleteCoffeeInvoiceDtlsDialog:
      coffeeInvoiceDtlsUIEvents.openDeleteCoffeeInvoiceDtlsDialog,
    openFetchCoffeeInvoiceDtlsDialog:
      coffeeInvoiceDtlsUIEvents.openFetchCoffeeInvoiceDtlsDialog,
    openUpdateCoffeeInvoiceDtlsStatusDialog:
      coffeeInvoiceDtlsUIEvents.openUpdateCoffeeInvoiceDtlsStatusDialog,
  };
  return (
    <CoffeeInvoiceDtlsUIContext.Provider value={value}>
      {children}
    </CoffeeInvoiceDtlsUIContext.Provider>
  );
}
