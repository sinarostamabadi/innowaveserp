import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { LinkDocumentModel } from "../../../../../core/_models/Accounting/LinkDocumentModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const LinkDocumentsUIContext = createContext();

export function useLinkDocumentsUIContext() {
  return useContext(LinkDocumentsUIContext);
}

export const LinkDocumentsUIConsumer = LinkDocumentsUIContext.Consumer;

export function LinkDocumentsUIProvider({ linkDocumentsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(LinkDocumentModel).initialFilter
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
    dataModel: LinkDocumentModel,
    newLinkDocumentButtonClick:
      linkDocumentsUIEvents.newLinkDocumentButtonClick,
    openEditLinkDocumentPage: linkDocumentsUIEvents.openEditLinkDocumentPage,
    openDeleteLinkDocumentDialog:
      linkDocumentsUIEvents.openDeleteLinkDocumentDialog,
    openDeleteLinkDocumentsDialog:
      linkDocumentsUIEvents.openDeleteLinkDocumentsDialog,
    openFetchLinkDocumentsDialog:
      linkDocumentsUIEvents.openFetchLinkDocumentsDialog,
    openUpdateLinkDocumentsStatusDialog:
      linkDocumentsUIEvents.openUpdateLinkDocumentsStatusDialog,
  };
  return (
    <LinkDocumentsUIContext.Provider value={value}>
      {children}
    </LinkDocumentsUIContext.Provider>
  );
}
