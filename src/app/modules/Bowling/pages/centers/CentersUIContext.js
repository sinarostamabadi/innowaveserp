
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CenterModel } from "../../../../../core/_models/Bowling/CenterModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CentersUIContext = createContext();

export function useCentersUIContext() {
  return useContext(CentersUIContext);
}

export const CentersUIConsumer = CentersUIContext.Consumer;

export function CentersUIProvider({ centersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CenterModel).initialFilter
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
    dataModel: CenterModel,
    newCenterButtonClick: centersUIEvents.newCenterButtonClick,
    openEditCenterPage: centersUIEvents.openEditCenterPage,
    openDeleteCenterDialog: centersUIEvents.openDeleteCenterDialog,
    openDeleteCentersDialog: centersUIEvents.openDeleteCentersDialog,
    openFetchCentersDialog: centersUIEvents.openFetchCentersDialog,
    openUpdateCentersStatusDialog: centersUIEvents.openUpdateCentersStatusDialog,
  };
  return (
    <CentersUIContext.Provider value={value}>{children}</CentersUIContext.Provider>
  );
}