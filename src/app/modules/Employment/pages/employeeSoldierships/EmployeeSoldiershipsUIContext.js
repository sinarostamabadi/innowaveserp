import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeSoldiershipModel } from "../../../../../core/_models/Employment/EmployeeSoldiershipModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeSoldiershipsUIContext = createContext();

export function useEmployeeSoldiershipsUIContext() {
  return useContext(EmployeeSoldiershipsUIContext);
}

export const EmployeeSoldiershipsUIConsumer =
  EmployeeSoldiershipsUIContext.Consumer;

export function EmployeeSoldiershipsUIProvider({
  employeeSoldiershipsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeSoldiershipModel).initialFilter
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
    dataModel: EmployeeSoldiershipModel,
    newEmployeeSoldiershipButtonClick:
      employeeSoldiershipsUIEvents.newEmployeeSoldiershipButtonClick,
    openEditEmployeeSoldiershipPage:
      employeeSoldiershipsUIEvents.openEditEmployeeSoldiershipPage,
    openDeleteEmployeeSoldiershipDialog:
      employeeSoldiershipsUIEvents.openDeleteEmployeeSoldiershipDialog,
    openDeleteEmployeeSoldiershipsDialog:
      employeeSoldiershipsUIEvents.openDeleteEmployeeSoldiershipsDialog,
    openFetchEmployeeSoldiershipsDialog:
      employeeSoldiershipsUIEvents.openFetchEmployeeSoldiershipsDialog,
    openUpdateEmployeeSoldiershipsStatusDialog:
      employeeSoldiershipsUIEvents.openUpdateEmployeeSoldiershipsStatusDialog,
  };
  return (
    <EmployeeSoldiershipsUIContext.Provider value={value}>
      {children}
    </EmployeeSoldiershipsUIContext.Provider>
  );
}
