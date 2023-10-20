
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AccountFloatingGroupTypeModel } from "../../../../../core/_models/Accounting/AccountFloatingGroupTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AccountFloatingGroupTypesUIContext = createContext();

export function useAccountFloatingGroupTypesUIContext() {
  return useContext(AccountFloatingGroupTypesUIContext);
}

export const AccountFloatingGroupTypesUIConsumer = AccountFloatingGroupTypesUIContext.Consumer;

export function AccountFloatingGroupTypesUIProvider({ accountFloatingGroupTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AccountFloatingGroupTypeModel).initialFilter
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
    dataModel: AccountFloatingGroupTypeModel,
    newAccountFloatingGroupTypeButtonClick: accountFloatingGroupTypesUIEvents.newAccountFloatingGroupTypeButtonClick,
    openEditAccountFloatingGroupTypePage: accountFloatingGroupTypesUIEvents.openEditAccountFloatingGroupTypePage,
    openDeleteAccountFloatingGroupTypeDialog: accountFloatingGroupTypesUIEvents.openDeleteAccountFloatingGroupTypeDialog,
    openDeleteAccountFloatingGroupTypesDialog: accountFloatingGroupTypesUIEvents.openDeleteAccountFloatingGroupTypesDialog,
    openFetchAccountFloatingGroupTypesDialog: accountFloatingGroupTypesUIEvents.openFetchAccountFloatingGroupTypesDialog,
    openUpdateAccountFloatingGroupTypesStatusDialog: accountFloatingGroupTypesUIEvents.openUpdateAccountFloatingGroupTypesStatusDialog,
  };
  return (
    <AccountFloatingGroupTypesUIContext.Provider value={value}>{children}</AccountFloatingGroupTypesUIContext.Provider>
  );
}