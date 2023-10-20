
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuySerialModel } from "../../../../../core/_models/PurchaseOrder/BuySerialModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BuySerialsUIContext = createContext();

export function useBuySerialsUIContext() {
  return useContext(BuySerialsUIContext);
}

export const BuySerialsUIConsumer = BuySerialsUIContext.Consumer;

export function BuySerialsUIProvider({ buySerialsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BuySerialModel).initialFilter
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
    dataModel: BuySerialModel,
    newBuySerialButtonClick: buySerialsUIEvents.newBuySerialButtonClick,
    openEditBuySerialPage: buySerialsUIEvents.openEditBuySerialPage,
    openDeleteBuySerialDialog: buySerialsUIEvents.openDeleteBuySerialDialog,
    openDeleteBuySerialsDialog: buySerialsUIEvents.openDeleteBuySerialsDialog,
    openFetchBuySerialsDialog: buySerialsUIEvents.openFetchBuySerialsDialog,
    openUpdateBuySerialsStatusDialog: buySerialsUIEvents.openUpdateBuySerialsStatusDialog,
  };
  return (
    <BuySerialsUIContext.Provider value={value}>{children}</BuySerialsUIContext.Provider>
  );
}