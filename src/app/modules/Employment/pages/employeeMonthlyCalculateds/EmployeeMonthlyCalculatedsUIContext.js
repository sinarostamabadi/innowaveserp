
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeMonthlyCalculatedModel } from "../../../../../core/_models/Employment/EmployeeMonthlyCalculatedModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeMonthlyCalculatedsUIContext = createContext();

export function useEmployeeMonthlyCalculatedsUIContext() {
  return useContext(EmployeeMonthlyCalculatedsUIContext);
}

export const EmployeeMonthlyCalculatedsUIConsumer = EmployeeMonthlyCalculatedsUIContext.Consumer;

export function EmployeeMonthlyCalculatedsUIProvider({ employeeMonthlyCalculatedsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeMonthlyCalculatedModel).initialFilter
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
    dataModel: EmployeeMonthlyCalculatedModel,
    newEmployeeMonthlyCalculatedButtonClick: employeeMonthlyCalculatedsUIEvents.newEmployeeMonthlyCalculatedButtonClick,
    openEditEmployeeMonthlyCalculatedPage: employeeMonthlyCalculatedsUIEvents.openEditEmployeeMonthlyCalculatedPage,
    openDeleteEmployeeMonthlyCalculatedDialog: employeeMonthlyCalculatedsUIEvents.openDeleteEmployeeMonthlyCalculatedDialog,
    openDeleteEmployeeMonthlyCalculatedsDialog: employeeMonthlyCalculatedsUIEvents.openDeleteEmployeeMonthlyCalculatedsDialog,
    openFetchEmployeeMonthlyCalculatedsDialog: employeeMonthlyCalculatedsUIEvents.openFetchEmployeeMonthlyCalculatedsDialog,
    openUpdateEmployeeMonthlyCalculatedsStatusDialog: employeeMonthlyCalculatedsUIEvents.openUpdateEmployeeMonthlyCalculatedsStatusDialog,
  };
  return (
    <EmployeeMonthlyCalculatedsUIContext.Provider value={value}>{children}</EmployeeMonthlyCalculatedsUIContext.Provider>
  );
}