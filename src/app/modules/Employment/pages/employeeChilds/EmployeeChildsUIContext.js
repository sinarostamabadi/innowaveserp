import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeChildModel } from "../../../../../core/_models/Employment/EmployeeChildModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeChildsUIContext = createContext();

export function useEmployeeChildsUIContext() {
  return useContext(EmployeeChildsUIContext);
}

export const EmployeeChildsUIConsumer = EmployeeChildsUIContext.Consumer;

export function EmployeeChildsUIProvider({ employeeChildsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeChildModel).initialFilter
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
    dataModel: EmployeeChildModel,
    newEmployeeChildButtonClick:
      employeeChildsUIEvents.newEmployeeChildButtonClick,
    openEditEmployeeChildPage: employeeChildsUIEvents.openEditEmployeeChildPage,
    openDeleteEmployeeChildDialog:
      employeeChildsUIEvents.openDeleteEmployeeChildDialog,
    openDeleteEmployeeChildsDialog:
      employeeChildsUIEvents.openDeleteEmployeeChildsDialog,
    openFetchEmployeeChildsDialog:
      employeeChildsUIEvents.openFetchEmployeeChildsDialog,
    openUpdateEmployeeChildsStatusDialog:
      employeeChildsUIEvents.openUpdateEmployeeChildsStatusDialog,
  };
  return (
    <EmployeeChildsUIContext.Provider value={value}>
      {children}
    </EmployeeChildsUIContext.Provider>
  );
}
