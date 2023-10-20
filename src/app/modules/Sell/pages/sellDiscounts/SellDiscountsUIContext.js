import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import moment from "jalali-moment";
import { SellDiscountModel } from "../../../../../core/_models/Sell/SellDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDiscountsUIContext = createContext();

export function useSellDiscountsUIContext() {
  return useContext(SellDiscountsUIContext);
}
export const SellDiscountsUIConsumer = SellDiscountsUIContext.Consumer;

export function SellDiscountsUIProvider({ sellDiscountsUIEvents, children }) {
  const toDateFilter = {
    Property: "ToDate",
    Operation: 4,
    Values: [moment.from().format("YYYY-MM-DDTHH:mm:ss")],
  };
  
  const [queryParams, setQueryParamsBase] = useState(
    {...getConfig(SellDiscountModel, "SellDiscountNumber", "desc").initialFilter, Filters: [toDateFilter]}
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
    dataModel: SellDiscountModel,
    newSellDiscountButtonClick: sellDiscountsUIEvents.newSellDiscountButtonClick,
    openEditSellDiscountPage: sellDiscountsUIEvents.openEditSellDiscountPage,
    openDeleteSellDiscountDialog: sellDiscountsUIEvents.openDeleteSellDiscountDialog,
    openDeleteSellDiscountsDialog: sellDiscountsUIEvents.openDeleteSellDiscountsDialog,
    openFetchSellDiscountsDialog: sellDiscountsUIEvents.openFetchSellDiscountsDialog,
    openUpdateSellDiscountsStatusDialog:
      sellDiscountsUIEvents.openUpdateSellDiscountsStatusDialog,
  };
  return (
    <SellDiscountsUIContext.Provider value={value}>
      {children}
    </SellDiscountsUIContext.Provider>
  );
}
