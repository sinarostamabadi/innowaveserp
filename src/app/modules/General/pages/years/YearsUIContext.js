import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { YearModel } from "../../../../../core/_models/General/YearModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const YearsUIContext = createContext();

export function useYearsUIContext() {
  return useContext(YearsUIContext);
}

export const YearsUIConsumer = YearsUIContext.Consumer;

export function YearsUIProvider({ yearsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(YearModel).initialFilter
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
    dataModel: YearModel,
    newYearButtonClick: yearsUIEvents.newYearButtonClick,
    openEditYearPage: yearsUIEvents.openEditYearPage,
    openDeleteYearDialog: yearsUIEvents.openDeleteYearDialog,
    openDeleteYearsDialog: yearsUIEvents.openDeleteYearsDialog,
    openFetchYearsDialog: yearsUIEvents.openFetchYearsDialog,
    openUpdateYearsStatusDialog: yearsUIEvents.openUpdateYearsStatusDialog,
  };
  return (
    <YearsUIContext.Provider value={value}>{children}</YearsUIContext.Provider>
  );
}
