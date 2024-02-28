import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ImportAccountFloatingTempModel } from "../../../../../core/_models/Accounting/ImportAccountFloatingTempModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ImportAccountFloatingTempsUIContext = createContext();

export function useImportAccountFloatingTempsUIContext() {
  return useContext(ImportAccountFloatingTempsUIContext);
}

export const ImportAccountFloatingTempsUIConsumer =
  ImportAccountFloatingTempsUIContext.Consumer;

export function ImportAccountFloatingTempsUIProvider({
  importAccountFloatingTempsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ImportAccountFloatingTempModel).initialFilter
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
    dataModel: ImportAccountFloatingTempModel,
    newImportAccountFloatingTempButtonClick:
      importAccountFloatingTempsUIEvents.newImportAccountFloatingTempButtonClick,
    openEditImportAccountFloatingTempPage:
      importAccountFloatingTempsUIEvents.openEditImportAccountFloatingTempPage,
    openDeleteImportAccountFloatingTempDialog:
      importAccountFloatingTempsUIEvents.openDeleteImportAccountFloatingTempDialog,
    openDeleteImportAccountFloatingTempsDialog:
      importAccountFloatingTempsUIEvents.openDeleteImportAccountFloatingTempsDialog,
    openFetchImportAccountFloatingTempsDialog:
      importAccountFloatingTempsUIEvents.openFetchImportAccountFloatingTempsDialog,
    openUpdateImportAccountFloatingTempsStatusDialog:
      importAccountFloatingTempsUIEvents.openUpdateImportAccountFloatingTempsStatusDialog,
  };
  return (
    <ImportAccountFloatingTempsUIContext.Provider value={value}>
      {children}
    </ImportAccountFloatingTempsUIContext.Provider>
  );
}
