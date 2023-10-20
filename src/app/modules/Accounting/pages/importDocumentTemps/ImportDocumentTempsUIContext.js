
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ImportDocumentTempModel } from "../../../../../core/_models/Accounting/ImportDocumentTempModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ImportDocumentTempsUIContext = createContext();

export function useImportDocumentTempsUIContext() {
  return useContext(ImportDocumentTempsUIContext);
}

export const ImportDocumentTempsUIConsumer = ImportDocumentTempsUIContext.Consumer;

export function ImportDocumentTempsUIProvider({ importDocumentTempsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ImportDocumentTempModel).initialFilter
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
    dataModel: ImportDocumentTempModel,
    newImportDocumentTempButtonClick: importDocumentTempsUIEvents.newImportDocumentTempButtonClick,
    openEditImportDocumentTempPage: importDocumentTempsUIEvents.openEditImportDocumentTempPage,
    openDeleteImportDocumentTempDialog: importDocumentTempsUIEvents.openDeleteImportDocumentTempDialog,
    openDeleteImportDocumentTempsDialog: importDocumentTempsUIEvents.openDeleteImportDocumentTempsDialog,
    openFetchImportDocumentTempsDialog: importDocumentTempsUIEvents.openFetchImportDocumentTempsDialog,
    openUpdateImportDocumentTempsStatusDialog: importDocumentTempsUIEvents.openUpdateImportDocumentTempsStatusDialog,
  };
  return (
    <ImportDocumentTempsUIContext.Provider value={value}>{children}</ImportDocumentTempsUIContext.Provider>
  );
}