
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { DocumentModel } from "../../../../../core/_models/Accounting/DocumentModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const DocumentsUIContext = createContext();

export function useDocumentsUIContext() {
  return useContext(DocumentsUIContext);
}

export const DocumentsUIConsumer = DocumentsUIContext.Consumer;

export function DocumentsUIProvider({ documentsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(DocumentModel).initialFilter
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
    dataModel: DocumentModel,
    newDocumentButtonClick: documentsUIEvents.newDocumentButtonClick,
    openEditDocumentPage: documentsUIEvents.openEditDocumentPage,
    openDeleteDocumentDialog: documentsUIEvents.openDeleteDocumentDialog,
    openDeleteDocumentsDialog: documentsUIEvents.openDeleteDocumentsDialog,
    openFetchDocumentsDialog: documentsUIEvents.openFetchDocumentsDialog,
    openUpdateDocumentsStatusDialog: documentsUIEvents.openUpdateDocumentsStatusDialog,
  };
  return (
    <DocumentsUIContext.Provider value={value}>{children}</DocumentsUIContext.Provider>
  );
}