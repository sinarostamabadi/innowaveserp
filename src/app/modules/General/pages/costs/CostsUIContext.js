import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CostModel } from "../../../../../core/_models/General/CostModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CostsUIContext = createContext();

export function useCostsUIContext() {
  return useContext(CostsUIContext);
}

export const CostsUIConsumer = CostsUIContext.Consumer;

export function CostsUIProvider({ costsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CostModel).initialFilter
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
    dataModel: CostModel,
    newCostButtonClick: costsUIEvents.newCostButtonClick,
    openEditCostPage: costsUIEvents.openEditCostPage,
    openDeleteCostDialog: costsUIEvents.openDeleteCostDialog,
    openDeleteCostsDialog: costsUIEvents.openDeleteCostsDialog,
    openFetchCostsDialog: costsUIEvents.openFetchCostsDialog,
    openUpdateCostsStatusDialog: costsUIEvents.openUpdateCostsStatusDialog,
  };
  return (
    <CostsUIContext.Provider value={value}>{children}</CostsUIContext.Provider>
  );
}
