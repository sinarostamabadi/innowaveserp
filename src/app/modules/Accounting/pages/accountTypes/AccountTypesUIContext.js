
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AccountTypeModel } from "../../../../../core/_models/Accounting/AccountTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AccountTypesUIContext = createContext();

export function useAccountTypesUIContext() {
  return useContext(AccountTypesUIContext);
}

export const AccountTypesUIConsumer = AccountTypesUIContext.Consumer;

export function AccountTypesUIProvider({ accountTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AccountTypeModel).initialFilter
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
    dataModel: AccountTypeModel,
    newAccountTypeButtonClick: accountTypesUIEvents.newAccountTypeButtonClick,
    openEditAccountTypePage: accountTypesUIEvents.openEditAccountTypePage,
    openDeleteAccountTypeDialog: accountTypesUIEvents.openDeleteAccountTypeDialog,
    openDeleteAccountTypesDialog: accountTypesUIEvents.openDeleteAccountTypesDialog,
    openFetchAccountTypesDialog: accountTypesUIEvents.openFetchAccountTypesDialog,
    openUpdateAccountTypesStatusDialog: accountTypesUIEvents.openUpdateAccountTypesStatusDialog,
  };
  return (
    <AccountTypesUIContext.Provider value={value}>{children}</AccountTypesUIContext.Provider>
  );
}