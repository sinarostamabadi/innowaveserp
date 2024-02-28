import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { WarehouseModel } from "../../../../../core/_models/General/WarehouseModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const WarehousesUIContext = createContext();

export function useWarehousesUIContext() {
  return useContext(WarehousesUIContext);
}

export const WarehousesUIConsumer = WarehousesUIContext.Consumer;

export function WarehousesUIProvider({ warehousesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(WarehouseModel).initialFilter
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
    dataModel: WarehouseModel,
    newWarehouseButtonClick: warehousesUIEvents.newWarehouseButtonClick,
    openEditWarehousePage: warehousesUIEvents.openEditWarehousePage,
    openDeleteWarehouseDialog: warehousesUIEvents.openDeleteWarehouseDialog,
    openDeleteWarehousesDialog: warehousesUIEvents.openDeleteWarehousesDialog,
    openFetchWarehousesDialog: warehousesUIEvents.openFetchWarehousesDialog,
    openUpdateWarehousesStatusDialog:
      warehousesUIEvents.openUpdateWarehousesStatusDialog,
  };
  return (
    <WarehousesUIContext.Provider value={value}>
      {children}
    </WarehousesUIContext.Provider>
  );
}
