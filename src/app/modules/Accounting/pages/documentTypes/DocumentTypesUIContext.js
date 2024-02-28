import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { DocumentTypeModel } from "../../../../../core/_models/Accounting/DocumentTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const DocumentTypesUIContext = createContext();

export function useDocumentTypesUIContext() {
  return useContext(DocumentTypesUIContext);
}

export const DocumentTypesUIConsumer = DocumentTypesUIContext.Consumer;

export function DocumentTypesUIProvider({ documentTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(DocumentTypeModel).initialFilter
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
    dataModel: DocumentTypeModel,
    newDocumentTypeButtonClick:
      documentTypesUIEvents.newDocumentTypeButtonClick,
    openEditDocumentTypePage: documentTypesUIEvents.openEditDocumentTypePage,
    openDeleteDocumentTypeDialog:
      documentTypesUIEvents.openDeleteDocumentTypeDialog,
    openDeleteDocumentTypesDialog:
      documentTypesUIEvents.openDeleteDocumentTypesDialog,
    openFetchDocumentTypesDialog:
      documentTypesUIEvents.openFetchDocumentTypesDialog,
    openUpdateDocumentTypesStatusDialog:
      documentTypesUIEvents.openUpdateDocumentTypesStatusDialog,
  };
  return (
    <DocumentTypesUIContext.Provider value={value}>
      {children}
    </DocumentTypesUIContext.Provider>
  );
}
