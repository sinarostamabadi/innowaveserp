
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellDocumentModel } from "../../../../../core/_models/Sell/SellDocumentModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDocumentsUIContext = createContext();

export function useSellDocumentsUIContext() {
  return useContext(SellDocumentsUIContext);
}

export const SellDocumentsUIConsumer = SellDocumentsUIContext.Consumer;

export function SellDocumentsUIProvider({ sellDocumentsUIEvents, children }) {
  const defaultFilter =   {
    Property: "IsTemp",
    Operation: 5,
    Values: ["true"],
  };

  const [queryParams, setQueryParamsBase] = useState(
    {...getConfig(SellDocumentModel, "SellDocumentId", "desc").initialFilter, Filters: [defaultFilter]}
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
    dataModel: SellDocumentModel,
    newSellDocumentButtonClick: sellDocumentsUIEvents.newSellDocumentButtonClick,
    openEditSellDocumentPage: sellDocumentsUIEvents.openEditSellDocumentPage,
    openDeleteSellDocumentDialog: sellDocumentsUIEvents.openDeleteSellDocumentDialog,
    openDeleteSellDocumentsDialog: sellDocumentsUIEvents.openDeleteSellDocumentsDialog,
    openFetchSellDocumentsDialog: sellDocumentsUIEvents.openFetchSellDocumentsDialog,
    openUpdateSellDocumentsStatusDialog: sellDocumentsUIEvents.openUpdateSellDocumentsStatusDialog,
    openCancelAndResellDialog: sellDocumentsUIEvents.openCancelAndResellDialog,
  };
  return (
    <SellDocumentsUIContext.Provider value={value}>{children}</SellDocumentsUIContext.Provider>
  );
}