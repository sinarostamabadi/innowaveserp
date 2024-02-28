import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeMissionModel } from "../../../../../core/_models/Employment/EmployeeMissionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeMissionsUIContext = createContext();

export function useEmployeeMissionsUIContext() {
  return useContext(EmployeeMissionsUIContext);
}

export const EmployeeMissionsUIConsumer = EmployeeMissionsUIContext.Consumer;

export function EmployeeMissionsUIProvider({
  employeeMissionsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeMissionModel).initialFilter
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
    dataModel: EmployeeMissionModel,
    newEmployeeMissionButtonClick:
      employeeMissionsUIEvents.newEmployeeMissionButtonClick,
    openEditEmployeeMissionPage:
      employeeMissionsUIEvents.openEditEmployeeMissionPage,
    openDeleteEmployeeMissionDialog:
      employeeMissionsUIEvents.openDeleteEmployeeMissionDialog,
    openDeleteEmployeeMissionsDialog:
      employeeMissionsUIEvents.openDeleteEmployeeMissionsDialog,
    openFetchEmployeeMissionsDialog:
      employeeMissionsUIEvents.openFetchEmployeeMissionsDialog,
    openUpdateEmployeeMissionsStatusDialog:
      employeeMissionsUIEvents.openUpdateEmployeeMissionsStatusDialog,
  };
  return (
    <EmployeeMissionsUIContext.Provider value={value}>
      {children}
    </EmployeeMissionsUIContext.Provider>
  );
}
