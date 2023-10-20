
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellDocumentDiscountModel } from "../../../../../core/_models/Sell/SellDocumentDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDocumentDiscountsUIContext = createContext();

export function useSellDocumentDiscountsUIContext() {
  return useContext(SellDocumentDiscountsUIContext);
}

export const SellDocumentDiscountsUIConsumer = SellDocumentDiscountsUIContext.Consumer;

export function SellDocumentDiscountsUIProvider({ sellDocumentDiscountsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellDocumentDiscountModel).initialFilter
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
    dataModel: SellDocumentDiscountModel,
    newSellDocumentDiscountButtonClick: sellDocumentDiscountsUIEvents.newSellDocumentDiscountButtonClick,
    openEditSellDocumentDiscountPage: sellDocumentDiscountsUIEvents.openEditSellDocumentDiscountPage,
    openDeleteSellDocumentDiscountDialog: sellDocumentDiscountsUIEvents.openDeleteSellDocumentDiscountDialog,
    openDeleteSellDocumentDiscountsDialog: sellDocumentDiscountsUIEvents.openDeleteSellDocumentDiscountsDialog,
    openFetchSellDocumentDiscountsDialog: sellDocumentDiscountsUIEvents.openFetchSellDocumentDiscountsDialog,
    openUpdateSellDocumentDiscountsStatusDialog: sellDocumentDiscountsUIEvents.openUpdateSellDocumentDiscountsStatusDialog,
  };
  return (
    <SellDocumentDiscountsUIContext.Provider value={value}>{children}</SellDocumentDiscountsUIContext.Provider>
  );
}