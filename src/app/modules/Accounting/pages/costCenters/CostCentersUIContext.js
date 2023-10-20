
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CostCenterModel } from "../../../../../core/_models/Accounting/CostCenterModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CostCentersUIContext = createContext();

export function useCostCentersUIContext() {
  return useContext(CostCentersUIContext);
}

export const CostCentersUIConsumer = CostCentersUIContext.Consumer;

export function CostCentersUIProvider({ costCentersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CostCenterModel).initialFilter
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
    dataModel: CostCenterModel,
    newCostCenterButtonClick: costCentersUIEvents.newCostCenterButtonClick,
    openEditCostCenterPage: costCentersUIEvents.openEditCostCenterPage,
    openDeleteCostCenterDialog: costCentersUIEvents.openDeleteCostCenterDialog,
    openDeleteCostCentersDialog: costCentersUIEvents.openDeleteCostCentersDialog,
    openFetchCostCentersDialog: costCentersUIEvents.openFetchCostCentersDialog,
    openUpdateCostCentersStatusDialog: costCentersUIEvents.openUpdateCostCentersStatusDialog,
  };
  return (
    <CostCentersUIContext.Provider value={value}>{children}</CostCentersUIContext.Provider>
  );
}