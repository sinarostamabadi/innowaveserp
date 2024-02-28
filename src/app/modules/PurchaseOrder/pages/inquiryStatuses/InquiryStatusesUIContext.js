import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InquiryStatusModel } from "../../../../../core/_models/PurchaseOrder/InquiryStatusModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const InquiryStatusesUIContext = createContext();

export function useInquiryStatusesUIContext() {
  return useContext(InquiryStatusesUIContext);
}

export const InquiryStatusesUIConsumer = InquiryStatusesUIContext.Consumer;

export function InquiryStatusesUIProvider({
  inquiryStatusesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(InquiryStatusModel).initialFilter
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
    dataModel: InquiryStatusModel,
    newInquiryStatusButtonClick:
      inquiryStatusesUIEvents.newInquiryStatusButtonClick,
    openEditInquiryStatusPage:
      inquiryStatusesUIEvents.openEditInquiryStatusPage,
    openDeleteInquiryStatusDialog:
      inquiryStatusesUIEvents.openDeleteInquiryStatusDialog,
    openDeleteInquiryStatusesDialog:
      inquiryStatusesUIEvents.openDeleteInquiryStatusesDialog,
    openFetchInquiryStatusesDialog:
      inquiryStatusesUIEvents.openFetchInquiryStatusesDialog,
    openUpdateInquiryStatusesStatusDialog:
      inquiryStatusesUIEvents.openUpdateInquiryStatusesStatusDialog,
  };
  return (
    <InquiryStatusesUIContext.Provider value={value}>
      {children}
    </InquiryStatusesUIContext.Provider>
  );
}
