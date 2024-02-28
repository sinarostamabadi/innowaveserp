import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeLeaveModel } from "../../../../../core/_models/Employment/EmployeeLeaveModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeLeavesUIContext = createContext();

export function useEmployeeLeavesUIContext() {
  return useContext(EmployeeLeavesUIContext);
}

export const EmployeeLeavesUIConsumer = EmployeeLeavesUIContext.Consumer;

export function EmployeeLeavesUIProvider({ employeeLeavesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeLeaveModel).initialFilter
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
    dataModel: EmployeeLeaveModel,
    newEmployeeLeaveButtonClick:
      employeeLeavesUIEvents.newEmployeeLeaveButtonClick,
    openEditEmployeeLeavePage: employeeLeavesUIEvents.openEditEmployeeLeavePage,
    openDeleteEmployeeLeaveDialog:
      employeeLeavesUIEvents.openDeleteEmployeeLeaveDialog,
    openDeleteEmployeeLeavesDialog:
      employeeLeavesUIEvents.openDeleteEmployeeLeavesDialog,
    openFetchEmployeeLeavesDialog:
      employeeLeavesUIEvents.openFetchEmployeeLeavesDialog,
    openUpdateEmployeeLeavesStatusDialog:
      employeeLeavesUIEvents.openUpdateEmployeeLeavesStatusDialog,
  };
  return (
    <EmployeeLeavesUIContext.Provider value={value}>
      {children}
    </EmployeeLeavesUIContext.Provider>
  );
}
