import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BankModel } from "src/core/_models/General/BankModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const BanksUIContext = createContext();

export function useBanksUIContext() {
  return useContext(BanksUIContext);
}

export const BanksUIConsumer = BanksUIContext.Consumer;

export function BanksUIProvider({ banksUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BankModel).initialFilter
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
    dataModel: BankModel,
    newBankButtonClick: banksUIEvents.newBankButtonClick,
    openEditBankPage: banksUIEvents.openEditBankPage,
    openDeleteBankDialog: banksUIEvents.openDeleteBankDialog,
    openDeleteBanksDialog: banksUIEvents.openDeleteBanksDialog,
    openFetchBanksDialog: banksUIEvents.openFetchBanksDialog,
    openUpdateBanksStatusDialog: banksUIEvents.openUpdateBanksStatusDialog,
  };
  return (
    <BanksUIContext.Provider value={value}>{children}</BanksUIContext.Provider>
  );
}
