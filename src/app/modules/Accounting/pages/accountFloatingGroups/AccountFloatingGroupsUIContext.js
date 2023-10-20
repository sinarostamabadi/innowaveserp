
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AccountFloatingGroupModel } from "../../../../../core/_models/Accounting/AccountFloatingGroupModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AccountFloatingGroupsUIContext = createContext();

export function useAccountFloatingGroupsUIContext() {
  return useContext(AccountFloatingGroupsUIContext);
}

export const AccountFloatingGroupsUIConsumer = AccountFloatingGroupsUIContext.Consumer;

export function AccountFloatingGroupsUIProvider({ accountFloatingGroupsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AccountFloatingGroupModel).initialFilter
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
    dataModel: AccountFloatingGroupModel,
    newAccountFloatingGroupButtonClick: accountFloatingGroupsUIEvents.newAccountFloatingGroupButtonClick,
    openEditAccountFloatingGroupPage: accountFloatingGroupsUIEvents.openEditAccountFloatingGroupPage,
    openDeleteAccountFloatingGroupDialog: accountFloatingGroupsUIEvents.openDeleteAccountFloatingGroupDialog,
    openDeleteAccountFloatingGroupsDialog: accountFloatingGroupsUIEvents.openDeleteAccountFloatingGroupsDialog,
    openFetchAccountFloatingGroupsDialog: accountFloatingGroupsUIEvents.openFetchAccountFloatingGroupsDialog,
    openUpdateAccountFloatingGroupsStatusDialog: accountFloatingGroupsUIEvents.openUpdateAccountFloatingGroupsStatusDialog,
  };
  return (
    <AccountFloatingGroupsUIContext.Provider value={value}>{children}</AccountFloatingGroupsUIContext.Provider>
  );
}