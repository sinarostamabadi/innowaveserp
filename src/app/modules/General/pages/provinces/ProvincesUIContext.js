
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ProvinceModel } from "../../../../../core/_models/General/ProvinceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ProvincesUIContext = createContext();

export function useProvincesUIContext() {
  return useContext(ProvincesUIContext);
}

export const ProvincesUIConsumer = ProvincesUIContext.Consumer;

export function ProvincesUIProvider({ provincesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ProvinceModel).initialFilter
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
    dataModel: ProvinceModel,
    newProvinceButtonClick: provincesUIEvents.newProvinceButtonClick,
    openEditProvincePage: provincesUIEvents.openEditProvincePage,
    openDeleteProvinceDialog: provincesUIEvents.openDeleteProvinceDialog,
    openDeleteProvincesDialog: provincesUIEvents.openDeleteProvincesDialog,
    openFetchProvincesDialog: provincesUIEvents.openFetchProvincesDialog,
    openUpdateProvincesStatusDialog: provincesUIEvents.openUpdateProvincesStatusDialog,
  };
  return (
    <ProvincesUIContext.Provider value={value}>{children}</ProvincesUIContext.Provider>
  );
}