import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SettingModel } from "../../../../../core/_models/General/SettingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SettingUIContext = createContext();

export function useSettingUIContext() {
  return useContext(SettingUIContext);
}

export const SettingUIConsumer = SettingUIContext.Consumer;

export function SettingUIProvider({ settingUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SettingModel).initialFilter
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
    dataModel: SettingModel,
    newSettingButtonClick: settingUIEvents.newSettingButtonClick,
    openEditSettingPage: settingUIEvents.openEditSettingPage,
    openDeleteSettingDialog: settingUIEvents.openDeleteSettingDialog,
    openDeleteSettingDialog: settingUIEvents.openDeleteSettingDialog,
    openFetchSettingDialog: settingUIEvents.openFetchSettingDialog,
    openUpdateSettingStatusDialog:
      settingUIEvents.openUpdateSettingStatusDialog,
  };
  return (
    <SettingUIContext.Provider value={value}>
      {children}
    </SettingUIContext.Provider>
  );
}
