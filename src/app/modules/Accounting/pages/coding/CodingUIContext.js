import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CodingModel } from "../../../../../core/_models/Accounting/CodingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CodingUIContext = createContext();

export function useCodingUIContext() {
  return useContext(CodingUIContext);
}

export const CodingUIConsumer = CodingUIContext.Consumer;

export function CodingUIProvider({ codingUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CodingModel).initialFilter
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
    dataModel: CodingModel,
    newCodingButtonClick: codingUIEvents.newCodingButtonClick,
    openEditCodingPage: codingUIEvents.openEditCodingPage,
    openDeleteCodingDialog: codingUIEvents.openDeleteCodingDialog,
    openDeleteCodingDialog: codingUIEvents.openDeleteCodingDialog,
    openFetchCodingDialog: codingUIEvents.openFetchCodingDialog,
    openUpdateCodingStatusDialog: codingUIEvents.openUpdateCodingStatusDialog,
  };
  return (
    <CodingUIContext.Provider value={value}>
      {children}
    </CodingUIContext.Provider>
  );
}
