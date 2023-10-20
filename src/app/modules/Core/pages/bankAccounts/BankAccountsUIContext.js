import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BankAccountModel } from "../../../../../core/_models/Core/BankAccountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BankAccountsUIContext = createContext();

export function useBankAccountsUIContext() {
  return useContext(BankAccountsUIContext);
}

export const BankAccountsUIConsumer = BankAccountsUIContext.Consumer;

export function BankAccountsUIProvider({ bankAccountsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(getConfig(BankAccountModel).initialFilter);
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
    dataModel: BankAccountModel,
    newBankAccountButtonClick: bankAccountsUIEvents.newBankAccountButtonClick,
    openEditBankAccountPage: bankAccountsUIEvents.openEditBankAccountPage,
    openDeleteBankAccountDialog: bankAccountsUIEvents.openDeleteBankAccountDialog,
    openDeleteBankAccountsDialog: bankAccountsUIEvents.openDeleteBankAccountsDialog,
    openFetchBankAccountsDialog: bankAccountsUIEvents.openFetchBankAccountsDialog,
    openUpdateBankAccountsStatusDialog:
      bankAccountsUIEvents.openUpdateBankAccountsStatusDialog,
  };

  return (
    <BankAccountsUIContext.Provider value={value}>
      {children}
    </BankAccountsUIContext.Provider>
  );
}  
