
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BilliardReservePriceModel } from "../../../../../core/_models/Billiard/BilliardReservePriceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BilliardReservePricesUIContext = createContext();

export function useBilliardReservePricesUIContext() {
  return useContext(BilliardReservePricesUIContext);
}

export const BilliardReservePricesUIConsumer = BilliardReservePricesUIContext.Consumer;

export function BilliardReservePricesUIProvider({ billiardReservePricesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BilliardReservePriceModel).initialFilter
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
    dataModel: BilliardReservePriceModel,
    newBilliardReservePriceButtonClick: billiardReservePricesUIEvents.newBilliardReservePriceButtonClick,
    openEditBilliardReservePricePage: billiardReservePricesUIEvents.openEditBilliardReservePricePage,
    openDeleteBilliardReservePriceDialog: billiardReservePricesUIEvents.openDeleteBilliardReservePriceDialog,
    openDeleteBilliardReservePricesDialog: billiardReservePricesUIEvents.openDeleteBilliardReservePricesDialog,
    openFetchBilliardReservePricesDialog: billiardReservePricesUIEvents.openFetchBilliardReservePricesDialog,
    openUpdateBilliardReservePricesStatusDialog: billiardReservePricesUIEvents.openUpdateBilliardReservePricesStatusDialog,
  };
  return (
    <BilliardReservePricesUIContext.Provider value={value}>{children}</BilliardReservePricesUIContext.Provider>
  );
}