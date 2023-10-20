
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AccountFloatingGroupRelationModel } from "../../../../../core/_models/Accounting/AccountFloatingGroupRelationModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AccountFloatingGroupRelationsUIContext = createContext();

export function useAccountFloatingGroupRelationsUIContext() {
  return useContext(AccountFloatingGroupRelationsUIContext);
}

export const AccountFloatingGroupRelationsUIConsumer = AccountFloatingGroupRelationsUIContext.Consumer;

export function AccountFloatingGroupRelationsUIProvider({ accountFloatingGroupRelationsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AccountFloatingGroupRelationModel).initialFilter
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
    dataModel: AccountFloatingGroupRelationModel,
    newAccountFloatingGroupRelationButtonClick: accountFloatingGroupRelationsUIEvents.newAccountFloatingGroupRelationButtonClick,
    openEditAccountFloatingGroupRelationPage: accountFloatingGroupRelationsUIEvents.openEditAccountFloatingGroupRelationPage,
    openDeleteAccountFloatingGroupRelationDialog: accountFloatingGroupRelationsUIEvents.openDeleteAccountFloatingGroupRelationDialog,
    openDeleteAccountFloatingGroupRelationsDialog: accountFloatingGroupRelationsUIEvents.openDeleteAccountFloatingGroupRelationsDialog,
    openFetchAccountFloatingGroupRelationsDialog: accountFloatingGroupRelationsUIEvents.openFetchAccountFloatingGroupRelationsDialog,
    openUpdateAccountFloatingGroupRelationsStatusDialog: accountFloatingGroupRelationsUIEvents.openUpdateAccountFloatingGroupRelationsStatusDialog,
  };
  return (
    <AccountFloatingGroupRelationsUIContext.Provider value={value}>{children}</AccountFloatingGroupRelationsUIContext.Provider>
  );
}