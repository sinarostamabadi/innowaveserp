
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PosTransactionModel } from "src/core/_models/Cash/PosTransactionModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const PosTransactionsUIContext = createContext();

export function usePosTransactionsUIContext() {
  return useContext(PosTransactionsUIContext);
}

export const PosTransactionsUIConsumer = PosTransactionsUIContext.Consumer;

export function PosTransactionsUIProvider({ posTransactionsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PosTransactionModel).initialFilter
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
    dataModel: PosTransactionModel,
    newPosTransactionButtonClick: posTransactionsUIEvents.newPosTransactionButtonClick,
    openEditPosTransactionPage: posTransactionsUIEvents.openEditPosTransactionPage,
    openDeletePosTransactionDialog: posTransactionsUIEvents.openDeletePosTransactionDialog,
    openDeletePosTransactionsDialog: posTransactionsUIEvents.openDeletePosTransactionsDialog,
    openFetchPosTransactionsDialog: posTransactionsUIEvents.openFetchPosTransactionsDialog,
    openUpdatePosTransactionsStatusDialog: posTransactionsUIEvents.openUpdatePosTransactionsStatusDialog,
  };
  return (
    <PosTransactionsUIContext.Provider value={value}>{children}</PosTransactionsUIContext.Provider>
  );
}