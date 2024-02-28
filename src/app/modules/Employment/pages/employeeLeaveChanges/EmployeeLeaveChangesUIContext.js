import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeLeaveChangeModel } from "../../../../../core/_models/Employment/EmployeeLeaveChangeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeLeaveChangesUIContext = createContext();

export function useEmployeeLeaveChangesUIContext() {
  return useContext(EmployeeLeaveChangesUIContext);
}

export const EmployeeLeaveChangesUIConsumer =
  EmployeeLeaveChangesUIContext.Consumer;

export function EmployeeLeaveChangesUIProvider({
  employeeLeaveChangesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeLeaveChangeModel).initialFilter
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
    dataModel: EmployeeLeaveChangeModel,
    newEmployeeLeaveChangeButtonClick:
      employeeLeaveChangesUIEvents.newEmployeeLeaveChangeButtonClick,
    openEditEmployeeLeaveChangePage:
      employeeLeaveChangesUIEvents.openEditEmployeeLeaveChangePage,
    openDeleteEmployeeLeaveChangeDialog:
      employeeLeaveChangesUIEvents.openDeleteEmployeeLeaveChangeDialog,
    openDeleteEmployeeLeaveChangesDialog:
      employeeLeaveChangesUIEvents.openDeleteEmployeeLeaveChangesDialog,
    openFetchEmployeeLeaveChangesDialog:
      employeeLeaveChangesUIEvents.openFetchEmployeeLeaveChangesDialog,
    openUpdateEmployeeLeaveChangesStatusDialog:
      employeeLeaveChangesUIEvents.openUpdateEmployeeLeaveChangesStatusDialog,
  };
  return (
    <EmployeeLeaveChangesUIContext.Provider value={value}>
      {children}
    </EmployeeLeaveChangesUIContext.Provider>
  );
}
