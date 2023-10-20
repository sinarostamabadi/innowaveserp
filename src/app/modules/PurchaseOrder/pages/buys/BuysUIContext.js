import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuyModel } from "../../../../../core/_models/PurchaseOrder/BuyModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BuysUIContext = createContext();

export function useBuysUIContext() {
  return useContext(BuysUIContext);
}

export const BuysUIConsumer = BuysUIContext.Consumer;

export function BuysUIProvider({ buysUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BuyModel, "BuyDate", "desc").initialFilter
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
    dataModel: BuyModel,
    newBuyButtonClick: buysUIEvents.newBuyButtonClick,
    openEditBuyPage: buysUIEvents.openEditBuyPage,
    openDeleteBuyDialog: buysUIEvents.openDeleteBuyDialog,
    openDeleteBuysDialog: buysUIEvents.openDeleteBuysDialog,
    openFetchBuysDialog: buysUIEvents.openFetchBuysDialog,
    openUpdateBuysStatusDialog: buysUIEvents.openUpdateBuysStatusDialog,
    openCancelAndReturnDialog: buysUIEvents.openCancelAndReturnDialog,
    openAttachmentsDialog: buysUIEvents.openAttachmentsDialog,
  };
  return (
    <BuysUIContext.Provider value={value}>{children}</BuysUIContext.Provider>
  );
}
