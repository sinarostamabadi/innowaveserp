import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BilliardCenterModel } from "../../../../../core/_models/Billiard/BilliardCenterModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BilliardCentersUIContext = createContext();

export function useBilliardCentersUIContext() {
  return useContext(BilliardCentersUIContext);
}

export const BilliardCentersUIConsumer = BilliardCentersUIContext.Consumer;

export function BilliardCentersUIProvider({
  billiardCentersUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BilliardCenterModel).initialFilter
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
    dataModel: BilliardCenterModel,
    newBilliardCenterButtonClick:
      billiardCentersUIEvents.newBilliardCenterButtonClick,
    openEditBilliardCenterPage:
      billiardCentersUIEvents.openEditBilliardCenterPage,
    openDeleteBilliardCenterDialog:
      billiardCentersUIEvents.openDeleteBilliardCenterDialog,
    openDeleteBilliardCentersDialog:
      billiardCentersUIEvents.openDeleteBilliardCentersDialog,
    openFetchBilliardCentersDialog:
      billiardCentersUIEvents.openFetchBilliardCentersDialog,
    openUpdateBilliardCentersStatusDialog:
      billiardCentersUIEvents.openUpdateBilliardCentersStatusDialog,
  };
  return (
    <BilliardCentersUIContext.Provider value={value}>
      {children}
    </BilliardCentersUIContext.Provider>
  );
}
