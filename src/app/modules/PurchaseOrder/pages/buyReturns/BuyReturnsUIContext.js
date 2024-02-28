import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuyReturnModel } from "../../../../../core/_models/PurchaseOrder/BuyReturnModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BuyReturnsUIContext = createContext();

export function useBuyReturnsUIContext() {
  return useContext(BuyReturnsUIContext);
}

export const BuyReturnsUIConsumer = BuyReturnsUIContext.Consumer;

export function BuyReturnsUIProvider({ buyReturnsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BuyReturnModel, "BuyReturnDate", "desc").initialFilter
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
    dataModel: BuyReturnModel,
    newBuyReturnButtonClick: buyReturnsUIEvents.newBuyReturnButtonClick,
    openEditBuyReturnPage: buyReturnsUIEvents.openEditBuyReturnPage,
    openDeleteBuyReturnDialog: buyReturnsUIEvents.openDeleteBuyReturnDialog,
    openDeleteBuyReturnsDialog: buyReturnsUIEvents.openDeleteBuyReturnsDialog,
    openFetchBuyReturnsDialog: buyReturnsUIEvents.openFetchBuyReturnsDialog,
    openUpdateBuyReturnsStatusDialog:
      buyReturnsUIEvents.openUpdateBuyReturnsStatusDialog,
    openCancelAndReturnDialog: buyReturnsUIEvents.openCancelAndReturnDialog,
    openAttachmentsDialog: buyReturnsUIEvents.openAttachmentsDialog,
  };
  return (
    <BuyReturnsUIContext.Provider value={value}>
      {children}
    </BuyReturnsUIContext.Provider>
  );
}
