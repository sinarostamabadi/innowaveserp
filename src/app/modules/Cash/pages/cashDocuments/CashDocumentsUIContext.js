
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CashDocumentModel } from "src/core/_models/Cash/CashDocumentModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const CashDocumentsUIContext = createContext();

export function useCashDocumentsUIContext() {
  return useContext(CashDocumentsUIContext);
}

export const CashDocumentsUIConsumer = CashDocumentsUIContext.Consumer;

export function CashDocumentsUIProvider({ cashDocumentsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CashDocumentModel, "DocumentDate", "desc").initialFilter
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
  
  const [showReportDialog, setShowReportDialog] = useState(false);
  const openReportDialog = () => {
    setShowReportDialog(true);
  };
  const closeReportDialog = () => {
    setShowReportDialog(false);
  };
  
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: CashDocumentModel,
    newCashDocumentButtonClick: cashDocumentsUIEvents.newCashDocumentButtonClick,
    openEditCashDocumentPage: cashDocumentsUIEvents.openEditCashDocumentPage,
    openDeleteCashDocumentDialog: cashDocumentsUIEvents.openDeleteCashDocumentDialog,
    openDeleteCashDocumentsDialog: cashDocumentsUIEvents.openDeleteCashDocumentsDialog,
    openFetchCashDocumentsDialog: cashDocumentsUIEvents.openFetchCashDocumentsDialog,
    openUpdateCashDocumentsStatusDialog: cashDocumentsUIEvents.openUpdateCashDocumentsStatusDialog,
    openCloseCashDialog: cashDocumentsUIEvents.openCloseCashDialog,
    showReportDialog,
    openReportDialog,
    closeReportDialog,
  };
  return (
    <CashDocumentsUIContext.Provider value={value}>{children}</CashDocumentsUIContext.Provider>
  );
}