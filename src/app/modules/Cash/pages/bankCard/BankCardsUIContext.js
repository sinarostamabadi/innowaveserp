import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BankCardModel } from "src/core/_models/Cash/BankCardModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const BankCardsUIContext = createContext();

export function useBankCardsUIContext() {
  return useContext(BankCardsUIContext);
}

export const BankCardsUIConsumer = BankCardsUIContext.Consumer;

export function BankCardsUIProvider({ bankCardsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BankCardModel).initialFilter
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
    dataModel: BankCardModel,
    newBankCardButtonClick: bankCardsUIEvents.newBankCardButtonClick,
    openEditBankCardPage: bankCardsUIEvents.openEditBankCardPage,
    openDeleteBankCardDialog: bankCardsUIEvents.openDeleteBankCardDialog,
    openDeleteBankCardsDialog: bankCardsUIEvents.openDeleteBankCardsDialog,
    openFetchBankCardsDialog: bankCardsUIEvents.openFetchBankCardsDialog,
    openUpdateBankCardsStatusDialog:
      bankCardsUIEvents.openUpdateBankCardsStatusDialog,
  };
  return (
    <BankCardsUIContext.Provider value={value}>
      {children}
    </BankCardsUIContext.Provider>
  );
}
