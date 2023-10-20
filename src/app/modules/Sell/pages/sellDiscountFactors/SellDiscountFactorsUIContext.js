
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellDiscountFactorModel } from "../../../../../core/_models/Sell/SellDiscountFactorModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDiscountFactorsUIContext = createContext();

export function useSellDiscountFactorsUIContext() {
  return useContext(SellDiscountFactorsUIContext);
}

export const SellDiscountFactorsUIConsumer = SellDiscountFactorsUIContext.Consumer;

export function SellDiscountFactorsUIProvider({ sellDiscountFactorsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellDiscountFactorModel).initialFilter
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
    dataModel: SellDiscountFactorModel,
    newSellDiscountFactorButtonClick: sellDiscountFactorsUIEvents.newSellDiscountFactorButtonClick,
    openEditSellDiscountFactorPage: sellDiscountFactorsUIEvents.openEditSellDiscountFactorPage,
    openDeleteSellDiscountFactorDialog: sellDiscountFactorsUIEvents.openDeleteSellDiscountFactorDialog,
    openDeleteSellDiscountFactorsDialog: sellDiscountFactorsUIEvents.openDeleteSellDiscountFactorsDialog,
    openFetchSellDiscountFactorsDialog: sellDiscountFactorsUIEvents.openFetchSellDiscountFactorsDialog,
    openUpdateSellDiscountFactorsStatusDialog: sellDiscountFactorsUIEvents.openUpdateSellDiscountFactorsStatusDialog,
  };
  return (
    <SellDiscountFactorsUIContext.Provider value={value}>{children}</SellDiscountFactorsUIContext.Provider>
  );
}