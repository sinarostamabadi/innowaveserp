
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellDiscountDetailInfoModel } from "../../../../../core/_models/Sell/SellDiscountDetailInfoModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDiscountDetailInfosUIContext = createContext();

export function useSellDiscountDetailInfosUIContext() {
  return useContext(SellDiscountDetailInfosUIContext);
}

export const SellDiscountDetailInfosUIConsumer = SellDiscountDetailInfosUIContext.Consumer;

export function SellDiscountDetailInfosUIProvider({ sellDiscountDetailInfosUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellDiscountDetailInfoModel).initialFilter
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
    dataModel: SellDiscountDetailInfoModel,
    newSellDiscountDetailInfoButtonClick: sellDiscountDetailInfosUIEvents.newSellDiscountDetailInfoButtonClick,
    openEditSellDiscountDetailInfoPage: sellDiscountDetailInfosUIEvents.openEditSellDiscountDetailInfoPage,
    openDeleteSellDiscountDetailInfoDialog: sellDiscountDetailInfosUIEvents.openDeleteSellDiscountDetailInfoDialog,
    openDeleteSellDiscountDetailInfosDialog: sellDiscountDetailInfosUIEvents.openDeleteSellDiscountDetailInfosDialog,
    openFetchSellDiscountDetailInfosDialog: sellDiscountDetailInfosUIEvents.openFetchSellDiscountDetailInfosDialog,
    openUpdateSellDiscountDetailInfosStatusDialog: sellDiscountDetailInfosUIEvents.openUpdateSellDiscountDetailInfosStatusDialog,
  };
  return (
    <SellDiscountDetailInfosUIContext.Provider value={value}>{children}</SellDiscountDetailInfosUIContext.Provider>
  );
}