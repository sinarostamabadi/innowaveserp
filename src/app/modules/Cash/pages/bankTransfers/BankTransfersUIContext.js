import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BankTransferModel } from "../../../../../core/_models/Cash/BankTransferModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BankTransfersUIContext = createContext();

export function useBankTransfersUIContext() {
  return useContext(BankTransfersUIContext);
}

export const BankTransfersUIConsumer = BankTransfersUIContext.Consumer;

export function BankTransfersUIProvider({ bankTransfersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BankTransferModel).initialFilter
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
    dataModel: BankTransferModel,
    newBankTransferButtonClick:
      bankTransfersUIEvents.newBankTransferButtonClick,
    openEditBankTransferPage: bankTransfersUIEvents.openEditBankTransferPage,
    openDeleteBankTransferDialog:
      bankTransfersUIEvents.openDeleteBankTransferDialog,
    openDeleteBankTransfersDialog:
      bankTransfersUIEvents.openDeleteBankTransfersDialog,
    openFetchBankTransfersDialog:
      bankTransfersUIEvents.openFetchBankTransfersDialog,
    openUpdateBankTransfersStatusDialog:
      bankTransfersUIEvents.openUpdateBankTransfersStatusDialog,
  };
  return (
    <BankTransfersUIContext.Provider value={value}>
      {children}
    </BankTransfersUIContext.Provider>
  );
}
