import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { OperationTypeAccountModel } from "../../../../../core/_models/Cash/OperationTypeAccountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const OperationTypeAccountsUIContext = createContext();

export function useOperationTypeAccountsUIContext() {
  return useContext(OperationTypeAccountsUIContext);
}

export const OperationTypeAccountsUIConsumer =
  OperationTypeAccountsUIContext.Consumer;

export function OperationTypeAccountsUIProvider({
  operationTypeAccountsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(OperationTypeAccountModel).initialFilter
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
    dataModel: OperationTypeAccountModel,
    newOperationTypeAccountButtonClick:
      operationTypeAccountsUIEvents.newOperationTypeAccountButtonClick,
    openEditOperationTypeAccountPage:
      operationTypeAccountsUIEvents.openEditOperationTypeAccountPage,
    openDeleteOperationTypeAccountDialog:
      operationTypeAccountsUIEvents.openDeleteOperationTypeAccountDialog,
    openDeleteOperationTypeAccountsDialog:
      operationTypeAccountsUIEvents.openDeleteOperationTypeAccountsDialog,
    openFetchOperationTypeAccountsDialog:
      operationTypeAccountsUIEvents.openFetchOperationTypeAccountsDialog,
    openUpdateOperationTypeAccountsStatusDialog:
      operationTypeAccountsUIEvents.openUpdateOperationTypeAccountsStatusDialog,
  };
  return (
    <OperationTypeAccountsUIContext.Provider value={value}>
      {children}
    </OperationTypeAccountsUIContext.Provider>
  );
}
