
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuyCostModel } from "../../../../../core/_models/PurchaseOrder/BuyCostModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BuyCostsUIContext = createContext();

export function useBuyCostsUIContext() {
  return useContext(BuyCostsUIContext);
}

export const BuyCostsUIConsumer = BuyCostsUIContext.Consumer;

export function BuyCostsUIProvider({ buyCostsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BuyCostModel).initialFilter
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
    dataModel: BuyCostModel,
    newBuyCostButtonClick: buyCostsUIEvents.newBuyCostButtonClick,
    openEditBuyCostPage: buyCostsUIEvents.openEditBuyCostPage,
    openDeleteBuyCostDialog: buyCostsUIEvents.openDeleteBuyCostDialog,
    openDeleteBuyCostsDialog: buyCostsUIEvents.openDeleteBuyCostsDialog,
    openFetchBuyCostsDialog: buyCostsUIEvents.openFetchBuyCostsDialog,
    openUpdateBuyCostsStatusDialog: buyCostsUIEvents.openUpdateBuyCostsStatusDialog,
  };
  return (
    <BuyCostsUIContext.Provider value={value}>{children}</BuyCostsUIContext.Provider>
  );
}