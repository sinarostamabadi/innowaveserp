import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ImportXMLSettingModel } from "../../../../../core/_models/Accounting/ImportXMLSettingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ImportXMLSettingUIContext = createContext();

export function useImportXMLSettingUIContext() {
  return useContext(ImportXMLSettingUIContext);
}

export const ImportXMLSettingUIConsumer = ImportXMLSettingUIContext.Consumer;

export function ImportXMLSettingUIProvider({
  importXMLSettingUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ImportXMLSettingModel).initialFilter
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
    dataModel: ImportXMLSettingModel,
    newImportXMLSettingButtonClick:
      importXMLSettingUIEvents.newImportXMLSettingButtonClick,
    openEditImportXMLSettingPage:
      importXMLSettingUIEvents.openEditImportXMLSettingPage,
    openDeleteImportXMLSettingDialog:
      importXMLSettingUIEvents.openDeleteImportXMLSettingDialog,
    openDeleteImportXMLSettingDialog:
      importXMLSettingUIEvents.openDeleteImportXMLSettingDialog,
    openFetchImportXMLSettingDialog:
      importXMLSettingUIEvents.openFetchImportXMLSettingDialog,
    openUpdateImportXMLSettingStatusDialog:
      importXMLSettingUIEvents.openUpdateImportXMLSettingStatusDialog,
  };
  return (
    <ImportXMLSettingUIContext.Provider value={value}>
      {children}
    </ImportXMLSettingUIContext.Provider>
  );
}
