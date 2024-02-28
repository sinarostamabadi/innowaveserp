import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ImportAccountTempModel } from "../../../../../core/_models/Accounting/ImportAccountTempModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ImportAccountTempsUIContext = createContext();

export function useImportAccountTempsUIContext() {
  return useContext(ImportAccountTempsUIContext);
}

export const ImportAccountTempsUIConsumer =
  ImportAccountTempsUIContext.Consumer;

export function ImportAccountTempsUIProvider({
  importAccountTempsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ImportAccountTempModel).initialFilter
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
    dataModel: ImportAccountTempModel,
    newImportAccountTempButtonClick:
      importAccountTempsUIEvents.newImportAccountTempButtonClick,
    openEditImportAccountTempPage:
      importAccountTempsUIEvents.openEditImportAccountTempPage,
    openDeleteImportAccountTempDialog:
      importAccountTempsUIEvents.openDeleteImportAccountTempDialog,
    openDeleteImportAccountTempsDialog:
      importAccountTempsUIEvents.openDeleteImportAccountTempsDialog,
    openFetchImportAccountTempsDialog:
      importAccountTempsUIEvents.openFetchImportAccountTempsDialog,
    openUpdateImportAccountTempsStatusDialog:
      importAccountTempsUIEvents.openUpdateImportAccountTempsStatusDialog,
  };
  return (
    <ImportAccountTempsUIContext.Provider value={value}>
      {children}
    </ImportAccountTempsUIContext.Provider>
  );
}
