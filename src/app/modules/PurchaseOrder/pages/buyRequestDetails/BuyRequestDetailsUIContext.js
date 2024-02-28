import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuyRequestDetailModel } from "../../../../../core/_models/PurchaseOrder/BuyRequestDetailModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BuyRequestDetailsUIContext = createContext();

export function useBuyRequestDetailsUIContext() {
  return useContext(BuyRequestDetailsUIContext);
}

export const BuyRequestDetailsUIConsumer = BuyRequestDetailsUIContext.Consumer;

export function BuyRequestDetailsUIProvider({
  buyRequestDetailsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BuyRequestDetailModel).initialFilter
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
    dataModel: BuyRequestDetailModel,
    newBuyRequestDetailButtonClick:
      buyRequestDetailsUIEvents.newBuyRequestDetailButtonClick,
    openEditBuyRequestDetailPage:
      buyRequestDetailsUIEvents.openEditBuyRequestDetailPage,
    openDeleteBuyRequestDetailDialog:
      buyRequestDetailsUIEvents.openDeleteBuyRequestDetailDialog,
    openDeleteBuyRequestDetailsDialog:
      buyRequestDetailsUIEvents.openDeleteBuyRequestDetailsDialog,
    openFetchBuyRequestDetailsDialog:
      buyRequestDetailsUIEvents.openFetchBuyRequestDetailsDialog,
    openUpdateBuyRequestDetailsStatusDialog:
      buyRequestDetailsUIEvents.openUpdateBuyRequestDetailsStatusDialog,
  };
  return (
    <BuyRequestDetailsUIContext.Provider value={value}>
      {children}
    </BuyRequestDetailsUIContext.Provider>
  );
}
