
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellDocumentCostModel } from "../../../../../core/_models/Sell/SellDocumentCostModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDocumentCostsUIContext = createContext();

export function useSellDocumentCostsUIContext() {
  return useContext(SellDocumentCostsUIContext);
}

export const SellDocumentCostsUIConsumer = SellDocumentCostsUIContext.Consumer;

export function SellDocumentCostsUIProvider({ sellDocumentCostsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellDocumentCostModel).initialFilter
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
    dataModel: SellDocumentCostModel,
    newSellDocumentCostButtonClick: sellDocumentCostsUIEvents.newSellDocumentCostButtonClick,
    openEditSellDocumentCostPage: sellDocumentCostsUIEvents.openEditSellDocumentCostPage,
    openDeleteSellDocumentCostDialog: sellDocumentCostsUIEvents.openDeleteSellDocumentCostDialog,
    openDeleteSellDocumentCostsDialog: sellDocumentCostsUIEvents.openDeleteSellDocumentCostsDialog,
    openFetchSellDocumentCostsDialog: sellDocumentCostsUIEvents.openFetchSellDocumentCostsDialog,
    openUpdateSellDocumentCostsStatusDialog: sellDocumentCostsUIEvents.openUpdateSellDocumentCostsStatusDialog,
  };
  return (
    <SellDocumentCostsUIContext.Provider value={value}>{children}</SellDocumentCostsUIContext.Provider>
  );
}