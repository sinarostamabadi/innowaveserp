import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InquiryDetailModel } from "../../../../../core/_models/PurchaseOrder/InquiryDetailModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const InquiryDetailsUIContext = createContext();

export function useInquiryDetailsUIContext() {
  return useContext(InquiryDetailsUIContext);
}

export const InquiryDetailsUIConsumer = InquiryDetailsUIContext.Consumer;

export function InquiryDetailsUIProvider({ inquiryDetailsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(InquiryDetailModel).initialFilter
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
    dataModel: InquiryDetailModel,
    newInquiryDetailButtonClick:
      inquiryDetailsUIEvents.newInquiryDetailButtonClick,
    openEditInquiryDetailPage: inquiryDetailsUIEvents.openEditInquiryDetailPage,
    openDeleteInquiryDetailDialog:
      inquiryDetailsUIEvents.openDeleteInquiryDetailDialog,
    openDeleteInquiryDetailsDialog:
      inquiryDetailsUIEvents.openDeleteInquiryDetailsDialog,
    openFetchInquiryDetailsDialog:
      inquiryDetailsUIEvents.openFetchInquiryDetailsDialog,
    openUpdateInquiryDetailsStatusDialog:
      inquiryDetailsUIEvents.openUpdateInquiryDetailsStatusDialog,
  };
  return (
    <InquiryDetailsUIContext.Provider value={value}>
      {children}
    </InquiryDetailsUIContext.Provider>
  );
}
