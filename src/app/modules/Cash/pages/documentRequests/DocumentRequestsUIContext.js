import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { DocumentRequestModel } from "../../../../../core/_models/Cash/DocumentRequestModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const DocumentRequestsUIContext = createContext();

export function useDocumentRequestsUIContext() {
  return useContext(DocumentRequestsUIContext);
}

export const DocumentRequestsUIConsumer = DocumentRequestsUIContext.Consumer;

export function DocumentRequestsUIProvider({
  documentRequestsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(DocumentRequestModel).initialFilter
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
    dataModel: DocumentRequestModel,
    newDocumentRequestButtonClick:
      documentRequestsUIEvents.newDocumentRequestButtonClick,
    openEditDocumentRequestPage:
      documentRequestsUIEvents.openEditDocumentRequestPage,
    openDeleteDocumentRequestDialog:
      documentRequestsUIEvents.openDeleteDocumentRequestDialog,
    openDeleteDocumentRequestsDialog:
      documentRequestsUIEvents.openDeleteDocumentRequestsDialog,
    openFetchDocumentRequestsDialog:
      documentRequestsUIEvents.openFetchDocumentRequestsDialog,
    openUpdateDocumentRequestsStatusDialog:
      documentRequestsUIEvents.openUpdateDocumentRequestsStatusDialog,
  };
  return (
    <DocumentRequestsUIContext.Provider value={value}>
      {children}
    </DocumentRequestsUIContext.Provider>
  );
}
