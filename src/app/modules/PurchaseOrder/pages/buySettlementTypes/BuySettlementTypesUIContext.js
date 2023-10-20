
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuySettlementTypeModel } from "../../../../../core/_models/PurchaseOrder/BuySettlementTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BuySettlementTypesUIContext = createContext();

export function useBuySettlementTypesUIContext() {
  return useContext(BuySettlementTypesUIContext);
}

export const BuySettlementTypesUIConsumer = BuySettlementTypesUIContext.Consumer;

export function BuySettlementTypesUIProvider({ buySettlementTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BuySettlementTypeModel).initialFilter
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
    dataModel: BuySettlementTypeModel,
    newBuySettlementTypeButtonClick: buySettlementTypesUIEvents.newBuySettlementTypeButtonClick,
    openEditBuySettlementTypePage: buySettlementTypesUIEvents.openEditBuySettlementTypePage,
    openDeleteBuySettlementTypeDialog: buySettlementTypesUIEvents.openDeleteBuySettlementTypeDialog,
    openDeleteBuySettlementTypesDialog: buySettlementTypesUIEvents.openDeleteBuySettlementTypesDialog,
    openFetchBuySettlementTypesDialog: buySettlementTypesUIEvents.openFetchBuySettlementTypesDialog,
    openUpdateBuySettlementTypesStatusDialog: buySettlementTypesUIEvents.openUpdateBuySettlementTypesStatusDialog,
  };
  return (
    <BuySettlementTypesUIContext.Provider value={value}>{children}</BuySettlementTypesUIContext.Provider>
  );
}