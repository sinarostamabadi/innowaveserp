
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PaymentStatusModel } from "../../../../../core/_models//PaymentStatusModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PaymentStatusesUIContext = createContext();

export function usePaymentStatusesUIContext() {
  return useContext(PaymentStatusesUIContext);
}

export const PaymentStatusesUIConsumer = PaymentStatusesUIContext.Consumer;

export function PaymentStatusesUIProvider({ paymentStatusesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PaymentStatusModel).initialFilter
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
    dataModel: PaymentStatusModel,
    newPaymentStatusButtonClick: paymentStatusesUIEvents.newPaymentStatusButtonClick,
    openEditPaymentStatusPage: paymentStatusesUIEvents.openEditPaymentStatusPage,
    openDeletePaymentStatusDialog: paymentStatusesUIEvents.openDeletePaymentStatusDialog,
    openDeletePaymentStatusesDialog: paymentStatusesUIEvents.openDeletePaymentStatusesDialog,
    openFetchPaymentStatusesDialog: paymentStatusesUIEvents.openFetchPaymentStatusesDialog,
    openUpdatePaymentStatusesStatusDialog: paymentStatusesUIEvents.openUpdatePaymentStatusesStatusDialog,
  };
  return (
    <PaymentStatusesUIContext.Provider value={value}>{children}</PaymentStatusesUIContext.Provider>
  );
}