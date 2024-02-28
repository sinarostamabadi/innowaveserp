import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { FutsalDiscountModel } from "../../../../../core/_models/Futsal/FutsalDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const FutsalDiscountsUIContext = createContext();

export function useFutsalDiscountsUIContext() {
  return useContext(FutsalDiscountsUIContext);
}

export const FutsalDiscountsUIConsumer = FutsalDiscountsUIContext.Consumer;

export function FutsalDiscountsUIProvider({
  futsalDiscountsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(FutsalDiscountModel).initialFilter
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
    dataModel: FutsalDiscountModel,
    newFutsalDiscountButtonClick:
      futsalDiscountsUIEvents.newFutsalDiscountButtonClick,
    openEditFutsalDiscountPage:
      futsalDiscountsUIEvents.openEditFutsalDiscountPage,
    openDeleteFutsalDiscountDialog:
      futsalDiscountsUIEvents.openDeleteFutsalDiscountDialog,
    openDeleteFutsalDiscountsDialog:
      futsalDiscountsUIEvents.openDeleteFutsalDiscountsDialog,
    openFetchFutsalDiscountsDialog:
      futsalDiscountsUIEvents.openFetchFutsalDiscountsDialog,
    openUpdateFutsalDiscountsStatusDialog:
      futsalDiscountsUIEvents.openUpdateFutsalDiscountsStatusDialog,
  };
  return (
    <FutsalDiscountsUIContext.Provider value={value}>
      {children}
    </FutsalDiscountsUIContext.Provider>
  );
}
