
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { LinkDocumentParameterModel } from "../../../../../core/_models/Accounting/LinkDocumentParameterModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const LinkDocumentParametersUIContext = createContext();

export function useLinkDocumentParametersUIContext() {
  return useContext(LinkDocumentParametersUIContext);
}

export const LinkDocumentParametersUIConsumer = LinkDocumentParametersUIContext.Consumer;

export function LinkDocumentParametersUIProvider({ linkDocumentParametersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(LinkDocumentParameterModel).initialFilter
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
    dataModel: LinkDocumentParameterModel,
    newLinkDocumentParameterButtonClick: linkDocumentParametersUIEvents.newLinkDocumentParameterButtonClick,
    openEditLinkDocumentParameterPage: linkDocumentParametersUIEvents.openEditLinkDocumentParameterPage,
    openDeleteLinkDocumentParameterDialog: linkDocumentParametersUIEvents.openDeleteLinkDocumentParameterDialog,
    openDeleteLinkDocumentParametersDialog: linkDocumentParametersUIEvents.openDeleteLinkDocumentParametersDialog,
    openFetchLinkDocumentParametersDialog: linkDocumentParametersUIEvents.openFetchLinkDocumentParametersDialog,
    openUpdateLinkDocumentParametersStatusDialog: linkDocumentParametersUIEvents.openUpdateLinkDocumentParametersStatusDialog,
  };
  return (
    <LinkDocumentParametersUIContext.Provider value={value}>{children}</LinkDocumentParametersUIContext.Provider>
  );
}