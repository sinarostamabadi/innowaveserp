
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { FutsalReserveTypeModel } from "../../../../../core/_models/Futsal/FutsalReserveTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const FutsalReserveTypesUIContext = createContext();

export function useFutsalReserveTypesUIContext() {
  return useContext(FutsalReserveTypesUIContext);
}

export const FutsalReserveTypesUIConsumer = FutsalReserveTypesUIContext.Consumer;

export function FutsalReserveTypesUIProvider({ futsalReserveTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(FutsalReserveTypeModel).initialFilter
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
    dataModel: FutsalReserveTypeModel,
    newFutsalReserveTypeButtonClick: futsalReserveTypesUIEvents.newFutsalReserveTypeButtonClick,
    openEditFutsalReserveTypePage: futsalReserveTypesUIEvents.openEditFutsalReserveTypePage,
    openDeleteFutsalReserveTypeDialog: futsalReserveTypesUIEvents.openDeleteFutsalReserveTypeDialog,
    openDeleteFutsalReserveTypesDialog: futsalReserveTypesUIEvents.openDeleteFutsalReserveTypesDialog,
    openFetchFutsalReserveTypesDialog: futsalReserveTypesUIEvents.openFetchFutsalReserveTypesDialog,
    openUpdateFutsalReserveTypesStatusDialog: futsalReserveTypesUIEvents.openUpdateFutsalReserveTypesStatusDialog,
  };
  return (
    <FutsalReserveTypesUIContext.Provider value={value}>{children}</FutsalReserveTypesUIContext.Provider>
  );
}