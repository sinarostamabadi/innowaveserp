import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuyDiscountModel } from "../../../../../core/_models/PurchaseOrder/BuyDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BuyDiscountsUIContext = createContext();

export function useBuyDiscountsUIContext() {
  return useContext(BuyDiscountsUIContext);
}

export const BuyDiscountsUIConsumer = BuyDiscountsUIContext.Consumer;

export function BuyDiscountsUIProvider({ buyDiscountsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BuyDiscountModel).initialFilter
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
    dataModel: BuyDiscountModel,
    newBuyDiscountButtonClick: buyDiscountsUIEvents.newBuyDiscountButtonClick,
    openEditBuyDiscountPage: buyDiscountsUIEvents.openEditBuyDiscountPage,
    openDeleteBuyDiscountDialog:
      buyDiscountsUIEvents.openDeleteBuyDiscountDialog,
    openDeleteBuyDiscountsDialog:
      buyDiscountsUIEvents.openDeleteBuyDiscountsDialog,
    openFetchBuyDiscountsDialog:
      buyDiscountsUIEvents.openFetchBuyDiscountsDialog,
    openUpdateBuyDiscountsStatusDialog:
      buyDiscountsUIEvents.openUpdateBuyDiscountsStatusDialog,
  };
  return (
    <BuyDiscountsUIContext.Provider value={value}>
      {children}
    </BuyDiscountsUIContext.Provider>
  );
}
