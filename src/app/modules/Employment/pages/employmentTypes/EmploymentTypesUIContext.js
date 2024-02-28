import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmploymentTypeModel } from "../../../../../core/_models/Employment/EmploymentTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmploymentTypesUIContext = createContext();

export function useEmploymentTypesUIContext() {
  return useContext(EmploymentTypesUIContext);
}

export const EmploymentTypesUIConsumer = EmploymentTypesUIContext.Consumer;

export function EmploymentTypesUIProvider({
  employmentTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmploymentTypeModel).initialFilter
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
    dataModel: EmploymentTypeModel,
    newEmploymentTypeButtonClick:
      employmentTypesUIEvents.newEmploymentTypeButtonClick,
    openEditEmploymentTypePage:
      employmentTypesUIEvents.openEditEmploymentTypePage,
    openDeleteEmploymentTypeDialog:
      employmentTypesUIEvents.openDeleteEmploymentTypeDialog,
    openDeleteEmploymentTypesDialog:
      employmentTypesUIEvents.openDeleteEmploymentTypesDialog,
    openFetchEmploymentTypesDialog:
      employmentTypesUIEvents.openFetchEmploymentTypesDialog,
    openUpdateEmploymentTypesStatusDialog:
      employmentTypesUIEvents.openUpdateEmploymentTypesStatusDialog,
  };
  return (
    <EmploymentTypesUIContext.Provider value={value}>
      {children}
    </EmploymentTypesUIContext.Provider>
  );
}
