import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { DocumentDtlModel } from "../../../../../core/_models/Accounting/DocumentDtlModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const DocumentDtlsUIContext = createContext();

export function useDocumentDtlsUIContext() {
  return useContext(DocumentDtlsUIContext);
}

export const DocumentDtlsUIConsumer = DocumentDtlsUIContext.Consumer;

export function DocumentDtlsUIProvider({ documentDtlsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(DocumentDtlModel).initialFilter
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
    dataModel: DocumentDtlModel,
    newDocumentDtlButtonClick: documentDtlsUIEvents.newDocumentDtlButtonClick,
    openEditDocumentDtlPage: documentDtlsUIEvents.openEditDocumentDtlPage,
    openDeleteDocumentDtlDialog:
      documentDtlsUIEvents.openDeleteDocumentDtlDialog,
    openDeleteDocumentDtlsDialog:
      documentDtlsUIEvents.openDeleteDocumentDtlsDialog,
    openFetchDocumentDtlsDialog:
      documentDtlsUIEvents.openFetchDocumentDtlsDialog,
    openUpdateDocumentDtlsStatusDialog:
      documentDtlsUIEvents.openUpdateDocumentDtlsStatusDialog,
  };
  return (
    <DocumentDtlsUIContext.Provider value={value}>
      {children}
    </DocumentDtlsUIContext.Provider>
  );
}
