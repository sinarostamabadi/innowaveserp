
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InquiryModel } from "../../../../../core/_models/PurchaseOrder/InquiryModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const InquiriesUIContext = createContext();

export function useInquiriesUIContext() {
  return useContext(InquiriesUIContext);
}

export const InquiriesUIConsumer = InquiriesUIContext.Consumer;

export function InquiriesUIProvider({ inquiriesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(InquiryModel).initialFilter
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
    dataModel: InquiryModel,
    newInquiryButtonClick: inquiriesUIEvents.newInquiryButtonClick,
    openEditInquiryPage: inquiriesUIEvents.openEditInquiryPage,
    openDeleteInquiryDialog: inquiriesUIEvents.openDeleteInquiryDialog,
    openDeleteInquiriesDialog: inquiriesUIEvents.openDeleteInquiriesDialog,
    openFetchInquiriesDialog: inquiriesUIEvents.openFetchInquiriesDialog,
    openUpdateInquiriesStatusDialog: inquiriesUIEvents.openUpdateInquiriesStatusDialog,
  };
  return (
    <InquiriesUIContext.Provider value={value}>{children}</InquiriesUIContext.Provider>
  );
}