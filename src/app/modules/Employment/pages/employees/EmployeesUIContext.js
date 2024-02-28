import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeModel } from "../../../../../core/_models/Employment/EmployeeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeesUIContext = createContext();

export function useEmployeesUIContext() {
  return useContext(EmployeesUIContext);
}

export const EmployeesUIConsumer = EmployeesUIContext.Consumer;

export function EmployeesUIProvider({ employeesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeModel).initialFilter
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
    dataModel: EmployeeModel,
    newEmployeeButtonClick: employeesUIEvents.newEmployeeButtonClick,
    openEditEmployeePage: employeesUIEvents.openEditEmployeePage,
    openDeleteEmployeeDialog: employeesUIEvents.openDeleteEmployeeDialog,
    openDeleteEmployeesDialog: employeesUIEvents.openDeleteEmployeesDialog,
    openFetchEmployeesDialog: employeesUIEvents.openFetchEmployeesDialog,
    openUpdateEmployeesStatusDialog:
      employeesUIEvents.openUpdateEmployeesStatusDialog,
  };
  return (
    <EmployeesUIContext.Provider value={value}>
      {children}
    </EmployeesUIContext.Provider>
  );
}
