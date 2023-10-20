
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeePhysicalConditionModel } from "../../../../../core/_models/Employment/EmployeePhysicalConditionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeePhysicalConditionsUIContext = createContext();

export function useEmployeePhysicalConditionsUIContext() {
  return useContext(EmployeePhysicalConditionsUIContext);
}

export const EmployeePhysicalConditionsUIConsumer = EmployeePhysicalConditionsUIContext.Consumer;

export function EmployeePhysicalConditionsUIProvider({ employeePhysicalConditionsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeePhysicalConditionModel).initialFilter
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
    dataModel: EmployeePhysicalConditionModel,
    newEmployeePhysicalConditionButtonClick: employeePhysicalConditionsUIEvents.newEmployeePhysicalConditionButtonClick,
    openEditEmployeePhysicalConditionPage: employeePhysicalConditionsUIEvents.openEditEmployeePhysicalConditionPage,
    openDeleteEmployeePhysicalConditionDialog: employeePhysicalConditionsUIEvents.openDeleteEmployeePhysicalConditionDialog,
    openDeleteEmployeePhysicalConditionsDialog: employeePhysicalConditionsUIEvents.openDeleteEmployeePhysicalConditionsDialog,
    openFetchEmployeePhysicalConditionsDialog: employeePhysicalConditionsUIEvents.openFetchEmployeePhysicalConditionsDialog,
    openUpdateEmployeePhysicalConditionsStatusDialog: employeePhysicalConditionsUIEvents.openUpdateEmployeePhysicalConditionsStatusDialog,
  };
  return (
    <EmployeePhysicalConditionsUIContext.Provider value={value}>{children}</EmployeePhysicalConditionsUIContext.Provider>
  );
}