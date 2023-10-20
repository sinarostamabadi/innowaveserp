
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AccountFloatingTypeModel } from "../../../../../core/_models/Accounting/AccountFloatingTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AccountFloatingTypesUIContext = createContext();

export function useAccountFloatingTypesUIContext() {
  return useContext(AccountFloatingTypesUIContext);
}

export const AccountFloatingTypesUIConsumer = AccountFloatingTypesUIContext.Consumer;

export function AccountFloatingTypesUIProvider({ accountFloatingTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AccountFloatingTypeModel).initialFilter
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
    dataModel: AccountFloatingTypeModel,
    newAccountFloatingTypeButtonClick: accountFloatingTypesUIEvents.newAccountFloatingTypeButtonClick,
    openEditAccountFloatingTypePage: accountFloatingTypesUIEvents.openEditAccountFloatingTypePage,
    openDeleteAccountFloatingTypeDialog: accountFloatingTypesUIEvents.openDeleteAccountFloatingTypeDialog,
    openDeleteAccountFloatingTypesDialog: accountFloatingTypesUIEvents.openDeleteAccountFloatingTypesDialog,
    openFetchAccountFloatingTypesDialog: accountFloatingTypesUIEvents.openFetchAccountFloatingTypesDialog,
    openUpdateAccountFloatingTypesStatusDialog: accountFloatingTypesUIEvents.openUpdateAccountFloatingTypesStatusDialog,
  };
  return (
    <AccountFloatingTypesUIContext.Provider value={value}>{children}</AccountFloatingTypesUIContext.Provider>
  );
}