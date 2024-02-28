import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ImportXMLKeyModel } from "../../../../../core/_models/Accounting/ImportXMLKeyModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ImportXMLKeiesUIContext = createContext();

export function useImportXMLKeiesUIContext() {
  return useContext(ImportXMLKeiesUIContext);
}

export const ImportXMLKeiesUIConsumer = ImportXMLKeiesUIContext.Consumer;

export function ImportXMLKeiesUIProvider({ importXMLKeiesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ImportXMLKeyModel).initialFilter
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
    dataModel: ImportXMLKeyModel,
    newImportXMLKeyButtonClick:
      importXMLKeiesUIEvents.newImportXMLKeyButtonClick,
    openEditImportXMLKeyPage: importXMLKeiesUIEvents.openEditImportXMLKeyPage,
    openDeleteImportXMLKeyDialog:
      importXMLKeiesUIEvents.openDeleteImportXMLKeyDialog,
    openDeleteImportXMLKeiesDialog:
      importXMLKeiesUIEvents.openDeleteImportXMLKeiesDialog,
    openFetchImportXMLKeiesDialog:
      importXMLKeiesUIEvents.openFetchImportXMLKeiesDialog,
    openUpdateImportXMLKeiesStatusDialog:
      importXMLKeiesUIEvents.openUpdateImportXMLKeiesStatusDialog,
  };
  return (
    <ImportXMLKeiesUIContext.Provider value={value}>
      {children}
    </ImportXMLKeiesUIContext.Provider>
  );
}
