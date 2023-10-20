
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PaymentModel } from "../../../../../core/_models/Cash/PaymentModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PaymentsUIContext = createContext();

export function usePaymentsUIContext() {
  return useContext(PaymentsUIContext);
}

export const PaymentsUIConsumer = PaymentsUIContext.Consumer;

export function PaymentsUIProvider({ paymentsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PaymentModel).initialFilter
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
    dataModel: PaymentModel,
    newPaymentButtonClick: paymentsUIEvents.newPaymentButtonClick,
    openEditPaymentPage: paymentsUIEvents.openEditPaymentPage,
    openDeletePaymentDialog: paymentsUIEvents.openDeletePaymentDialog,
    openDeletePaymentsDialog: paymentsUIEvents.openDeletePaymentsDialog,
    openFetchPaymentsDialog: paymentsUIEvents.openFetchPaymentsDialog,
    openUpdatePaymentsStatusDialog: paymentsUIEvents.openUpdatePaymentsStatusDialog,
  };
  return (
    <PaymentsUIContext.Provider value={value}>{children}</PaymentsUIContext.Provider>
  );
}