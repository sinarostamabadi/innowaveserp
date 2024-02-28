import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BilliardTimePriceingModel } from "../../../../../core/_models/Billiard/BilliardTimePriceingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BilliardTimePriceingUIContext = createContext();

export function useBilliardTimePriceingUIContext() {
  return useContext(BilliardTimePriceingUIContext);
}

export const BilliardTimePriceingUIConsumer =
  BilliardTimePriceingUIContext.Consumer;

export function BilliardTimePriceingUIProvider({
  billiardTimePriceingUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BilliardTimePriceingModel).initialFilter
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
    dataModel: BilliardTimePriceingModel,
    newBilliardTimePriceingButtonClick:
      billiardTimePriceingUIEvents.newBilliardTimePriceingButtonClick,
    openEditBilliardTimePriceingPage:
      billiardTimePriceingUIEvents.openEditBilliardTimePriceingPage,
    openDeleteBilliardTimePriceingDialog:
      billiardTimePriceingUIEvents.openDeleteBilliardTimePriceingDialog,
    openDeleteBilliardTimePriceingDialog:
      billiardTimePriceingUIEvents.openDeleteBilliardTimePriceingDialog,
    openFetchBilliardTimePriceingDialog:
      billiardTimePriceingUIEvents.openFetchBilliardTimePriceingDialog,
    openUpdateBilliardTimePriceingStatusDialog:
      billiardTimePriceingUIEvents.openUpdateBilliardTimePriceingStatusDialog,
  };
  return (
    <BilliardTimePriceingUIContext.Provider value={value}>
      {children}
    </BilliardTimePriceingUIContext.Provider>
  );
}
