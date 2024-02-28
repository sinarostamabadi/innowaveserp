import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeRelationModel } from "../../../../../core/_models/Employment/EmployeeRelationModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeRelationsUIContext = createContext();

export function useEmployeeRelationsUIContext() {
  return useContext(EmployeeRelationsUIContext);
}

export const EmployeeRelationsUIConsumer = EmployeeRelationsUIContext.Consumer;

export function EmployeeRelationsUIProvider({
  employeeRelationsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeRelationModel).initialFilter
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
    dataModel: EmployeeRelationModel,
    newEmployeeRelationButtonClick:
      employeeRelationsUIEvents.newEmployeeRelationButtonClick,
    openEditEmployeeRelationPage:
      employeeRelationsUIEvents.openEditEmployeeRelationPage,
    openDeleteEmployeeRelationDialog:
      employeeRelationsUIEvents.openDeleteEmployeeRelationDialog,
    openDeleteEmployeeRelationsDialog:
      employeeRelationsUIEvents.openDeleteEmployeeRelationsDialog,
    openFetchEmployeeRelationsDialog:
      employeeRelationsUIEvents.openFetchEmployeeRelationsDialog,
    openUpdateEmployeeRelationsStatusDialog:
      employeeRelationsUIEvents.openUpdateEmployeeRelationsStatusDialog,
  };
  return (
    <EmployeeRelationsUIContext.Provider value={value}>
      {children}
    </EmployeeRelationsUIContext.Provider>
  );
}
