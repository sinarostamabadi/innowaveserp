
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PoolDiscountModel } from "../../../../../core/_models/Pool/PoolDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PoolDiscountsUIContext = createContext();

export function usePoolDiscountsUIContext() {
  return useContext(PoolDiscountsUIContext);
}

export const PoolDiscountsUIConsumer = PoolDiscountsUIContext.Consumer;

export function PoolDiscountsUIProvider({ poolDiscountsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PoolDiscountModel).initialFilter
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
    dataModel: PoolDiscountModel,
    newPoolDiscountButtonClick: poolDiscountsUIEvents.newPoolDiscountButtonClick,
    openEditPoolDiscountPage: poolDiscountsUIEvents.openEditPoolDiscountPage,
    openDeletePoolDiscountDialog: poolDiscountsUIEvents.openDeletePoolDiscountDialog,
    openDeletePoolDiscountsDialog: poolDiscountsUIEvents.openDeletePoolDiscountsDialog,
    openFetchPoolDiscountsDialog: poolDiscountsUIEvents.openFetchPoolDiscountsDialog,
    openUpdatePoolDiscountsStatusDialog: poolDiscountsUIEvents.openUpdatePoolDiscountsStatusDialog,
  };
  return (
    <PoolDiscountsUIContext.Provider value={value}>{children}</PoolDiscountsUIContext.Provider>
  );
}