
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellDiscountDetailModel } from "../../../../../core/_models/Sell/SellDiscountDetailModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDiscountDetailsUIContext = createContext();

export function useSellDiscountDetailsUIContext() {
  return useContext(SellDiscountDetailsUIContext);
}

export const SellDiscountDetailsUIConsumer = SellDiscountDetailsUIContext.Consumer;

export function SellDiscountDetailsUIProvider({ sellDiscountDetailsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellDiscountDetailModel).initialFilter
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
    dataModel: SellDiscountDetailModel,
    newSellDiscountDetailButtonClick: sellDiscountDetailsUIEvents.newSellDiscountDetailButtonClick,
    openEditSellDiscountDetailPage: sellDiscountDetailsUIEvents.openEditSellDiscountDetailPage,
    openDeleteSellDiscountDetailDialog: sellDiscountDetailsUIEvents.openDeleteSellDiscountDetailDialog,
    openDeleteSellDiscountDetailsDialog: sellDiscountDetailsUIEvents.openDeleteSellDiscountDetailsDialog,
    openFetchSellDiscountDetailsDialog: sellDiscountDetailsUIEvents.openFetchSellDiscountDetailsDialog,
    openUpdateSellDiscountDetailsStatusDialog: sellDiscountDetailsUIEvents.openUpdateSellDiscountDetailsStatusDialog,
  };
  return (
    <SellDiscountDetailsUIContext.Provider value={value}>{children}</SellDiscountDetailsUIContext.Provider>
  );
}