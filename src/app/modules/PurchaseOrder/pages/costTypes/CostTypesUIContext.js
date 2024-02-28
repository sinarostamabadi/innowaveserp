import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CostTypeModel } from "../../../../../core/_models/PurchaseOrder/CostTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CostTypesUIContext = createContext();

export function useCostTypesUIContext() {
  return useContext(CostTypesUIContext);
}

export const CostTypesUIConsumer = CostTypesUIContext.Consumer;

export function CostTypesUIProvider({ costTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CostTypeModel).initialFilter
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
    dataModel: CostTypeModel,
    newCostTypeButtonClick: costTypesUIEvents.newCostTypeButtonClick,
    openEditCostTypePage: costTypesUIEvents.openEditCostTypePage,
    openDeleteCostTypeDialog: costTypesUIEvents.openDeleteCostTypeDialog,
    openDeleteCostTypesDialog: costTypesUIEvents.openDeleteCostTypesDialog,
    openFetchCostTypesDialog: costTypesUIEvents.openFetchCostTypesDialog,
    openUpdateCostTypesStatusDialog:
      costTypesUIEvents.openUpdateCostTypesStatusDialog,
  };
  return (
    <CostTypesUIContext.Provider value={value}>
      {children}
    </CostTypesUIContext.Provider>
  );
}
