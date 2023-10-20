
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ProfitLossItemModel } from "../../../../../core/_models/Accounting/ProfitLossItemModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ProfitLossItemsUIContext = createContext();

export function useProfitLossItemsUIContext() {
  return useContext(ProfitLossItemsUIContext);
}

export const ProfitLossItemsUIConsumer = ProfitLossItemsUIContext.Consumer;

export function ProfitLossItemsUIProvider({ profitLossItemsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ProfitLossItemModel).initialFilter
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
    dataModel: ProfitLossItemModel,
    newProfitLossItemButtonClick: profitLossItemsUIEvents.newProfitLossItemButtonClick,
    openEditProfitLossItemPage: profitLossItemsUIEvents.openEditProfitLossItemPage,
    openDeleteProfitLossItemDialog: profitLossItemsUIEvents.openDeleteProfitLossItemDialog,
    openDeleteProfitLossItemsDialog: profitLossItemsUIEvents.openDeleteProfitLossItemsDialog,
    openFetchProfitLossItemsDialog: profitLossItemsUIEvents.openFetchProfitLossItemsDialog,
    openUpdateProfitLossItemsStatusDialog: profitLossItemsUIEvents.openUpdateProfitLossItemsStatusDialog,
  };
  return (
    <ProfitLossItemsUIContext.Provider value={value}>{children}</ProfitLossItemsUIContext.Provider>
  );
}