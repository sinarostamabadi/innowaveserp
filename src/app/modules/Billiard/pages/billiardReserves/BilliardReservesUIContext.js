import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BilliardReserveModel } from "../../../../../core/_models/Billiard/BilliardReserveModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BilliardReservesUIContext = createContext();

export function useBilliardReservesUIContext() {
  return useContext(BilliardReservesUIContext);
}

export const BilliardReservesUIConsumer = BilliardReservesUIContext.Consumer;

export function BilliardReservesUIProvider({
  billiardReservesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BilliardReserveModel).initialFilter
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
    dataModel: BilliardReserveModel,
    newBilliardReserveButtonClick:
      billiardReservesUIEvents.newBilliardReserveButtonClick,
    openEditBilliardReservePage:
      billiardReservesUIEvents.openEditBilliardReservePage,
    openDeleteBilliardReserveDialog:
      billiardReservesUIEvents.openDeleteBilliardReserveDialog,
    openDeleteBilliardReservesDialog:
      billiardReservesUIEvents.openDeleteBilliardReservesDialog,
    openFetchBilliardReservesDialog:
      billiardReservesUIEvents.openFetchBilliardReservesDialog,
    openUpdateBilliardReservesStatusDialog:
      billiardReservesUIEvents.openUpdateBilliardReservesStatusDialog,
  };
  return (
    <BilliardReservesUIContext.Provider value={value}>
      {children}
    </BilliardReservesUIContext.Provider>
  );
}
