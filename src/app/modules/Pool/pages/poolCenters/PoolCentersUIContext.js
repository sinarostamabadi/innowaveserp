
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PoolCenterModel } from "../../../../../core/_models/Pool/PoolCenterModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PoolCentersUIContext = createContext();

export function usePoolCentersUIContext() {
  return useContext(PoolCentersUIContext);
}

export const PoolCentersUIConsumer = PoolCentersUIContext.Consumer;

export function PoolCentersUIProvider({ poolCentersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PoolCenterModel).initialFilter
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
    dataModel: PoolCenterModel,
    newPoolCenterButtonClick: poolCentersUIEvents.newPoolCenterButtonClick,
    openEditPoolCenterPage: poolCentersUIEvents.openEditPoolCenterPage,
    openDeletePoolCenterDialog: poolCentersUIEvents.openDeletePoolCenterDialog,
    openDeletePoolCentersDialog: poolCentersUIEvents.openDeletePoolCentersDialog,
    openFetchPoolCentersDialog: poolCentersUIEvents.openFetchPoolCentersDialog,
    openUpdatePoolCentersStatusDialog: poolCentersUIEvents.openUpdatePoolCentersStatusDialog,
  };
  return (
    <PoolCentersUIContext.Provider value={value}>{children}</PoolCentersUIContext.Provider>
  );
}