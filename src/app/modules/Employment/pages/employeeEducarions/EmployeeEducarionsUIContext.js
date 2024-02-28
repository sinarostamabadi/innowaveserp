import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeEducarionModel } from "../../../../../core/_models/Employment/EmployeeEducarionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeEducarionsUIContext = createContext();

export function useEmployeeEducarionsUIContext() {
  return useContext(EmployeeEducarionsUIContext);
}

export const EmployeeEducarionsUIConsumer =
  EmployeeEducarionsUIContext.Consumer;

export function EmployeeEducarionsUIProvider({
  employeeEducarionsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeEducarionModel).initialFilter
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
    dataModel: EmployeeEducarionModel,
    newEmployeeEducarionButtonClick:
      employeeEducarionsUIEvents.newEmployeeEducarionButtonClick,
    openEditEmployeeEducarionPage:
      employeeEducarionsUIEvents.openEditEmployeeEducarionPage,
    openDeleteEmployeeEducarionDialog:
      employeeEducarionsUIEvents.openDeleteEmployeeEducarionDialog,
    openDeleteEmployeeEducarionsDialog:
      employeeEducarionsUIEvents.openDeleteEmployeeEducarionsDialog,
    openFetchEmployeeEducarionsDialog:
      employeeEducarionsUIEvents.openFetchEmployeeEducarionsDialog,
    openUpdateEmployeeEducarionsStatusDialog:
      employeeEducarionsUIEvents.openUpdateEmployeeEducarionsStatusDialog,
  };
  return (
    <EmployeeEducarionsUIContext.Provider value={value}>
      {children}
    </EmployeeEducarionsUIContext.Provider>
  );
}
