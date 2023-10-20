
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MonthlyEmployeeIOModel } from "../../../../../core/_models/Employment/MonthlyEmployeeIOModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MonthlyEmployeeIOsUIContext = createContext();

export function useMonthlyEmployeeIOsUIContext() {
  return useContext(MonthlyEmployeeIOsUIContext);
}

export const MonthlyEmployeeIOsUIConsumer = MonthlyEmployeeIOsUIContext.Consumer;

export function MonthlyEmployeeIOsUIProvider({ monthlyEmployeeIOsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MonthlyEmployeeIOModel).initialFilter
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
    dataModel: MonthlyEmployeeIOModel,
    newMonthlyEmployeeIOButtonClick: monthlyEmployeeIOsUIEvents.newMonthlyEmployeeIOButtonClick,
    openEditMonthlyEmployeeIOPage: monthlyEmployeeIOsUIEvents.openEditMonthlyEmployeeIOPage,
    openDeleteMonthlyEmployeeIODialog: monthlyEmployeeIOsUIEvents.openDeleteMonthlyEmployeeIODialog,
    openDeleteMonthlyEmployeeIOsDialog: monthlyEmployeeIOsUIEvents.openDeleteMonthlyEmployeeIOsDialog,
    openFetchMonthlyEmployeeIOsDialog: monthlyEmployeeIOsUIEvents.openFetchMonthlyEmployeeIOsDialog,
    openUpdateMonthlyEmployeeIOsStatusDialog: monthlyEmployeeIOsUIEvents.openUpdateMonthlyEmployeeIOsStatusDialog,
  };
  return (
    <MonthlyEmployeeIOsUIContext.Provider value={value}>{children}</MonthlyEmployeeIOsUIContext.Provider>
  );
}