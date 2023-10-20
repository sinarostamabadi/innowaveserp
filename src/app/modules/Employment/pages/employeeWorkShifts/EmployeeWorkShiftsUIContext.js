
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeWorkShiftModel } from "../../../../../core/_models/Employment/EmployeeWorkShiftModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeWorkShiftsUIContext = createContext();

export function useEmployeeWorkShiftsUIContext() {
  return useContext(EmployeeWorkShiftsUIContext);
}

export const EmployeeWorkShiftsUIConsumer = EmployeeWorkShiftsUIContext.Consumer;

export function EmployeeWorkShiftsUIProvider({ employeeWorkShiftsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeWorkShiftModel).initialFilter
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
    dataModel: EmployeeWorkShiftModel,
    newEmployeeWorkShiftButtonClick: employeeWorkShiftsUIEvents.newEmployeeWorkShiftButtonClick,
    openEditEmployeeWorkShiftPage: employeeWorkShiftsUIEvents.openEditEmployeeWorkShiftPage,
    openDeleteEmployeeWorkShiftDialog: employeeWorkShiftsUIEvents.openDeleteEmployeeWorkShiftDialog,
    openDeleteEmployeeWorkShiftsDialog: employeeWorkShiftsUIEvents.openDeleteEmployeeWorkShiftsDialog,
    openFetchEmployeeWorkShiftsDialog: employeeWorkShiftsUIEvents.openFetchEmployeeWorkShiftsDialog,
    openUpdateEmployeeWorkShiftsStatusDialog: employeeWorkShiftsUIEvents.openUpdateEmployeeWorkShiftsStatusDialog,
  };
  return (
    <EmployeeWorkShiftsUIContext.Provider value={value}>{children}</EmployeeWorkShiftsUIContext.Provider>
  );
}