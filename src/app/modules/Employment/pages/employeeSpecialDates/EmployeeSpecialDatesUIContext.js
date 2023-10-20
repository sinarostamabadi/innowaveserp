
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeSpecialDateModel } from "../../../../../core/_models/Employment/EmployeeSpecialDateModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeSpecialDatesUIContext = createContext();

export function useEmployeeSpecialDatesUIContext() {
  return useContext(EmployeeSpecialDatesUIContext);
}

export const EmployeeSpecialDatesUIConsumer = EmployeeSpecialDatesUIContext.Consumer;

export function EmployeeSpecialDatesUIProvider({ employeeSpecialDatesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeSpecialDateModel).initialFilter
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
    dataModel: EmployeeSpecialDateModel,
    newEmployeeSpecialDateButtonClick: employeeSpecialDatesUIEvents.newEmployeeSpecialDateButtonClick,
    openEditEmployeeSpecialDatePage: employeeSpecialDatesUIEvents.openEditEmployeeSpecialDatePage,
    openDeleteEmployeeSpecialDateDialog: employeeSpecialDatesUIEvents.openDeleteEmployeeSpecialDateDialog,
    openDeleteEmployeeSpecialDatesDialog: employeeSpecialDatesUIEvents.openDeleteEmployeeSpecialDatesDialog,
    openFetchEmployeeSpecialDatesDialog: employeeSpecialDatesUIEvents.openFetchEmployeeSpecialDatesDialog,
    openUpdateEmployeeSpecialDatesStatusDialog: employeeSpecialDatesUIEvents.openUpdateEmployeeSpecialDatesStatusDialog,
  };
  return (
    <EmployeeSpecialDatesUIContext.Provider value={value}>{children}</EmployeeSpecialDatesUIContext.Provider>
  );
}