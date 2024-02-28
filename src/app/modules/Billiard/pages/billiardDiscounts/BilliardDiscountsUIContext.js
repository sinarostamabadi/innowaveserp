import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BilliardDiscountModel } from "../../../../../core/_models/Billiard/BilliardDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BilliardDiscountsUIContext = createContext();

export function useBilliardDiscountsUIContext() {
  return useContext(BilliardDiscountsUIContext);
}

export const BilliardDiscountsUIConsumer = BilliardDiscountsUIContext.Consumer;

export function BilliardDiscountsUIProvider({
  billiardDiscountsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BilliardDiscountModel).initialFilter
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
    dataModel: BilliardDiscountModel,
    newBilliardDiscountButtonClick:
      billiardDiscountsUIEvents.newBilliardDiscountButtonClick,
    openEditBilliardDiscountPage:
      billiardDiscountsUIEvents.openEditBilliardDiscountPage,
    openDeleteBilliardDiscountDialog:
      billiardDiscountsUIEvents.openDeleteBilliardDiscountDialog,
    openDeleteBilliardDiscountsDialog:
      billiardDiscountsUIEvents.openDeleteBilliardDiscountsDialog,
    openFetchBilliardDiscountsDialog:
      billiardDiscountsUIEvents.openFetchBilliardDiscountsDialog,
    openUpdateBilliardDiscountsStatusDialog:
      billiardDiscountsUIEvents.openUpdateBilliardDiscountsStatusDialog,
  };
  return (
    <BilliardDiscountsUIContext.Provider value={value}>
      {children}
    </BilliardDiscountsUIContext.Provider>
  );
}
